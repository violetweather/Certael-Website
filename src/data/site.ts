export type CapabilityStatus = "available" | "in-progress" | "unverified";

export interface Capability {
  title: string;
  description: string;
  status: CapabilityStatus;
  product: "Core" | "Agent" | "Shared";
  sourceUrl: string;
  sourceRef: string;
}

export interface EngineGuide {
  slug: "godot" | "unity" | "unreal";
  name: string;
  version: string;
  artifact: string;
  installPath: string;
  language: string;
  snippet: string;
  notes: string[];
}

const coreDocs = "https://github.com/violetweather/Certael/blob/main/docs";
const agentDocs = "https://github.com/violetweather/Certael-Agent/blob/main/docs";

export const capabilities: Capability[] = [
  {
    title: "Authoritative actions",
    description: "Clients submit typed intent. Trusted game servers validate and atomically commit outcomes.",
    status: "available",
    product: "Core",
    sourceUrl: `${coreDocs}/security-contract.md`,
    sourceRef: "Certael main",
  },
  {
    title: "Replay-resistant sessions",
    description: "Short-lived, single-use tickets bind player, match, server, build, environment, and an ephemeral key.",
    status: "available",
    product: "Core",
    sourceUrl: `${coreDocs}/authorization.md`,
    sourceRef: "Certael main",
  },
  {
    title: "Custom game rules",
    description: "Signed declarative rules and bounded trusted callbacks enforce each game's own invariants.",
    status: "available",
    product: "Core",
    sourceUrl: `${coreDocs}/rules.md`,
    sourceRef: "Certael main",
  },
  {
    title: "Cross-engine runtime",
    description: "Godot, Unity, and Unreal use the same versioned native protocol and server admission model.",
    status: "in-progress",
    product: "Core",
    sourceUrl: `${coreDocs}/engine-support.md`,
    sourceRef: "Certael main",
  },
  {
    title: "User-mode integrity",
    description: "The optional Agent launches approved builds and produces nonce-bound signed observations.",
    status: "available",
    product: "Agent",
    sourceUrl: `${agentDocs}/SECURITY-CONTRACT.md`,
    sourceRef: "Certael-Agent main",
  },
  {
    title: "Private local channel",
    description: "Inherited process handles connect the launched game to Agent without opening a network listener.",
    status: "available",
    product: "Agent",
    sourceUrl: `${agentDocs}/ENGINE-INTEGRATION.md`,
    sourceRef: "Certael-Agent main",
  },
  {
    title: "Production certification",
    description: "Scale, failover, platform signing, calibration, and independent audit evidence remain release gates.",
    status: "unverified",
    product: "Shared",
    sourceUrl: `${coreDocs}/acceptance-status.md`,
    sourceRef: "Certael main",
  },
];

export const engines: EngineGuide[] = [
  {
    slug: "godot",
    name: "Godot",
    version: "4.7",
    artifact: "certael-godot-4.7-vX.Y.Z.zip",
    installPath: "Extract into the project root, then enable Certael under Project Settings → Plugins.",
    language: "gdscript",
    snippet: `if not Certael.initialize():\n    push_error("Certael runtime unavailable")\n    return\n\ngame_network.request_certael_ticket(\n    Certael.create_session_public_key()\n)`,
    notes: ["No Rust or native compiler required", "The same package supports optional Agent relay", "Your authoritative server must redeem and validate actions"],
  },
  {
    slug: "unity",
    name: "Unity",
    version: "6000.3",
    artifact: "certael-unity-6000.3-vX.Y.Z.tgz",
    installPath: "Add the downloaded tarball through Package Manager → Add package from tarball.",
    language: "csharp",
    snippet: `using Certael.Unity;\n\nprivate readonly CertaelClient certael = new();\n\npublic void Begin() => network.RequestCertaelTicket(\n    certael.CreateSessionPublicKey()\n);`,
    notes: ["Managed API with platform native libraries", "Keep one client per active game session", "Dispose it on logout or server migration"],
  },
  {
    slug: "unreal",
    name: "Unreal Engine",
    version: "5.8",
    artifact: "certael-unreal-5.8-vX.Y.Z.zip",
    installPath: "Extract Certael into <Project>/Plugins/Certael and enable the plugin.",
    language: "cpp",
    snippet: `UCertaelSubsystem* Certael =\n    GetGameInstance()->GetSubsystem<UCertaelSubsystem>();\n\nTArray<uint8> PublicKey =\n    Certael->CreateSessionPublicKey();\nGameNetwork->RequestCertaelTicket(PublicKey);`,
    notes: ["C++ and Blueprint-safe typed APIs", "Runtime dependencies are staged by the plugin", "Dedicated servers make the authoritative decision"],
  },
];

export const securityTruths = [
  ["Signature valid", "The session key authorized these exact bytes", "The action is fair or honest"],
  ["Agent report valid", "The admitted Agent signed a fresh report chain", "The operating system is uncompromised"],
  ["Action accepted", "Server-owned rules approved and committed the mutation", "The client committed gameplay state"],
] as const;
