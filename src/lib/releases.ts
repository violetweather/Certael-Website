export interface ReleaseInfo {
  product: "Core" | "Agent";
  tag: string;
  url: string;
  publishedAt: string;
  prerelease: boolean;
  assets: { name: string; url: string }[];
  live: boolean;
}

interface GitHubRelease {
  tag_name: string;
  html_url: string;
  published_at: string;
  draft: boolean;
  prerelease: boolean;
  assets: { name: string; browser_download_url: string }[];
}

const requiredAssetPatterns: Record<"Core" | "Agent", RegExp[]> = {
  Core: [
    /^certael-godot-4\.7-.*\.zip$/,
    /^certael-unity-6000\.3-.*\.tgz$/,
    /^certael-unreal-5\.8-.*\.zip$/,
    /^checksums-sha256\.txt$/,
  ],
  Agent: [
    /^certael-agent-windows-x86_64\.zip$/,
    /^certael-agent-linux-x86_64\.tar\.gz$/,
    /^certael-agent-macos-arm64\.tar\.gz$/,
    /^certael-agent-macos-x86_64\.tar\.gz$/,
    /^checksums-sha256\.txt$/,
  ],
};

export function missingReleaseAssets(product: "Core" | "Agent", assetNames: string[]): string[] {
  return requiredAssetPatterns[product]
    .filter((pattern) => !assetNames.some((name) => pattern.test(name)))
    .map((pattern) => pattern.source);
}

export const fallbackReleases: ReleaseInfo[] = [
  {
    product: "Core",
    tag: "v0.1.0-alpha.7",
    url: "https://github.com/violetweather/Certael/releases/tag/v0.1.0-alpha.7",
    publishedAt: "2026-07-14",
    prerelease: true,
    assets: [],
    live: false,
  },
  {
    product: "Agent",
    tag: "v0.1.0-alpha.3",
    url: "https://github.com/violetweather/Certael-Agent/releases/tag/v0.1.0-alpha.3",
    publishedAt: "2026-07-14",
    prerelease: true,
    assets: [],
    live: false,
  },
];

export function selectRelease(releases: GitHubRelease[]): GitHubRelease | undefined {
  return releases.find((release) => !release.draft);
}

async function fetchRelease(product: "Core" | "Agent", repository: string): Promise<ReleaseInfo> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "Certael-Website",
  };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

  const response = await fetch(`https://api.github.com/repos/violetweather/${repository}/releases?per_page=10`, {
    headers,
    signal: AbortSignal.timeout(8_000),
  });
  if (!response.ok) throw new Error(`GitHub release lookup failed for ${repository}: ${response.status}`);
  const release = selectRelease((await response.json()) as GitHubRelease[]);
  if (!release) throw new Error(`No published release found for ${repository}`);
  const missing = missingReleaseAssets(product, release.assets.map((asset) => asset.name));
  if (missing.length > 0) throw new Error(`${repository} ${release.tag_name} is missing expected release assets: ${missing.join(", ")}`);
  return {
    product,
    tag: release.tag_name,
    url: release.html_url,
    publishedAt: release.published_at,
    prerelease: release.prerelease,
    assets: release.assets.map((asset) => ({ name: asset.name, url: asset.browser_download_url })),
    live: true,
  };
}

let releasePromise: Promise<ReleaseInfo[]> | undefined;

async function resolveReleases(): Promise<ReleaseInfo[]> {
  try {
    return await Promise.all([
      fetchRelease("Core", "Certael"),
      fetchRelease("Agent", "Certael-Agent"),
    ]);
  } catch (error) {
    if (process.env.REQUIRE_LIVE_RELEASES === "1") throw error;
    console.warn(`Using checked-in release fallback: ${String(error)}`);
    return fallbackReleases;
  }
}

export function getReleases(): Promise<ReleaseInfo[]> {
  releasePromise ??= resolveReleases();
  return releasePromise;
}
