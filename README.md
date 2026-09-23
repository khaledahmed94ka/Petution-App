# 🐾 Petution — Veterinary Clinic Management System

> A modern, full-featured clinic management web application built for veterinary practices. Manage clients, pets, visits, invoices, expenses, products, team, analytics, vaccine passports, and clinical SOAP records — all in one place.

🔗 **Live Demo:** [https://khaledahmed94ka.github.io/Petution-App/](https://khaledahmed94ka.github.io/Petution-App/)  
🔗 **Render.com:** [https://petution-app-ne6h.onrender.com](https://petution-app-ne6h.onrender.com)

---

## ✨ Features

### 📋 Core Modules

| Module | Capabilities |
|--------|-------------|
| **Dashboard** | Revenue banner, 7 clinic pulse KPIs, 4 attention alert cards, quick-action shortcuts, live visit queue, **Getting Started onboarding checklist** with progress bar |
| **Clients** | Add/search/filter clients, phone management with WhatsApp flag, tag-based filtering, CSV export & import |
| **Pets** | Add pets with species/breed/health info, owner linking, species chip filter, vaccination tracking, **microchip tracking**, **blood group**, **aggressive caution badges**, **deceased status marking**, **Digital Vaccine Passport**, CSV export & import |
| **Visits** | Schedule visits, state transitions (Scheduled → In-Progress → Completed / Cancelled), date & state filtering, **SOAP Medical Notes & Rx Prescriptions** |
| **Invoices** | Create invoices with product selection, discount/tax calculator, status filtering, date-range filtering, print receipt |
| **Expenses** | Full expense tracking with categories (Rent, Supplies, Salaries, Equipment, Utilities, Marketing, Other), date filtering, CSV export |
| **Products & Services** | Full CRUD (add/edit/delete), stock tracking with alerts, stock logs, separate product/service tabs, CSV export & import |
| **Analytics** | 18 live KPI cards, revenue/visit/client metrics, **Net Profit calculation (Revenue − Expenses)**, doctor & time-range filtering with dynamic data |
| **Team** | Invite members, role management (Owner/Admin/Vet/Receptionist), search & filter, invitation tracking |
| **Settings** | Organization profile management, full JSON system backup & restore, **Danger Zone with clinic workspace deletion** |

### 💉 Digital Pet Passport & Vaccine Scheduler

- **Printable Vaccination Certificate** — Official clinic-branded passport with pet identity (photo avatar, species, breed, gender, microchip #, blood group, owner info)
- **Immunization History Table** — Date given, vaccine name & manufacturer, batch/serial #, next booster due date, administering vet
- **Vaccine Shot Logger** — Pre-built vaccine catalog (Rabies, Tricat Trio FVRCP, Vanguard 7 DHPP, Nobivac DHPPi, Kennel Cough, Fel-O-Vax, Drontal Deworming)
- **Clinic Stamp & Vet Signature Block** — Professional printable format
- **Delete individual vaccine records** from the passport

### 📋 Veterinary SOAP Medical Notes & Rx Prescriptions

- **S (Subjective)** — Client complaint & patient history notes
- **O (Objective Vitals)** — Temperature (°C), Weight (kg), Heart Rate (bpm), Respiratory Rate (rpm)
- **A (Assessment)** — Primary diagnosis & differential findings
- **P (Plan & Prescriptions)** — Dynamic Rx medication editor with dosage, frequency (SID/BID/TID/PRN), and duration
- **Printable Rx Prescription Slip** — Official ℞ format with doctor signature line
- **Auto-save & update** — SOAP notes are linked to visits and can be edited after creation

### 🏥 Advanced Pet Profiles & Microchipping

- **Microchip Registration** — Chip number, implant date, implant location
- **Blood Group** — DEA 1.1+, DEA 1.1−, Type A, Type B, Type AB, Unknown
- **Health Card & Protocol Numbers** — For clinic record keeping
- **Neutering Date & Status** — Track castration/spay with date
- **Aggressive Caution Badge** — Visual ⚠️ warning flag on pet rows
- **Deceased Status** — Mark pets as deceased with date of death, greyed-out row styling
- **Private Veterinary Notes** — Internal notes not visible to pet owners
- **Temperament** — Calm, Friendly, Shy, Nervous, Aggressive tracking

### 💰 Clinic Expenses Management

- **Expense Categories** — Rent, Supplies, Salaries, Equipment, Utilities, Marketing, Other
- **Date Filtering** — From/To date range filtering
- **Net Profit** — Analytics view subtracts total expenses from revenue
- **Full CRUD** — Add and delete individual expense entries

### 🔐 Authentication & Accounts

- **Firebase Authentication** — Google and Email/Password sign-in, sign-up, and real password-reset emails
- **Per-account data** — Each account's clinic records live in Firestore under `users/{uid}/`, and `firestore.rules` lets only that signed-in user read or write them
- **Starts signed out** — Nothing in the browser can mark someone as logged in; Firebase decides
- **Demo mode** — "Open Demo" loads a sample clinic with no account. Demo data stays in this browser, never reaches the cloud, and is wiped on exit
- **Profile Drawer** — View signed-in user info and sign out (signing out clears clinic data from the page)

### 🚀 Getting Started Onboarding

- **Collapsible Checklist Widget** — Appears at top of Dashboard
- **8-Step Progress Tracker** — "X of 8 completed (Y%)" with animated progress bar
- **Quick Action Buttons** — Each step links directly to the relevant drawer/view
- **Dismissible** — Collapse to focus on clinic operations

### 🔧 System Features

- **Multi-Workspace** — Register and switch between clinic workspace names, **delete workspaces** from Sidebar or Settings Danger Zone. (Workspaces in one account currently share the same records.)
- **Data Persistence** — Every change is saved to Firestore through one store and the screen mirrors live snapshots, so edits survive reloads and appear on other devices. Failed saves show a banner.
- **Import/Export** — CSV import/export for Clients, Pets, Products. Full JSON backup of every collection; restore merges into the clinic
- **Shopify Sync (optional)** — Off by default. A clinic can switch it on in Settings → Integrations and enter its own `*.myshopify.com` store; new clients/products are then sent with the user's Firebase ID token
- **Responsive Design** — Mobile-first layout with breakpoints at 640px, 768px, and 1024px
- **Notifications** — Bell icon with unread count, mark-all-read, persistent across sessions
- **Touch-Friendly** — 44px minimum touch targets, safe-area insets for iPhone notch, scrollable tabs

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 18** | UI framework with hooks & context |
| **Vite 5** | Build tool & dev server |
| **Lucide React** | Icon library |
| **Vanilla CSS** | Mobile-first responsive styling |
| **Firebase Auth + Firestore** | Sign-in and per-account data storage |
| **Express** | Serves the built app on Render (no data stored server-side) |
| **Vitest + Testing Library** | Unit and screen tests |
| **Playwright + Firebase emulators** | Browser tests and security-rules tests |
| **GitHub Pages** | Deployment via `gh-pages` |
| **Render.com** | Production deployment via `render.yaml` |

---

## 📁 Project Structure

```
petution-app/
├── index.html                    # Entry HTML with viewport & Google Fonts
├── vite.config.js                # Vite config (base path, dev server port)
├── render.yaml                   # Render.com deployment config
├── firestore.rules               # Firestore security rules (users/{uid}/** only)
├── firebase.json                 # Rules path + local emulator ports
├── .env.example                  # Firebase web settings to copy into .env
├── .node-version                 # Node 20.11.0 for Render
├── package.json                  # Scripts, dependencies
├── playwright.config.js          # Browser tests (demo + emulator projects)
│
├── server/
│   └── index.js                  # Express server for the built app (mock API only with ENABLE_MOCK_API=true)
│
├── tests/
│   ├── e2e/                      # Playwright browser tests
│   └── rules/                    # Firestore security rules tests (emulators)
│
├── src/
│   ├── main.jsx                  # React DOM entry point
│   ├── App.jsx                   # Root component, routing, drawer rendering
│   ├── index.css                 # Global mobile-first responsive styles
│   │
│   ├── context/
│   │   └── AppContext.jsx        # Session, clinic data mirror, and every mutation
│   │
│   ├── services/
│   │   ├── firebaseAuth.js       # Firebase init, sign-in/up/out, password reset
│   │   ├── firestoreDb.js        # Store for signed-in accounts (Firestore, live listeners)
│   │   ├── demoStore.js          # Store for demo mode (this browser only)
│   │   ├── legacyLocalData.js    # Finds records older versions left in localStorage
│   │   └── shopifySync.js        # Optional per-clinic Shopify sync
│   │
│   ├── data/
│   │   ├── collections.js        # List of stored collections, sorting
│   │   └── demoSeed.js           # Sample clinic for demo mode
│   │
│   ├── components/
│   │   ├── Sidebar.jsx           # Desktop sidebar + mobile off-canvas nav
│   │   ├── Header.jsx            # Top bar with breadcrumb & notifications
│   │   ├── BottomNav.jsx         # Mobile bottom tab navigation
│   │   │
│   │   └── drawers/
│   │       ├── AddClientDrawer.jsx
│   │       ├── AddPetDrawer.jsx        # Extended: microchip, blood group, aggression, death
│   │       ├── AddVisitDrawer.jsx
│   │       ├── AddInvoiceDrawer.jsx
│   │       ├── AddExpenseDrawer.jsx    # NEW — Expense logging
│   │       ├── AddItemDrawer.jsx       # Products/Services CRUD
│   │       ├── AddVaccineDrawer.jsx    # NEW — Record vaccine shots
│   │       ├── PetPassportDrawer.jsx   # NEW — Digital Pet Vaccination Passport
│   │       ├── SOAPNoteDrawer.jsx      # NEW — SOAP Clinical Notes & Rx Prescriptions
│   │       ├── ImportModalDrawer.jsx   # CSV/JSON file import
│   │       └── InviteMemberDrawer.jsx
│   │
│   ├── views/
│   │   ├── DashboardView.jsx     # Extended: Getting Started onboarding widget
│   │   ├── ClientsView.jsx
│   │   ├── PetsView.jsx          # Extended: microchip, passport button, caution badges
│   │   ├── VisitsView.jsx        # Extended: SOAP / Rx button per visit
│   │   ├── InvoicesView.jsx
│   │   ├── ExpensesView.jsx      # NEW — Expenses dashboard
│   │   ├── ProductsView.jsx
│   │   ├── AnalyticsView.jsx     # Extended: Net Profit (Revenue − Expenses)
│   │   ├── TeamView.jsx
│   │   ├── SettingsView.jsx      # Extended: Danger Zone workspace deletion
│   │   ├── LoginView.jsx         # NEW — Authentication screen
│   │   └── RegisterClinicView.jsx
│   │
│   └── utils/
│       ├── dataExportImport.js   # CSV/JSON export & import utilities
│       └── ids.js                # Random record IDs, local dates, slugs
│
└── dist/                         # Production build output (not committed)
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and **npm** 9+

### Install & Run

```bash
# Clone the repository
git clone https://github.com/khaledahmed94ka/Petution-App.git
cd Petution-App

# Install dependencies
npm install

# Add your Firebase web settings (Firebase console → Project settings → Your apps)
cp .env.example .env

# Start development server
npm run dev
```

The app will be running at `http://localhost:3000`. Without a `.env`, sign-in is disabled and only the demo is available.

### Firebase Setup

1. In the Firebase console, enable **Authentication** → Sign-in method → **Email/Password** and **Google**.
2. Add every domain you serve the app from (e.g. `khaledahmed94ka.github.io`, your Render domain) under Authentication → Settings → **Authorized domains**.
3. Create a **Firestore** database and deploy the security rules:

```bash
npx firebase-tools login
npx firebase-tools deploy --only firestore:rules --project <your-project-id>
```

### Local Development Against Emulators

To work without touching the real project, start the Auth and Firestore emulators (needs Java 11+) and set `VITE_USE_FIREBASE_EMULATORS=true` in `.env`:

```bash
npx firebase-tools emulators:start --only auth,firestore --project demo-petution
```

### Build for Production

```bash
npm run build
```

### Deploy Options

#### Option A: Render.com (Recommended for Production)

1. Go to [dashboard.render.com](https://dashboard.render.com/)
2. Click **New +** → **Blueprints**
3. Select your repository `khaledahmed94ka/Petution-App`
4. Render loads `render.yaml` and asks for the `VITE_FIREBASE_*` values (they are built into the app, so redeploy after changing them)
5. `npm start` serves the built app. The prototype REST API is not exposed unless `ENABLE_MOCK_API=true`

#### Option B: GitHub Pages

```bash
npm run deploy
```

This runs `vite build` followed by `gh-pages -d dist`. Your local `.env` supplies the Firebase settings for this build.

---

## 🧪 Testing

```bash
npm test               # Unit + screen tests (Vitest), no Firebase needed
npm run test:e2e       # Browser tests in demo mode (Playwright)
npm run test:emulator  # Security rules + browser tests against Firebase emulators (needs Java)
```

GitHub Actions runs all three on pushes to `main` and on pull requests (`.github/workflows/ci.yml`).

---

## 📱 Responsive Breakpoints

| Breakpoint | Target | Layout |
|-----------|--------|--------|
| < 640px | Phones | Single/2-column grids, stacked headers, bottom nav, full-width drawers |
| 640px – 767px | Large phones | 2-column grids, side drawers |
| 768px – 1023px | Tablets | 3-4 column grids, horizontal filters |
| ≥ 1024px | Desktop | Sticky sidebar, full grids, desktop layout, bottom nav hidden |

---

## 💾 Data Architecture

`AppContext.jsx` holds the session and a live mirror of the clinic's data. Every change goes through one store:

- **Signed-in accounts** → Firestore, one subcollection per record type under `users/{uid}/`: `clients`, `pets`, `visits`, `products`, `invoices`, `expenses`, `vaccines`, `soapNotes`, `reminders`, `team`, `invitations`, `stockLogs`, `notifications`, `workspaces`, and `settings/global`.
- **Demo mode** → the same collections in this browser's localStorage (`petution_demo_data_v1`), cleared on exit.

Records saved in localStorage by older versions (`petution_clients`, etc.) are not used any more. If real records are found, **Settings → Data Backup & Migration** offers to upload them to your account or delete them.

### Full Backup & Restore

Export all clinic data (every collection above plus settings) as a single `.json` file from **Settings → Data Backup & Migration**. Restoring merges the file into the clinic: records with the same ID are replaced by the backup's version, and nothing else is deleted.

---

## 🗺️ Roadmap

- [ ] Billing & Subscription plans (deferred)
- [ ] Charts & graph visualizations for Analytics
- [ ] Client/Pet inline editing and deletion
- [ ] WhatsApp API integration for Chats module
- [ ] Online booking system
- [ ] Reminder system (SMS/Email for vaccine boosters)
- [x] ~~Database backend~~ → Firestore, with per-account security rules
- [x] ~~Prescription templates~~ → Implemented as SOAP Notes & Rx Prescriptions
- [x] ~~Multi-user authentication~~ → Implemented (Email, Google, plus a no-account demo)
- [ ] Separate data per workspace inside one account

---

## 📄 License

This project is private and proprietary. All rights reserved.

---

## 👤 Author

**Khaled ElGendy**  
📧 khaledahmed94.ka@gmail.com  
🔗 [GitHub](https://github.com/khaledahmed94ka)
