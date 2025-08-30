
import React from 'react';
import { Player, SessionType } from '../types';
import { SESSION_DETAILS } from '../constants';
import PlayerRow from './PlayerRow';

interface AttendanceCardProps {
  sessionType: SessionType;
  setSessionType: (type: SessionType) => void;
  players: Player[];
  onStatusChange: (playerId: number, status: 'PRESENT' | 'ABSENT') => void;
  onGenerateReport: () => void;
  isAttendanceComplete: boolean;
  isLoading: boolean;
}

const AttendanceCard: React.FC<AttendanceCardProps> = ({
  sessionType,
  setSessionType,
  players,
  onStatusChange,
  onGenerateReport,
  isAttendanceComplete,
  isLoading,
}) => {
  const sessionDetails = SESSION_DETAILS[sessionType];

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-6">
      <div className="flex justify-center mb-6">
        <div className="bg-gray-900 p-1 rounded-lg flex space-x-1">
          <button
            onClick={() => setSessionType(SessionType.SCRIM)}
            className={`px-4 py-2 text-sm font-bold rounded-md transition-colors ${
              sessionType === SessionType.SCRIM ? 'bg-red-600 text-white' : 'text-gray-400 hover:bg-gray-700'
            }`}
          >
            Scrim
          </button>
          <button
            onClick={() => setSessionType(SessionType.GRIND)}
            className={`px-4 py-2 text-sm font-bold rounded-md transition-colors ${
              sessionType === SessionType.GRIND ? 'bg-red-600 text-white' : 'text-gray-400 hover:bg-gray-700'
            }`}
          >
            Grind
          </button>
        </div>
      </div>

      <div className="border-2 border-dashed border-gray-600 rounded-md p-4 text-center mb-6">
        <h2 className="text-xl font-bold text-white">📅 {sessionDetails.title} Check</h2>
        <p className="text-gray-400">🕒 Time: {sessionDetails.time}</p>
        <p className="text-sm mt-2 text-yellow-400">✅ React for Present | ❌ React for Absent (Reason Required)</p>
      </div>

      <div className="space-y-3">
        {players.map(player => (
          <PlayerRow key={player.id} player={player} onStatusChange={onStatusChange} />
        ))}
      </div>

      <button
        onClick={onGenerateReport}
        disabled={!isAttendanceComplete || isLoading}
        className="w-full mt-8 bg-red-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-700 transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating Report...
          </>
        ) : (
          'Finalize & Generate Report'
        )}
      </button>
    </div>
  );
};

export default AttendanceCard;
