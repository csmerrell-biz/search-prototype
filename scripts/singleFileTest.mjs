import { execSync } from 'child_process';

const [,, pattern, strictFlag] = process.argv;
if (!pattern) {
  console.error('Usage: npm run test:file <pattern> [-- --strict]');
  process.exit(1);
}

const isStrict = strictFlag === '--strict';

const testPattern = isStrict ? `${pattern}\\.(test|spec)\\.(ts|tsx)$` : pattern;
const coveragePattern = isStrict ? `**/${pattern}.{ts,tsx}` : `**/*${pattern}*`;

execSync(
  `npx vitest run --reporter=verbose --coverage --coverage.reporter=text --coverage.include="${coveragePattern}" "${testPattern}"`,
  { stdio: 'inherit' }
);
