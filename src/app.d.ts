import type { PrismaClient } from '@prisma/client';
import type { AuthRequest } from 'lucia-auth';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
    namespace App {
        // interface Error {}
        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface Locals extends AuthRequest {}
        // interface PageData {}
        // interface Platform {}
    }
    // eslint-disable-next-line no-var
    var __prisma: PrismaClient;

    /// <reference types="lucia-auth" />
    declare namespace Lucia {
        type Auth = import('$lib/server/lucia').Auth;
        type UserAttributes = {
            username: string;
            name: string;
            email: string;
        };
    }
}

export {};
