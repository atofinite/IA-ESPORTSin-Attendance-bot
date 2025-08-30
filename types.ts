export enum AttendanceStatus {
  UNKNOWN = 'UNKNOWN',
  PRESENT = 'PRESENT',
  ABSENT = 'ABSENT',
}

export enum SessionType {
  SCRIM = 'SCRIM',
  GRIND = 'GRIND',
}

export type PlayerRole = 'PLAYER' | 'COACH';

export interface Player {
  id: number;
  name: string;
  status: AttendanceStatus;
  reason: string | null;
  role: PlayerRole;
}

export interface ModalInfo {
  isOpen: boolean;
  player: Player | null;
}

export interface SessionDetails {
  title: string;
  time: string;
}

export interface GeminiPayload {
  presentPlayers: Player[];
  absentPlayers: Player[];
  sessionType: SessionType;
  majorityPresent: boolean;
  coachStatus: {
    name: string;
    status: AttendanceStatus;
    reason: string | null;
  } | null;
}
