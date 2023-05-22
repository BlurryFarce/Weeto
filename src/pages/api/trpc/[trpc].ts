import * as trpcNext from '@trpc/server/adapters/next';
import { appRouter , AppRouter} from '~/backend/router';
import { inferProcedureOutput } from "@trpc/server";
// export API handler
// @see https://trpc.io/docs/api-handler

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
});

export type inferQueryResponse<
  TRouteKey extends keyof AppRouter["_def"]["procedures"]
> = inferProcedureOutput<AppRouter["_def"]["procedures"][TRouteKey]>;