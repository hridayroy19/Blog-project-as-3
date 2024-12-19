import { z } from 'zod';

const userValidationZod = z.object({
  name: z.string().nonempty('Name is required'),
  email: z.string().email('Invalid email format'),
  password: z.number().min(6, 'Password must be at least 6 characters long'),
  role: z.enum(['admin', 'user']).optional().default('user'),
  isBlocked: z.boolean().optional().default(false),
});

export const userValidation = {
  userValidationZod,
};
