import { inferRouterOutputs } from '@trpc/server';
import { AppRouter } from '@/trpc/routers/_app';

export type UserGetOneOutput = inferRouterOutputs<AppRouter>['users']['getOne'];
