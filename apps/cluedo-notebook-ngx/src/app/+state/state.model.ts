
export interface Player {
  id: number;
  name: string;
}

export type AssignmentStatus = null | 'have' | 'may-have';

type Assignments = Record<string, Record<string, AssignmentStatus>>;

export interface CluedoState {
  gameDefinition: string;
  players: Player[];
  suspects: string[];
  rooms: string[];
  items: string[];
  assignments: Assignments;
}
