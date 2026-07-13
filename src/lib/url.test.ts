import { describe, expect, it } from "vitest";
import { withBase } from "./url";

describe("project-page URLs", () => {
  it("keeps the repository base path", () => {
    expect(withBase("/Certael-Website/", "/engines/godot/")).toBe("/Certael-Website/engines/godot/");
  });
});
