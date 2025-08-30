import React, { useState, useMemo, useCallback } from 'react';
import { Player, AttendanceStatus, SessionType, ModalInfo } from './types';
import { INITIAL_PLAYERS, SESSION_DETAILS } from './constants';
import { generateSummaryWithGemini } from './services/geminiService';
import Header from './components/Header';
import AttendanceCard from './components/AttendanceCard';
import ReportCard from './components/ReportCard';
import ReasonModal from './components/ReasonModal';

const App: React.FC = () => {
  const [sessionType, setSessionType] = useState<SessionType>(SessionType.SCRIM);
  const [players, setPlayers] = useState<Player[]>(INITIAL_PLAYERS);
  const [report, setReport] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [modalInfo, setModalInfo] = useState<ModalInfo>({ isOpen: false, player: null });

  const isAttendanceComplete = useMemo(() => 
    players.every(p => p.status !== AttendanceStatus.UNKNOWN),
    [players]
  );

  const resetState = useCallback(() => {
    setPlayers(INITIAL_PLAYERS);
    setReport(null);
    setError(null);
    setIsLoading(false);
  }, []);

  // FIX: Narrow the type of `status` to `'PRESENT' | 'ABSENT'` to match the prop type of `AttendanceCard`.
  const handleStatusChange = useCallback((playerId: number, status: 'PRESENT' | 'ABSENT') => {
    if (status === AttendanceStatus.ABSENT) {
      const playerToUpdate = players.find(p => p.id === playerId);
      if (playerToUpdate) {
        setModalInfo({ isOpen: true, player: playerToUpdate });
      }
    } else {
      setPlayers(prevPlayers =>
        prevPlayers.map(p =>
          // FIX: Explicitly use the enum member to satisfy TypeScript's type checker.
          // The type of `status` is narrowed to the string literal 'PRESENT', which
          // is not directly assignable to the `AttendanceStatus` enum type.
          p.id === playerId ? { ...p, status: AttendanceStatus.PRESENT, reason: null } : p
        )
      );
    }
  }, [players]);

  const handleReasonSubmit = useCallback((playerId: number, reason: string) => {
    setPlayers(prevPlayers =>
      prevPlayers.map(p =>
        p.id === playerId ? { ...p, status: AttendanceStatus.ABSENT, reason } : p
      )
    );
    setModalInfo({ isOpen: false, player: null });
  }, []);

  const generateReport = async () => {
    setIsLoading(true);
    setError(null);

    const presentMembers = players.filter(p => p.status === AttendanceStatus.PRESENT);
    const absentMembers = players.filter(p => p.status === AttendanceStatus.ABSENT);
    
    const presentPlayers = presentMembers.filter(p => p.role === 'PLAYER');
    const absentPlayers = absentMembers.filter(p => p.role === 'PLAYER');
    const coach = players.find(p => p.role === 'COACH');

    // Majority is 4 out of 6 players
    const majorityPresent = presentPlayers.length >= 4;
    const sessionDetails = SESSION_DETAILS[sessionType];
    const coachStatus = coach ? { name: coach.name, status: coach.status, reason: coach.reason } : null;

    try {
      const aiSummary = await generateSummaryWithGemini({
        presentPlayers,
        absentPlayers,
        sessionType,
        majorityPresent,
        coachStatus,
      });

      const formatCoachStatus = () => {
        if (!coachStatus) return 'N/A';
        let statusText = coachStatus.status === AttendanceStatus.PRESENT ? 'Present ✅' : 'Absent ❌';
        if (coachStatus.status === AttendanceStatus.ABSENT && coachStatus.reason) {
            statusText += ` (Reason: ${coachStatus.reason})`;
        }
        return `${coachStatus.name}: ${statusText}`;
      };

      let reportContent = `
━━━━━━━━━━━━━━━━━━━━
📊 **Attendance Report**
📌 Date: ${new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}
🕒 Session: ${sessionDetails.title}

👤 **Coach Status**
- ${formatCoachStatus()}

✅ **Present Players (${presentPlayers.length}/6)**
${presentPlayers.length > 0 ? presentPlayers.map(p => `- ${p.name}`).join('\n') : '- None'}

❌ **Absent Players (${absentPlayers.length}/6)**
${absentPlayers.length > 0 ? absentPlayers.map(p => `- ${p.name} (Reason: ${p.reason})`).join('\n') : '- None'}
━━━━━━━━━━━━━━━━━━━━
`;
      reportContent += aiSummary;
      setReport(reportContent);

    } catch (err) {
      console.error("Error generating report:", err);
      setError("Failed to generate AI summary. Please check your API key and try again.");
      setReport(null); // Clear previous report on error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-gray-100 p-4 sm:p-8 flex flex-col items-center">
      <Header />
      <main className="w-full max-w-2xl mx-auto mt-8 space-y-8">
        {!report ? (
          <AttendanceCard
            sessionType={sessionType}
            setSessionType={setSessionType}
            players={players}
            onStatusChange={handleStatusChange}
            onGenerateReport={generateReport}
            isAttendanceComplete={isAttendanceComplete}
            isLoading={isLoading}
          />
        ) : (
          <ReportCard report={report} onReset={resetState} error={error} />
        )}
      </main>
      {modalInfo.isOpen && modalInfo.player && (
        <ReasonModal
          player={modalInfo.player}
          onClose={() => setModalInfo({ isOpen: false, player: null })}
          onSubmit={handleReasonSubmit}
        />
      )}
    </div>
  );
};

export default App;
