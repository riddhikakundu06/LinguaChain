import React, { useState } from 'react';
import { Languages, LogIn, LogOut, Book, Brain, Crown, Home } from 'lucide-react';
import { useUserStore } from '../lib/store';
import { Link, useLocation } from 'react-router-dom';
import { web3Service } from '../lib/web3';
import clsx from 'clsx';

export default function Header() {
  const { isAuthenticated, address, setAuthenticated, setAddress } = useUserStore();
  const [isConnecting, setIsConnecting] = useState(false);
  const location = useLocation();

  const handleConnect = async () => {
    if (!isAuthenticated) {
      setIsConnecting(true);
      try {
        const address = await web3Service.connect();
        if (address) {
          setAuthenticated(true);
          setAddress(address);
        }
      } catch (error) {
        console.error('Connection error:', error);
      } finally {
        setIsConnecting(false);
      }
    } else {
      await web3Service.disconnect();
      setAuthenticated(false);
      setAddress(null);
    }
  };

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/courses', icon: Book, label: 'Courses' },
    { path: '/ai-tutor', icon: Brain, label: 'AI Tutor' },
    { path: '/subscription', icon: Crown, label: 'Premium' },
  ];

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <Languages className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">LinguaChain</span>
          </Link>

          <div className="hidden md:flex ml-8 space-x-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={clsx(
                    'inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
                    location.pathname === item.path
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  )}
                >
                  <Icon className="h-4 w-4 mr-1.5" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {isAuthenticated && address && (
            <div className="flex items-center px-3 py-1.5 bg-indigo-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
              <span className="text-sm font-medium text-gray-700">
                {address.slice(0, 6)}...{address.slice(-4)}
              </span>
            </div>
          )}
          <button
            onClick={handleConnect}
            disabled={isConnecting}
            className={clsx(
              'inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm',
              'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all',
              isConnecting
                ? 'bg-gray-400 cursor-not-allowed'
                : isAuthenticated
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            )}
          >
            {isConnecting ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                Connecting...
              </div>
            ) : isAuthenticated ? (
              <>
                <LogOut className="h-4 w-4 mr-2" />
                Disconnect
              </>
            ) : (
              <>
                <LogIn className="h-4 w-4 mr-2" />
                Connect Wallet
              </>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t">
        <div className="grid grid-cols-4 gap-1 p-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={clsx(
                  'flex flex-col items-center py-2 px-1 rounded-md text-xs font-medium transition-colors',
                  location.pathname === item.path
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                )}
              >
                <Icon className="h-5 w-5 mb-1" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}