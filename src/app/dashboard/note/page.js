import { auth } from "@/auth";
import React from "react";

export default async function page() {
  console.log(await auth());

  let user = await auth();

  return <div>{user.user.userId}</div>;
}
