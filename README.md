# 🐾 Petution — Veterinary Clinic Management System

> A modern, full-featured clinic management web application built for veterinary practices. Manage clients, pets, visits, invoices, products, team, and analytics — all in one place.

🔗 **Live Demo:** [https://khaledahmed94ka.github.io/Petution-App/](https://khaledahmed94ka.github.io/Petution-App/)

---

## ✨ Features

### 📋 Core Modules

| Module | Capabilities |
|--------|-------------|
| **Dashboard** | Revenue banner, 7 clinic pulse KPIs, 4 attention alert cards, quick-action shortcuts, live visit queue |
| **Clients** | Add/search/filter clients, phone management with WhatsApp flag, tag-based filtering, CSV export & import |
| **Pets** | Add pets with species/breed/health info, owner linking, species chip filter, vaccination tracking, CSV export & import |
| **Visits** | Schedule visits, state transitions (Scheduled → In-Progress → Completed / Cancelled), date & state filtering |
| **Invoices** | Create invoices with product selection, discount/tax calculator, status filtering, date-range filtering, print receipt |
| **Products & Services** | Full CRUD (add/edit/delete), stock tracking with alerts, stock logs, separate product/service tabs, CSV export & import |
| **Analytics** | 18 live KPI cards, revenue/visit/client metrics, doctor & time-range filtering with dynamic data |
| **Team** | Invite members, role management (Owner/Admin/Vet/Receptionist), search & filter, invitation tracking |
| **Settings** | Organization profile management, full JSON system backup & restore |

### 🔧 System Features

- **Multi-Workspace** — Register and switch between multiple clinic workspaces
- **Data Persistence** — All data saved to `localStorage` (clients, pets, visits, products, invoices, team, settings, notifications, stock logs)
- **Import/Export** — CSV import/export for Clients, Pets, Products. Full JSON system backup & restore
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
| **localStorage** | Client-side data persistence |
| **GitHub Pages** | Deployment via `gh-pages` |

---

## 📁 Project Structure

```
petution-app/
├── index.html                    # Entry HTML with viewport & Google Fonts
├── vite.config.js                # Vite config (base path, dev server port)
├── package.json                  # Scripts, dependencies
│
├── src/
│   ├── main.jsx                  # React DOM entry point
│   ├── App.jsx                   # Root component, routing, drawer rendering
│   ├── index.css                 # Global mobile-first responsive styles
│   │
│   ├── context/
│   │   └── AppContext.jsx        # Central state management (React Context)
│   │
│   ├── components/
│   │   ├── Sidebar.jsx           # Desktop sidebar + mobile off-canvas nav
│   │   ├── Header.jsx            # Top bar with breadcrumb & notifications
│   │   ├── BottomNav.jsx         # Mobile bottom tab navigation
│   │   │
│   │   └── drawers/
│   │       ├── AddClientDrawer.jsx
│   │       ├── AddPetDrawer.jsx
│   │       ├── AddVisitDrawer.jsx
│   │       ├── AddInvoiceDrawer.jsx
│   │       ├── AddItemDrawer.jsx       # Products/Services CRUD
│   │       ├── ImportModalDrawer.jsx    # CSV/JSON file import
│   │       └── InviteMemberDrawer.jsx
│   │
│   ├── views/
│   │   ├── DashboardView.jsx
│   │   ├── ClientsView.jsx
│   │   ├── PetsView.jsx
│   │   ├── VisitsView.jsx
│   │   ├── InvoicesView.jsx
│   │   ├── ProductsView.jsx
│   │   ├── AnalyticsView.jsx
│   │   ├── TeamView.jsx
│   │   ├── BillingView.jsx       # Deferred — coming soon
│   │   ├── SettingsView.jsx
│   │   └── RegisterClinicView.jsx
│   │
│   └── utils/
│       └── dataExportImport.js   # CSV/JSON export & import utilities
│
└── dist/                         # Production build output
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

# Start development server
npm run dev
```

The app will be running at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Deploy to GitHub Pages

```bash
npm run deploy
```

This runs `vite build` followed by `gh-pages -d dist`.

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

All data is managed via React Context (`AppContext.jsx`) and persisted to `localStorage`:

| Data | localStorage Key | Features |
|------|-----------------|----------|
| Clients | `petution_clients` | Add, search, tag filter, CSV import/export |
| Pets | `petution_pets` | Add, species filter, health tracking, CSV import/export |
| Visits | `petution_visits` | Add, state transitions, date/state filtering |
| Products | `petution_products` | Full CRUD, stock alerts, CSV import/export |
| Invoices | `petution_invoices` | Add, status/date filtering, print receipt |
| Team | `petution_team` | Invite, role management, remove |
| Settings | `petution_settings` | Organization profile, persisted |
| Workspaces | `petution_workspaces` | Multi-clinic workspace switching |
| Stock Logs | `petution_stocklogs` | Automatic logging on product changes |
| Notifications | `petution_notifications` | Bell icon, unread tracking |
| Invitations | `petution_invitations` | Team invitation tracking |

### Full Backup & Restore

Export all clinic data (clients, pets, visits, products, invoices, settings) as a single `.json` file from **Settings → Data Backup & Migration**. Restore by uploading the same file.

---

## 🗺️ Roadmap

- [ ] Billing & Subscription plans (deferred)
- [ ] Charts & graph visualizations for Analytics
- [ ] Client/Pet inline editing and deletion
- [ ] WhatsApp API integration for Chats module
- [ ] Online booking system
- [ ] Prescription templates
- [ ] Reminder system (SMS/Email)
- [ ] Multi-user authentication
- [ ] Database backend (Firebase / Supabase)

---

## 📄 License

This project is private and proprietary. All rights reserved.

---

## 👤 Author

**Khaled ElGendy**  
📧 khaledahmed94.ka@gmail.com  
🔗 [GitHub](https://github.com/khaledahmed94ka)
