# PATENT INVENTION DISCLOSURE DOCUMENT
# מסמך גילוי המצאה לצורך רישום פטנט

---

**CONFIDENTIAL — ATTORNEY-CLIENT PRIVILEGED**
**סודי — מוגן בחיסיון עורך דין-לקוח**

---

## COVER PAGE / דף שער

| Field | Details |
|---|---|
| **Title of Invention (English)** | Adversarial Multi-Agent AI Arbitration System with Sequential Context Accumulation and Mediation-Gated Hybrid Resolution Pipeline |
| **Title of Invention (Hebrew)** | מערכת בוררות מבוססת סוכני בינה מלאכותית מתנגדים עם הצטברות הקשר סדרתית וצינור פתרון היברידי מבוסס גישור |
| **Platform Name** | The Arbitrator / הבורר |
| **Inventor(s)** | [TO BE COMPLETED BY INVENTORS — full legal name, address, citizenship, and percentage contribution for each named inventor] |
| **Assignee / Owner** | [TO BE COMPLETED — corporate entity name and jurisdiction] |
| **Disclosure Submission Date** | [DATE OF SUBMISSION TO COUNSEL] |
| **Target Filing Date** | [TO BE DETERMINED BY COUNSEL — recommend within 12 months of first public disclosure or commercial use] |
| **Priority Claim Notes** | If applicable, provisional application (USPTO) recommended as earliest priority date anchor prior to PCT filing |
| **Jurisdictions of Interest** | United States (USPTO), Israel (ILPO / רשות הפטנטים), European Patent Office (EPO), via PCT (Patent Cooperation Treaty) |
| **Technology Classification** | Artificial Intelligence; Legal Technology; Dispute Resolution Systems; Natural Language Processing; Multi-Agent Systems |
| **IPC Classification (Preliminary)** | G06N 5/04 (Knowledge representation; using specific reasoning models); G06F 40/56 (Discourse analysis); G06Q 50/18 (Legal services) |
| **CPC Classification (Preliminary)** | G06N 20/00; G06F 40/30; G06Q 10/10 |

---

## TABLE OF CONTENTS / תוכן העניינים

1. Executive Summary
2. Background and Field of the Invention
3. Problem Statement
4. Invention 1 — Adversarial Multi-Agent Arbitration System
5. Invention 2 — Pre-Processing Neutralization Engine
6. Invention 3 — Sequential Context-Accumulating Debate Framework
7. Invention 4 — Mediation-Gated Hybrid Arbitration Pipeline
8. Claims Draft
9. Drawings Description
10. Prior Art Differentiation
11. PCT and ILPO Filing Strategy
12. Trade Secret Recommendations
13. Inventor Declarations Placeholder

---

## 1. EXECUTIVE SUMMARY / תקציר מנהלים

The present disclosure describes a novel computer-implemented legal dispute resolution platform comprising four interrelated inventions that collectively constitute a new paradigm in automated, AI-mediated arbitration. The platform, commercially referred to as "The Arbitrator," introduces architecturally distinct methods and systems for:

(a) deploying adversarial large language model (LLM) agents as party advocates within a structured, multi-round debate framework adjudicated by a neutral AI judge;

(b) neutralizing emotionally charged, adversarial party submissions through an automated pre-processing pipeline that generates a procedurally binding shared frame of reference;

(c) accumulating and injecting prior-round reasoning as weighted context into subsequent evaluative rounds to produce a progressive multi-dimensional legal reasoning chain; and

(d) gating access to binding arbitration through a mandatory AI-generated mediation phase in which both parties vote on a proposed compromise, with each party's response subsequently injected as weighted context into the arbitration record.

No prior art system has been identified that combines adversarial AI advocacy, neutral AI adjudication, structured sequential legal reasoning across predefined evaluative dimensions, mandatory pre-processing neutralization, and mediation-gated hybrid pipeline architecture in a single integrated platform. Each of the four inventions described herein is independently patentable and collectively constitutes a pioneering contribution to the field of legal technology.

---

## 2. BACKGROUND AND FIELD OF THE INVENTION / רקע ותחום ההמצאה

### 2.1 Field

The inventions disclosed herein relate to the fields of artificial intelligence, natural language processing, multi-agent systems, and computer-implemented legal dispute resolution. More particularly, the inventions relate to methods, systems, and computer-readable media for orchestrating adversarial AI agents to represent human parties in structured arbitration proceedings, neutralizing adversarial language inputs prior to processing, accumulating contextual reasoning across sequential evaluative rounds, and gating arbitration through a mandatory AI-mediated compromise phase.

### 2.2 Background

Dispute resolution has historically been a human-intensive process requiring trained legal professionals, significant time expenditure, and substantial financial resources. The emergence of online dispute resolution (ODR) platforms, beginning in the late 1990s with services such as SquareTrade and Cybersettle, introduced computer-assisted tools to facilitate resolution of low-stakes consumer disputes. However, these early platforms functioned primarily as communication conduits or simple offer-counter-offer engines, with no capacity for legal reasoning, argument evaluation, or neutral adjudication.

The advent of large language models (LLMs) capable of sophisticated legal reasoning — including the ability to identify precedent, evaluate evidence quality, assess proportionality, and construct structured legal arguments — has created the technological precondition for a new generation of AI-driven dispute resolution. However, existing applications of LLMs to legal tasks have been limited to document summarization, contract analysis, legal research assistance, and single-agent question-answering systems. No prior system has applied multiple coordinated LLM agents in an adversarial, role-assigned framework that structurally mirrors the procedural architecture of formal arbitration proceedings.

Existing multi-agent LLM frameworks (such as AutoGen, CrewAI, MetaGPT, and similar orchestration systems) provide generalized architectures for multi-agent task completion. However, these systems are not designed for adversarial legal reasoning, lack structured evaluative dimensions aligned with legal doctrine, do not implement neutral judge agents, and provide no mechanisms for mediation-gating, neutralization pre-processing, or sequential context accumulation with legal-dimension specificity.

The inventions disclosed herein address these deficiencies in the prior art by providing a fully integrated, procedurally structured AI arbitration system that is novel, non-obvious, and industrially applicable.

---

## 3. PROBLEM STATEMENT / הצהרת הבעיה

The following problems in the prior art are addressed by the present inventions:

**3.1** Existing dispute resolution platforms lack any mechanism for AI agents to independently represent each party as an advocate, resulting in systems that present a single, undifferentiated AI perspective rather than genuinely adversarial representation.

**3.2** Human parties to disputes typically submit emotionally charged, self-serving, and imprecise descriptions of their grievances. No prior art system applies a principled, automated neutralization step to establish a shared, objective frame of reference that is procedurally binding on all subsequent AI analysis, thereby reducing bias introduced at the input stage.

**3.3** Existing AI legal reasoning systems evaluate disputes holistically, without decomposing analysis across distinct legal evaluative dimensions (e.g., factual accuracy, fairness, precedent, evidence quality, good faith). This produces undifferentiated outputs that fail to capture the multidimensional nature of legal analysis.

**3.4** No prior art system implements a sequential, context-accumulating debate architecture in which the output of each evaluative round is injected as weighted context into all subsequent rounds, creating a dependent reasoning chain that simulates the progressive refinement of legal argument.

