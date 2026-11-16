# 001 - Reusable Button

## Goal

Build one `Button` component that can replace every `<button>` in an app. A good reusable component has a small, predictable API (props) and doesn't get in the way: anything a normal `<button>` can do, your `Button` should still be able to do.

## Concepts practiced

- Designing a component API with props and sensible defaults
- `children` for content
- Mapping props to class names (variants and sizes)
- Rest/spread props (`...rest`) to forward native attributes and event handlers
- Merging a caller's `className` with your own
- Derived state (a `loading` button is also disabled)
- Refs as props (React 19)

## Files

- `Exercise.jsx` - your work goes here. `Button` is what the tests check; `Demo` (default export) is what the preview app renders.
- `styles.css` - already written for you. It styles the class names listed below.
- `Exercise.test.jsx` - tests for the acceptance criteria.

## Challenges

### Level 1 - Basics

1. Render a native `<button>` that shows its `children`.
2. Default the `type` attribute to `"button"`. A plain `<button>` inside a `<form>` defaults to `submit`, which causes surprise form submissions.
3. Support a `variant` prop: `"primary"` (default), `"secondary"`, or `"danger"`.
4. Support a `size` prop: `"sm"`, `"md"` (default), or `"lg"`.
5. Class names must be exactly: `btn`, plus `btn--<variant>`, plus `btn--<size>`.
   Example: `<Button variant="danger" size="sm">` renders `class="btn btn--danger btn--sm"`.

### Level 2 - Intermediate

1. Forward every other prop to the `<button>` (`onClick`, `disabled`, `aria-label`, `data-*`, `title`, etc.) without listing each one by hand.
2. Let the caller override `type` (e.g. `type="submit"`).
3. If the caller passes `className`, add it **after** your own classes instead of replacing them.
   Example: `<Button className="mt-4">` renders `class="btn btn--primary btn--md mt-4"`.
4. Make sure there's no stray whitespace or `"undefined"` in `className` when the caller doesn't pass one.

### Level 3 - Stretch

1. Add a `loading` prop. When `loading` is true:
   - the button is disabled (even if `disabled={false}` is passed),
   - it has `aria-busy="true"`,
   - it renders `<span className="btn__spinner" aria-hidden="true"></span>` before the children.
2. Add a `leftIcon` prop (any React node) rendered before the children, wrapped in `<span className="btn__icon">`. Hide the icon while loading (the spinner takes its place).
3. Make `ref` work: `<Button ref={myRef}>` should give `myRef.current` the real `<button>` DOM element. (Hint: in React 19, `ref` is just a prop.)
4. Use the `Demo` component to show off every variant, size, and state.

## Acceptance criteria

- [ ] Renders a `<button>` with `children`
- [ ] `type` defaults to `"button"` and can be overridden
- [ ] `variant` and `size` produce the right class names, with correct defaults
- [ ] Native props and event handlers are forwarded
- [ ] Caller's `className` is appended, with no stray whitespace or `undefined`
- [ ] `loading` disables the button, sets `aria-busy`, and shows the spinner
- [ ] `leftIcon` renders before the children and is hidden while loading
- [ ] `ref` points to the `<button>` element

## Hints

<details>
<summary>Hint 1 - default props</summary>

Use default values in destructuring: `function Button({ variant = 'primary', ...rest })`.

</details>

<details>
<summary>Hint 2 - building className</summary>

Put the class names in an array, remove empty values with `.filter(Boolean)`, then `.join(' ')`.

</details>

<details>
<summary>Hint 3 - order of spread</summary>

Where you put `{...rest}` in the JSX matters. Props written after the spread win over props inside it. Think about which props the caller should be allowed to override and which ones you must control.

</details>

## How to check

- Run the tests: `npm run test:ex -- 001`
- Preview it: `npm run dev`, then pick `001-reusable-button` in the sidebar
- When you're done, ask the agent: "check my code for 001"
