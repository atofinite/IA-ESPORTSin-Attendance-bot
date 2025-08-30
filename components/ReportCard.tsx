
import React from 'react';

interface ReportCardProps {
  report: string;
  onReset: () => void;
  error: string | null;
}

const ReportCard: React.FC<ReportCardProps> = ({ report, onReset, error }) => {
  const formatReport = (text: string) => {
    return text
      .replace(/(\*\*|✅|❌|📌|🕒|📊|⚠️)/g, (match) => {
        if (match === '✅') return '<span class="text-green-400">✅</span>';
        if (match === '❌') return '<span class="text-red-400">❌</span>';
        if (match === '⚠️') return '<span class="text-yellow-400">⚠️</span>';
        if (match.startsWith('@')) return `<span class="bg-blue-500/50 text-blue-300 px-1 rounded">${match}</span>`;
        return `<strong>${match}</strong>`;
      })
      .replace(/@(\w+)/g, '<span class="bg-blue-900 text-blue-300 px-2 py-0.5 rounded">@$1</span>')
      .replace(/\n/g, '<br />');
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-6 animate-fade-in">
      <h2 className="text-2xl font-black text-center mb-4 text-white uppercase">Attendance Report Generated</h2>
      
      {error && (
         <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg mb-4" role="alert">
           <strong className="font-bold">Error: </strong>
           <span className="block sm:inline">{error}</span>
         </div>
      )}
      
      <pre
        className="bg-gray-900/70 p-4 rounded-md text-sm text-gray-200 whitespace-pre-wrap font-sans leading-relaxed"
        dangerouslySetInnerHTML={{ __html: formatReport(report) }}
      />
      
      <button
        onClick={onReset}
        className="w-full mt-6 bg-gray-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-700 transition-all duration-300"
      >
        Start New Attendance Check
      </button>
    </div>
  );
};

export default ReportCard;
