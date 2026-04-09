import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import readme from '../../README.md?raw'

function Readme() {
  return (
    <main className="p-8">
      <Link to="/" className="inline-block mb-2 text-sm text-[var(--accent)] no-underline hover:underline">
        ← Home
      </Link>
      <article className="prose dark:prose-invert max-w-none">
        <ReactMarkdown>{readme}</ReactMarkdown>
      </article>
    </main>
  )
}

export default Readme