**3.5** No prior art system mandates a mediation phase preceding binding AI arbitration, wherein the AI generates a compromise proposal, both parties vote on that proposal, and each party's response to the mediation proposal is subsequently injected as weighted contextual input into the arbitration record.

**3.6** When a party to a dispute articulates their position poorly, no prior art system provides a mechanism for their AI advocate to strengthen and clarify that argument without introducing new facts — a critical procedural safeguard that preserves representational equity.

---

## 4. INVENTION 1 — ADVERSARIAL MULTI-AGENT ARBITRATION SYSTEM
## המצאה 1 — מערכת בוררות מרובת סוכנים מתנגדים

### 4.1 Title

**English:** Adversarial Multi-Agent AI Arbitration System with Structured Evaluative Dimensions, Neutral AI Adjudication, and Argument Articulation Sub-Process

**Hebrew:** מערכת בוררות מבוססת סוכני בינה מלאכותית מתנגדים עם מימדי הערכה מובנים, שיפוט ניטרלי ותת-תהליך ביטוי טיעונים

### 4.2 Summary of Invention

The invention provides a computer-implemented method and system for resolving disputes between two human parties (hereinafter "Party A" and "Party B") by assigning a distinct AI agent to each party as their legal advocate, conducting structured adversarial debate across five predefined evaluative dimensions, and adjudicating each round through a neutral third AI agent functioning as a judge. The system implements a majority-threshold verdict mechanism, a sequential context-injection architecture, and an argument articulation sub-process that strengthens poorly expressed party submissions without introducing new factual claims.

### 4.3 Detailed Description

#### 4.3.1 System Architecture Overview

The system comprises at minimum three AI agent instances operating in coordinated fashion within a shared computational environment:

- **Advocate Agent A (AA-A):** An LLM agent instantiated with a system prompt assigning it the role of legal advocate for Party A. The agent is provided with Party A's submission (as processed by the Neutralization Engine described in Invention 2), the shared neutral case summary, and research outputs from the Research Phase (Section 4.3.3). AA-A's sole function is to construct the strongest legally sound argument in favor of Party A's position in each evaluative round.

- **Advocate Agent B (AA-B):** An LLM agent instantiated symmetrically to AA-A, assigned as advocate for Party B, operating under identical structural constraints.

- **Judge Agent (JA):** A neutral LLM agent instantiated with a system prompt explicitly prohibiting any advocacy role. JA receives the arguments submitted by AA-A and AA-B in each round, evaluates them against the specific evaluative dimension of that round, and produces a scored adjudication with a written rationale. JA does not have access to which party submitted which argument during the scoring phase in a preferred embodiment (blind adjudication mode).

In a preferred embodiment, all three agents are instances of the same underlying LLM, differentiated solely by their system prompts and input context. In alternative embodiments, agents may be instantiated from different LLM providers or model architectures to reduce systemic bias.

#### 4.3.2 Research Phase

Prior to the commencement of debate rounds, the system executes an automated Research Phase in which a Research Agent (RA) — which may be the same LLM as the advocate and judge agents or a specialized retrieval-augmented generation (RAG) system — performs the following operations:

(a) **Claim extraction:** Identifying factual claims asserted by each party in their submissions.

(b) **Verifiable fact identification:** Identifying which claims are in principle verifiable through external sources (dates, quantities, documented events, contractual terms, publicly available records).

(c) **Contradiction mapping:** Identifying claims made by Party A that directly contradict claims made by Party B, and flagging these as points of dispute requiring resolution.

(d) **Domain context assembly:** Identifying the relevant domain of the dispute (e.g., employment, commercial contract, landlord-tenant, consumer goods, intellectual property) and retrieving relevant legal standards, typical industry norms, statutory provisions, or regulatory frameworks applicable in the specified jurisdiction.

Research Phase outputs are compiled into a Research Summary that is provided to both AA-A and AA-B at the commencement of the debate. The Research Summary is factual and non-advocative; it does not assign blame, draw conclusions, or make recommendations.

#### 4.3.3 Structured Debate Rounds

The debate comprises five sequential rounds, each addressing a distinct evaluative dimension. The five dimensions, in order, are:

**Round 1 — Factual Accuracy:** Each advocate presents arguments regarding which factual assertions in their client's submission are supported by evidence, corroborated by the Research Summary, or admitted by the opposing party. JA scores each advocate's factual argument on a scale of 0–100 and determines a round winner.

**Round 2 — Fairness & Equity:** Each advocate presents arguments regarding the equitable dimensions of their client's position — proportionality of claimed remedy, good conscience, and whether the outcome sought is fair in light of the specific circumstances of the parties.

**Round 3 — Precedent & Standards:** Each advocate presents arguments regarding applicable legal precedent, industry standards, regulatory requirements, or contractual norms that support their client's position.

**Round 4 — Evidence & Proof:** Each advocate presents arguments regarding the quality, sufficiency, and probative weight of evidence submitted by their client, and challenges the evidentiary sufficiency of the opposing party's submission.

**Round 5 — Good Faith & Reasonableness:** Each advocate presents arguments regarding whether their client acted in good faith and with objective reasonableness throughout the underlying transaction or relationship giving rise to the dispute.

Each round is conducted as follows:

1. AA-A submits its argument for Round N.
2. AA-B submits its argument for Round N.
3. JA receives both arguments (and, in preferred embodiments, the arguments are anonymized as "Argument X" and "Argument Y" rather than identified by party) along with all prior-round context (per Invention 3).
4. JA produces a scored adjudication specifying: (i) a score for each argument; (ii) identification of the winning argument; (iii) a written rationale of at least three sentences explaining the basis for the determination.

#### 4.3.4 Verdict Determination

Following the conclusion of all five rounds, the system tabulates the round results as follows:

- If one party's advocate wins four or more of the five rounds (≥4/5 majority threshold), the system issues a **Clear Verdict** in favor of that party. The Clear Verdict includes a written determination summarizing the basis for the decision across all five rounds and specifying the recommended resolution or remedy.

- If neither party's advocate wins four or more rounds (i.e., the split is 3–2 or 2–3 in either direction), the system issues a **Mandatory Compromise Determination**, instructing that the parties must reach a negotiated compromise. In this instance, the system generates a compromise proposal as described in Invention 4, or returns the matter to the Mediation Phase if not yet completed.

The 4/5 majority threshold is a novel feature of the claimed system. It is specifically calibrated to require a substantial preponderance of evaluative dimensions in order to issue a unilateral verdict, thereby ensuring that close or genuinely ambiguous disputes are resolved through compromise rather than imposed determination.

#### 4.3.5 Argument Articulation Sub-Process

When a party has expressed their position poorly — whether due to lack of legal sophistication, language barriers, emotional distress at the time of submission, or incomplete articulation of their actual grievance — the system implements an Argument Articulation Sub-Process (AASP) as follows:

1. **Articulation Quality Assessment:** Prior to or at the commencement of the Research Phase, the system evaluates each party's raw submission against an Articulation Quality Threshold (AQT). The AQT assessment examines: (i) logical coherence of the submission; (ii) presence of factual specificity; (iii) clarity of the claimed remedy; and (iv) the degree to which the submission's most legally relevant points have been identified and expressed.

