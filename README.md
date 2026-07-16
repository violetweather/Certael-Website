# Certael Website

Source repository for Certael's public GitHub Pages site. The site introduces [Certael Core](https://github.com/violetweather/Certael), the optional [Certael Agent](https://github.com/violetweather/Certael-Agent), and the supported Godot, Unity, and Unreal installation paths.

The website is a curated guide. The Core and Agent security contracts remain normative.

The changelog tracks every public Core and Agent tag, including tag-only release
engineering iterations, implementations, fixes, breaking changes, and migration
guidance. Add its entry in the same change that introduces a future public tag.

The currently documented pre-1.0 release pair is Certael Core
`v0.2.0-alpha.1` with Certael Agent `v0.2.0-alpha.1`.

## Local development

```bash
npm ci
npm run dev
```

The project-site base path is `/Certael-Website/`. Open `http://localhost:4321/Certael-Website/`.

## Verification

```bash
npm run verify
npx playwright install --with-deps chromium
npm run test:e2e
```

Normal local builds fall back to checked-in release metadata if GitHub is unavailable. Pages deployment sets `REQUIRE_LIVE_RELEASES=1`, so it fails instead of publishing stale or broken release links.

## Publishing

`main` deploys through the least-privilege Pages workflow. Configure **Settings → Pages → Source → GitHub Actions**. The repository and deployed website are public.

Do not store signing keys, production configuration, private vulnerabilities, player data, or unpublished security findings here. Browser-delivered HTML, CSS, JavaScript, and assets are public even when the source repository is private.
