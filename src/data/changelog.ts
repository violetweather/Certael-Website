export type ChangelogProduct = "Core" | "Agent";
export type ChangelogAvailability = "published" | "tag-only";

export interface ChangelogEntry {
  product: ChangelogProduct;
  version: string;
  date: string;
  availability: ChangelogAvailability;
  summary: string;
  releaseUrl: string;
  compareUrl?: string;
  implemented: string[];
  fixes: string[];
  breaking: string[];
  migration: string[];
}

export const changelog: ChangelogEntry[] = [
  {
    product: "Core",
    version: "v0.2.0-alpha.1",
    date: "2026-07-15",
    availability: "published",
    summary: "Completes the Core side of the protected Agent 0.2 launch and lifecycle contract.",
    releaseUrl: "https://github.com/violetweather/Certael/releases/tag/v0.2.0-alpha.1",
    compareUrl: "https://github.com/violetweather/Certael/compare/v0.1.0-alpha.7...v0.2.0-alpha.1",
    implemented: [
      "Stored, signed whole-build manifests bound by digest to protected launch grants.",
      "Manifest request generation through certaelctl and authenticated backend registration.",
      "Timed Agent health and signed revocation transport across Godot, Unity, and Unreal.",
      "Database migration 016 for tenant-scoped Agent build manifests.",
      "Core compatibility metadata pinned to the verified Agent 0.2 source commit.",
    ],
    fixes: [
      "Corrected stale Godot guidance and aligned every engine adapter with the three-part launch bundle.",
      "Prevented a build ID alone from admitting a changed or incomplete protected installation.",
    ],
    breaking: [
      "Protected Agent launch now requires policy, grant, and signed whole-build manifest; the older two-part bundle is rejected.",
      "Engine Agent binding methods gained a signed-build-manifest argument and new health/revocation frames.",
      "Older approved-build records must be recreated as signed whole-build manifests.",
    ],
    migration: [
      "Apply database migration 016.",
      "Replace the complete Core engine package and deploy Agent v0.2.0-alpha.1 with it.",
      "Generate and register manifests for every protected exported build, then start fresh Agent sessions.",
    ],
  },
  {
    product: "Agent",
    version: "v0.2.0-alpha.1",
    date: "2026-07-15",
    availability: "published",
    summary: "Turns the Agent technical preview into a complete protected-launch product flow.",
    releaseUrl: "https://github.com/violetweather/Certael-Agent/releases/tag/v0.2.0-alpha.1",
    compareUrl: "https://github.com/violetweather/Certael-Agent/compare/v0.1.0-alpha.3...v0.2.0-alpha.1",
    implemented: [
      "Signed whole-build manifest verification before the game is admitted.",
      "Signed multi-game registrations with isolated publisher keys, update roots, paths, and recovery.",
      "Heartbeat, report-deadline, expiry, disconnect-grace, revocation, lost, and update-required states.",
      "Trusted automatic update staging, activation, last-known-good rollback, and live GUI recovery actions.",
      "Platform-specific process identity and packaging/signing integration for Windows, macOS, and Linux.",
    ],
    fixes: [
      "Fixed Windows inherited-channel cleanup and Windows-only strict lint failures.",
      "Fixed protected launch when inherited Windows environment values contain equals signs or colons.",
      "Removed dummy or ambiguous trust fallback behavior from production registration paths.",
    ],
    breaking: [
      "The mutable global game trust store is retired in favor of signed per-game registration.",
      "Protected launch uses launch-game --registration-id instead of supplying a game path and trust store directly.",
      "Agent launch admission now requires the signed whole-build manifest included in Core's launch bundle.",
      "Old registrations, grants, and active sessions are not reusable with Agent 0.2.",
    ],
    migration: [
      "Install the complete Agent 0.2 archive instead of replacing one executable.",
      "Create a signed game registration with publisher trust store, update root, and game root.",
      "Register it with register-game, then launch by registration ID and bootstrap a new server session.",
    ],
  },
  {
    product: "Core",
    version: "v0.1.0-alpha.7",
    date: "2026-07-14",
    availability: "published",
    summary: "Hardens the pre-1.0 platform and establishes the supported Core/Agent alpha pair.",
    releaseUrl: "https://github.com/violetweather/Certael/releases/tag/v0.1.0-alpha.7",
    compareUrl: "https://github.com/violetweather/Certael/compare/v0.1.0-alpha.6...v0.1.0-alpha.7",
    implemented: [
      "Pinned compatibility and release packages to Agent v0.1.0-alpha.3.",
      "Expanded platform hardening, release verification, documentation, and operational safeguards.",
    ],
    fixes: [
      "Aligned packaged Agent probe/runtime expectations across the engine distributions.",
      "Removed mismatched Alpha 3/Alpha 6 release guidance.",
    ],
    breaking: ["Mixed older Core and Agent alpha combinations became unsupported."],
    migration: ["Replace both complete packages and start a fresh Agent session."],
  },
  {
    product: "Agent",
    version: "v0.1.0-alpha.3",
    date: "2026-07-14",
    availability: "published",
    summary: "Completes the initial pre-1.0 platform packaging and improves Windows launch compatibility.",
    releaseUrl: "https://github.com/violetweather/Certael-Agent/releases/tag/v0.1.0-alpha.3",
    compareUrl: "https://github.com/violetweather/Certael-Agent/compare/v0.1.0-alpha.1...v0.1.0-alpha.3",
    implemented: [
      "Completed the initial Windows, Linux, macOS x64, and macOS arm64 release platform.",
      "Shipped installers, compatibility metadata, checksums, SBOM, and provenance sidecars.",
    ],
    fixes: ["Allowed launch when Windows DEP policy was already enabled instead of treating it as an error."],
    breaking: [],
    migration: ["Install the full Alpha 3 platform archive; do not copy only the Agent executable."],
  },
  {
    product: "Core",
    version: "v0.1.0-alpha.6",
    date: "2026-07-13",
    availability: "published",
    summary: "Introduces the first complete Core-backed Agent admission and engine relay lifecycle.",
    releaseUrl: "https://github.com/violetweather/Certael/releases/tag/v0.1.0-alpha.6",
    compareUrl: "https://github.com/violetweather/Certael/compare/v0.1.0-alpha.5...v0.1.0-alpha.6",
    implemented: [
      "Agent protocol, signed policies, server-bound grants, challenges, reports, and admission lifecycle.",
      "Canonical binary Agent reports with atomic session/report persistence.",
      "Authenticated binary lifecycle API and inherited-channel integration for Unity and Godot.",
      "Tenant, environment, build, player, match, server, and Agent-key binding.",
    ],
    fixes: [
      "Completed Unity challenge relay and the full Godot Agent integration.",
      "Closed grant reuse across authoritative servers.",
    ],
    breaking: [
      "Agent reports moved to canonical binary envelopes.",
      "Agent grants gained authoritative-server and tenant/environment binding requirements.",
    ],
    migration: ["Apply the Agent lifecycle database migrations and issue new policies, grants, and sessions."],
  },
  {
    product: "Agent",
    version: "v0.1.0-alpha.2",
    date: "2026-07-13",
    availability: "tag-only",
    summary: "A packaging iteration for the initial Agent platform; it was superseded before a downloadable release was published.",
    releaseUrl: "https://github.com/violetweather/Certael-Agent/tree/v0.1.0-alpha.2",
    compareUrl: "https://github.com/violetweather/Certael-Agent/compare/v0.1.0-alpha.1...v0.1.0-alpha.2",
    implemented: ["Completed additional pre-1.0 platform and packaging work."],
    fixes: ["Follow-up fixes from the first cross-platform Agent release candidate."],
    breaking: [],
    migration: ["Do not install this tag; use a published Agent release."],
  },
  {
    product: "Agent",
    version: "v0.1.0-alpha.1",
    date: "2026-07-13",
    availability: "published",
    summary: "The first public user-mode Agent foundation and signed challenge/report session.",
    releaseUrl: "https://github.com/violetweather/Certael-Agent/releases/tag/v0.1.0-alpha.1",
    implemented: [
      "User-mode Agent security boundary, bounded platform evidence, native UI, and engine-channel ABI.",
      "Inherited private channels on Windows and bidirectional game/Agent communication.",
      "Signed admission, challenge, report-chain sessions, build-manifest checks, and golden vectors.",
      "TUF update verification with atomic activation and rollback.",
      "Cross-platform builds, supply-chain checks, attestations, and signed release metadata.",
    ],
    fixes: ["Fixed Windows linting and cross-platform conditional compilation during the first release."],
    breaking: [],
    migration: ["Initial Agent release; no earlier Agent installation to migrate."],
  },
  {
    product: "Core",
    version: "v0.1.0-alpha.5",
    date: "2026-07-13",
    availability: "published",
    summary: "Publishes the hardened Core foundation with corrected, deterministic engine packaging.",
    releaseUrl: "https://github.com/violetweather/Certael/releases/tag/v0.1.0-alpha.5",
    implemented: [
      "Hardened authoritative session, protocol, backend, SDK, engine, documentation, and release foundations.",
      "Reproducible prebuilt Godot, Unity, Unreal, native, and managed release outputs.",
    ],
    fixes: [
      "Fixed prerelease packaging jobs and filtered packaging artifacts by their intended target.",
      "Added Visual Studio 18 support to Godot builds.",
    ],
    breaking: ["Windows Godot builds standardized on MSVC; MinGW artifacts cannot be mixed with this release line."],
    migration: ["Replace the entire engine package with the matching MSVC-based distribution on Windows."],
  },
  {
    product: "Core",
    version: "v0.1.0-alpha.4",
    date: "2026-07-12",
    availability: "tag-only",
    summary: "Adds compatibility for newer Visual Studio tool discovery in Godot source builds.",
    releaseUrl: "https://github.com/violetweather/Certael/tree/v0.1.0-alpha.4",
    compareUrl: "https://github.com/violetweather/Certael/compare/v0.1.0-alpha.3...v0.1.0-alpha.4",
    implemented: ["Visual Studio 18 discovery and compatibility in the Godot build path."],
    fixes: ["Prevented supported newer Visual Studio installations from being rejected."],
    breaking: [],
    migration: ["No runtime migration; this tag was superseded by Alpha 5."],
  },
  {
    product: "Core",
    version: "v0.1.0-alpha.3",
    date: "2026-07-12",
    availability: "tag-only",
    summary: "Standardizes the Windows Godot toolchain on MSVC.",
    releaseUrl: "https://github.com/violetweather/Certael/tree/v0.1.0-alpha.3",
    compareUrl: "https://github.com/violetweather/Certael/compare/v0.1.0-alpha.2...v0.1.0-alpha.3",
    implemented: ["MSVC-only Windows Godot release builds and package verification."],
    fixes: ["Stopped silently mixing MinGW-built C API libraries with MSVC-built Godot extensions."],
    breaking: ["MinGW is no longer a supported Windows release toolchain."],
    migration: ["Clean old MinGW artifacts and rebuild or install the complete MSVC package."],
  },
  {
    product: "Core",
    version: "v0.1.0-alpha.2",
    date: "2026-07-12",
    availability: "tag-only",
    summary: "Repairs the first prerelease packaging workflow.",
    releaseUrl: "https://github.com/violetweather/Certael/tree/v0.1.0-alpha.2",
    compareUrl: "https://github.com/violetweather/Certael/compare/v0.1.0-alpha.1...v0.1.0-alpha.2",
    implemented: ["Corrected prerelease artifact aggregation and release job wiring."],
    fixes: ["Fixed release-only failures that prevented complete downloadable packages."],
    breaking: [],
    migration: ["No runtime migration; this tag was superseded before becoming the supported package."],
  },
  {
    product: "Core",
    version: "v0.1.0-alpha.1",
    date: "2026-07-12",
    availability: "tag-only",
    summary: "Establishes the first hardened Certael Core pre-1.0 foundation.",
    releaseUrl: "https://github.com/violetweather/Certael/tree/v0.1.0-alpha.1",
    implemented: [
      "Authoritative action admission, bound sessions, replay resistance, custom rules, evidence, and enforcement recommendations.",
      "Deterministic binary action protocol, Rust runtime/C ABI, .NET server SDK, and self-hosted backend.",
      "Initial Godot, Unity, and Unreal adapters with build and release automation.",
      "Security contract, installation guidance, governance, and supply-chain controls.",
    ],
    fixes: ["Removed hard-coded development credentials and hardened the initial CI/release foundation."],
    breaking: ["The original prototype APIs and development-only assumptions were replaced by the bound authoritative-action model."],
    migration: ["Initial tagged Core foundation; prototype integrations must follow the new session and authorization guides."],
  },
];
