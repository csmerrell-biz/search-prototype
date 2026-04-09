import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Readme from './pages/Readme'
import Stub from './pages/Stub'

function useDarkMode() {
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem('theme')
    if (stored) return stored === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  return [dark, setDark]
}

function ThemeToggle({ dark, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="fixed top-4 right-4 p-2 rounded-lg border border-[var(--border)] text-[var(--text)] hover:border-[var(--accent)] transition-colors text-sm"
      aria-label="Toggle dark mode"
    >
      {dark ? '☀ Light' : '☾ Dark'}
    </button>
  )
}

function Home() {
  return (
    <main className="pt-20 px-6 pb-8">
      <h1>Search Prototype</h1>
      <p>Choose a starting point:</p>
      <nav className="flex flex-col gap-4 mt-8">
        <Link
          to="/readme"
          className="flex flex-col gap-1 p-5 border border-[var(--border)] rounded-lg no-underline transition-[border-color,box-shadow] duration-200 hover:border-[var(--accent)] hover:shadow-[0_0_0_1px_var(--accent)]"
        >
          <span className="font-semibold text-base text-[var(--text-h)]">README</span>
          <span className="text-sm text-[var(--text)]">Exercise brief &amp; API reference</span>
        </Link>
        <Link
          to="/stub"
          className="flex flex-col gap-1 p-5 border border-[var(--border)] rounded-lg no-underline transition-[border-color,box-shadow] duration-200 hover:border-[var(--accent)] hover:shadow-[0_0_0_1px_var(--accent)]"
        >
          <span className="font-semibold text-base text-[var(--text-h)]">Styling Stub</span>
          <span className="text-sm text-[var(--text)]">SCSS &amp; Tailwind examples to build from</span>
        </Link>
      </nav>
    </main>
  )
}

function App() {
  const [dark, setDark] = useDarkMode()

  return (
    <BrowserRouter>
      <ThemeToggle dark={dark} onToggle={() => setDark(d => !d)} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/readme" element={<Readme />} />
        <Route path="/stub" element={<Stub />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
