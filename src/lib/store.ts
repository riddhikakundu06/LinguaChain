import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Course {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  language: string;
  imageUrl: string;
  isPremium: boolean;
  progress?: number;
}

interface UserState {
  isAuthenticated: boolean;
  isPremium: boolean;
  enrolledCourses: Course[];
  address: string | null;
  badges: number;
  totalProgress: number;
  setAuthenticated: (value: boolean) => void;
  setPremium: (value: boolean) => void;
  setAddress: (address: string | null) => void;
  enrollInCourse: (course: Course) => void;
  updateProgress: (courseId: string, progress: number) => void;
  addBadge: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      isPremium: false,
      enrolledCourses: [],
      address: null,
      badges: 0,
      totalProgress: 0,
      setAuthenticated: (value) => set({ isAuthenticated: value }),
      setPremium: (value) => set({ isPremium: value }),
      setAddress: (address) => set({ address }),
      enrollInCourse: (course) =>
        set((state) => ({
          enrolledCourses: [...state.enrolledCourses, { ...course, progress: 0 }],
        })),
      updateProgress: (courseId, progress) =>
        set((state) => ({
          enrolledCourses: state.enrolledCourses.map((course) =>
            course.id === courseId ? { ...course, progress } : course
          ),
          totalProgress: state.totalProgress + progress,
        })),
      addBadge: () => set((state) => ({ badges: state.badges + 1 })),
    }),
    {
      name: 'user-storage',
    }
  )
);

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Spanish for Beginners',
    description: 'Start your journey in Spanish with our comprehensive beginner course.',
    level: 'beginner',
    language: 'Spanish',
    imageUrl: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    isPremium: false
  },
  {
    id: '2',
    title: 'Advanced French',
    description: 'Master French with advanced conversation and grammar lessons.',
    level: 'advanced',
    language: 'French',
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    isPremium: true
  },
  {
    id: '3',
    title: 'Japanese Basics',
    description: 'Learn essential Japanese characters and basic conversation.',
    level: 'beginner',
    language: 'Japanese',
    imageUrl: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    isPremium: false
  }
];