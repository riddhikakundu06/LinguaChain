import React from 'react';
import { Check } from 'lucide-react';
import { useUserStore } from '../lib/store';

const features = {
  free: [
    'Access to beginner courses',
    'Basic progress tracking',
    'Community forum access',
    'Limited daily exercises',
    'Basic achievements'
  ],
  premium: [
    'Access to ALL courses',
    'Advanced AI tutoring',
    'Live video classes',
    'Unlimited exercises',
    'Premium achievements',
    'Speech recognition',
    'Downloadable materials',
    'Ad-free experience',
    'Exclusive events'
  ]
};

export default function Subscription() {
  const { isAuthenticated, isPremium, setPremium } = useUserStore();

  const handleUpgrade = async () => {
    if (!isAuthenticated) {
      alert('Please log in to upgrade');
      return;
    }
    
    // Simulating a payment process
    const confirmed = window.confirm('This will upgrade your account to Premium. Continue?');
    if (confirmed) {
      setPremium(true);
      alert('Successfully upgraded to premium!');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:flex-col sm:align-center">
        <h1 className="text-5xl font-extrabold text-gray-900 sm:text-center">Pricing Plans</h1>
        <p className="mt-5 text-xl text-gray-500 sm:text-center">
          Choose the perfect plan for your language learning journey
        </p>
      </div>

      <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-2">
        {/* Free Tier */}
        <div className="border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200">
          <div className="p-6">
            <h2 className="text-2xl font-medium leading-6 text-gray-900">Free</h2>
            <p className="mt-4 text-sm text-gray-500">Perfect for beginners starting their language journey</p>
            <p className="mt-8">
              <span className="text-4xl font-extrabold text-gray-900">$0</span>
              <span className="text-base font-medium text-gray-500">/mo</span>
            </p>
            <button
              disabled
              className="mt-8 block w-full bg-gray-200 border border-gray-800 rounded-md py-2 text-sm font-semibold text-gray-900 text-center"
            >
              Current Plan
            </button>
          </div>
          <div className="pt-6 pb-8 px-6">
            <h3 className="text-xs font-medium text-gray-900 tracking-wide uppercase">What's included</h3>
            <ul role="list" className="mt-6 space-y-4">
              {features.free.map((feature) => (
                <li key={feature} className="flex space-x-3">
                  <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-500">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Premium Tier */}
        <div className="border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200">
          <div className="p-6">
            <h2 className="text-2xl font-medium leading-6 text-gray-900">Premium</h2>
            <p className="mt-4 text-sm text-gray-500">For serious learners who want to master languages</p>
            <p className="mt-8">
              <span className="text-4xl font-extrabold text-gray-900">$9.99</span>
              <span className="text-base font-medium text-gray-500">/mo</span>
            </p>
            <button
              onClick={handleUpgrade}
              disabled={!isAuthenticated || isPremium}
              className="mt-8 block w-full bg-indigo-600 border border-transparent rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isPremium ? 'Current Plan' : 'Upgrade Now'}
            </button>
          </div>
          <div className="pt-6 pb-8 px-6">
            <h3 className="text-xs font-medium text-gray-900 tracking-wide uppercase">What's included</h3>
            <ul role="list" className="mt-6 space-y-4">
              {features.premium.map((feature) => (
                <li key={feature} className="flex space-x-3">
                  <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-500">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}