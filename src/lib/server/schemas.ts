import { z } from 'zod';

export const nameSchema = z
    .string()
    .min(2, 'Name must have at least 2 characters.')
    .max(32, 'Name must have at most 32 characters.');

export const usernameSchema = z
    .string()
    .min(3, 'Username must have at least 3 characters.')
    .max(20, 'Username must have at most 20 characters.');

export const bioSchema = z.string().max(160, 'Bio must have at most 160 characters');

export const thumbnailColorSchema = z.enum(['purple', 'red', 'blue', 'green', 'yellow', 'gray']);

export const linkNameSchema = z.enum(['github', 'twitter', 'instagram']);
