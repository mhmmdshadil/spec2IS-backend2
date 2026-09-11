# Spec2IS — AI-Powered Indian Standards Co-Pilot (SIH PS 26108)

**Spec2IS** is a decision-support platform designed for government procurement officers and engineers across CPWD, Railways, GeM, and central ministries. It maps ambiguous technical specifications directly to active Bureau of Indian Standards (BIS) codes, verifies gazette revision status, and generates certified tender-ready reports.

---

## Key Features

- **Apple-Inspired Minimalist Landing Page**: Hero section with interactive CTO search capsule, preset chips, and floating status preview cards.
- **Specification Workbench**:
  - Tabbed specification input (Paste text or Drag-and-Drop `.pdf` / `.docx` files).
  - One-click example chips across civil, electrical, safety, and plumbing domains.
- **4-Step Pipeline Stepper**:
  - Requirement Extraction → Indian Standards Matching → Version & Gazette Validation → Confidence Scoring.
- **Decision-Support Results Screen**:
  - Monospace Hero Standard Identifier (`IS 2190`, `IS 694`, etc.).
  - Status Indicators (Active/Current, Superseded, Withdrawn).
  - Radial Match Confidence Ring powered by Recharts.
  - Prose justification notes and ambiguity warnings for multi-part standards.
  - Printable official tender reports formatted with human-in-the-loop review actions.
- **Session Search History**: Keeps track of all analyses during the session for quick retrieval.

---

## Tech Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4 + Custom Design Tokens
- **Typography**: Plus Jakarta Sans, Source Serif 4, IBM Plex Sans, IBM Plex Mono
- **Routing**: React Router DOM v7
- **Data & Charts**: TanStack React Query + Recharts
- **HTTP Client**: Axios

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```

---

## Connecting to the Live Backend

By default, the frontend runs in mock mode using verified test data matching the backend schema. To connect to a live backend service:

Create a `.env` file in the project root:
```env
VITE_API_BASE_URL=https://your-backend-api.onrender.com
VITE_USE_MOCK=false
```

---

## API Contract (`POST /analyze`)

**Request:**
```json
{
  "specification_text": "Required portable fire extinguishers for electrical server room operating at 240V."
}
```

**Response:**
```json
{
  "specification": "Required portable fire extinguishers for electrical server room operating at 240V.",
  "recommendations": [
    {
      "standard_number": "IS 2190",
      "version_year": "2010",
      "status": "current",
      "confidence": 0.895,
      "action": "recommended",
      "why": "IS 2190 specifies selection, installation, and maintenance of first-aid fire extinguishers suitable for electrical hazard areas.",
      "replacement_standard": null,
      "ambiguous": false,
      "ambiguity_reason": null
    }
  ],
  "areas_to_verify": [
    "Confirm the extinguisher class (ABC/CO2) matches electrical hazard requirements before citing in the tender."
  ]
}
```
