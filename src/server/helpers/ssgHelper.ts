import superjson from "superjson";
import { db } from "~/server/db";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { appRouter } from "../api/root";

export const generateSSGHelper = () =>
  createServerSideHelpers({
    router: appRouter,
    ctx: { db, userId: null },
    transformer: superjson, // optional - adds superjson serialization
  });
