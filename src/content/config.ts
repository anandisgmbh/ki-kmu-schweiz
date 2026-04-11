import { defineCollection, z } from 'astro:content';

const cases = defineCollection({
  type: 'content',
  schema: z.object({
    order: z.number(),
    title: z.string(),
    industry: z.enum([
      'treuhand',
      'recht',
      'architektur',
      'immobilien',
      'versicherung',
      'ingenieur',
      'handwerk',
      'gastro',
      'handel',
      'gesundheit',
      'industrie',
    ]),
    industryLabel: z.string(),
    useCase: z.enum([
      'dokumente',
      'offerten',
      'kommunikation',
      'voice',
      'vision',
      'marketing',
      'wissen',
    ]),
    useCaseLabel: z.string(),
    size: z.string(),
    region: z.string(),
    pain: z.string(),
    solution: z.string(),
    metrics: z.array(z.string()).min(2).max(3),
    duration: z.string(),
    anchor: z.boolean().default(false),
  }),
});

const faqs = defineCollection({
  type: 'content',
  schema: z.object({
    order: z.number(),
    question: z.string(),
  }),
});

export const collections = { cases, faqs };
