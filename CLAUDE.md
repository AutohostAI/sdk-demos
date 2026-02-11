# Autohost SDK Demos

This repo contains example code to help developers understand how to embed and integrate the Autohost SDK into their apps.
The Autohost SDK allows PropTech companies to embed powerful KYC screening with minimal impact of the guest experience.

There are three demos in this repo:
- [Guest Portal with SDK](./src/app/registration/page.tsx): Guest registration/check in journey with info collection, e-sign, and IDV
- [Guest Portal with iFrame](./src/app/registration-embed/page.tsx): Guest check in journey fully configurable from the Autohost dashboard
- [Admin View](./src/app/dashboard/page.tsx): Admin view for property managers to review failed KYC checks

## Commands
- Development: `npm run dev`
- Build: `npm run build`
- Start: `npm run start`
- Lint: `npm run lint`

## Tech Stack
- Next.js 14 (App Router)
- React 18
- TailwindCSS
- Radix UI / Shadcn UI
- Nivo charts for data visualization

## Code Style Guidelines
- Use React functional components with hooks
- Prefer arrow functions: `const MyComponent = () => {...}`
- Use descriptive variable/function names
- Use early returns for better readability
- Use JSDoc comments for complex functions
- Organize imports: React first, then libraries, then local components
- Use proper error handling with try/catch blocks
- Follow JSX element indentation patterns in existing code

## Project Structure
This project demonstrates Autohost SDK integration with:
- Verification UI components
- Admin Dashboard components 
- Guest Portal embedding capabilities