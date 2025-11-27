# Inzure - AI-Powered Claims Processing

**Inzure** is a next-generation "Agentic Claims Processing" prototype designed to streamline the insurance workflow. It demonstrates a seamless, end-to-end journey from the First Notice of Loss (FNOL) submitted by a policyholder to intelligent AI analysis and final adjuster settlement.

## 🌟 Key Features

### 1. 🚗 Intelligent FNOL (First Notice of Loss)
*   **User-Friendly Interface**: A clean, guided wizard for policyholders to report incidents.
*   **Smart Photo Upload**: Drag-and-drop interface for vehicle damage photos.
*   **Real-time Validation**: Instant feedback on required fields and photo quality.

### 2. 🤖 AI Agent Analysis
*   **Automated Damage Assessment**: The system simulates analyzing photos to detect damage severity (Low/Medium/High).
*   **Fraud Detection Engine**: Heuristic-based analysis to flag potential fraud risks based on claim descriptions and patterns.
*   **Explainable AI**: Provides clear, human-readable reasons for its scoring (e.g., "Inconsistent damage patterns", "High-value parts affected").

### 3. 📊 Adjuster Dashboard
*   **Centralized Command Center**: View all incoming claims with status badges (Pending, Approved, Escalated).
*   **Risk Visualization**: Color-coded indicators for Fraud Risk and Severity.
*   **Quick Actions**: One-click navigation to detailed claim views.

### 4. 📝 Comprehensive Claim Details
*   **Evidence Gallery**: High-resolution view of uploaded damage photos with AI relevance scoring.
*   **Interactive Timeline**: A complete history of the claim's lifecycle.
*   **PDF Export**: Generate professional claim summary reports instantly.
*   **Settlement Workflow**: Approve payouts or escalate to the Special Investigations Unit (SIU) with a single click.

---

## 🚀 How to Run

This project is built with **Vanilla HTML5, JavaScript, and Tailwind CSS**. It requires **no build step** and can be run on any standard web server.

### Option 1: Direct Open (Easiest)
Simply double-click `dashboard.html` to open the application in your default web browser.
Then click **New Case** to file a new FNOL.

### Option 2: Local Server (Recommended)
For the best experience (to avoid CORS issues with some browser security settings), use a local server:

1.  **VS Code**: Install the "Live Server" extension and click "Go Live".
2.  **Python**: Run `python -m http.server` in the project directory and visit `http://localhost:8000`.

---

## 🎬 Demo Walkthrough

1.  **Submit a Claim**:
    *   Start at `index.html`.
    *   Enter Policy Holder Name (e.g., "Jane Doe") and Policy Number.
    *   Describe the incident (e.g., "Rear-ended at a traffic light").
    *   Upload damage photos.
    *   Click **"Analyze & Submit"**.

2.  **AI Processing**:
    *   Watch the AI analyze the claim in real-time.
    *   Review the generated Severity Score and Fraud Risk.
    *   Submit the claim to the system.

3.  **Adjuster Review**:
    *   Navigate to the **Dashboard** (`dashboard.html`).
    *   Select the newly created claim.
    *   Review the **AI Analysis** and **Evidence**.
    *   **Approve** the claim for payout or **Escalate** for review.
    *   **Export** the case file as a PDF.

---

## 🛠 Tech Stack

*   **Frontend**: HTML5, JavaScript (ES6+)
*   **Styling**: Tailwind CSS (via CDN), Flowbite Components
*   **Icons**: Lucide Icons
*   **PDF Generation**: jsPDF
*   **Data Persistence**: Browser LocalStorage (No backend required for demo)

---

## 👥 Team

*   **Tanay Saxena** - Lead Developer

---
*Built for the Future of Insurance.*
