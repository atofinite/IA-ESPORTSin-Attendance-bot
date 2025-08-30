import React from 'react';
import { Player, AttendanceStatus } from '../types';
import CheckIcon from './icons/CheckIcon';
import XIcon from './icons/XIcon';

interface PlayerRowProps {
  player: Player;
  onStatusChange: (playerId: number, status: 'PRESENT' | 'ABSENT') => void;
}

const PlayerRow: React.FC<PlayerRowProps> = ({ player, onStatusChange }) => {
  return (
    <div className="flex items-center justify-between bg-gray-700/50 p-3 rounded-lg">
      <div>
        <div className="flex items-center gap-3">
          <span className="font-semibold text-white">{player.name}</span>
          {player.role === 'COACH' && (
            <span className="bg-cyan-500 text-white text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              Coach
            </span>
          )}
        </div>
        {player.status === AttendanceStatus.ABSENT && player.reason && (
          <p className="text-xs text-yellow-400 mt-1">Reason: {player.reason}</p>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onStatusChange(player.id, AttendanceStatus.PRESENT)}
          className={`p-2 rounded-full transition-colors duration-200 ${
            player.status === AttendanceStatus.PRESENT ? 'bg-green-500 text-white' : 'bg-gray-600 text-gray-300 hover:bg-green-600'
          }`}
          aria-label={`Mark ${player.name} as present`}
        >
          <CheckIcon className="h-5 w-5" />
        </button>
        <button
          onClick={() => onStatusChange(player.id, AttendanceStatus.ABSENT)}
          className={`p-2 rounded-full transition-colors duration-200 ${
            player.status === AttendanceStatus.ABSENT ? 'bg-red-500 text-white' : 'bg-gray-600 text-gray-300 hover:bg-red-600'
          }`}
          aria-label={`Mark ${player.name} as absent`}
        >
          <XIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default PlayerRow;
