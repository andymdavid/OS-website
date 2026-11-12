---
title: Where human approval belongs in an AI workflow
slug: where-human-approval-belongs-in-an-ai-workflow
description: Decide who checks an AI draft, who authorises business commitments and who permits the workflow to send or change something.
cardSummary: Who reviews a draft, approves a commitment and authorises the next action?
intro: Checking a draft can leave the next decision unresolved. Set out what each approval permits, who can give it and where the workflow must wait.
date: 2026-11-11
readTime: 7 min read
tags: AI, Operations, Business Knowledge
author: Lara
cluster: Reliable AI and business knowledge
thumbnail: /Hero-Background.webp
ogImage: /og-default.png
---

## Give draft review a clear boundary

A customer message can be accurate and still promise something the business hasn't agreed to deliver. Suppose someone checks a message prepared by an AI workflow and approves it because it correctly describes the customer's request. The workflow sends it as a commitment to make that change. Nobody has decided whether the team can keep the promise.

A general approval button leaves too much room for that misunderstanding. The reviewer needs to know whether they're checking the words, agreeing to a commitment or allowing the system to act. A useful approval tells the reviewer what they're deciding and tells the workflow what it may do afterwards.

In a human-in-the-loop AI workflow, a person participates at a defined point with enough information and authority to affect what happens next.

Start with one workflow you've already chosen. If that choice is still open, [choose a bounded workflow](/writing/where-custom-ai-systems-create-margin-first/) first. The aim here is to write a short approval brief before connecting sending or record-changing tools.

## Define what each approval permits

At Other Stuff, we recommend separating approval into three purposes. The purposes can share a person or a screen, provided each decision and its consequence remain explicit.

Draft review establishes whether a particular draft is acceptable for its stated use. The reviewer needs the relevant source material, the intended audience and any unresolved gaps. They should be able to check the claims, recognise uncertainty and ask for corrections. Sharing an accepted internal draft externally requires its own permission. The guide to [getting business knowledge ready for AI](/writing/getting-business-knowledge-ready-for-ai/) covers which sources may support an answer and who may see them.

Business commitment establishes whether the business agrees to the terms or promises in that draft. The decision belongs to someone with delegated authority over the commitment. They may need delivery capacity, agreed scope or a commercial exception policy to decide. A message can accurately repeat a customer's request while promising something the team cannot deliver. The decision owner must be able to reject or change that promise.

Permission to act allows a specific operation, such as sending the approved message to a named recipient or changing an agreed field in a business record. The action owner needs the approved wording or change, its target and confirmation that the necessary authority still applies. This permission should extend only to the operation being authorised.

Record the permitted consequence alongside each decision, whether that is acceptance for a stated use, authority to make a commitment or permission to execute an operation. Before execution, the action owner checks the version, target and permission.

In a small business, the owner might make all three decisions in one sitting. Record which decisions they made and what each permits, so a later operator doesn't have to infer authority from an ambiguous tick.

[NIST's Govern 3.2 guidance](https://airc.nist.gov/airmf-resources/playbook/govern/) calls for defining and differentiating responsibilities in human-AI oversight. Applied here, that means choosing someone who understands the decision and can authorise its consequence. It also means naming a substitute with appropriate authority when that person is unavailable.

## Follow a service change through those decisions

Consider a wholly hypothetical service team preparing a message about a customer's request to bring a delivery date forward. The example uses separate content, delivery and sending roles to make each decision clear.

The content reviewer checks that the draft accurately describes the requested change and leaves the proposed date visibly unconfirmed. They can accept it as an internal draft. The delivery owner still needs to check capacity and decide whether the team can commit to that date. If they cannot, the draft needs different wording before anyone considers sending it.

After the delivery owner agrees to a feasible date, the authorised sender checks that the final message contains that commitment and is addressed to the right customer. Permission to send applies to that message and recipient. Changing the promised date afterwards reopens the delivery decision and the review of what will be sent.

If the delivery owner declines or doesn't respond within the agreed window, sending stays blocked and the named escalation owner takes over. The content review remains valid as a check of what the customer requested, but the delivery owner has not authorised the team to fulfil it.

## Put the pause where the action happens

The workflow needs to enforce those decisions before the relevant operation. [n8n's human-in-the-loop tool documentation](https://docs.n8n.io/build/integrate-ai/ai-examples/human-in-the-loop-for-tools) gives a concrete example. Selected tool calls can pause for approval or denial, and the reviewer sees the requested tool and its parameters. That provides a place to review a proposed send or record change.

Whether it protects your workflow depends on how the tools and permissions are connected. Ask the implementer to demonstrate that every relevant sending or write path observes the approval boundary. A prompt asking the model to seek approval doesn't establish that boundary by itself. The system carrying out the action must check that the required permission exists.

[OWASP's excessive-agency guidance](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/) recommends limiting functionality and permissions, requiring human approval for high-impact actions and enforcing authorisation in downstream systems. For a bounded workflow, give the connected account only the access needed for its job. Reading sensitive records still requires an audience and access decision, even when the workflow cannot change them.

Have the implementer check whether another tool can bypass the pause, whether a material edit invalidates the relevant approval and when an unused approval expires.

Retries need particular care. If a connection fails after an action may have succeeded, the integration needs a way to avoid sending or changing it twice. Verify these requirements in the actual integration. A platform's approval feature alone doesn't answer them.

The [sales proposal guide](/writing/what-to-automate-in-your-sales-proposal-workflow/) applies release decisions to a commercial document. The [project status reporting guide](/writing/automating-project-status-reports/) starts with an internal draft and keeps external sending and source-record changes outside its initial scope. Those boundaries are useful ways to keep a first implementation manageable. Unresolved enforcement requirements also give an [AI automation discussion](/ai-automation/) a specific starting point.

## Give reviewers enough information and time to decide

Give the reviewer one request containing what they need to decide. Include the proposed action, the relevant draft and sources, the recipient or record being affected, and what approval will permit. Make unresolved questions visible. Say whether you're asking them to check wording, agree to a delivery promise or permit an action.

Agree on a decision window that fits the work. Name who receives an unanswered request, what that person may authorise and what stays blocked while it waits. Record the reviewer, decision, time and exact draft or action approved. The next person can then see why the workflow proceeded or stopped.

[AWS's guidance on critical-decision review](https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentsec04-bp02.html) recommends review context, time windows, escalation paths and decision records. It also warns against routing every action through approval. Adding requests without considering reviewer capacity can turn careful decisions into routine clicking.

For each proposed pause, ask what the reviewer could discover and what they could change. If nobody has the information or authority to alter the outcome, redesign the request or its ownership. Include the time spent finding evidence, checking and resolving exceptions when you [calculate the workflow's full handling cost](/writing/ai-automation-roi-for-smes/). Approval needs to be feasible during an ordinary busy day.

## Write the approval brief for one workflow

The message at the start could have stayed an accepted internal draft until someone authorised the delivery promise and the send. Once each decision has a named owner and a permitted consequence, the team can see what approval has actually established.

Approval earns its place when a competent, authorised person can change the outcome and the system enforces that decision. It still depends on the evidence available and the quality of the review. Choose the pauses around the commitments and actions that need judgement, then make those requests clear enough to decide.

Take one workflow and write its approval brief. Name who reviews the draft, who can authorise its commitments and who permits the final action. State what each person sees, what their approval allows and what remains blocked when approval is missing. That brief gives your team and implementer a shared answer to what an approved draft may do next.
