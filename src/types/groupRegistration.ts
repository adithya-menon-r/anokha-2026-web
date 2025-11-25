import { z } from 'zod';

export const teammateSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name must contain only letters and spaces'),
  email: z.string().email('Invalid email address'),
});

export const createGroupFormSchema = (
  minTeamSize: number,
  maxTeamSize: number,
  leaderEmail: string,
) =>
  z.object({
    teammates: z
      .array(teammateSchema)
      .min(
        Math.max(0, minTeamSize - 1),
        `You must add at least ${Math.max(0, minTeamSize - 1)} teammate(s)`,
      )
      .max(
        Math.max(0, maxTeamSize - 1),
        `You can add at most ${Math.max(0, maxTeamSize - 1)} teammate(s)`,
      )
      .refine(
        (teammates) => {
          const emails = teammates.map((t) => t.email.toLowerCase());
          const uniqueEmails = new Set(emails);
          return uniqueEmails.size === emails.length;
        },
        {
          message: 'All team members must have unique email addresses',
        },
      )
      .refine(
        (teammates) => {
          const emails = teammates.map((t) => t.email.toLowerCase());
          return !emails.includes(leaderEmail.toLowerCase());
        },
        {
          message: 'Team member cannot have the same email as the leader',
        },
      ),
  });

export type GroupRegistrationFormValues = z.infer<
  ReturnType<typeof createGroupFormSchema>
>;

export interface GroupRegistrationOutput {
  name: string;
  email: string;
  role: 'LEADER';
  teammates: {
    name: string;
    email: string;
    role: 'MEMBER';
  }[];
}