2. **Articulation Strengthening:** Where a party's submission falls below the AQT, the relevant Advocate Agent is instructed to generate a Strengthened Submission — a reformulation of the party's actual position that articulates it with greater legal clarity and precision.

3. **Constraint:** The AASP operates under a strict factual non-addition constraint: the Strengthened Submission must not assert any factual claim that was not, either expressly or by clear implication, present in the party's original submission. The advocate may reorganize, clarify, elaborate upon, and legally frame the party's existing assertions, but may not fabricate, embellish, or infer new facts.

4. **Transparency:** In a preferred embodiment, the Strengthened Submission is disclosed to both parties and to the Judge Agent with a notation indicating that it is an articulation-strengthened version of the original submission.

The AASP addresses the fundamental representational equity problem that arises when one party is more articulate, legally sophisticated, or emotionally composed than the other — a systemic disadvantage inherent in all self-represented dispute resolution processes.

---

## 5. INVENTION 2 — PRE-PROCESSING NEUTRALIZATION ENGINE
## המצאה 2 — מנוע נטרול טרום-עיבוד

### 5.1 Title

**English:** Adversarial Input Neutralization Engine for AI-Mediated Dispute Resolution with Procedurally Binding Shared Frame Generation

**Hebrew:** מנוע נטרול קלט מתנגד לצורך יישוב סכסוכים מבוסס בינה מלאכותית עם יצירת מסגרת משותפת מחייבת מבחינה דיונית

### 5.2 Summary of Invention

The invention provides a computer-implemented pre-processing method and system that receives raw, emotionally charged, and potentially adversarial textual submissions from two dispute parties, subjects those submissions to an automated neutralization process, and generates a shared neutral case title and objective summary that becomes the procedurally binding shared frame of reference for all subsequent AI analysis within the arbitration pipeline. Both parties are presented with and must accept this neutralized frame before arbitration proceeds.

### 5.3 Detailed Description

#### 5.3.1 Input Reception

The system receives two raw textual inputs: Submission A (the account of Party A) and Submission B (the account of Party B). These inputs are submitted through a user interface and stored in their original, unmodified form for the record. The neutralization process operates on copies of the original submissions; originals are preserved for audit and appeal purposes.

#### 5.3.2 Neutralization Operations

The Neutralization Engine applies the following operations to each submission:

**(a) Emotional and Accusatory Language Removal:** The system identifies and removes or replaces:
- Profanity and offensive language
- Pejorative characterizations of the opposing party (e.g., "liar," "thief," "incompetent," "fraudulent") not accompanied by specific factual claims
- Expressions of emotional state that do not constitute factual claims (e.g., "I was devastated," "I am furious," "they had the audacity to")
- Rhetorical flourishes, hyperbole, and inflammatory framing
- Conclusory characterizations unsupported by stated facts (e.g., "they clearly acted in bad faith" without accompanying factual basis)

**(b) Factual Claim Extraction:** The system identifies and preserves all specific factual assertions contained within each submission, including: dates, monetary amounts, quantities, identities of persons or entities, locations, sequence of events, and terms of any applicable agreement.

**(c) Contested Claim Identification:** Where the same factual matter is described differently by each party, the neutralized output preserves both accounts as contested assertions rather than resolving the factual dispute at the pre-processing stage.

**(d) Remedy Identification:** The system identifies and preserves each party's stated desired outcome or claimed remedy.

#### 5.3.3 Shared Frame Generation

Following neutralization of each submission, the Neutralization Engine generates:

**(a) Neutral Case Title:** A concise, objective title (preferably 5–15 words) that describes the nature and subject of the dispute without favoring either party's characterization. Example: "Dispute Regarding Payment for Partially Completed Home Renovation Services."

**(b) Objective Case Summary:** A structured summary of 150–400 words that presents: (i) the undisputed background facts accepted by both parties; (ii) the key factual disputes between the parties; (iii) the nature of each party's claimed remedy; and (iv) the domain and jurisdiction of the dispute. The Objective Case Summary is written in neutral, third-person language and attributes contested claims to the asserting party rather than presenting them as established fact.

#### 5.3.4 Procedural Binding and Party Acceptance

The Neutral Case Title and Objective Case Summary are presented to both Party A and Party B through the user interface prior to the commencement of any arbitration processing. Each party is presented with an explicit acceptance mechanism (e.g., a confirmation prompt) through which they acknowledge that the neutralized frame accurately represents the subject matter of the dispute, or submit a correction request. In a preferred embodiment:

- If a party submits a correction request, the Neutralization Engine reviews the requested correction against the party's original submission to determine whether the correction constitutes a permissible clarification (i.e., the neutralized summary omitted or mischaracterized a factual claim actually present in the original submission) or an impermissible expansion (i.e., the party seeks to introduce new facts not present in the original submission).
- Permissible clarifications are incorporated and the revised summary is re-presented to both parties.
- Impermissible expansions are rejected, with an explanation provided to the requesting party.

Once both parties accept (or are deemed to have accepted following a defined acceptance window), the Neutral Case Title and Objective Case Summary become the **Procedurally Binding Shared Frame (PBSF)** for all subsequent AI analysis. All advocate agents, the judge agent, and any downstream processes within the pipeline receive the PBSF as a fixed component of their context. Advocate agents are constrained from introducing factual claims that contradict the PBSF without specific evidentiary support.

#### 5.3.5 Bias Reduction Rationale

The Neutralization Engine addresses a fundamental problem in AI dispute resolution: if AI agents receive raw adversarial submissions, the emotional register, rhetorical framing, and adversarial characterizations in those submissions will influence AI processing in ways that may systematically favor more articulate, emotionally controlled, or legally sophisticated parties. By neutralizing inputs before any AI legal analysis occurs, the system ensures that the AI's reasoning is grounded in facts rather than rhetoric, and that both parties are represented by equivalent-quality factual inputs regardless of the quality of their original submissions.

---

## 6. INVENTION 3 — SEQUENTIAL CONTEXT-ACCUMULATING DEBATE FRAMEWORK
## המצאה 3 — מסגרת דיון עם הצטברות הקשר סדרתית

### 6.1 Title

**English:** Sequential Context-Accumulating Multi-Dimensional Legal Debate Framework for AI Arbitration Systems

**Hebrew:** מסגרת דיון משפטי רב-מימדי עם הצטברות הקשר סדרתית למערכות בוררות מבוססות בינה מלאכותית

### 6.2 Summary of Invention

The invention provides a computer-implemented framework for conducting AI arbitration debates in which each successive evaluative round receives as part of its input the complete structured output of all preceding rounds, creating a progressive, multi-dimensional legal reasoning chain in which later rounds benefit from the established findings of earlier rounds. This dependent chain reasoning architecture produces legal analysis that is more coherent, non-repetitive, and progressively refined than systems in which each evaluative dimension is assessed in isolation.

### 6.3 Detailed Description

#### 6.3.1 Context Accumulation Architecture

The system maintains a **Cumulative Debate Record (CDR)** that is updated after each evaluative round. The CDR comprises:

