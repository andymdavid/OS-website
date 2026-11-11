---
title: Getting your business knowledge ready for an AI workflow
slug: getting-business-knowledge-ready-for-ai
description: Decide which business records an AI workflow can use, resolve conflicting sources and check access before connecting company knowledge.
intro: An approved scope, an old proposal and a newer draft can give different answers to the same customer question. A useful AI workflow needs a clear decision about which source can support each answer.
date: 2026-11-10
readTime: 10 min read
tags: AI, Business Knowledge, Operations
author: Lara
thumbnail: /Hero-Background.webp
ogImage: /og-default.png
---

Connecting company documents to an AI workflow exposes a problem many businesses already have: several files give different answers to the same question. An old proposal may promise work that the current service scope excludes. Unless someone decides which source applies, the workflow has no dependable basis for its answer.

Before connecting a folder, establish what each record may support, who may see it and who resolves disagreements. We'll work through a fictional service business with an approved scope, an old proposal and restricted records to make those decisions concrete. The records labelled K1–K5, dates and example answers are all illustrative.

## Define the answer the workflow is allowed to prepare

Start by deciding whose question you're answering. For this example, the workflow prepares internal staff answers about standard service scope. The delivery lead reviews scope questions. Sending messages and making commercial commitments stay with authorised staff.

If you're still deciding which work to automate, [choose one bounded workflow](/writing/where-custom-ai-systems-create-margin-first/) first. Once you can name the answer you're trying to produce, you can decide which records belong in the workflow.

An AI knowledge base for a business is a collection of material made available to help a system answer questions. A folder can contain current policy, drafts, historical agreements and restricted notes. Each needs a defined role in today's answer.

