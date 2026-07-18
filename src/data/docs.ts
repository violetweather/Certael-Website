export interface DocCode {
  label: string;
  language: string;
  value: string;
}

export interface DocSection {
  id: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  code?: DocCode[];
  note?: { kind: "note" | "warning" | "boundary"; title: string; body: string };
}

export interface DocPage {
  slug: string;
  category: "Start" | "Operate" | "Integrate" | "Extend";
  title: string;
  summary: string;
  keywords: string[];
  source?: string;
  sections: DocSection[];
}

export const docs: DocPage[] = [
  {
    slug: "overview",
    category: "Start",
    title: "How Certael fits together",
    summary: "Core, Agent, workers, console, and storage—plus the boundary each component is responsible for.",
    keywords: ["architecture", "core", "agent", "console", "workers"],
    source: "https://github.com/violetweather/Certael/blob/main/docs/getting-started.md",
    sections: [
      {
        id: "authority",
        title: "The authority stays in your game server",
        paragraphs: [
          "Certael verifies who may request a protected action, whether the request is fresh and correctly bound, and which signed policy applies. Your authoritative game callback still decides whether the action is legal against current server-owned state.",
          "A valid signature is possession proof, not proof that a client told the truth. Valuable mutations, rewards, inventory, and progression remain server decisions.",
        ],
        note: { kind: "boundary", title: "Trust boundary", body: "Never accept normalized identity, balances, outcomes, or integrity claims directly from a game client." },
      },
      {
        id: "components",
        title: "Deployable components",
        bullets: [
          "Core API issues tickets, redeems sessions, admits protected actions, and exposes evidence and case APIs.",
          "Event Worker leases the PostgreSQL outbox and publishes canonical events to NATS JetStream.",
          "Analytics Worker evaluates economy and relationship windows and rebuilds ClickHouse projections.",
          "Console BFF handles operator OIDC and exchanges delegated, mTLS-bound Core tokens.",
          "React Console provides evidence, cases, economy lineage, relationships, settings, and audited bounded actions.",
          "Agent is an optional local launch verifier; it never becomes the authority for game outcomes.",
          "Coordinator provides exclusive regional ownership, fencing epochs, and single-use transfer grants.",
        ],
      },
      {
        id: "storage",
        title: "Authoritative and rebuildable state",
        bullets: [
          "PostgreSQL is authoritative and enforces tenant isolation with row-level security.",
          "Redis handles admission, replay, and bounded real-time windows.",
          "JetStream is durable, replayable transport—not the source of truth.",
          "ClickHouse is a rebuildable analytical projection with deterministic event identifiers.",
        ],
      },
    ],
  },
  {
    slug: "installation",
    category: "Start",
    title: "Install the Certael suite",
    summary: "Use the native setup application or verbose CLI to verify and install a signed, compatible component set.",
    keywords: ["installer", "setup", "windows", "linux", "macos", "cli"],
    source: "https://github.com/violetweather/Certael/blob/main/docs/suite-installer.md",
    sections: [
      {
        id: "choose",
        title: "Choose the installer for your operating system",
        paragraphs: ["Download the Certael Setup archive, signed suite manifest, release trust store, and checksum file from the same Core release. Do not mix assets from different tags."],
        bullets: [
          "Windows x64: certael-setup-win-x64-<tag>.zip",
          "Linux x64: certael-setup-linux-x64-<tag>.tar.gz",
          "macOS Apple Silicon: certael-setup-osx-arm64-<tag>.tar.gz",
          "macOS Intel: certael-setup-osx-x64-<tag>.tar.gz",
        ],
      },
      {
        id: "verify",
        title: "Verify before mutation",
        paragraphs: ["The setup application validates the signed manifest, trust window, component dependency graph, target runtime, archive paths, and every artifact digest before enabling Apply."],
        note: { kind: "warning", title: "One release set", body: "A checksum verifies bytes; the signed suite manifest also verifies compatibility and intended component identity." },
      },
      {
        id: "lifecycle",
        title: "Lifecycle operations",
        bullets: [
          "Install creates a journaled transaction and records every installed digest.",
          "Update resolves a new signed component graph before replacing files.",
          "Repair re-verifies installed files and restores only signed artifacts.",
          "Inspect reports versions and drift without mutation.",
          "Uninstall refuses modified files instead of silently deleting user work.",
          "Recover completes or rolls back an interrupted journaled operation.",
        ],
      },
      {
        id: "verbose",
        title: "Verbose and automated operation",
        paragraphs: ["The graphical installer exposes a redacted technical transcript and can export it. The same engine is available through certaelctl for unattended environments."],
        code: [{ label: "Inspect an installation", language: "powershell", value: "certaelctl suite inspect <install-root>" }],
      },
    ],
  },
  {
    slug: "core-quickstart",
    category: "Start",
    title: "Core quickstart",
    summary: "Bring up the self-hosted stack, verify health, and preserve the authoritative action transaction.",
    keywords: ["docker", "compose", "quickstart", "postgres", "redis", "nats", "clickhouse"],
    source: "https://github.com/violetweather/Certael/blob/main/docs/getting-started.md",
    sections: [
      {
        id: "stack",
        title: "Start the development stack",
        paragraphs: ["Create a random local-only PostgreSQL password and a matching Npgsql connection string, then start the development Compose profile."],
        code: [{ label: "Development stack", language: "bash", value: "export CERTAEL_DEV_POSTGRES_PASSWORD=\"$(openssl rand -hex 24)\"\nexport CERTAEL_DEV_POSTGRES_CONNECTION_STRING=\"$(printf 'Host=postgres;Port=5432;Database=certael;Username=certael;%s=%s' 'Password' \"$CERTAEL_DEV_POSTGRES_PASSWORD\")\"\ndocker compose -f deploy/compose/docker-compose.yml up -d\ncurl --fail http://localhost:8080/healthz" }],
      },
      {
        id: "action",
        title: "Protect one authoritative action",
        bullets: [
          "Reserve admission and reject replay before invoking game logic.",
          "Verify the canonical envelope, possession proof, session binding, sequence, and digest chain.",
          "Execute a trusted callback against server-owned state.",
          "Stage the mutation, idempotent response, event, and minimized evidence in one database transaction.",
          "Commit once. A network publish happens later through the leased outbox.",
        ],
      },
      {
        id: "production",
        title: "Production boundary",
        paragraphs: ["Terminate TLS and require workload identity for protected administrative and operator routes. Store signing material in a secret manager, provision backups, and enable analytical features in shadow mode before canary or enforcement."],
        note: { kind: "boundary", title: "No development bypass", body: "Development mode does not create an unauthenticated ticket-issuance or administrative path." },
      },
    ],
  },
  {
    slug: "console-auth0",
    category: "Operate",
    title: "Console access with Auth0",
    summary: "Configure operator login, delegated token exchange, mTLS workload identity, scopes, and secure browser access.",
    keywords: ["console", "auth0", "oidc", "oauth", "mtls", "authentication"],
    source: "https://github.com/violetweather/Certael/blob/main/docs/console-setup.md",
    sections: [
      {
        id: "applications",
        title: "Create the Auth0 applications",
        bullets: [
          "Create a Regular Web Application for the Console BFF using Authorization Code flow.",
          "Register the exact HTTPS callback and post-logout URLs for the console origin.",
          "Create or select the Core API audience and authorize the BFF's token-exchange client.",
          "Keep browser sessions in secure, HTTP-only, SameSite cookies; do not store Core tokens in browser storage.",
        ],
      },
      {
        id: "bootstrap",
        title: "Generate bounded configuration",
        code: [{ label: "Auth0 bootstrap", language: "bash", value: "certaelctl console init-auth0 <output-dir> \\\n  https://YOUR_TENANT.auth0.com \\\n  https://YOUR_TENANT.mtls.auth0.com/oauth/token \\\n  YOUR_CONFIDENTIAL_CLIENT_ID \\\n  https://certael-api.example \\\n  https://core.internal.example" }],
        paragraphs: ["The command writes public configuration, a 30-day development workload certificate, and explicit follow-up instructions. Client secrets remain outside the generated directory; replace the generated certificate for production."],
      },
      {
        id: "scopes",
        title: "Map operator scopes",
        bullets: ["evidence:read", "cases:read", "cases:write", "cases:act", "privacy:export"],
        note: { kind: "warning", title: "Bounded action", body: "cases:act authorizes approved bounded actions only. Certael does not expose a permanent-ban capability." },
      },
      {
        id: "proxy",
        title: "Publish behind a trusted proxy",
        paragraphs: ["Expose only HTTPS, preserve forwarded scheme and host from trusted proxies, keep Core on a private network, rotate the BFF workload certificate, and reject callback URLs not registered exactly in Auth0."],
      },
    ],
  },
  {
    slug: "evidence-and-cases",
    category: "Operate",
    title: "Investigate evidence and cases",
    summary: "Search explainable findings, assemble case timelines, assign operators, and approve bounded actions with an immutable audit chain.",
    keywords: ["evidence", "cases", "metadata", "search", "rules", "signals", "audit"],
    source: "https://github.com/violetweather/Certael/blob/main/docs/post-1-platform.md",
    sections: [
      {
        id: "finding",
        title: "What a finding carries",
        bullets: [
          "Tenant, game, environment, player, session, match, and authoritative event identifiers.",
          "Rule identifier and signed rule/profile version.",
          "Public reason, severity, signal category, timestamps, aggregation window, and replay digest.",
          "Exact supporting event or transaction references and bounded metadata.",
          "Immutable bundle material required to replay the decision without exposing unrelated player data.",
        ],
      },
      {
        id: "queue",
        title: "Use the investigation queue",
        paragraphs: ["Search indexed metadata and categories, filter or sort by rule and signal, and use cursor-based pages instead of an unbounded scrolling result set. Selecting a rule immediately applies the matching filter."],
      },
      {
        id: "case",
        title: "Case lifecycle",
        bullets: [
          "Open → In review → Resolved or Dismissed, with an explicit audited reopen.",
          "Dispositions: Confirmed abuse, False positive, Expected behavior, Insufficient evidence, or Duplicate.",
          "Assignments use conflict-aware updates; notes and activity are append-only.",
          "Restrictive actions require a reason, explicit confirmation, authorization, and an immutable record.",
        ],
      },
      {
        id: "privacy",
        title: "Privacy and retention",
        paragraphs: ["Raw events default to 30 days, derived analytics to 90 days, and case metadata to 180 days. Tenants may configure shorter periods. Deletion removes evidence and pseudonymizes retained case and audit history; exports stream rather than buffering an entire player record."],
      },
    ],
  },
  {
    slug: "economy-and-collusion",
    category: "Operate",
    title: "Economy and collusion protection",
    summary: "Model double-entry value movement, item lineage, progression, and transparent relationship windows.",
    keywords: ["economy", "ledger", "lineage", "collusion", "boosting", "trades"],
    source: "https://github.com/violetweather/Certael/blob/main/docs/economy-protection.md",
    sections: [
      {
        id: "events",
        title: "Emit authoritative economy events",
        bullets: [
          "Use server-generated transaction and action identifiers.",
          "Use pseudonymous accounts, game-defined asset identifiers, integer quantities, and explicit source and sink accounts.",
          "Stage the economy event in the same authoritative transaction and outbox commit as the game mutation.",
          "Represent item creation, transfer, split, merge, consume, and destroy as lineage mutations.",
        ],
      },
      {
        id: "protections",
        title: "Deterministic protections",
        bullets: ["Conservation", "Duplicate item and broken lineage", "Repeated reward", "Impossible progression", "Suspicious velocity", "Circular transfer", "Reciprocal transfers and shared beneficiaries", "Boosting, win trading, coordinated farming, and marketplace manipulation"],
      },
      {
        id: "enforcement",
        title: "Separate synchronous invariants from analysis",
        paragraphs: ["A synchronous authoritative invariant may reject an action before commit. Cross-session and relationship analysis creates explainable findings and cases; it does not silently punish an account."],
        note: { kind: "boundary", title: "Explainability", body: "Every finding records exact transactions or edges, rule and baseline versions, threshold, window, authoritative fields, and replay digest." },
      },
    ],
  },
  {
    slug: "agent-launch",
    category: "Integrate",
    title: "Agent protected launch",
    summary: "Install one Agent per computer and show a publisher-branded launch status while the game server admits the session.",
    keywords: ["agent", "splash", "launch", "manifest", "branding", "attestation"],
    source: "https://github.com/violetweather/Certael-Agent/blob/main/docs/LAUNCH-SPLASH.md",
    sections: [
      {
        id: "install",
        title: "Install Agent separately from the game",
        paragraphs: ["Use the platform archive from the Agent release. The installer creates a stable launcher and versioned binary in protected system locations; do not copy Agent into each game directory."],
      },
      {
        id: "branding",
        title: "Sign publisher branding",
        paragraphs: ["The splash title, publisher, icon, hero artwork, and status copy come from bounded signed launch material. Local game files cannot replace them after approval."],
      },
      {
        id: "admission",
        title: "Three visible phases",
        bullets: ["Checks: signed game files and launch material are verified.", "Launching protected mode: Agent waits for authoritative server admission.", "Protected session: the server has admitted the bound session and the game may proceed."],
        note: { kind: "boundary", title: "Advisory evidence", body: "Agent signals may contribute evidence, but they do not independently authorize a permanent punishment." },
      },
    ],
  },
  {
    slug: "engine-sdks",
    category: "Integrate",
    title: "Godot, Unity, and Unreal",
    summary: "Choose the engine adapter while preserving dedicated-server authority and the action protocol v1 lifecycle.",
    keywords: ["godot", "unity", "unreal", "engine", "sdk"],
    source: "https://github.com/violetweather/Certael/blob/main/docs/engine-support.md",
    sections: [
      {
        id: "choose",
        title: "Use a prebuilt engine package",
        bullets: ["Godot 4.7 GDExtension package with the Certael autoload.", "Unity package with .NET Standard-compatible runtime APIs.", "Unreal plugin with C++ subsystem and Blueprint-safe typed nodes."],
      },
      {
        id: "lifecycle",
        title: "Keep one lifecycle across engines",
        bullets: ["Request a bootstrap ticket from an authenticated game backend.", "Bind the player, match, server, build, environment, and ephemeral key.", "Send protected actions with canonical bytes, sequence, chain digest, and possession proof.", "Execute and commit only on the authoritative server."],
      },
      {
        id: "compatibility",
        title: "Replace complete packages",
        paragraphs: ["Use the compatibility manifest from the same release and replace the complete engine package during upgrades. Copying one library over an older package can leave incompatible native dependencies behind."],
      },
    ],
  },
  {
    slug: "unreal-blueprints",
    category: "Integrate",
    title: "Unreal Blueprint integration",
    summary: "Call Certael session, action, Agent challenge, and diagnostic flows through typed Blueprint nodes.",
    keywords: ["unreal", "blueprint", "nodes", "async", "c++"],
    source: "https://github.com/violetweather/Certael/blob/main/engines/unreal/Certael/README.md",
    sections: [
      {
        id: "nodes",
        title: "Available Blueprint surface",
        bullets: ["Configure the Certael subsystem and trusted server context.", "Create and inspect bound session/action structures.", "Submit protected actions and receive typed bounded outcomes.", "Run the Agent challenge as an asynchronous Blueprint node.", "Read public diagnostic reasons without exposing secrets or raw trust material."],
      },
      {
        id: "server",
        title: "Blueprints do not move authority to the client",
        paragraphs: ["Blueprint convenience nodes wrap the same native protocol and lifecycle. Valuable validation and mutation still execute on a dedicated or otherwise authoritative server."],
        note: { kind: "warning", title: "Client boundary", body: "Never route a Blueprint-provided normalized identity or claimed result directly into a trusted mutation." },
      },
      {
        id: "package",
        title: "Package the plugin as one unit",
        paragraphs: ["Keep the plugin descriptor, C++ module, Blueprint classes, runtime libraries, and compatibility metadata together. The suite installer resolves the correct package for the selected runtime."],
      },
    ],
  },
  {
    slug: "typescript-server",
    category: "Integrate",
    title: "TypeScript server SDK",
    summary: "Use @certael/server on Node 22+ with the native verifier and atomic PostgreSQL/Redis lifecycle.",
    keywords: ["typescript", "node", "sdk", "napi", "postgres", "redis"],
    source: "https://github.com/violetweather/Certael/blob/main/docs/typescript-server-sdk.md",
    sections: [
      {
        id: "install",
        title: "Install the matching package set",
        code: [{ label: "Node 22+ ESM", language: "bash", value: "npm install @certael/server@0.4.0-alpha.2" }],
        paragraphs: ["The platform package loads the matching Rust Node-API binary. Package versions participate in Core's compatibility manifest."],
      },
      {
        id: "handle-action",
        title: "Use handleAction for atomicity",
        bullets: ["Reserve admission in Redis.", "Verify canonical bytes and the trusted binding in the native addon.", "Execute the game callback.", "Stage mutation, result, and event through AuthoritativeTransactionFactory.", "Commit once or roll back the entire action."],
      },
      {
        id: "stores",
        title: "Provide production stores",
        bullets: ["SessionStore with PostgreSQL tenant scoping.", "AdmissionStore with one bounded Redis script.", "AuthoritativeTransactionFactory with revision checks and outbox staging."],
      },
      {
        id: "scope",
        title: "Keep advanced portable rules in WASM",
        paragraphs: ["The TypeScript SDK intentionally does not reproduce every declarative rule implementation. Signed server-only WASM is the portable advanced-rule path."],
      },
    ],
  },
  {
    slug: "game-backends",
    category: "Integrate",
    title: "Game-backend integrations",
    summary: "Verify Steam and EOS player identity plus PlayFab and Agones authoritative-server context.",
    keywords: ["steamworks", "steam", "eos", "epic", "playfab", "agones", "identity"],
    source: "https://github.com/violetweather/Certael/blob/main/docs/game-backend-integrations.md",
    sections: [
      {
        id: "framework",
        title: "Integrate through bounded provider interfaces",
        bullets: ["Player identity verification", "Authoritative server identity", "Ticket issuance and session binding", "Agent lifecycle and revocation", "Health and bounded public errors"],
      },
      {
        id: "providers",
        title: "First-party packages",
        bullets: ["Steam Web API ticket verification with application binding.", "Epic Online Services identity verification.", "PlayFab authoritative server verification.", "Agones allocation and server-context verification."],
      },
      {
        id: "classification",
        title: "Identity is not device attestation",
        paragraphs: ["Steam and EOS assertions authenticate a platform subject and application. They do not prove device integrity and are never labeled as attestation in normalized evidence."],
      },
      {
        id: "failure",
        title: "Bound vendor failures",
        paragraphs: ["Reject expired, replayed, wrong-application, and wrong-server assertions. Vendor outages follow signed required/optional policy and produce public bounded reasons rather than leaking upstream responses."],
      },
    ],
  },
  {
    slug: "wasm-rules",
    category: "Extend",
    title: "Sandboxed WASM rules",
    summary: "Run signed deterministic Rust guest rules with no filesystem, network, clocks, randomness, or state mutation.",
    keywords: ["wasm", "wasmtime", "rust", "sandbox", "rules"],
    source: "https://github.com/violetweather/Certael/blob/main/docs/wasm-rules.md",
    sections: [
      {
        id: "abi",
        title: "Use the versioned core-WASM ABI",
        paragraphs: ["Canonical Protobuf input and output carry bounded authoritative facts. A rule returns Pass, Reject, Indeterminate, bounded risk, and bounded evidence."],
      },
      {
        id: "sandbox",
        title: "Server-only deterministic sandbox",
        bullets: ["No WASI, filesystem, network, clock, randomness, or host mutation APIs.", "ABI v1 rejects floating-point, threads, and unsupported proposals.", "Default limits: 4 MiB module, 16 MiB memory, 1 MiB input, 64 KiB output, 10 million fuel, and 10 ms deadline."],
      },
      {
        id: "failure",
        title: "Bound every failure",
        paragraphs: ["Traps, malformed output, deadline or fuel exhaustion, and unsupported modules return Indeterminate. They do not crash the server or partially mutate state."],
      },
      {
        id: "deploy",
        title: "Sign and stage modules",
        paragraphs: ["Bind the module digest into a signed profile, cache by digest, and progress through shadow, canary, enforced, and rollback states."],
      },
    ],
  },
  {
    slug: "platform-proofs",
    category: "Extend",
    title: "Platform identity and attestation",
    summary: "Keep ordinary platform authentication separate from genuine nonce-bound device or application attestation.",
    keywords: ["platform", "identity", "attestation", "nonce", "proof"],
    source: "https://github.com/violetweather/Certael/blob/main/docs/platform-proofs.md",
    sections: [
      {
        id: "separate",
        title: "Use separate verifier contracts",
        bullets: ["IPlatformIdentityVerifier authenticates a platform subject and application.", "IPlatformAttestationVerifier accepts only official server-verifiable, nonce-bound assertions."],
      },
      {
        id: "normalize",
        title: "Normalize only bounded public facts",
        bullets: ["Proof kind and provider", "Subject and application identity", "Issued and expiry timestamps", "Nonce and claims digests", "Trust classification and public reason"],
      },
      {
        id: "conformance",
        title: "Attestation conformance",
        paragraphs: ["A genuine provider must verify signature or chain, freshness, application identity, nonce binding, replay, and outage behavior. Providers are added opportunistically where official vendor APIs support this contract."],
        note: { kind: "boundary", title: "No automatic punishment", body: "Platform proof evidence never independently causes permanent punishment." },
      },
    ],
  },
  {
    slug: "multi-region",
    category: "Extend",
    title: "Multi-region continuity",
    summary: "Transfer exclusive match ownership with leases, fencing epochs, and signed single-use grants—without active-active writers.",
    keywords: ["multi-region", "coordinator", "lease", "fencing", "failover"],
    source: "https://github.com/violetweather/Certael/blob/main/docs/multi-region-continuity.md",
    sections: [
      {
        id: "ownership",
        title: "One authoritative owner",
        paragraphs: ["Coordinator stores an exclusive region/server lease in a highly available PostgreSQL control database. Every ownership change advances a monotonic fencing epoch."],
      },
      {
        id: "transfer",
        title: "Transfer with a signed grant",
        bullets: ["Bind source, destination, match, player, lease epoch, nonce, and a 60-second expiry.", "The source releases ownership or its lease expires.", "The destination redeems once and creates fresh Core and Agent sessions.", "The game transfers authoritative gameplay state; Certael coordinates ownership."],
      },
      {
        id: "leases",
        title: "Fence stale owners",
        paragraphs: ["Renew every 10 seconds with a 30-second expiry. An expired owner stops accepting protected actions. Forced failover advances the epoch and records an audited emergency action."],
        note: { kind: "warning", title: "No active-active writers", body: "Gameplay processing stays region-local. Analytics may converge asynchronously, but two regions never commit the same authoritative match." },
      },
    ],
  },
  {
    slug: "release-security",
    category: "Extend",
    title: "Releases, compatibility, and security",
    summary: "Verify release artifacts, preserve protocol compatibility, rotate trust, and report vulnerabilities privately.",
    keywords: ["release", "compatibility", "checksums", "sigstore", "sbom", "security"],
    source: "https://github.com/violetweather/Certael/blob/main/docs/releasing.md",
    sections: [
      {
        id: "verify",
        title: "Verify one release set",
        bullets: ["Compare SHA-256 checksums.", "Verify Sigstore bundles and GitHub build provenance.", "Inspect the CycloneDX SBOM.", "Use the compatibility manifest to match Core, Agent, engine, native, and TypeScript packages."],
      },
      {
        id: "compatibility",
        title: "Preserve rolling compatibility",
        paragraphs: ["Action protocol v1 remains valid. Database migrations are additive, new features default disabled, and signed profiles progress through shadow and canary before enforcement."],
      },
      {
        id: "trust",
        title: "Operate signing trust",
        paragraphs: ["Keep private signing material outside source control. Publish bounded public trust stores with validity windows and revocation state. Rotate before expiry and retain enough overlap for rolling deployment."],
      },
      {
        id: "report",
        title: "Report vulnerabilities privately",
        paragraphs: ["Use the repository's private security advisory path. Do not place unpublished vulnerabilities, player data, credentials, or signing material in public issues or the Website repository."],
      },
    ],
  },
];

export const docCategories = ["Start", "Operate", "Integrate", "Extend"] as const;

export function getDoc(slug: string): DocPage | undefined {
  return docs.find((doc) => doc.slug === slug);
}
