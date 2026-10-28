# Review decisions: NTS dry run

Append-only. These are decisions about this review's content, not about TRUST itself
(those belong in `TRUST_DECISIONS.md`).

## R1: claim-finding mappings

- Date: 2026-10-28
- Decision: each review claim uses the Diggypaper findings listed for it in
  `knowledge/claim-finding-map.json`. Every claim restates what its finding's supporting
  passage says, and each passage in `knowledge/claim_graph.json` is an exact excerpt of the
  quote the packet exported (`scripts/nts-dry-run/build-review.cjs` fails otherwise).
- Duplicates: the extraction proposed the iScience ethics sentence twice
  (`finding:73cf6a68…` and `finding:c4da8800…`, same passage). The claim uses `c4da8800`;
  the other stays a same-paper candidate.
- Not used: `finding:b13891a6…` (APAFIS number, no NTS identifier) is not cited by any claim.
  `finding:3371fb0d…` and `finding:b02d7891…`, `finding:be7108ef…` (group sizes, housing,
  approvals of the rat study) are same-paper candidates only.

## R2: what this review does not claim

- It does not compare the 146 rats reported by the rat study with the ALURES record of
  NTS-RO-406074. Diggypaper's NTS join reads a planned total of 145 there, but that is a
  project-wide authorization ceiling, not the animals used by this article, so Diggypaper
  marks the pair `not-comparable`. No review claim is built on that comparison.
- It does not state that any identifier is valid in ALURES. `nts-es-414463` is cited by its
  article but was not found in the ALURES export Diggypaper read.