- The Procedurally Binding Shared Frame (from Invention 2)
- The Research Summary (from the Research Phase of Invention 1)
- For each completed round: the round number, the evaluative dimension, the argument submitted by AA-A, the argument submitted by AA-B, JA's scored adjudication, JA's written rationale, and the identity of the round winner

#### 6.3.2 Sequential Injection Protocol

At the commencement of each round N (where N > 1), the system injects the CDR containing all rounds 1 through N–1 into the context window of each of the three agents (AA-A, AA-B, and JA) for that round. The injection is structured as a formatted prior-rounds summary that presents prior adjudications as established findings.

This creates a dependency chain of the following form:

- Round 1 (Factual Accuracy) proceeds with no prior round context.
- Round 2 (Fairness & Equity) proceeds with Round 1's findings as established context. Advocate agents in Round 2 may reference Round 1's factual findings to support their equity arguments.
- Round 3 (Precedent & Standards) proceeds with Rounds 1 and 2's findings as established context.
- Round 4 (Evidence & Proof) proceeds with Rounds 1, 2, and 3's findings as established context.
- Round 5 (Good Faith & Reasonableness) proceeds with Rounds 1 through 4's findings as established context.

#### 6.3.3 Precedential Effect of Prior Rounds Within Session

In a preferred embodiment, JA is instructed to treat findings from prior rounds as having intra-session precedential weight — that is, JA in Round 3 should not contradict Round 1's factual determination without explicit justification. This creates a form of intra-session consistency that prevents contradictory determinations across rounds and produces a more coherent overall legal record.

#### 6.3.4 Dimension Sequencing Rationale

The specific ordering of the five evaluative dimensions is non-arbitrary and constitutes a novel feature of the claimed system. The sequence is designed so that:

- Factual findings (Round 1) provide the evidentiary foundation upon which equity (Round 2) and precedent (Round 3) arguments are built.
- Evidence quality (Round 4) is evaluated after factual, equity, and precedent dimensions have been assessed, so that JA can weight evidentiary arguments in light of the established factual and legal landscape.
- Good faith (Round 5) is evaluated last, as it is the most holistic dimension — requiring consideration of all prior findings to assess whether each party's overall conduct was objectively reasonable.

Alternative dimension orderings are contemplated within the scope of the invention, including configurable ordering in which the system administrator or disputing parties may specify the sequence of evaluative dimensions within defined constraints.

#### 6.3.5 Progressive Refinement Effect

The sequential context-accumulation architecture produces a Progressive Refinement Effect (PRE) in which the quality and precision of argumentation and adjudication improves across rounds. Advocate agents in later rounds are constrained by the factual and legal findings of earlier rounds and therefore construct more precise, legally grounded arguments. JA's later-round adjudications are correspondingly more nuanced, as they can reference and build upon prior findings rather than treating each dimension in isolation. The PRE produces a final debate record that constitutes a coherent, internally consistent multi-dimensional legal analysis — a qualitatively superior output compared to parallel or independent per-dimension analysis.

---

## 7. INVENTION 4 — MEDIATION-GATED HYBRID ARBITRATION PIPELINE
## המצאה 4 — צינור בוררות היברידי עם שער גישור

### 7.1 Title

**English:** Mediation-Gated Two-Phase AI Dispute Resolution Pipeline with Party-Response-Weighted Arbitration Context Injection

**Hebrew:** צינור יישוב סכסוכים מבוסס בינה מלאכותית דו-שלבי עם שער גישור והזרקת הקשר משוקלל לפי תגובת הצדדים

### 7.2 Summary of Invention

The invention provides a computer-implemented two-phase dispute resolution pipeline in which access to binding AI arbitration is gated by a mandatory prior AI-generated mediation phase. In the mediation phase, the AI generates a compromise proposal and both parties vote to accept, reject, or counter the proposal. If mediation fails, each party's response to the mediation proposal is injected as weighted contextual input into the subsequent arbitration phase, such that a party's bad-faith rejection of a reasonable compromise is factored into the arbitration record.

### 7.3 Detailed Description

#### 7.3.1 Two-Phase Pipeline Architecture

The overall dispute resolution pipeline comprises two sequential phases:

**Phase 1 — Mediation Phase (Soft Resolution):** An AI-generated compromise proposal is presented to both parties for voluntary acceptance. This phase is mandatory; parties cannot proceed to arbitration without first completing the Mediation Phase.

**Phase 2 — Arbitration Phase (Hard Verdict):** If mediation fails (either or both parties reject or counter-propose without reaching agreement within defined parameters), the dispute proceeds to the adversarial multi-agent arbitration system described in Invention 1.

#### 7.3.2 AI-Generated Compromise Proposal

At the commencement of the Mediation Phase, the system — using the Procedurally Binding Shared Frame and Research Summary as inputs — generates a Compromise Proposal (CP) through a Mediator Agent (MA). The MA is instantiated with a system prompt assigning it the role of neutral mediator, explicitly prohibiting any advocacy and instructing it to identify the zone of possible agreement (ZOPA) between the parties' stated positions and generate a compromise that: (i) addresses the legitimate interests of both parties; (ii) is proportionate to the strength of each party's claim as assessed from the available information; (iii) is practically implementable; and (iv) is expressed in plain language accessible to non-legally-trained parties.

In a preferred embodiment, the MA's system prompt further instructs it to provide a brief explanation of the rationale for each element of the CP, so that parties understand why each compromise term was selected.

#### 7.3.3 Party Voting Mechanism

Each party is presented with the Compromise Proposal through the user interface and is given three response options:

**(a) Accept:** The party accepts the CP in full. If both parties select Accept, the CP becomes the binding resolution of the dispute. No arbitration phase occurs.

**(b) Reject:** The party rejects the CP outright and requests binding arbitration. The party's rejection is recorded along with any written explanation the party elects to provide.

**(c) Counter-Propose:** The party proposes modifications to the CP. Counter-proposals from both parties may trigger a second-round mediation cycle (if both parties counter-propose) or may proceed to arbitration (if one party accepts and one counter-proposes, or if defined maximum mediation rounds are exhausted).

#### 7.3.4 Mediation Response Injection

If the dispute proceeds to the Arbitration Phase following a failed mediation, each party's response to the Compromise Proposal is injected into the Arbitration Phase context as follows:

**(a) Response Record:** The full record of the Mediation Phase — including the text of the CP, each party's response (Accept/Reject/Counter), and any written explanation provided by each party — is included in the CDR from the commencement of the Arbitration Phase.

**(b) Weighted Context Injection:** In a preferred embodiment, the Judge Agent's system prompt in the Arbitration Phase includes an instruction that the parties' mediation responses are relevant context for the assessment of good faith and reasonableness (Round 5 — Good Faith & Reasonableness). The JA is not instructed to penalize rejection per se, but is instructed that a party's rejection of a compromise that, in retrospect, closely resembles the arbitration outcome is relevant to that party's good faith.

**(c) Advocate Agent Access:** Both advocate agents receive the Mediation Phase record and may reference their client's response to the CP in constructing their arbitration arguments, particularly in the Good Faith & Reasonableness round.

#### 7.3.5 Hybrid Resolution Architecture Rationale

