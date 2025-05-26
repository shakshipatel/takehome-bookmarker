
import React from 'react';
import { Bookmark, LogIn, LogOut, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '@/store/reducers/userSlice';

export const Header = () => {
  const APP_USER = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Bookmark className="w-8 h-8 text-blue-600 mr-2" />
            <span className="text-2xl font-bold text-gray-900">Link Saver</span>
          </div>

          {/* Navigation */}
          {!APP_USER && <nav className="flex items-center space-x-4">
            <Link to={"/login"} className="inline-flex items-center px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-200">
              <LogIn className="w-4 h-4 mr-2" />
              Sign In
            </Link>
            <Link to={"/signup"} className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
              <UserPlus className="w-4 h-4 mr-2" />
              Sign Up
            </Link>
          </nav>}
          {APP_USER && <nav className="flex items-center space-x-4">
            <button onClick={() => {
              dispatch(logoutUser())
            }} className="inline-flex items-center px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-200">
              <LogOut className="w-4 h-4 mr-2" />
              Log Out
            </button>
          </nav>}
        </div>
      </div>
    </header>
  );
};
