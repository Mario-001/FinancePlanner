# FinancePlanner

Personal finance tracker built with Vue 3, Vite, Tailwind CSS v4 and Firebase
(Authentication + Firestore).

## Features

- Email/password sign up and sign in
- Add income and expense transactions with category, date and note
- Live balance, income and expense totals
- Spending breakdown by category
- Filterable transaction list with delete
- Per-user data in Firestore, synced in real time

## Running it

```bash
npm install
npm run dev
```

Open the URL Vite prints (default http://localhost:5173).

Without Firebase credentials the app starts in **local mode**: it signs you in
automatically and stores transactions in `localStorage`, so you can use the UI
right away. A banner at the top tells you when you're in this mode.

## Connecting Firebase

1. Create a project at https://console.firebase.google.com
2. **Build > Authentication > Sign-in method** — enable *Email/Password*
3. **Build > Firestore Database** — create a database (production mode is fine)
4. **Project settings > Your apps** — add a Web app and copy the config values
5. Create `.env.local` from the template and paste them in:

   ```bash
   cp .env.example .env.local
   ```

6. Publish the security rules in `firestore.rules` (paste them into
   **Firestore > Rules**, or run `firebase deploy --only firestore:rules`)
7. Restart the dev server — the banner disappears and the sign-in screen appears

## Data model

```
users/{uid}/transactions/{id}
  type      "income" | "expense"
  amount    number
  category  string
  note      string
  date      "YYYY-MM-DD"
  createdAt number (epoch ms)
```

## Build

```bash
npm run build
```
