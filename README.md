# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

Environment variables (Firebase)
--------------------------------

This project reads Firebase configuration from Vite environment variables. Copy `.env.example` to `.env.local` and fill in the values from your Firebase project settings. Vite exposes variables prefixed with `VITE_` to client code via `import.meta.env`.

Example:

1. Copy the example:

	cp .env.example .env.local

2. Fill in the values in `.env.local` and restart the dev server.

Email / Contact form setup
--------------------------

This project uses EmailJS for the client-side contact form. Add the following keys to your Vite env file (for example `.env.local`) so they are available at runtime via `import.meta.env`:

VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key

After adding them, restart the dev server. Keep these values secret in production; consider sending emails via a backend if you need stricter security.

Troubleshooting
---------------

If you see the error:

```
❌ Something went wrong: Email service is not configured. Make sure VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID and VITE_EMAILJS_PUBLIC_KEY are set.
```

Then your Vite environment variables are not available at runtime. Fixes:

- Create a `.env.local` (or `.env`) in the project root and add the three keys from `.env.example`.
- Restart the Vite dev server after changing env files.
- Make sure the variables are prefixed with `VITE_` (Vite only exposes variables starting with `VITE_` to client code).
- For production, set the variables in your deployment environment (don't commit secrets to the repo).

Quick start (if you add the loader component)
--------------------------------------------

1. Install dependencies (if you haven't already):

	npm install

2. Ensure framer-motion is installed (this project already lists it in package.json). If not present run:

	npm install framer-motion

3. Start the dev server:

	npm run dev
