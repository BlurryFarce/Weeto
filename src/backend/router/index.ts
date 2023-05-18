import * as trpc from "@trpc/server";
import { ZodFirstPartyTypeKind, number, z } from 'zod';
import { getOptionsForVote } from "~/utils/getRandomCharID";
import { characterByID } from "~/utils/characterByID";
//import { procedure, router } from '../trpc';
import { initTRPC } from '@trpc/server';
import Trpc from "~/pages/api/trpc/[trpc]";
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.create();
// Base router and procedure helpers
export const  router = t.router;
export const procedure = t.procedure;


    
 export const appRouter =  router({
  characters: procedure
    .query(async () => {
      const [first, second] = getOptionsForVote()

      const firstCharacter = await characterByID(first)
      const secondCharacter = await characterByID(second)

      return {firstCharacter : firstCharacter, secondCharacter : secondCharacter}
      })
    })

// export type definition of API
export type AppRouter = typeof appRouter;