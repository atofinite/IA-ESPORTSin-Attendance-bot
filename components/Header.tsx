
import React from 'react';
import ValorantIcon from './icons/ValorantIcon';

const Header: React.FC = () => {
  return (
    <header className="w-full max-w-2xl text-center">
      <div className="flex items-center justify-center gap-4">
        <ValorantIcon className="h-10 w-10 text-red-500" />
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-gray-100 uppercase">
          Valorant Attendance Bot
        </h1>
      </div>
      <p className="mt-2 text-lg text-gray-400">
        Simulating attendance management for your tactical shooter team.
      </p>
    </header>
  );
};

export default Header;
