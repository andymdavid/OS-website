---
title: Where custom AI systems create margin first
slug: where-custom-ai-systems-create-margin-first
description: Compare business workflows by repetition, source readiness, review effort and exception cost, then define a useful first AI automation pilot.
intro: Proposals, reports and client decisions can all take time. Choosing the first workflow means checking which repeated work has usable inputs, a clear output and someone who can review it.
date: 2026-04-21
updatedDate: 2026-11-10
readTime: 8 min read
tags: AI Systems, Operations
author: Lara
cluster: Choosing what to automate
thumbnail: /writing-custom-ai-systems.webp
ogImage: /og-default.png
---
Sales proposals need assembling, weekly project reports need rebuilding, and a client wants a decision on disputed scope. If you're the operations lead, each competes for your team's time. Choosing which business process to automate first starts with the work itself. What do people spend time doing, and how would they judge whether a system had done it well?

Often, the information already exists somewhere in the business. Someone still has to gather it, interpret it, structure it, and turn it into an action. That repeated assembly is a promising place to look for margin if a system reduces the complete handling effort. Count the checking, corrections and exceptions too.

## The best first system is usually narrower than expected

Sales, operations and client service are too broad to use as a first system boundary. Start with a [proposal draft assembled from approved material](/writing/what-to-automate-in-your-sales-proposal-workflow/), or [one internal reporting format](/writing/automating-project-status-reports/) prepared from current project records. For each candidate, describe one trigger, one set of available inputs and one recognisable output.

With that boundary, you can test whether the system helps each time the work recurs. You need existing inputs and an output whose shape you recognise. Otherwise, you're still working out what the task is. Existing material still needs scrutiny. Previous proposals may contain old prices. Meeting notes may omit the latest decision. A familiar document format makes the output easier to describe, but its contents need usable sources and someone who can check them.

