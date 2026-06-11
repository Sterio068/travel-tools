import { describe, expect, it } from "vitest";
import { ARTICLES } from "./articles";
import { getArticleToolRecommendations } from "./article-tool-recommendations";

function articleBySlug(slug: string) {
  const article = ARTICLES.find((item) => item.slug === slug);
  if (!article) throw new Error(`Missing article fixture: ${slug}`);
  return article;
}

describe("article tool recommendations", () => {
  it("builds country-aware cards before general category tools", () => {
    const recommendations = getArticleToolRecommendations(
      articleBySlug("japan-budget-breakdown"),
    );

    expect(recommendations.map((item) => item.href)).toEqual([
      "/countries/jp",
      "/tools/budget",
      "/tools/currency",
    ]);
    expect(recommendations[0]).toMatchObject({
      name: "日本旅遊速查",
      cta: "查看目的地",
    });
  });

  it("uses article-specific ordering for high-intent money articles", () => {
    const recommendations = getArticleToolRecommendations(
      articleBySlug("best-exchange-method"),
    );

    expect(recommendations.map((item) => item.href)).toEqual([
      "/tools/best-exchange",
      "/tools/currency",
      "/tools/budget",
    ]);
    expect(recommendations[0].cta).toBe("比較換匯");
  });

  it("keeps every article recommendation bounded and unique", () => {
    for (const article of ARTICLES) {
      const recommendations = getArticleToolRecommendations(article);
      const hrefs = recommendations.map((item) => item.href);

      expect(recommendations.length, article.slug).toBeGreaterThan(0);
      expect(recommendations.length, article.slug).toBeLessThanOrEqual(3);
      expect(new Set(hrefs).size, article.slug).toBe(hrefs.length);
      expect(
        hrefs.every(
          (href) => href.startsWith("/tools/") || /^\/countries(\/[a-z]{2})?$/.test(href),
        ),
        article.slug,
      ).toBe(true);
    }
  });
});
