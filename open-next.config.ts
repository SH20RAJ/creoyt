// default open-next.config.ts file created by @opennextjs/cloudflare
import { defineCloudflareConfig } from "@opennextjs/cloudflare/config";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";

// Start from the library defaults, then override what we need
// Use the default (in-memory/dummy) incremental cache unless a proper R2 binding is configured
const base = defineCloudflareConfig({});

export default {
  ...base,
  // Ensure Node-flavoured entries are selected and Node wrapper is used
  default: {
    ...base.default,
    override: {
      ...base.default?.override,
      wrapper: "cloudflare-node",
      converter: "edge",
      openNextVersion: "^3.8.5",
    },
  },
  cloudflare: {
    ...(base.cloudflare ?? {}),
    // Avoid using the "workerd" condition so esbuild resolves Node-friendly entries
    useWorkerdCondition: false,
  },
};
