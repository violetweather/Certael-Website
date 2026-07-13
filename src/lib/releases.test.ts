import { describe, expect, it } from "vitest";
import { missingReleaseAssets, selectRelease } from "./releases";

describe("release selection", () => {
  it("selects the newest non-draft release including prereleases", () => {
    const selected = selectRelease([
      { tag_name: "v0.2.0-alpha.1", html_url: "new", published_at: "2026-07-13", draft: true, prerelease: true, assets: [] },
      { tag_name: "v0.1.0-alpha.6", html_url: "current", published_at: "2026-07-12", draft: false, prerelease: true, assets: [] },
      { tag_name: "v0.0.9", html_url: "old", published_at: "2026-06-01", draft: false, prerelease: false, assets: [] },
    ]);
    expect(selected?.tag_name).toBe("v0.1.0-alpha.6");
  });

  it("returns undefined when only drafts exist", () => {
    expect(selectRelease([{ tag_name: "draft", html_url: "", published_at: "", draft: true, prerelease: true, assets: [] }])).toBeUndefined();
  });

  it("detects an incomplete Agent release", () => {
    const missing = missingReleaseAssets("Agent", ["certael-agent-windows-x86_64.zip", "checksums-sha256.txt"]);
    expect(missing).toHaveLength(3);
  });
});
