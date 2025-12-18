export type TeamMember = {
  name: string;
  role: string;
  imageUrl: string;
  tagline?: string;
  profileUrl?: string;
};

export type TeamsMap = Record<string, TeamMember[]>;
