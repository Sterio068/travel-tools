---
name: TripKit Travel Tools
description: Task-first product design system for a Taiwanese travel utilities site.
colors:
  primary: "#0891B2"
  primaryDark: "#083344"
  accent: "#F97316"
  background: "#F0FDFA"
  surface: "#FEFEFC"
  border: "#CFFAFE"
  text: "#083344"
  muted: "#64748B"
  warning: "#F59E0B"
  danger: "#DC2626"
typography:
  sans: "Noto Sans TC"
  latin: "Inter"
rounded: "8px"
spacing: "4px base scale with 16px page gutters on mobile"
components:
  - Button
  - Input
  - Select
  - Card
  - Tag
  - SearchDialog
  - TopicCluster
  - AdBanner
---

## 1. Overview

TripKit is a product surface, not a decorative travel brand page. The UI should help travelers finish concrete preparation tasks: convert money, check baggage rules, estimate budget, inspect visa and destination details, then move to the next relevant step.

The default feeling is calm utility with a small amount of travel warmth. Use page structure, labels, and content grouping to create confidence. Avoid marketing templates, fake social proof, heavy hero metrics, or card walls where every item has the same weight.

Primary information architecture follows four travel preparation groups: estimate money, confirm entry, pack luggage, and time the trip. Homepage and tool library should reuse these groups so users learn the same structure everywhere.

## 2. Colors

The core palette is teal for trust and wayfinding, coral for warm secondary action, gold for money-related highlights, and tinted slate for neutral text. Use the teal range sparingly for primary actions, focus states, selected controls, and task headings.

Surface color should feel clean without relying on pure white as the only answer. Cards and panels use `#FEFEFC` or the existing surface token, with borders providing structure before shadows. The page background remains the pale teal `#F0FDFA` so the product keeps a travel-adjacent identity without becoming decorative.

AdSense and editorial trust areas should stay visually quiet: muted text, explicit label, no CTA styling, and clear separation from tool results.

## 3. Typography

Use Noto Sans TC for Traditional Chinese and Inter for Latin text. Type should be direct and readable, with fixed rem sizes rather than viewport-scaled typography. Reserve the heaviest display weight for page titles only.

Recommended hierarchy:

- Page title: 30px to 36px, 700 or 800 weight, tight but readable line height.
- Section title: 22px to 30px, 700 weight.
- Card and row title: 16px to 18px, 700 weight.
- Body text: 16px base, relaxed line height.
- Metadata and helper text: 12px to 14px, never below accessible contrast.

## 4. Elevation

Depth is functional. Prefer borders, spacing, and background shifts before large shadows. Repeated cards should use a subtle border and a small resting shadow only when needed. Hover states may change border or background before increasing elevation.

Use `0 1px 3px rgba(8, 51, 68, 0.06)` as the normal maximum for repeated surfaces. Reserve larger shadows for overlays such as search dialog, not for every list item.

## 5. Components

Buttons use 8px radius, clear focus-visible rings, and one primary action per decision area. Primary buttons are teal; secondary commercial or warm actions may use coral. Ghost buttons should look like controls, not like disabled links.

Cards use 8px radius, light borders, and restrained shadows. For lists of tools, articles, topics, or countries, prefer compact rows or differentiated layouts when there are many items. Avoid repeating the same icon, title, body card shape for every section.

Inputs and selects use 8px radius, visible labels, strong focus states, and enough contrast for placeholder text. Tags and category pills may remain fully rounded because they function as small labels, not cards.

Tool links should use a shared row pattern: icon tile, title, short description, and optional arrow. Reserve larger panels for grouped workflows, not for every individual tool.

Search dialog is a focused product overlay. It should keep results scannable, close predictably, and avoid decorative glass effects beyond a subdued backdrop.

Ad banners are neutral utility regions. They must never resemble download buttons, tool result panels, or primary actions.

Tool page shell is a canonical pattern. Each tool page should render:

- Breadcrumb and task-first title.
- A compact usage summary with category and updated date.
- The interactive tool as the first major panel.
- A single post-tool ad region, then explanatory SEO content.
- Quick answer, ordered steps, checklist, sources, FAQ, same-stage tools, related tools, and bottom ad.

This pattern exists to reduce AdSense review risk and strengthen content value. Do not place ads above the tool, between a label and a form control, inside a result area, or next to copy that asks users to click.

## 6. Do's and Don'ts

Do:

- Lead with the next useful task.
- Group content by travel planning stage.
- Keep repeated lists compact and easy to scan.
- Make focus, hover, disabled, loading, and error states visible where relevant.
- Keep ads labeled and visually separate from tools.
- Keep GA4 tool events aligned to `tool_viewed`, `tool_started`, and `tool_result_viewed`.

Don't:

- Use hero metric strips to create artificial credibility.
- Use gradient text, glass cards, decorative blobs, or oversized shadows.
- Make every section a card grid with identical rhythm.
- Put ads near controls in a way that could be interpreted as誘導點擊.
- Hide critical information behind hover-only interactions.
