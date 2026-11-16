import { Component, Suspense, lazy, useEffect, useState } from 'react'
import './App.css'

const modules = import.meta.glob('../exercises/[0-9]*/Exercise.jsx')
const readmes = import.meta.glob('../exercises/[0-9]*/README.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

const exercises = Object.keys(modules)
  .map((path) => {
    const id = path.split('/')[2]
    return {
      id,
      Component: lazy(modules[path]),
      readme: readmes[`../exercises/${id}/README.md`] ?? '',
    }
  })
  .sort((a, b) => a.id.localeCompare(b.id))

function getHashId() {
  return decodeURIComponent(window.location.hash.slice(1))
}

class ErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <div className="error">
          <strong>Your exercise threw an error:</strong>
          <pre>{String(this.state.error?.stack ?? this.state.error)}</pre>
        </div>
      )
    }
    return this.props.children
  }
}

export default function App() {
  const [selectedId, setSelectedId] = useState(
    () => getHashId() || exercises.at(-1)?.id,
  )
  const [showReadme, setShowReadme] = useState(false)

  useEffect(() => {
    const onHashChange = () => setSelectedId(getHashId())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const selected = exercises.find((ex) => ex.id === selectedId)

  return (
    <div className="layout">
      <aside className="sidebar">
        <h1>Exercises</h1>
        {exercises.length === 0 && <p className="muted">No exercises yet.</p>}
        <ul>
          {exercises.map((ex) => (
            <li key={ex.id}>
              <a
                href={`#${ex.id}`}
                className={ex.id === selectedId ? 'active' : undefined}
              >
                {ex.id}
              </a>
            </li>
          ))}
        </ul>
      </aside>

      <main className="content">
        {selected ? (
          <>
            <header className="content-header">
              <h2>{selected.id}</h2>
              <button type="button" onClick={() => setShowReadme((s) => !s)}>
                {showReadme ? 'Hide' : 'Show'} challenges
              </button>
            </header>
            {showReadme && <pre className="readme">{selected.readme}</pre>}
            <section className="preview">
              <ErrorBoundary key={selected.id}>
                <Suspense fallback={<p className="muted">Loading...</p>}>
                  <selected.Component />
                </Suspense>
              </ErrorBoundary>
            </section>
          </>
        ) : (
          <p className="muted">Pick an exercise from the sidebar.</p>
        )}
      </main>
    </div>
  )
}
