import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Bitte geben Sie Ihren Namen an.').max(100),
  company: z.string().trim().min(2, 'Bitte geben Sie Ihre Firma an.').max(200),
  email: z.string().trim().email('Bitte geben Sie eine gültige E-Mail-Adresse an.').max(200),
  message: z
    .string()
    .trim()
    .min(10, 'Bitte schreiben Sie mindestens ein paar Worte.')
    .max(5000),
  // Honeypot — must be empty
  website: z.string().max(0).optional(),
});

export type ContactPayload = z.infer<typeof contactSchema>;
