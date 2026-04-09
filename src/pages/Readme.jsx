import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import readme from '../../README.md?raw'

function Readme() {
  return (
    <main className="p-8">
      <Link to="/" className="inline-block mb-2 text-sm text-[var(--accent)] no-underline hover:underline">
        ← Home
      </Link>
      <div className="flex justify-center">
        <article className="prose dark:prose-invert max-w-[1200px]">
          <ReactMarkdown components={{
            img: ({ src, alt, ...props }) => (
              <img src={src?.replace(/^public\//, '/')} alt={alt} {...props} />
            )
          }}>
            {readme}
          </ReactMarkdown>
        </article>
      </div>
    </main>
  )
}

export default Readme
