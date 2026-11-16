# dev-exercises

A personal practice space for React, JavaScript, and anything else I'm learning.

## How it works

1. Ask the agent for an exercise, e.g. *"I want to practice building reusable components"*.
2. The agent creates `exercises/NNN-topic/` with:
   - `README.md` - the challenges (three levels), acceptance criteria, and hints
   - starter code to edit (`Exercise.jsx` for React, `exercise.js` for plain JS)
   - tests that check the acceptance criteria
3. Write the solution.
4. Ask the agent to *"check my code for NNN"*. It runs the tests, reviews the code, tells you what's right or wrong, and saves the feedback to `REVIEW.md`.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Preview app: pick an exercise in the sidebar to render its `Demo` |
| `npm test` | Run all tests in watch mode |
| `npm run test:ex -- 001` | Run tests for one exercise once |

## Layout

```
exercises/
  _template/            skeleton for new exercises
  001-reusable-button/
src/                    preview app (finds exercises automatically)
.cursor/rules/          instructions the agent follows
```
