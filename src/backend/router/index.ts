import * as trpc from "@trpc/server";
import {  z } from 'zod';
import { getOptionsForVote } from "~/utils/getRandomCharID";
import { characterByID } from "~/utils/characterByID";
import { prisma } from "~/backend/utils/prisma";
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
      const [first, second] = getOptionsForVote()as[number , number] ;

      const bothCharacter = await prisma.character.findMany({
        where: { id: { in: [first, second] } },
      });

      if (bothCharacter.length !== 2)
        throw new Error("Failed to find two characters");
        
      const characters : any =  {firstCharacter: bothCharacter[0], secondCharacter: bothCharacter[1]}
      return characters
      }),

      vote: procedure
      .input(z.object({
        votedFor: z.number(),
        votedAgainst: z.number(),
      }))
      .mutation(async (opts)=>{
        const { input } = opts;
        const voteInDb = await prisma.vote.create({
            data: {
              votedAgainstId: input.votedAgainst,
              votedForId: input.votedFor,
            },
          });
          return { success: true, vote: voteInDb };
        })
      });

// export type definition of API
export type AppRouter = typeof appRouter;