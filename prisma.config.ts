import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
   schema: 'prisma/schema.prisma',
   migrations: {
      path: 'prisma/migrations',
   },
   datasource: {
      url: env('DATABASE_URL'),
   },
   // required when using unstable features
   experimental: {
      externalTables: true,
   },
   // declare the `users` table and `role` enum as external
   tables: {
      external: ['public.account', 'public.user'],
   },
   enums: {
      external: ['public.AccountStatus', 'public.UserRole'],
   },
});