The mediation-gated architecture reflects a deliberate policy choice embedded in the system design: that voluntary resolution through compromise is preferable to imposed determination, and that the prospect of a more favorable compromise should be explored before the finality of arbitration is invoked. The injection of mediation responses into the arbitration record creates a structural incentive for parties to engage with the mediation phase in good faith, as bad-faith rejection of a reasonable compromise will be visible to the arbitration system and may adversely affect the rejecting party's outcome in the Good Faith & Reasonableness round.

---

## 8. CLAIMS DRAFT / טיוטת תביעות

*Note to patent attorney: The following claims are a first draft for attorney review and should not be filed without professional review, revision, and amendment. Claims are drafted as independent and dependent claims for each invention grouping. Claim numbers are provisional and will require renumbering upon formal filing.*

---

### CLAIMS — INVENTION 1: Adversarial Multi-Agent Arbitration System

**Claim 1 (Independent — Method)**
A computer-implemented method for resolving disputes between a first party and a second party, the method comprising:
receiving, by a computing system, a first submission from the first party and a second submission from the second party, each submission describing the first or second party's account of a dispute;
instantiating, by the computing system, a first advocate agent implemented as a large language model (LLM) instance assigned to represent the first party, a second advocate agent implemented as an LLM instance assigned to represent the second party, and a judge agent implemented as an LLM instance assigned to adjudicate arguments presented by the first advocate agent and the second advocate agent;
conducting, by the computing system, a plurality of structured evaluative rounds, each round corresponding to a distinct evaluative dimension selected from the group comprising factual accuracy, fairness and equity, precedent and standards, evidence and proof, and good faith and reasonableness;
in each evaluative round, receiving from the first advocate agent a first argument and from the second advocate agent a second argument, each argument addressing the evaluative dimension of that round;
in each evaluative round, receiving from the judge agent a scored adjudication identifying a winning argument for that round;
tabulating, by the computing system, the results of all evaluative rounds; and
generating, by the computing system, a verdict output based on the tabulated results, wherein a verdict in favor of one party is issued when that party's advocate agent wins a threshold number of evaluative rounds.

**Claim 2 (Dependent on Claim 1)**
The method of claim 1, wherein the threshold number of evaluative rounds is at least four of five total evaluative rounds.

**Claim 3 (Dependent on Claim 1)**
The method of claim 1, wherein when neither party's advocate agent wins the threshold number of evaluative rounds, the verdict output comprises a mandatory compromise determination.

**Claim 4 (Dependent on Claim 1)**
The method of claim 1, further comprising:
prior to the plurality of structured evaluative rounds, executing a research phase comprising: extracting factual claims from each submission; identifying verifiable facts among the extracted claims; mapping contradictions between the first and second submissions; and assembling domain-specific legal context applicable to the dispute; and
providing outputs of the research phase to both the first advocate agent and the second advocate agent as research context.

**Claim 5 (Dependent on Claim 1)**
The method of claim 1, further comprising:
assessing an articulation quality of at least one of the first submission or the second submission against an articulation quality threshold;
when the articulation quality of the first submission falls below the articulation quality threshold, generating by the first advocate agent a strengthened submission that reformulates the first party's position with greater legal clarity without asserting any factual claim not present in the first submission; and
using the strengthened submission in place of the first submission in the plurality of structured evaluative rounds.

**Claim 6 (Dependent on Claim 1)**
The method of claim 1, wherein the judge agent adjudicates arguments in at least one evaluative round without knowledge of which argument was submitted by the first advocate agent and which argument was submitted by the second advocate agent.

**Claim 7 (Independent — System)**
A system for AI-implemented dispute resolution, the system comprising:
one or more processors; and
one or more non-transitory computer-readable media storing instructions that, when executed by the one or more processors, cause the system to perform operations comprising:
instantiating a first advocate agent, a second advocate agent, and a judge agent each implemented as large language model instances with distinct role-defining system prompts;
conducting a plurality of evaluative rounds each corresponding to a distinct legal evaluative dimension;
in each round, collecting arguments from the first advocate agent and second advocate agent addressing the evaluative dimension for that round, and collecting a scored adjudication from the judge agent; and
determining a dispute resolution outcome based on a tabulation of round results across all evaluative rounds.

**Claim 8 (Dependent on Claim 7)**
The system of claim 7, wherein all three agents are instantiated from the same underlying LLM differentiated by system prompt.

**Claim 9 (Independent — Computer-Readable Medium)**
A non-transitory computer-readable medium storing instructions that, when executed by one or more processors, cause a computing system to: assign a distinct AI advocate agent to each of two parties to a dispute; conduct five structured debate rounds across five distinct legal evaluative dimensions; adjudicate each round through a neutral AI judge agent; and determine a verdict based on a majority threshold of rounds won by either party's advocate.

---

### CLAIMS — INVENTION 2: Pre-Processing Neutralization Engine

**Claim 10 (Independent — Method)**
A computer-implemented method for pre-processing dispute submissions for AI-mediated arbitration, the method comprising:
receiving, by a computing system, a first submission from a first party and a second submission from a second party, each submission comprising adversarial, emotionally charged, or accusatory natural language text;
applying, by the computing system, a neutralization process to each submission, the neutralization process comprising: removing emotional and accusatory language; extracting and preserving factual claims; and identifying contested factual matters;
generating, by the computing system, a shared neutral case title and an objective case summary representing the subject matter of the dispute in neutral third-person language;
presenting the shared neutral case title and objective case summary to both the first party and second party through a user interface; and
upon acceptance by both parties, designating the shared neutral case title and objective case summary as a procedurally binding shared frame for all subsequent AI analysis of the dispute.

**Claim 11 (Dependent on Claim 10)**
The method of claim 10, further comprising:
receiving a correction request from at least one of the first party or second party regarding the shared neutral case title or objective case summary;
determining whether the correction request constitutes a permissible clarification of factual claims present in the original submission or an impermissible expansion introducing new factual claims;
incorporating the correction if permissible; and
rejecting the correction if impermissible.

**Claim 12 (Dependent on Claim 10)**
The method of claim 10, wherein designating the procedurally binding shared frame comprises constraining all AI advocate agents and judge agents operating downstream in the arbitration pipeline from asserting factual claims that contradict the procedurally binding shared frame without specific evidentiary support.

**Claim 13 (Dependent on Claim 10)**
The method of claim 10, wherein the neutralization process further comprises identifying each party's stated desired remedy and preserving the identified remedy in the objective case summary.

**Claim 14 (Independent — System)**
A system for neutralizing adversarial text inputs for AI dispute resolution, the system comprising one or more processors and non-transitory computer-readable media storing instructions that cause the system to: receive dual adversarial textual submissions; apply automated neutralization removing emotional, accusatory, and rhetorical content while preserving factual claims; generate a procedurally binding shared frame presented to and accepted by both parties prior to AI processing; and inject the procedurally binding shared frame as fixed context into all downstream AI agent operations.

---

### CLAIMS — INVENTION 3: Sequential Context-Accumulating Debate Framework

