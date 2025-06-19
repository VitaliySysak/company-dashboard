import { z } from 'zod';

export const CompanyFormSchema = z.object({
  name: z.string().min(2).max(20),
  service: z.string().min(2).max(20),
  details: z.string().min(2).max(20),
  lat: z.coerce.number().nonnegative().optional(),
  lng: z.coerce.number().nonnegative().optional(),
  capital: z.coerce.number().nonnegative(),
});

export type TCompanyFormValues = z.infer<typeof CompanyFormSchema>;
