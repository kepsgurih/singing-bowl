import prisma from "$lib/config/prisma"
import { fail, redirect, type Actions } from "@sveltejs/kit";
import type { RequestEvent } from "../$types";
import fs from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';

export const load = async () => {
    const config = await prisma.config.findFirst();

    if (!config) return fail(404, { errorMessage: 'Config not found' });

    return {
        config
    }
}