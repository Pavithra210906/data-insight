📊 Data Insight
Data Insight Studio allows users to upload datasets and generate interactive business intelligence dashboards using natural language queries.

🛠 Tech Stack
Frontend: React with Vite.

Language: TypeScript.

Styling: Tailwind CSS & shadcn/ui.


Database/Auth: Supabase.

Testing: Vitest (Unit) & Playwright (E2E).

🚀 Getting Started
1. Prerequisites
Ensure you have Node.js installed on your machine. You will also need a Supabase project to handle data and authentication.

2. Installation
Clone the repository and install the necessary dependencies using npm:

Bash
npm install
This will install core libraries including React, Lucide React, and the Supabase SDK.

3. Environment Configuration
Create a .env file in the root directory and add your Supabase credentials:


VITE_SUPABASE_URL: Your Supabase project URL.


VITE_SUPABASE_ANON_KEY: Your project's API key.


VITE_SUPABASE_PROJECT_ID: Your unique project identifier.

4. Running the Application
Start the local development server:

Bash
npm run dev
The application will be accessible at http://localhost:8080.

💡 How to Use
Step 1: Data Upload
Once the dashboard is launched, use the upload interface to import your datasets (e.g., CSV or JSON files).

Step 2: Natural Language Querying
Instead of manual charting, type a question into the AI search bar, such as:

"Show me a bar chart of sales growth over the last three months."

Step 3: Interactive Visualization
The AI will process the data and generate a dynamic chart using the platform's custom design system. You can:

Filter data points in real-time.

Customize chart types using the UI components.

Export your insights for business reports.

🧪 Testing and Quality
To ensure the studio remains reliable, you can run the following test suites:

Unit Tests: Run npm run test to execute Vitest suites for logic verification.

E2E Tests: Use npx playwright test to simulate user journeys across different browsers.

Linting: Run npm run lint to check code quality against ESLint standards.
