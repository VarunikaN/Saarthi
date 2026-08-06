# Saarthi

Saarthi is a citation-grounded navigator for Indian student scholarships, public-benefit schemes, and health-insurance information. Each response is anchored to a visible official source and directs users to the relevant verification channel.

## Features

- Official-source corpus for scholarships, benefit discovery, PM-JAY, and National Health Authority resources
- Citation-first retrieval with source title, domain, URL, and review date
- Supabase text retrieval with row-level security and public read-only RPC functions
- Optional OpenRouter generation using an open-source Qwen model
- Optional Ollama-compatible self-hosted inference
- Safety controls for unsupported questions, eligibility decisions, health coverage, legal advice, and prompt injection
- Retrieval evaluation suite and production-ready Vercel configuration

## Architecture

The Next.js application receives a question through a server-side route handler. Supabase retrieves official source chunks through a read-only search function. When an inference endpoint is configured, the question and retrieved excerpts are sent to the model with source-constrained instructions. Every response returns the cited source records. A deterministic citation-first response is used when no inference endpoint is configured.

## Requirements

- Node.js 20 or later
- Supabase project
- Vercel account for production hosting
- OpenRouter API key or an Ollama-compatible endpoint for generated answers

## Environment

Copy `.env.example` to `.env.local` and configure the required values.

| Variable | Purpose |
| --- | --- |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_ANON_KEY` | Read-only retrieval access |
| `OPENROUTER_API_KEY` | OpenRouter inference access |
| `OPENROUTER_MODEL` | OpenRouter model, default `qwen/qwen3-8b` |
| `OLLAMA_BASE_URL` | Optional Ollama-compatible inference endpoint |
| `OLLAMA_MODEL` | Optional Ollama model identifier |
| `SUPABASE_SERVICE_ROLE_KEY` | Restricted ingestion and vector-retrieval operations |

## Supabase Setup

Run `supabase/schema.sql` in the Supabase SQL editor. The script creates the source-chunk table, full-text retrieval function, pgvector retrieval function, row-level security policy, public RPC grants, and initial official-source corpus.

The source catalog can be extended through `lib/sources.ts`. Vector ingestion requires the service-role key and an embedding provider.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Validation

```bash
npm run lint
npm run evaluate
npm run build
```

The retrieval evaluation verifies that representative questions retrieve their intended official source first.

## Deployment

Deploy to Vercel with the environment values above configured for Production. The production application is available at:

https://public-service-navigator.vercel.app

## Official Sources

| Area | Portals |
| --- | --- |
| Education | National Scholarship Portal, University Grants Commission, AICTE, SWAYAM |
| Employment | National Career Service, Apprenticeship India, EPFO, ESIC, e-Shram |
| Identity and documents | UIDAI, DigiLocker |
| Finance and tax | PFRDA, Income Tax Department e-Filing |
| Housing and food | PMAY Urban, National Food Security Act Portal |
| Public services | myScheme, PM-KISAN, Parivahan Sewa |
| Health | Ayushman Bharat PM-JAY, National Health Authority |

Each portal URL is available in the source ledger on the application home page.

## Scope and Safety

Saarthi provides information discovery and source navigation. Eligibility, coverage, application approval, legal interpretation, and medical decisions require confirmation through official channels or qualified professionals. The source corpus requires periodic review for policy, timeline, and procedure changes.
