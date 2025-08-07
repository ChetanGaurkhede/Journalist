# Journalyst Analytics Dashboard

## 🏗️ Project Structure

```
journalyst-analytics/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── Assets/
│   │   ├── components/
|   |   |   ├── layout/
|   |   |   |  ├── Header.jsx
|   |   |   |  └── TradingDashboard.jsx
|   |   |   ├── AccountSummary.jsx
|   |   |   ├── CandlesticksChart.jsx
|   |   |   ├── MetricCard.jsx
|   |   |   ├── TradingChart.jsx
│   │   │   └── TradingTable.jsx
│   │   ├── App.js
│   │   └── index.js
│   ├── .env
│   ├── .gitignore
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── controllers
|   |   └── alalyticsController.js
│   ├── data
|   |   └── generateRealisticTradingData.js
│   ├── routes
|   |   └── analyticsRoute.js
│   ├── .env
│   ├── package-lock.json
│   ├── package.json
│   └── server.js
└── README.md
```

##  Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### 1. Clone and Setup

```bash
cd journalyst
```

### 2. Backend Setup

```bash
mkdir server
cd server
npm install
npm run dev
```


### 3. Frontend Setup

```bash
cd client
npm install
npm run dev


```bash
cd server
npm run dev
# Server will run on http://localhost:3001
```

#### Terminal 2 (Frontend):
```bash
cd client
npm start
# React app will run on http://localhost:5173
```