**Claim 15 (Independent — Method)**
A computer-implemented method for conducting multi-dimensional AI arbitration debate, the method comprising:
maintaining a cumulative debate record that is updated after each completed evaluative round, the cumulative debate record comprising the structured output of each completed round including arguments submitted, scored adjudications, and written adjudication rationales;
at the commencement of each evaluative round after the first, injecting the cumulative debate record containing all prior round outputs into the context provided to each AI agent participating in that round;
instructing the judge agent to treat adjudications from prior rounds as having intra-session precedential weight; and
conducting evaluative rounds in a defined sequence selected such that findings from earlier rounds provide evidentiary or analytical foundation for later rounds.

**Claim 16 (Dependent on Claim 15)**
The method of claim 15, wherein the defined sequence comprises: a first round assessing factual accuracy; a second round assessing fairness and equity; a third round assessing precedent and standards; a fourth round assessing evidence and proof; and a fifth round assessing good faith and reasonableness.

**Claim 17 (Dependent on Claim 15)**
The method of claim 15, wherein injecting the cumulative debate record comprises formatting prior round outputs as a structured prior-rounds summary that presents prior adjudications as established findings available to advocate agents for reference in constructing later-round arguments.

**Claim 18 (Independent — System)**
A system for sequential context-accumulating AI debate, the system comprising one or more processors and non-transitory computer-readable media storing instructions that cause the system to: maintain a running cumulative record of all completed evaluative round outputs; inject the cumulative record into the working context of all participating AI agents at the commencement of each successive evaluative round; and conduct evaluative rounds in a sequence wherein each round's evaluative dimension is analytically dependent on the findings of prior rounds.

---

### CLAIMS — INVENTION 4: Mediation-Gated Hybrid Arbitration Pipeline

**Claim 19 (Independent — Method)**
A computer-implemented method for two-phase AI dispute resolution, the method comprising:
prior to commencing arbitration proceedings, conducting a mandatory mediation phase comprising: generating, by a mediator AI agent, a compromise proposal based on the submissions of both parties; presenting the compromise proposal to both parties through a user interface; and receiving from each party a response to the compromise proposal, the response comprising one of: acceptance, rejection, or counter-proposal;
if both parties accept the compromise proposal, resolving the dispute in accordance with the compromise proposal without proceeding to arbitration;
if mediation fails to produce bilateral acceptance, proceeding to an arbitration phase; and
in the arbitration phase, injecting the mediation phase record comprising the compromise proposal and each party's response as contextual input into the arbitration proceedings.

**Claim 20 (Dependent on Claim 19)**
The method of claim 19, wherein injecting the mediation phase record comprises including each party's response to the compromise proposal as weighted context in the assessment of good faith and reasonableness by a neutral judge AI agent in the arbitration phase.

**Claim 21 (Dependent on Claim 19)**
The method of claim 19, further comprising providing each party's AI advocate agent access to the mediation phase record for use in constructing arguments in the good faith and reasonableness evaluative round of the arbitration phase.

**Claim 22 (Dependent on Claim 19)**
The method of claim 19, wherein the compromise proposal generated by the mediator AI agent includes a written rationale for each compromise term specifying why that term was selected as consistent with the interests of both parties.

**Claim 23 (Dependent on Claim 19)**
The method of claim 19, further comprising, upon receiving at least one counter-proposal from a party, conducting one or more additional mediation cycles before proceeding to the arbitration phase.

**Claim 24 (Independent — System)**
A system for mediation-gated AI arbitration, the system comprising one or more processors and non-transitory computer-readable media storing instructions that cause the system to: gate access to AI arbitration proceedings behind a mandatory prior AI-generated mediation phase; generate a compromise proposal through a neutral mediator AI agent; collect voting responses from both disputing parties; resolve the dispute through the compromise proposal if bilateral acceptance is achieved; and, upon mediation failure, inject each party's mediation response as weighted contextual input into subsequent arbitration proceedings.

---

## 9. DRAWINGS DESCRIPTION / תיאור ציורים

*Note: The following descriptions specify the diagrams that should be prepared by a patent illustrator and filed with the patent application. Drawings should be prepared in compliance with USPTO Rule 37 C.F.R. § 1.84 and EPO Rule 46 EPC.*

**FIG. 1 — System Architecture Overview**
A block diagram illustrating the overall system architecture, showing: the user interface layer (Party A and Party B input terminals); the Pre-Processing Neutralization Engine (Invention 2); the Research Phase module; the three AI agent instances (Advocate Agent A, Advocate Agent B, Judge Agent); the Cumulative Debate Record store; the Mediation Phase module (Mediator Agent); and the Verdict Generation module. Arrows indicate data flow between components, with the neutralization output feeding into both the research phase and all agent contexts.

**FIG. 2 — Pre-Processing Neutralization Engine Process Flow**
A flowchart illustrating the detailed process flow of the Neutralization Engine (Invention 2): input reception from Party A and Party B; emotional/accusatory language removal; factual claim extraction; contested claim identification; remedy identification; shared frame generation; party presentation and acceptance interface; correction request handling (permissible vs. impermissible); and Procedurally Binding Shared Frame designation.

**FIG. 3 — Adversarial Multi-Agent Debate Round Architecture**
A diagram illustrating the structure of a single evaluative debate round, showing: context injection (PBSF + Research Summary + Cumulative Debate Record); parallel argument generation by AA-A and AA-B; argument anonymization step; JA scoring and adjudication; and CDR update with round output. Illustrates both the input and output structure of each round.

**FIG. 4 — Sequential Context Accumulation Across Five Rounds**
A timeline/ladder diagram illustrating the sequential injection of prior-round context across all five evaluative rounds (Invention 3). Shows Round 1 proceeding without prior context; Round 2 receiving Round 1 output; Round 3 receiving Rounds 1–2 output; Round 4 receiving Rounds 1–3 output; Round 5 receiving Rounds 1–4 output. Visually demonstrates the expanding context window and the dependent reasoning chain.

**FIG. 5 — Verdict Determination Logic**
A decision tree diagram illustrating the verdict determination process: tallying rounds won per party; decision node at ≥4 rounds won by one party (Clear Verdict branch) vs. less than 4 rounds won by either party (Mandatory Compromise branch).

**FIG. 6 — Mediation-Gated Hybrid Pipeline**
A flowchart illustrating the two-phase pipeline (Invention 4): dispute intake → neutralization → research → mediation phase (CP generation → party voting → response collection) → decision node (bilateral acceptance → resolution; failure → arbitration phase) → arbitration phase with mediation record injection → verdict.

**FIG. 7 — Argument Articulation Sub-Process**
A flowchart illustrating the AASP (Invention 1, Section 4.3.5): submission quality assessment → AQT comparison → below threshold decision → strengthening generation with factual non-addition constraint verification → disclosure to parties and judge.

**FIG. 8 — Mediation Response Weighted Injection**
A diagram illustrating the specific mechanism by which mediation phase responses are injected into the arbitration phase CDR as weighted context, showing the Round 5 (Good Faith & Reasonableness) connection as the primary injection point.

---

## 10. PRIOR ART DIFFERENTIATION / הבחנה מהאמנות הקודמת

### 10.1 Existing Online Dispute Resolution (ODR) Platforms

