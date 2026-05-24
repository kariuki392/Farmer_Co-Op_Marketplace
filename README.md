# 🚜 Farmer Co-Op Marketplace

An on-demand, digital B2B marketplace designed to solve food insecurity by connecting farmers, agricultural cooperatives, retail buyers, and logistics providers in a unified ecosystem. 

This application features dedicated interfaces for all key agricultural stakeholders to streamline inventory aggregation, bulk ordering, price tracking, and supply chain delivery management.

---

## 🚀 Key Features

* **👥 Quad-Role Architecture:** Specialized workflows and dashboards for:
  * **Farmers:** List upcoming harvests, track current crop yields, and check live market pricing.
  * **Cooperatives:** Aggregate local farmer inventory, negotiate bulk B2B sales, and manage regional distributions.
  * **Buyers / Retailers:** Search agricultural products by grade/region, manage purchasing baskets, and process digital invoices.
  * **Logistics Providers:** Accept freight contracts, plan optimal transport routing, and update shipping fulfillment status.
* **📊 Analytics Dashboard:** Interactive data tables, active order progress tracks, and financial breakdown modules.
* **🛡️ Type-Safe Architecture:** Strict end-to-end data definitions handling marketplace objects like `ProduceItem`, `Order`, and `User`.

---

## 🛠️ Built With

* **Frontend Framework:** [React](https://react.dev) (Client-Side Rendering)
* **Language Platform:** [TypeScript](https://typescriptlang.org) (Strict type configuration)
* **Build Engine:** [Vite](https://vitejs.dev) (Rapid development & hot-module reloading)
* **Styling Framework:** [Tailwind CSS](https://tailwindcss.com) with PostCSS for component utility classes
* **Development Prototype Environment:** Scaffolded via StackBlitz Bolt (`.bolt`)

---

## 📂 Codebase Directory Layout

```text
├── .bolt/                  # StackBlitz workspace project configuration metadata
├── src/
│   ├── components/         # Reusable UI elements (Navigation, Cards, Tables, Forms)
│   ├── pages/              # View components representing distinct dashboard panels
│   │   ├── Farmer/         # Crop listing profiles and inventory uploads
│   │   ├── Cooperative/    # Consolidated crop aggregation tools
│   │   ├── Buyer/          # Retail storefront, purchasing catalogs, and carts
│   │   └── Logistics/      # Dispatch job tickers and delivery mapping screens
│   ├── types/              # TypeScript interface files defining models
│   ├── App.tsx             # Main routing shell and primary context boundary wrappers
│   ├── main.tsx            # Application entry execution file
│   └── index.css           # Core styling entry injecting Tailwind utilities
├── index.html              # Core application single-page DOM mounting file
├── tailwind.config.js      # Custom theme configurations (Colors, Fonts, Layouts)
├── tsconfig.json           # Global compilation configuration settings
└── vite.config.ts          # Vite build plugin definitions and dev server mappings
```

---

## 💻 Getting Started Locally

Follow these quick setup steps to clone, configure, and boot up the development server on your machine:

### 1. Prerequisites
Ensure you have the latest LTS version of Node.js installed:
* [Download Node.js](https://nodejs.org) (Version `18.x` or higher recommended)

### 2. Clone the Repository
```bash
git clone https://github.com
cd Farmer_Co-Op_Marketplace
```

### 3. Install Required Packages
```bash
npm install
```

### 4. Boot Up the Local Server
```bash
npm run dev
```
Once initialized, navigate your local browser tab to the network port displayed in your command line window (typically `http://localhost:5173`).

---

## 🧱 Available CLI Automation Scripts

* **`npm run dev`**: Spins up the Vite dynamic development environment server.
* **`npm run build`**: Optimizes and compiles the code structures into clean, statically bundled assets inside the `/dist` directory.
* **`npm run preview`**: Spins up a local web server instance targeting the freshly generated build directory for manual QA checks.
