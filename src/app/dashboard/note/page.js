export const runtime = 'edge';

import { auth } from "@clerk/nextjs/server";
import React from "react";

export default async function page() {
  const { userId } = await auth();

  if (!userId) {
    return <div>Please sign in to view this page</div>;
  }

  return <div>User ID: {userId}</div>;
}