**What exists:** Platforms such as Modria (now Tyler Technologies), FairClaims, Resolver, and eBay's Resolution Center provide structured online interfaces for dispute resolution. These platforms typically facilitate communication between parties, provide structured forms for presenting claims, and in some cases use decision trees or rule-based logic to suggest resolutions.

**What is novel in the present inventions:** None of the above platforms employ large language model AI agents in advocate roles. None implement adversarial multi-agent architectures. None conduct structured multi-round evaluative debates. None apply neutralization pre-processing. None implement sequential context accumulation. None gate arbitration behind AI-generated mediation.

### 10.2 AI Legal Research and Document Analysis Tools

**What exists:** Tools such as Harvey AI, Casetext CoCounsel, LexisNexis AI, and Thomson Reuters AI perform legal research, document summarization, contract analysis, and legal question-answering using large language models. These tools operate as single-agent systems providing legal information to human lawyers.

**What is novel:** The present inventions deploy AI agents as party advocates — not as research assistants — and implement a multi-agent adversarial architecture in which agents argue against each other before a neutral AI adjudicator. No existing legal AI tool operates in this adversarial, multi-agent, advocate-and-judge architecture.

### 10.3 Multi-Agent LLM Frameworks

**What exists:** General-purpose multi-agent orchestration frameworks including AutoGen (Microsoft), CrewAI, MetaGPT, LangGraph, and similar systems enable the coordination of multiple LLM agents for collaborative task completion. These frameworks support agent role assignment, inter-agent communication, and sequential or parallel task execution.

**What is novel:** While the present inventions may be implemented using such frameworks as an underlying technical substrate, the inventions themselves are distinguished by: (i) adversarial rather than collaborative agent roles; (ii) a structured legal evaluative dimension architecture; (iii) a neutral judge agent role; (iv) the specific majority-threshold verdict mechanism; (v) the argument articulation sub-process; (vi) the neutralization pre-processing step; (vii) the sequential context-accumulating architecture with intra-session precedential weight; and (viii) the mediation-gated hybrid pipeline. None of these features exist in general-purpose multi-agent frameworks.

### 10.4 AI Mediation and Negotiation Systems

**What exists:** Academic research on automated negotiation (e.g., work by Carrie Cai, negotiation systems from ICTAI and AAMAS communities) and limited commercial tools explore AI-assisted negotiation. Some systems generate suggested compromise positions.

**What is novel:** The present Invention 4 is distinguished by the mandatory mediation-gating architecture (parties cannot bypass mediation to reach arbitration), the specific voting mechanism (accept/reject/counter), the procedural injection of mediation responses into the subsequent arbitration record as weighted context, and the specific connection between mediation rejection and good faith assessment in arbitration. No prior system implements this specific two-phase gating architecture with downstream context injection.

### 10.5 Structured AI Debate Systems

**What exists:** Academic and research applications of structured AI debate have been explored, notably OpenAI's "AI Safety via Debate" (Irving et al., 2018) and similar work. These systems explore whether AI judges can identify truthful arguments in debates between AI systems arguing opposing positions. Various debate competition tools and AI-assisted debate coaching tools also exist.

**What is novel:** The present Invention 1 is distinguished from AI safety debate systems by its application to legal dispute resolution, its specific five-dimension evaluative architecture aligned with legal doctrine, its use of real human party submissions (rather than abstract propositions), its implementation of the research phase, the argument articulation sub-process, the sequential context accumulation architecture, and the specific verdict threshold mechanism. No prior AI debate system has been designed for or applied to real-party commercial dispute resolution.

---

## 11. PCT AND ILPO FILING STRATEGY / אסטרטגיית הגשה PCT ו-ILPO

### 11.1 Overview

The inventions disclosed herein merit a multi-jurisdictional filing strategy given their commercial applicability across global markets with significant legal technology adoption, including the United States, Israel, the European Union, the United Kingdom, Canada, Australia, and Singapore. The following strategy is recommended for attorney review.

### 11.2 Provisional Application (USPTO)

**Recommendation:** File a U.S. Provisional Patent Application (35 U.S.C. § 111(b)) as the earliest possible priority date anchor. The provisional application need not include formal claims and is not examined, but establishes a priority date for all inventions described herein. The provisional application should include all four inventions to preserve priority across the full scope of the disclosure.

**Timing:** File the provisional application as soon as possible — certainly before any public disclosure, commercial launch, or demonstration of the platform to potential customers, investors, or press. Under U.S. law, a 12-month grace period applies to certain inventor disclosures, but relying on this grace period is risky and should be avoided.

**Cost:** Provisional applications are significantly less expensive than formal applications and provide 12 months in which to prepare the formal non-provisional application.

### 11.3 PCT Application (Patent Cooperation Treaty)

**Recommendation:** Within 12 months of the provisional filing date, file a PCT international application (under the Patent Cooperation Treaty administered by WIPO) designating all member states of interest. A PCT application: (i) delays national-phase entry costs for up to 30 months from the priority date; (ii) provides an International Search Report (ISR) and Written Opinion that assess novelty and inventive step; and (iii) preserves the option to enter national phase in all PCT member states.

**Designated Offices:** At minimum, designate: the United States (USPTO), Israel (ILPO), the European Patent Office (EPO, covering EU member states and others), United Kingdom (UKIPO), Canada (CIPO), Australia (IP Australia), Singapore (IPOS).

**PCT Chapter II:** Consider filing a demand for International Preliminary Examination (Chapter II) to obtain a favorable preliminary opinion on patentability before incurring national-phase costs.

### 11.4 Israeli Patent Office (ILPO / רשות הפטנטים הישראלית)

**Background:** Israel is a signatory to the PCT and the Paris Convention. The Israeli Patent Law 5727-1967 and its amendments govern patent eligibility. Israeli patent law recognizes software-implemented inventions and methods as patentable where they produce a technical effect, consistent with the technical character requirement interpreted by Israeli courts.

**Specific Considerations for Israel:**
- Israeli patent practice closely follows EPO practice in many respects. The technical character of the inventions should be emphasized — the inventions are not merely abstract ideas but specific technical methods for processing natural language inputs, orchestrating AI agent interactions, and generating structured legal outputs.
- Israel has a strong legal technology and AI development ecosystem, and the inventions have particular commercial relevance in the Israeli market.
- The ILPO examination process is relatively efficient, and Israeli patents are enforceable and commercially valuable.
- Consider whether Hebrew-language claims or descriptions are advantageous for Israeli prosecution; consult with Israeli patent counsel on this point.

**Recommended approach:** Enter the Israeli national phase through the PCT route no later than 30 months from the priority date. Engage Israeli patent counsel familiar with both AI/software patent prosecution and the legal technology sector.

### 11.5 European Patent Office (EPO)

**Specific Considerations for Europe:**
- The EPO applies a technical character test to software-implemented inventions under Article 52 EPC. Claims should be drafted to emphasize the technical nature of the process (e.g., specific data processing steps, computational architecture, NLP operations) rather than abstract legal or procedural concepts.
- The EPO's Boards of Appeal have developed substantial jurisprudence on computer-implemented inventions (CII). Counsel experienced in EPO CII prosecution is recommended.
- Method claims and system claims should be filed in parallel. Claim language should reference specific technical steps rather than functional or results-based language.

