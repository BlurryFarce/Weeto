import * as trpc from "@trpc/server";
import { z } from 'zod';


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
  characterByID: procedure
    .input(z.object ({ cid: z.number().optional()}))
    .query(async ({input}) => {
        const query = 
        `query($cid: Int){
          Character(id: $cid){
            id
            favourites
            name {
              first
              middle
              last
              full
              native
            }
            gender
            age
            image{
              large
              medium
            }
          }
      }`;
      
        const variables = {
          cid : input,
          };
      
          const url = 'https://graphql.anilist.co',
          options = {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
              },
              body: JSON.stringify({
                  query: query,
                  variables: variables
              })
          };
  
        const data = await fetch(url,options)
          .then((result) => result.json())
          .then((result) => {
            return result.data.Character 
          }) 
          return data
      })
});

// export type definition of API
export type AppRouter = typeof appRouter;