# EnKoat Roofing Quote Dashboard

This full-stack web application enables contractors to submit roofing project quotes and view performance analytics through a visual dashboard. The system includes:

- A responsive contractor quote submission form  
- A RESTful API and backend to store and filter submissions  
- A performance dashboard displaying trends and metrics using mock and real data  

---

##  Features

### 1. Contractor Quote Submission Form

A clean and responsive form that captures: http://localhost:5173

-  Contractor Name  
- Company  
- Roof Size (sq ft)  
- Roof Type (Metal, TPO, Foam)  
- Project City and State  
- Project Date  

 Users can submit quotes which are stored in a backend database.

### 2. REST API + Backend (Flask)

The backend offers:

- POST : Store new quote submissions  : http://127.0.0.1:8000/api/quotes
- GET : Retrieve quotes with optional filters:  
  - state : http://127.0.0.1:8000/api/quotes?state=AZ
  - roof_type  : http://127.0.0.1:8000/api/quotes?roofType=TPO

Built using **Flask** and **SQLite**, and CORS-enabled for frontend integration.

### 3. Performance Dashboard

A modern dashboard visualizing trends from 1,000+ mock roofing projects, including:  http://localhost:5173/dashboard

- Number of projects by state  
- Average roof size by roof type  
- Monthly trends  
- Real-time quote stats (via API)  
- Data filters by state and roof type  


Future enhancements could include PDF reports, heatmaps, and export options.

---

##  Tech Stack

- **Frontend**: React, Tailwind CSS, Bootstrap  
- **Backend**: Flask (Python), SQLite  
- **Charts**: Recharts  
- **Mock Data**: JSON file with 1,000+ roofing project entries  

---

## Getting Started Locally

### Prerequisites

- Node.js + npm  
- Python 3  
- pip  

---

### 1. Clone the Repo


git clone https://github.com/yourusername/enkoat-quote-dashboard.git
cd enkoat-quote-dashboard
### 2. Setup Backend (Flask)

cd server
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

Start the server
python app.py
Flask will run on http://localhost:8000

### 3. Setup Frontend (React)
bash
Copy
Edit
cd client
npm install
npm start


### Mock Data
Located in public/mock_roofing_data.json

- Contains 1000+ mock entries with:
- contractor_name
- company
- roof_size
- roof_type
- city
- state
- project_date

Used to simulate real-world data for dashboard visualizations.

## What I’d Improve with More Time
Add authentication for contractor accounts

Enable file upload (e.g. for project blueprints)

Export reports (PDF/CSV)

Add Google Maps heatmap integration

Deploy full stack on platforms like Render, Netlify, or Vercel