### 11.6 United States (USPTO)

**Specific Considerations for the U.S.:**
- Under 35 U.S.C. § 101 and the Alice/Mayo framework, software-implemented method claims face eligibility challenges at the USPTO. Claims must be directed to a specific, concrete technical improvement rather than an abstract idea.
- Claims should be drafted to emphasize the specific technical architecture (multi-agent LLM orchestration, specific context injection protocols, neutralization processing operations) rather than high-level functional descriptions.
- The argument articulation sub-process and sequential context accumulation features are technically specific and should anchor independent claims.
- Consider filing continuation applications to pursue broader claim scope as the technology matures and as USPTO § 101 jurisprudence evolves.

### 11.7 Timing Summary

| Milestone | Recommended Timing |
|---|---|
| Provisional Application (USPTO) | Immediately — before any public disclosure |
| PCT Application | Within 12 months of provisional filing |
| PCT Chapter II Demand | Within 22 months of priority date (if desired) |
| National Phase Entry (US, IL, EP, etc.) | By 30 months from priority date |
| Israeli National Phase | By 30 months from priority date (ILPO) |

---

## 12. TRADE SECRET RECOMMENDATIONS / המלצות סוד מסחרי

Not all valuable intellectual property in The Arbitrator platform should be filed as patents. Patent filings are public documents; information disclosed in a patent application becomes publicly available upon publication (typically 18 months after filing). The following elements are recommended for protection as trade secrets rather than patents, to preserve competitive advantage:

### 12.1 System Prompt Architecture

**Do NOT file:** The specific language, structure, and content of the system prompts used to instantiate Advocate Agents A and B, the Judge Agent, the Mediator Agent, and the Research Agent. These prompts are the most operationally critical elements of the system and represent significant accumulated expertise in AI prompt engineering. They are protectable as trade secrets provided they are kept confidential. Filing the specific prompt language in a patent application would expose this competitive advantage to competitors who could replicate the prompts without practicing any claimed invention.

**What to file instead:** Claims directed to the functional architecture (role assignment, adversarial instantiation, structured debate coordination) without disclosing the specific prompt language.

### 12.2 LLM Provider Selection and Configuration

**Do NOT file:** The specific LLM provider(s), model versions, temperature settings, context window management strategies, and API configuration parameters used in production. These implementation details can be changed over time and are best protected as confidential operational information.

### 12.3 Scoring Algorithms

**Do NOT file:** If proprietary scoring rubrics or weighted scoring algorithms are developed for the Judge Agent's adjudication process, these are strong candidates for trade secret protection rather than patent disclosure, particularly if they are not readily reverse-engineerable from system outputs.

### 12.4 Articulation Quality Threshold Parameters

**Do NOT file:** The specific parameters used to implement the Articulation Quality Threshold assessment — including any trained classifiers, scoring rubrics, or threshold values — should be maintained as trade secrets. The concept and functional role of the AASP are claimed in the patent; the specific implementation parameters need not be.

### 12.5 Research Phase Source Integration

**Do NOT file:** The specific external data sources, APIs, databases, or retrieval systems integrated into the Research Phase. Competitor access to this information could facilitate replication of the research functionality without practicing the broader claimed inventions.

### 12.6 User Behavior and Outcome Data

**Do NOT file:** Insights derived from operating the platform regarding typical dispute patterns, party behavior during mediation, correlation between round results and final outcomes, and similar operational data. This data constitutes a valuable proprietary dataset that can be used to improve the system and is protectable as a trade secret (and potentially as a database right in relevant jurisdictions).

### 12.7 Trade Secret Protection Measures

To maintain the status of the above items as trade secrets, the following measures are recommended:
- Execute non-disclosure agreements (NDAs) with all employees, contractors, and service providers with access to the above information.
- Implement technical access controls limiting access to system prompts and configuration parameters to essential personnel.
- Maintain written records documenting the confidential treatment of each trade secret.
- Include trade secret provisions in all vendor contracts with LLM API providers.
- Regularly audit access logs and confidentiality procedures.

---

## 13. INVENTOR DECLARATIONS PLACEHOLDER / הצהרות ממציאים

*The following section must be completed by each named inventor and reviewed by patent counsel before filing.*

### 13.1 Inventor Information (To Be Completed)

For each inventor, the following information is required:

| Field | Inventor 1 | Inventor 2 | [Additional] |
|---|---|---|---|
| Full Legal Name | | | |
| Residential Address | | | |
| Citizenship | | | |
| Contribution to Invention 1 | | | |
| Contribution to Invention 2 | | | |
| Contribution to Invention 3 | | | |
| Contribution to Invention 4 | | | |
| Percentage Inventive Contribution | | | |

### 13.2 Inventorship Determination Note

Under U.S. law (35 U.S.C. § 115), only those individuals who made a genuine intellectual contribution to at least one claimed invention may be named as inventors. Employees or contractors who merely reduced the invention to practice under direction (e.g., software engineers implementing a design they did not conceive) are not inventors unless they also contributed to the conception of the claimed invention. Inventorship determination should be reviewed by patent counsel.

### 13.3 Assignment

Each named inventor should execute an assignment of all rights in the inventions to the designated corporate assignee. Assignment documents should be recorded with each relevant patent office.

---

## 14. ADDITIONAL NOTES FOR PATENT COUNSEL / הערות נוספות לעורך הדין

### 14.1 Continuation Strategy

Given the rapid pace of development in AI systems, a continuation application strategy is recommended. After filing the initial application, continuation and continuation-in-part (CIP) applications can be used to pursue additional claims as the system evolves, capturing improvements such as: additional evaluative dimensions; alternative verdict threshold mechanisms; integration with external legal databases; multimodal input support (audio, document, image); jurisdiction-specific adaptations; and new mediation round structures.

### 14.2 Design Around Risk

The primary design-around risk is that a competitor implements the same functional architecture using a different number of evaluative rounds, a different threshold, or a different sequence of dimensions. Claims should be drafted at both the specific (five rounds, 4/5 threshold) and generic (plurality of rounds, majority threshold) levels to provide both narrow defensible claims and broader scope claims.

### 14.3 International Considerations

The commercialization of AI-mediated legal dispute resolution may be subject to regulation in certain jurisdictions. Patent counsel should be aware that the commercial operation of the platform may require coordination with regulatory counsel (particularly in the European Union under the EU AI Act, and in jurisdictions where legal services are regulated). However, regulatory status does not affect patent eligibility.

### 14.4 Prior Art Search

A professional prior art search (Freedom-to-Operate and patentability search) should be conducted by patent counsel prior to filing. The inventors have identified the prior art described in Section 10 based on their knowledge of the field, but a professional search may identify additional relevant prior art that should be reviewed and distinguished.

---

*End of Patent Invention Disclosure Document*
*סוף מסמך גילוי ההמצאה לצורך רישום פטנט*

---

**Document Version:** 1.0 Draft for Attorney Review
**Prepared By:** [Inventor / Company Representative]
**Date Prepared:** [DATE]
**Classification:** Confidential — Attorney-Client Privileged
**Next Action:** Submit to patent counsel for review, professional prior art search, and preparation of formal patent application
