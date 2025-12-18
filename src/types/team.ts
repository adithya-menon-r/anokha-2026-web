export type TeamMember = {
  name: string;
  role: string;
  imageUrl: string;
};

export type TeamsMap = Record<string, TeamMember[]>;
