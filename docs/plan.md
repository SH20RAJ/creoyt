# Build Checklist

- [x] Diagnose why `bun run lint` / `bun run build` fail (Cloudflare dev helper binding to 127.0.0.1).
- [x] Guard `initOpenNextCloudflareForDev` so it only runs with `next dev`.
- [x] Re-run lint/build to confirm the guard works and no new regressions exist.
- [ ] Execute `bun run deploy` once validation passes.
