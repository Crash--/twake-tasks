# Decisions

Decisions taken on Tasks, oldest first. Append only: a decision that changes gets a new entry that replaces the old one and cites it. Format and categories: the `twake-decisions` skill of [linagora/twake-guidelines](https://github.com/linagora/twake-guidelines).

## 2026-11-23, [UX] A navigation rail of the Twake apps, behind TWAKE_RAIL

- Decision: with `TWAKE_RAIL=true`, wide screens show a vertical rail of the Twake apps at the left of the page, and the top bar keeps its search but not its platform menus. Off by default.
- Decided by: Crash-- (CTO), go of 2026-11-23 for the test of the navigation rail across pages
- Why: the rail is tried across the apps before it replaces the top menus.
- Scope: desktop (md and up) with the platform named by the SSO. Small screens and deployments without the setting are unchanged.

## 2026-11-23, [Tech] The silent sign-in waits for a prerendered page to be shown

- Decision: the hidden-frame sign-in of Tasks starts once the page is shown, through `waitForActivation()` of `@linagora/twake-oidc`.
- Decided by: Crash-- (CTO), go of 2026-11-23 for the test of the navigation rail across pages
- Why: Chrome holds back the frames of other origins in a prerendered page, so the 10 s timeout ran out and the fallback sign-in looped.
- Scope: the sign-in of the standalone and the embedded views.
