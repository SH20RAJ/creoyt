// default open-next.config.ts file created by @opennextjs/cloudflare
import { defineCloudflareConfig } from "@opennextjs/cloudflare/config";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";

export default defineCloudflareConfig({
	incrementalCache: r2IncrementalCache,
	override: {
		wrapper: "cloudflare-node",
		converter: "node", 
		openNextVersion: "^3.8.5",
		edgeRuntime: "node",
	},
});