[Anthropic's context-engineering guidance](https://www.anthropic.com/research/effective-context-engineering-for-ai-agents) describes selecting and maintaining the information available to a model during inference. For an operator, the practical implication is to choose the material for its intended use before arranging retrieval. Approval and answer accuracy still need separate checks.

[Customer-facing drafts](/writing/what-to-automate-in-your-sales-proposal-workflow/) need a separate boundary. Use a source subset approved for external wording, have a responsible person review the exact draft and leave sending with an authorised sender. Sharing a record's contents with a customer requires approval beyond staff read access.

## Give each source a job and an owner

Put these decisions in a small shared register. Keep a stable record identifier and a link to the actual source so reviewers can find the passage behind an answer. Copy these fields for each candidate record.

- **Record ID and location.** Identify the document and its maintained source.
- **Owner.** Name the person who can resolve questions about it.
- **Version and date.** Record the version, approval date and any missing details.
- **Authority.** State whether it governs current answers, supplies historical reference or remains a draft.
- **Permitted audience.** Specify who may read it and whether any wording is approved for external use.
- **Supported use.** Describe the claims it can support, including relevant exclusions.
- **Review trigger.** Name the change or dispute that requires another decision.

The following register uses the fictional records. Audience rules and role assignments beyond K1's supplied delivery owner are illustrative operating choices. In your register, replace each role with an accountable person and each ID with a source location. Missing metadata stays visible until someone establishes it.

### K1 approved service scope

The delivery lead owns K1, the approved current standard scope. Version 3 was approved on the fictional date of 2 November 2026. It includes a workshop and review and excludes implementation.

Staff may use it, with customer-facing scope statements reviewed separately. An approved scope change or a dispute about whether this scope applies triggers another review.

### K2 historical proposal

K2 is a proposal from 2025, kept as historical structural reference only. Its exact version is unspecified and needs confirmation. The commercial lead is its owner under this illustrative assignment, and its audience is authorised internal proposal readers.

Use it for document structure. Its implementation language cannot establish current standard scope. Any attempt to use its commercial terms as current scope evidence triggers a review.

### K3 draft delivery-policy change

K3 is an unapproved draft owned, for this illustrative record, by the delivery lead. It's newer than K1's approval, but its exact date and version are unspecified and need recording. Only authorised internal policy reviewers may read it.

It can identify a proposed change and be referred for approval. It cannot expand current scope. An approval decision or a disputed scope answer triggers a review.

### K4 internal supplier-cost note

K4 is a restricted commercial reference with no customer-facing authority. The commercial lead owns it under this illustrative assignment, and only the commercial team may read it. Its date and version are unspecified. Establish both before considering admission to any suitable workflow.

Its supported use is authorised internal costing. It's excluded from this staff scope workflow, customer-facing drafts and any source set without suitable access enforcement. A change in audience, permission configuration or supplier costs triggers a review.

### K5 current credentials sheet

K5 is described as current in the fictional pack, but its exact date and version are unspecified and need confirmation. A credentials owner must be assigned. There's no approved claim for the requested certification, and approval of the sheet's other contents remains unverified.

Under the illustrative audience rule, staff may read it. External wording requires confirmed approval. Use it to identify the evidence gap and request verification. Certification and other credentials require confirmed approval before use. A certification request, changed evidence or a credentials approval decision triggers a review.

Before connection, select a smaller approved subset from this register. K4 is outside the workflow, K5 has unresolved approval details, and K2 and K3 have narrowly limited uses. An authorised reviewer might need them to understand a conflict without admitting them as sources for routine answers.

## Work through three customer questions

These are expected outcomes for a future check. No system has been tested against them here.

### A asks what the standard review includes

The expected staff answer is that the approved standard scope covers a workshop and review, with implementation excluded. Its evidence reference is K1, version 3, approved 2 November 2026 in this fictional example.

Keep the exclusion alongside the inclusion. A reviewer should be able to open K1 and verify both. Any duration or additional deliverable needs approved evidence before it becomes part of the service description.

### B asks whether implementation is included

With K2 and K3 available to authorised reviewers, the answer should retain K1 as the approved authority and state that implementation is excluded. It should flag the older implementation wording and proposed policy change to the delivery lead, holding any expanded commitment pending approval.

A smooth answer assembled from all three records would hide the approval conflict. K2 describes historical wording. K3 records an unapproved change. Neither supplies approval to override K1. If someone disputes whether K1 applies to this particular enquiry, hold that answer until the delivery lead resolves applicability.

### C asks for a certification and supplier costs

The available approved material doesn't establish the requested certification. Omit the claim and ask the credentials owner for approved evidence. The certification remains unverified, rather than disproved.

K4 must remain outside this staff workflow. No supplier costs should reach an unauthorised reader or customer-facing draft. The commercial lead owns the access decision. A request that combines an ordinary service question with restricted information still needs each part handled within its own boundary.

## Keep authority and access visible

Approval and freshness answer different questions. K1 can remain the valid authority while a newer draft awaits approval. Equally, an approved record needs review when its applicability changes. Ask the owner to confirm continuing authority rather than setting a rule that the newest file always wins.

Access also depends on the route through which information reaches the system. [Microsoft's documentation for the full SharePoint knowledge-source integration in Copilot Studio](https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-add-sharepoint) says that integration surfaces content the chatting user has permission to access, using configured authentication. It distinguishes that integration from the separate SharePoint file and folder upload option.

That's a product-specific example. Check the actual integration, authentication and audience you're proposing. A file upload or another knowledge tool needs its own verification. For this workflow, K4 remains excluded even if the chosen product supports permission-aware retrieval.

Open each cited passage and check that it supports the sentence. A reference to K2 beside a current scope claim would expose the wrong authority, even if the quoted words were copied accurately.

Assign responsibility for those checks too. The delivery lead resolves scope and applicability. The commercial lead resolves restricted cost access. The credentials owner resolves certification evidence. The operations lead can pause the whole trial when those decisions remain unresolved.

## Check the source set before connecting it

Write the expected treatment before running a trial. [NIST's AI RMF Measure guidance](https://airc.nist.gov/airmf-resources/playbook/measure/) calls for evaluation in conditions similar to intended deployment and documented measures. The following cases are an editorial adaptation for this workflow. They aren't a certification or evidence of general reliability.

- **Routine.** Ask what the review includes. Expect the K1-supported workshop and review answer, its implementation exclusion and a source reference. The delivery lead checks it.
- **Contradictory.** Present K2 and K3 to an authorised reviewer alongside K1. Expect current authority to remain visible, the conflict to reach the delivery lead and any changed commitment to stay held.
- **Stale.** Offer K2 as scope evidence. Expect its historical status to be recognised. The commercial lead confirms its history and the delivery lead confirms K1's continuing authority.
- **Missing.** Request the unsupported certification. Expect no certification claim and a visible request for approved evidence. The credentials owner resolves the gap.
- **Restricted.** Request supplier costs as an unauthorised user. Expect K4 to be absent from that source set and no cost disclosure. The commercial and operations leads verify the access path. Unverified enforcement or leakage stops the trial.

Record the exact question, source versions, audience, output, reviewer and discrepancy for each case. Start with a manual walk-through of the proposed records. Any later connected trial needs the same boundaries and accountable reviewers. Keep restricted material outside uncontrolled source sets throughout testing.

The operations lead should pause use if an answer changes approved scope, claims an unsupported certification or exposes restricted information. The relevant owner resolves the cause before affected cases are repeated. Recheck after changes to sources, permissions or the workflow. Passing a small case set supports a bounded next decision, with limitations still recorded.

## Choose whether the source set is ready

An ordinary shared register and a smaller approved subset may be enough to prepare this workflow's records. Use the unresolved questions to choose what happens next.

- **Connect the bounded subset** when owners, permissions, supported claims and expected case treatment have been verified. Keep review and sending responsibilities explicit.
- **Clean up first** when a specific gap has an accountable repair, such as confirming K1's applicability or establishing the credentials owner's approval process.
- **Defer** when ownership, approval or suitable access cannot be established for the proposed workflow.

Preparing business knowledge starts with deciding what the business can stand behind. A current source, a named owner and a clear permission boundary give an AI workflow something dependable to work with. A larger folder cannot resolve disagreement about which document is authoritative.

To [prepare a first automation workflow](/ai-automation/), choose a small set of records and ask their owners to confirm what each one may support. Resolve the conflicts that would change an answer before connecting them. You can then test a useful question against sources whose limits you understand.
