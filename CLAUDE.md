# Search Prototype - Agent Instructions

## Testing
**CRITICAL**: All agents must implement a 3-layer verification process before completing any feature work:

**Layer 1: Coverage Requirements**
- Tests must cover **90% or more** of the feature being added
- Use `npm run test:file <pattern>` to verify coverage for any changed files/features
- If coverage is below 90%, write additional tests before proceeding
  - If 90% branch coverage requires a heavy lift, 80% is acceptable.
  - As long as there are easy, low lift tests, don't stop adding tests. 100% coverage is preferred if it's easily achievable.

**Layer 2: Test Execution**
- Use `npm run test:file <pattern>` to verify each file changed in the current branch
- Fix any failing tests before completing the feature

**Layer 3: Resolve Test Buffer Noise**
Tests can frequently pass while throwing numerous noisy warnings and errors. These compound into costly maintenance when trying to read test results in the future. 

**CRITICAL** Resolve ALL noisy warnings or errors thrown in response to internally sourced code.

### Evaluate Test Value by Coverage
**Important** - Any test that does not improve coverage is not a valuable test, and should be removed.

### Only test with `npm run test:file`
You must only verify code with an unmodified `npm run test:file <file-pattern>` command. The script requires exactly two arguments.

**Critical** If you suspect `test:file` is insufficient to verify your work, ask the user for guidance.

### `test:file` usage
`npm run test:file <file-pattern>` will test a single file and produce coverage for ONLY that file, allowing targeted verification of your work.

**Arguments:**
- `<file-pattern>`: Pattern to match source files (case-insensitive)

`<file-pattern>` should be the minimum general file pattern to isolate the desired file-coverage. If you include a suffix pattern like `.test` the script cannot identify relevant coverage metrics to include.

Correct:
```bash
npm run test:file MyComponent
npm run test:file TopAppBar
```

Incorrect:
```bash
npm run test:file MyComponent.test
```

### Passthrough Args
`test:file` only supports a single passthrough arg: `--strict`.

`--strict` should only be used when there are multiple files matching the same `startsWith` filename substring. Example:
- `app/api/aliquot.ts`
- `app/components/AliquotsPage.tsx`

Running `npm run test:file aliquot` without the strict arg would match both files, even though we only want the former. Adding the `strict` arg will only match files that match the exact string (with any file extension). DO NOT include file extensions, even when using strict mode.

**Usage:**
```bash
# correct
npm run test:file aliquot -- --strict

# incorrect
npm run test:file aliquot.ts -- --strict
```

### Multiple matching files
If you run `test:file` and the script finds multiple matching files, use `strict` mode, documented (above)[#passthrough-args].

### Type Errors During Testing
The `test:file` script runs typescript compilation to verify type-safety during the same testing step. This is by design.

When type errors appear during testing, they should be considered a test failure and must be fixed before proceeding. Type errors will be included in the `test:file` output buffer. Additional `tsc` execution is not necessary. Review the `test:file` output and repair.

### Verification Workflow
New Component:
1. Stub the component
2. Write a "mounts" test (if it doesn't exist)
3. Run `npm run test:file <file-pattern>` to test the boilerplate stub
4. Proceed to "New and existing components below"

New and Existing Components:
1. Write a (failing) test for the expected behavior
2. Run `npm run test:file <file-pattern>` to verify failure
3. Implement the behavior and re-verify
4. Loop on 2-3 until successful
5. Repeat 1-4 until feature is complete and all behavior is verified

### Write tests one describe at a time
When writing tests, write them one `describe` suite at a time. Run tests after implementing each describe, so you can more easily detect if a given set of tests caused performance to degrade.

This will also correct failing assumptions early.

### Use fireEvent to test user interaction
1. Tests should simulate user behavior by utilizing `fireEvent`.
2. Side effects of a user interaction should be tested by verifying their propagated end-state.

Example - DatePicker.tsx:
- User selects a date
- Date modal closes, date value is stored internally through a `useState` setter.
- A separate component uses a memoized date-display value to show the date in a human-readable format.

Testing for the above flow does not need to verify the middle step. The middle step is verified implicitly if we:
- Use some form of fireEvent to trigger the date input's selection.
- Verify that the correct human-readable text propagates into the display.