In [Building effective agents](https://www.anthropic.com/research/building-effective-agents), Anthropic recommends starting with the simplest sufficient solution and adding complexity only when needed. It describes latency and cost trade-offs in agentic systems. That's engineering guidance rather than evidence of savings in your business. Before choosing a workflow for AI, ask whether a smaller intervention can solve its repeated part.

## Compare the work you could actually hand over

Make notes against these six questions for each candidate. This is an Other Stuff decision aid based on editorial judgement, not a validated scoring model. Keep blockers visible as decisions in their own right rather than hiding them in a total score.

- **Frequency.** How often does this exact workflow recur? Frequent work gives you more opportunities to test and reuse a useful result. An occasional task may offer too little repetition to justify setup, even when it's frustrating.
- **Assembly effort.** Which gathering, copying and drafting steps consume attention? Follow the work through to an accepted output. A quick draft can still leave the owner spending longer checking and correcting it than they spent doing the original task.
- **Source readiness.** Are the inputs current, approved and accessible for the intended use? Scattered records may be manageable. Missing permission, conflicting versions or an inaccessible system can block the pilot before drafting begins.
- **Checkability.** Can a reviewer trace claims to records and decide whether the output is acceptable? A project identifier and a dated status update give someone something concrete to check. Fluent prose becomes harder to assess when correctness depends on context that only one person remembers.
- **Exception cost.** What happens when information is missing, contradictory or wrong? An internal draft can leave a gap for review. A message that commits the business to a price or delivery date has a different consequence and needs a tighter boundary.
- **Named owner.** Who approves the output, handles exceptions and has time for the trial? Name a person with available review time and authority to accept work, reject it and stop the pilot.

[Microsoft's Power Automate planning guidance](https://github.com/MicrosoftDocs/power-automate-docs/blob/main/articles/guidance/planning/determine-automation-methods.md) tells users to verify that connectors provide the required actions and that the intended trigger is supported. It also describes API alternatives. That's product-specific guidance. For your shortlist, check whether the chosen method can obtain the approved inputs and perform the required action.

A workflow can recur every day and still be blocked. Record unresolved questions beside each candidate and ask its owner to resolve them. If nobody can identify the approved pricing source, more proposals won't fix that.

The readiness check below uses two of the prerequisites above. It is an editorial guide, not a scored ranking: the business case, access rules and consequence of error still need to pass their own checks.

```insight-visual
{
  "type": "matrix",
  "title": "Usable sources and an accountable reviewer are both prerequisites",
  "xAxis": "Source problems increase \u2192",
  "yAxis": "Review ownership increases \u2191",
  "items": [
    {
      "title": "Ready sources, review owner",
      "description": "Define a bounded pilot and its acceptance checks."
    },
    {
      "title": "Source gaps, review owner",
      "description": "Resolve the input problems with the accountable owner before building."
    },
    {
      "title": "Ready sources, no reviewer",
      "description": "Name someone who can check and accept the output."
    },
    {
      "title": "Source gaps, no reviewer",
      "description": "Defer until source and ownership blockers can be resolved."
    }
  ]
}
```

## A hypothetical choice between three workflows

Imagine an Australian project-services firm with 35 staff. Every frequency, source condition and ownership arrangement in this example is invented to show how the decision aid works. These are possible workflows, not OS client results.

### Sales proposal preparation

Assume the firm prepares four proposals a month. Someone repeatedly gathers discovery notes, scope, pricing and evidence of previous work into a draft. The sales lead can check the scope and commercial terms, but the available price documents conflict. An incorrect price could become an unwanted commitment if released. Proposal preparation has repeated assembly and an identifiable reviewer. Its immediate next step is to establish an approved pricing source. Any later drafting pilot would keep pricing decisions and release with the sales lead.

### Weekly project reporting

Assume the firm prepares eight internal reports each week from accessible, current task records and dated meeting notes. The operations lead can trace status claims back to those records and has agreed time to review. Missing updates can be flagged before anyone accepts the report.

Under these assumptions, reporting is the clearer first pilot. The work recurs often, the sources are usable, and the operations lead can check the draft and has time to do it. Limit the system to preparing an internal draft with source references. The operations lead still resolves gaps and approves the result.

### Negotiating a disputed client scope

Assume scope disputes occur irregularly. Some background gathering repeats, but important context remains in conversations and the commercial judgement changes with each client. The account director owns the decision. There's no stable acceptance rule for the final negotiating judgement, and a mistaken commitment could damage the relationship.

Keep that decision with the account director. Background preparation might be assessed as a separate, narrower task later, once its sources and checking requirements are clear. Automating the final judgement would introduce too much ambiguity into this first pilot.

That choice depends on the assumptions. If the reporting records are stale or the operations lead can't review, pause the pilot, resolve the blocker and compare again. Proposal preparation could be the better candidate in a business with approved sources and available review capacity.

## Choose the smallest useful intervention

Before choosing software, agree which price source has authority and who owns reporting. Software selection won't settle those unresolved decisions.

If reporting means moving fixed fields into a standard format, try an export and a template. They may already address the assembly problem. Where the rules are stable, test ordinary automation before adding an AI step.

AI-assisted drafting becomes worth considering when you still need to interpret notes or assemble a narrative that someone can verify. Keep the input and output boundary small enough to compare the result with the current method. You can move ahead with reporting while the account director handles disputed scope. Other candidates can wait until their sources and review arrangements are ready.

## Define the pilot before building it

A candidate becomes testable when you write down its inputs, expected output, review authority and stop conditions. [NIST's AI RMF Playbook, Measure 1.1](https://airc.nist.gov/airmf-resources/playbook/measure/) recommends fit-for-purpose testing procedures, acceptable performance limits and corrective action when those limits are exceeded. It also calls for clear lines of responsibility. It's voluntary guidance. The reporting brief below applies that principle to our hypothetical firm.

- **Scope and output.** Prepare one internal weekly report format from approved task records and dated project notes. Include source references. Exclude client delivery, automatic record updates and commercial commitments.
- **Owner.** The operations lead accepts drafts, records corrections and exceptions, and decides when to stop or review the trial.
- **Trial cases.** For illustration, choose ten historical reporting cases covering routine work, missing updates, conflicting status and stale notes. Use these for diagnosis, then assess separate, unseen representative cases before expanding. Ten is an assumed trial size, not statistical proof.
- **Manual baseline.** For comparable manual cases, record assembly, checking and correction time, missing-input incidents and whether the accepted report is complete. Apply the same output requirements to the trial cases so a shorter but incomplete report can't count as an improvement.
- **Review limit.** Agree a local review budget before the trial. For this example, assume no more than 15 minutes per report, no unsupported material status claims, and every deliberately included missing, stale or conflicting case surfaced. The time limit is hypothetical and needs to suit the actual workflow.

Write acceptance checks for routine and awkward cases.

- **Complete current inputs.** The draft contains the required sections, correct project identifiers and dates, and traceable status claims. The reviewer accepts it or records the corrections needed.
- **Missing update.** The draft flags the missing information and leaves the status unresolved.
- **Conflicting records.** The draft surfaces the conflict with both source references. The owner resolves it before approval.
- **Stale note.** The date stays visible and old material isn't silently presented as current.
- **Unsupported claim or external action.** An invented status, invented source or unapproved external action fails the boundary and triggers stop and review.

Expand only when the required checks pass on unseen cases and the complete handling effort compares favourably with the matched manual baseline. Critical failures mean stopping. For correctable gaps, revise and retest. If review consumes the expected benefit, defer the workflow. Even after a successful small trial, you'll need to establish readiness for broader use.

Use the trial findings to decide what happens next:

| Decision | Evidence from the trial |
| --- | --- |
| Expand within the tested boundary | Required checks pass on unseen cases and complete handling effort compares favourably with the manual baseline |
| Revise and retest | A correctable gap remains in sources, drafting or review |
| Stop and review | A critical failure breaks the agreed boundary |
| Defer | Checking consumes the expected benefit or ownership remains unresolved |

## Make the first workflow a useful test

The best first workflow gives you a useful result you can check, with records you can trust and someone who owns the decision. A frequent task is a promising candidate, but its value depends on how much work remains after the draft is produced. The comparison above helps make that trade-off visible before you invest.

Choose one candidate and write down its inputs, expected output, reviewer and stopping conditions. Those notes become a brief for [help scoping a first workflow](/ai-automation/) and [the operating structure around it](/newsletter/ai-works-better-inside-a-system). Use the first trial to find out whether the complete job becomes easier. Expand from evidence that it does.
