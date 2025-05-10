import React from 'react';

function Header() {
  return (
    <header className="bg-white shadow-md py-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-5">
        <div>
          <h1 className="text-2xl font-bold text-primary">TuCoach AI</h1>
        </div>
        <nav>
          <ul className="flex space-x-8">
            <li><a href="/" className="text-gray-700 font-medium hover:text-primary transition-colors">Home</a></li>
            <li><a href="/about" className="text-gray-700 font-medium hover:text-primary transition-colors">About</a></li>
          </ul>
        </nav> 
      </div>
    </header>
  );
}

export default Header;