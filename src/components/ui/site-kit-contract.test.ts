import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { siteKitContract } from "./site-kit-contract";
import lock from "./site-kit.lock.json";

// Enforces the portfolio site-kit contract: primitives marked "exact-shared"
// must stay byte-identical across travel-tools, taiwan-labor-tools, and
// pet-care-platform. If you intentionally change a shared primitive, update
// site-kit.lock.json in ALL THREE repos together. A failure here means the
// shared component drifted out of sync.
describe("site-kit exact-shared primitives", () => {
  const exactShared = Object.entries(siteKitContract.primitives)
    .filter(([, status]) => status === "exact-shared")
    .map(([name]) => `${name}.tsx`);

  it("lock file covers every exact-shared primitive", () => {
    for (const file of exactShared) {
      expect(lock.sha256, `missing lock entry for ${file}`).toHaveProperty(file);
    }
  });

  it.each(exactShared)("%s matches the committed canonical hash", (file) => {
    const source = readFileSync(
      path.join(process.cwd(), "src/components/ui", file),
    );
    const actual = createHash("sha256").update(source).digest("hex");
    expect(
      actual,
      `${file} drifted from the site-kit canonical copy — re-sync the shared primitive across all three sites and update site-kit.lock.json`,
    ).toBe((lock.sha256 as Record<string, string>)[file]);
  });
});
