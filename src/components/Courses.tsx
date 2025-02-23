import React from 'react';
import { Lock } from 'lucide-react';
import { useUserStore, mockCourses } from '../lib/store';
import clsx from 'clsx';

export default function Courses() {
  const { isAuthenticated, isPremium, enrollInCourse, enrolledCourses } = useUserStore();

  const handleEnroll = (course: typeof mockCourses[0]) => {
    if (!isAuthenticated) {
      alert('Please connect your wallet to enroll in courses');
      return;
    }

    if (course.isPremium && !isPremium) {
      alert('This course requires a premium subscription');
      return;
    }

    enrollInCourse(course);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Courses</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mockCourses.map((course) => {
          const isEnrolled = enrolledCourses.some((c) => c.id === course.id);
          
          return (
            <div key={course.id} className="bg-white shadow rounded-lg overflow-hidden">
              <div className="relative">
                <img src={course.imageUrl} alt={course.title} className="h-48 w-full object-cover" />
                {course.isPremium && (
                  <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                    <Lock className="h-3 w-3 mr-1" />
                    Premium
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900">{course.title}</h3>
                <p className="mt-1 text-sm text-gray-500">{course.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className={clsx(
                    'px-2 py-1 text-xs font-medium rounded-full',
                    course.level === 'beginner' && 'bg-green-100 text-green-800',
                    course.level === 'intermediate' && 'bg-yellow-100 text-yellow-800',
                    course.level === 'advanced' && 'bg-red-100 text-red-800'
                  )}>
                    {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                  </span>
                  <button
                    onClick={() => handleEnroll(course)}
                    disabled={isEnrolled}
                    className={clsx(
                      'px-4 py-2 rounded-md text-sm font-medium',
                      isEnrolled
                        ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    )}
                  >
                    {isEnrolled ? 'Enrolled' : 'Enroll Now'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}