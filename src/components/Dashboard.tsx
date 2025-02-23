import React from 'react';
import { Book, Trophy, Star, Sparkles } from 'lucide-react';
import { useUserStore } from '../lib/store';

export default function Dashboard() {
  const { isAuthenticated, isPremium, enrolledCourses, badges, totalProgress } = useUserStore();

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Please log in to access the dashboard</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Book className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Enrolled Courses</dt>
                  <dd className="text-lg font-medium text-gray-900">{enrolledCourses.length}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Trophy className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Badges Earned</dt>
                  <dd className="text-lg font-medium text-gray-900">{badges}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Star className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Progress</dt>
                  <dd className="text-lg font-medium text-gray-900">{totalProgress} XP</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900">Your Courses</h2>
        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {enrolledCourses.length > 0 ? (
            enrolledCourses.map((course) => (
              <div key={course.id} className="bg-white shadow rounded-lg overflow-hidden">
                <img src={course.imageUrl} alt={course.title} className="h-48 w-full object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900">{course.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">{course.description}</p>
                  <div className="mt-4">
                    <div className="relative pt-1">
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-indigo-200">
                        <div
                          style={{ width: `${course.progress}%` }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600"
                        />
                      </div>
                    </div>
                    <p className="mt-1 text-xs text-gray-500 text-right">{course.progress}% Complete</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">You haven't enrolled in any courses yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}