# Review - 001 Reusable Button

**Date:** 2026-11-17 (seventh check)
**Tests:** 23 passed, 0 failed (23 total)

## Overall verdict

All tests pass. Exercise 001 is complete. Your `Button` has sensible defaults, forwards native props, merges the caller's `className` correctly, and handles `loading`, `leftIcon` and `ref`. The only remaining items are cosmetic: Demo labels and formatting.

## Level 1 - Basics: Correct

| Challenge | Status |
| --- | --- |
| 1. Render `<button>` with `children` | Correct |
| 2. Default `type="button"` | Correct |
| 3. `variant` prop, default `"primary"` | Correct |
| 4. `size` prop, default `"md"` | Correct |
| 5. Exact class names | Correct |

Default values in the destructuring handle all three defaults in one place.

## Level 2 - Intermediate: Correct

| Challenge | Status |
| --- | --- |
| 1. Forward other props | Correct |
| 2. Caller can override `type` | Correct |
| 3. Append caller `className` | Correct |
| 4. No stray whitespace or `undefined` | Correct |

`[..., className].filter(Boolean).join(' ')` with `className` destructured is the standard pattern. The key idea you worked through: destructuring *removes* a prop from `rest`, so anything you want to control yourself (`type`, `className`, `disabled`) must be destructured, and everything else flows through `{...rest}`.

## Level 3 - Stretch: Correct (Demo partially done)

| Challenge | Status |
| --- | --- |
| 1. `loading` (disabled, `aria-busy`, spinner) | Correct |
| 2. `leftIcon` | Correct |
| 3. `ref` | Correct |
| 4. Demo shows every state | Partially correct |

- `disabled={disabled || loading}` is clean derived state.
- `leftIcon && !loading && ...` correctly swaps the icon for the spinner.
- `ref` works through `...rest`, which is the React 19 way.
- **Demo:** the `danger` button is still labeled "Secondary", and the `leftIcon` button is labeled "Loading". `secondary` only appears disabled. There are leftover blank lines (lines 34-36).

## What you did well

- You kept iterating on feedback and understood *why* each fix worked, especially the spread-order and destructuring ideas, which come up constantly in reusable components.
- Accessibility details are right: `type="button"` default, `aria-hidden` on the spinner, `aria-busy` while loading.

## Optional improvements (beyond the tests)

- **Formatting:** lines 6-10 are split in unusual places (`export function` and `Button(` on separate lines). Running Prettier (or formatting on save) gives you a consistent layout for free.
- `aria-busy={loading || undefined}`, so idle buttons don't carry `aria-busy="false"`.
- Remove the three `TODO` comments at the top now that they're done.
