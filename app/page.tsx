'use client';

import { useState, Suspense } from 'react';
import { ChatPage } from './components/ChatPageWithAuth';
import { AppsPage } from './components/AppsPageWithAuth';
import { AuthWrapper } from './components/AuthWrapper';
import { RubeGraphic } from './components/RubeGraphic';
import { Navigation } from './components/Navigation';
import { UserMenu } from './components/UserMenu';

function HomeContent() {
  const [headerVisible, setHeaderVisible] = useState(false);

  const toggleHeader = () => {
    setHeaderVisible(!headerVisible);
  };

  return (
    <AuthWrapper>
      {(user) => (
        <div className="flex flex-col h-screen" style={{ backgroundColor: '#fcfaf9' }}>
          {/* Burger Menu Button - Hidden */}
          <div className="fixed top-4 left-4 z-40 hidden">
            <button
              onClick={toggleHeader}
              className={`rounded-full p-3 shadow-lg border transition-all duration-200 ${
                headerVisible 
                  ? 'bg-white border-gray-200 hover:bg-gray-50' 
                  : 'bg-blue-500 border-blue-600 hover:bg-blue-600 shadow-xl'
              }`}
              aria-label="Toggle header menu"
            >
              <svg
                className={`w-6 h-6 ${headerVisible ? 'text-gray-700' : 'text-white'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={headerVisible ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>

          {/* Header - conditionally rendered */}
          {headerVisible && (
            <header className="fixed top-4 left-20 right-4 md:left-20 md:right-4 bg-white border-b border-gray-200 z-30" style={{ borderRadius: '25px' }}>
              <div className="flex items-center justify-between px-4 py-2">
                <div className="flex items-center space-x-3 text-black">
                  <RubeGraphic />
                  <span className="text-lg font-semibold text-gray-900">Rube</span>
                </div>
                {user && <UserMenu user={user} />}
              </div>
              <div className="px-4 pb-2">
                <div className="flex space-x-2">
                  <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                    Chat
                  </button>
                </div>
              </div>
            </header>
          )}

          {/* Main content */}
          <main className={`flex-1 flex flex-col ${headerVisible ? 'pt-[116px]' : 'pt-16'}`}>
            <ChatPage />
          </main>
        </div>
      )}
    </AuthWrapper>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#fcfaf9' }}>
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500"></div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
