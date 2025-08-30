import { Player, AttendanceStatus, SessionType, SessionDetails } from './types';

export const INITIAL_PLAYERS: Player[] = [
  { id: 1, name: 'Player1 (Jett)', status: AttendanceStatus.UNKNOWN, reason: null, role: 'PLAYER' },
  { id: 2, name: 'Player2 (Sova)', status: AttendanceStatus.UNKNOWN, reason: null, role: 'PLAYER' },
  { id: 3, name: 'Player3 (Omen)', status: AttendanceStatus.UNKNOWN, reason: null, role: 'PLAYER' },
  { id: 4, name: 'Player4 (Killjoy)', status: AttendanceStatus.UNKNOWN, reason: null, role: 'PLAYER' },
  { id: 5, name: 'Player5 (KAY/O)', status: AttendanceStatus.UNKNOWN, reason: null, role: 'PLAYER' },
  { id: 6, name: 'Player6 (Viper)', status: AttendanceStatus.UNKNOWN, reason: null, role: 'PLAYER' },
  { id: 7, name: 'Coach Prime', status: AttendanceStatus.UNKNOWN, reason: null, role: 'COACH' },
];

export const SESSION_DETAILS: Record<SessionType, SessionDetails> = {
  [SessionType.SCRIM]: {
    title: 'Daily Scrim',
    time: '6:30 PM – 10:15 PM (Mon–Sat)',
  },
  [SessionType.GRIND]: {
    title: 'Sunday Grind Session',
    time: '1:00 PM – 3:00 PM',
  },
};
