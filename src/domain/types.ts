export type PhaseStatus = 'active' | 'pending' | 'completed';

export type TodoStatus = 'not-started' | 'in-progress' | 'completed';

export type Phase = {
  name: string;
  status: PhaseStatus;
  summary: string;
};

export type Team = {
  name: string;
  mission: string;
  output: string;
};

export type TodoItem = {
  id: number;
  title: string;
  status: TodoStatus;
  objective: string;
  deliverable: string;
};

export type WorkflowSection = {
  name: string;
  purpose: string;
  primaryTeam: string;
  exitCriterion: string;
};

export type OperationalSignal = {
  name: string;
  state: PhaseStatus;
  description: string;
  owner: string;
};

export type ReleaseStep = {
  name: string;
  state: PhaseStatus;
  purpose: string;
  owner: string;
};

export type WorkflowStep = {
  name: string;
  state: PhaseStatus;
  goal: string;
  owner: string;
  outputs: string[];
};

export type AuditEvent = {
  id: number;
  timestamp: string;
  action: string;
  stepName: string;
  actor: string;
};