export type TeamMember = {
  name: string;
  rollNumber: string;
  role: string;
  imageUrl: string;
  description: string;
};

export type TeamsMap = Record<string, TeamMember[]>;
