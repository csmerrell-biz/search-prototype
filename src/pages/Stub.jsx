import { Link } from 'react-router-dom'
import './Stub.scss'

function Stub() {
  return (
    <main className="p-8">
      <Link to="/" className="inline-block mb-2 text-sm text-[var(--accent)] no-underline hover:underline">
        ← Home
      </Link>

      <h1 className="mt-6">Styling Stub</h1>

      <div className="flex flex-col gap-6 mt-8">
        <div className="scss-demo">
          <h2>SCSS-styled component</h2>
          <p>This div is styled using a <code>.scss</code> file with variables and nesting.</p>
        </div>

        <div className="rounded-lg border-2 border-purple-400 bg-purple-400/10 p-6 text-[var(--text-h)]">
          <h2 className="mb-2 text-lg font-medium">Tailwind-styled component</h2>
          <p className="text-sm text-[var(--text)]">This div is styled using Tailwind utility classes.</p>
        </div>
      </div>
    </main>
  )
}

export default Stub
