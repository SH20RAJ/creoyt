import { redirect } from "next/navigation";
import React from "react";

export default function page() {
  redirect("https://github.com/orgs/creoyt/discussions");
  return <div></div>;
}
