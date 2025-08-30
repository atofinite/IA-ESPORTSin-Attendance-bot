
import React, { useState } from 'react';
import { Player } from '../types';

interface ReasonModalProps {
  player: Player;
  onClose: () => void;
  onSubmit: (playerId: number, reason: string) => void;
}

const ReasonModal: React.FC<ReasonModalProps> = ({ player, onClose, onSubmit }) => {
  const [reason, setReason] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reason.trim()) {
      onSubmit(player.id, reason.trim());
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-gray-800 border border-gray-700 rounded-lg shadow-xl w-full max-w-md p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-white mb-2">Reason for Absence</h2>
        <p className="text-gray-300 mb-4">
          Please provide a reason for <strong className="text-red-400">{player.name}</strong>'s absence.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="e.g., Exam, Sick, Family commitment"
            className="w-full bg-gray-900 text-white border border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            autoFocus
          />
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!reason.trim()}
              className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              Confirm Absence
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReasonModal;
