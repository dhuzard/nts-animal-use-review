#!/usr/bin/env node
// Runs the template's node:test suites, skipping only the tests that assert facts about the
// template's demo review (its claim ids, cite keys such as Cardin2009 and export arguments)
// against this repository's live content. Those tests pass upstream, where the demo review is
// the content; here the review is the NTS dry run, so they cannot hold. Every other test runs.
//
// Usage: node scripts/nts-dry-run/run-template-tests.mjs <test files...>
import { spawnSync } from 'node:child_process';

const DEMO_BOUND = [
  // tests/oratlas-export.test.mjs: regenerates and inspects the demo export
  'committed export is exactly what the exporter regenerates (idempotent)',
  'review-authored claim identities and citation bindings are preserved',
  'source-native sidecar keeps the claim graph, atoms, groups and TRUST v2 intact and hash-bound',
  'compatibility report accounts for parsed, exported and lost data',
  'producer findings link to review claims at a separate, labelled provenance level',
  'evidence links that do not resolve to the claim graph are rejected',
  'negative: bad DOI is omitted with a note and cannot pass the verifier',
  'negative: missing citation/claim link fails closed',
  'negative: truncated JSONL, changed hash and incompatible manifests are rejected',
  // tests/evidence-links-v2.test.mjs: synthetic lineage bound to the demo claim graph
  'the S2 lineage sidecar bridges to links/2 and exports passage-level lineage',
  'locator is optional and omitted locators stay explicit null',
  'a locator is refused on schema /1 and malformed passage detail aborts the export',
  'a DOI the review does not cite is skipped, never linked by text',
  'DOI equality alone yields only same-paper candidates, never claim evidence',
  'a reviewed map binds only the mapped finding; a second finding of the same paper stays a candidate',
  'the reviewed map fails closed on every mismatch',
  'the exporter refuses inconsistent bindings',
  'native fields are checked against the packet contract, not just for presence',
  'a repeated assessment id is refused rather than shown as two judgments',
  'a same-paper candidate does not claim the citation was drawn from the finding',
  'asserted_at must be a real RFC 3339 UTC date and time',
  // tests/evidence-radar.test.mjs and tests/review-backlog-planner.test.mjs: demo claim ids
  'radar deterministically maps alerts and new works to canonical claims',
  'output is advisory and contains no mutable review fields',
  'no-provider input is not_scanned and remains deterministic from input bytes',
  'planner directly consumes an advisory Evidence Radar artifact',
  // tests/contributorship-private-leak.test.mjs: canaries planted on the demo claim
  'canaries in private builder inputs reach the private companion only; no enumerated public surface contains any, and no input or fixture byte changes',
  'mutation sensitivity: the scanner fails when a canary is inserted into any public artifact',
];

const escape = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const args = ['--test', ...DEMO_BOUND.map((name) => `--test-skip-pattern=^${escape(name)}$`), ...process.argv.slice(2)];
const { status } = spawnSync(process.execPath, args, { stdio: 'inherit' });
process.exit(status ?? 1);
