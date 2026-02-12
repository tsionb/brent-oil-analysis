# brent-oil-analysis


## Project Overview
Analysis of how geopolitical and economic events affect Brent oil prices using Bayesian Change Point Detection.

## Task 1 Deliverables
1. `docs/analysis_plan.md` - Complete analysis workflow plan
2. `data/events.csv` - 15 key events with dates and descriptions
3. `notebook/initial_eda.ipynb` - Initial data exploration

## How to Run
1. Install requirements: `pip install pandas numpy matplotlib jupyter`
2. Open Jupyter: `jupyter notebook`
3. Run `initial_eda.ipynb` to see initial analysis

## Next Steps
Proceed to Task 2: Bayesian Change Point Modeling

## Task 2 Summary

### Key Findings
1. **Primary Change Point**: Detected at **2005-02-23** with high certainty
2. **Price Impact**: Shift from **$21.44** to **$75.60** (252.7% increase)
3. **Event Correlation**: No direct event alignment within 30-day window; closest event is Iraq War (706 days prior). This suggests either:
   - A delayed market response to the 2003 Iraq invasion
   - Accumulation of multiple geopolitical/economic factors
   - A structural shift not tied to a single headline event


### Model Performance
- **Convergence**: **Excellent** – all r_hat values < 1.01, indicating reliable sampling
- **Uncertainty Quantified**: 95% credible intervals provided for all parameters
- **Visual Evidence**: Posterior distributions are clean and unimodal; the change point peak is sharply defined

### Business Insights
1. **For Investors**: Prolonged geopolitical instability (e.g., Iraq) can produce delayed but powerful structural price shifts. Monitoring conflict persistence, not just outbreak, is critical.
2. **For Policymakers**: Energy markets may take years to fully price in geopolitical risk. Policy responses should account for lagged effects.
3. **For Energy Companies**: The post-2005 regime represents a "new normal" of elevated prices. Strategic planning should incorporate structural breaks rather than assuming mean reversion.


### Next Steps
1. **Extend to multiple change points** – likely additional breaks in 2008, 2014, and 2020
2. **Incorporate volatility modeling** – detect shifts in risk regime, not just price level
3. **Build interactive dashboard (Task 3)**
 

## Task 3: Brent Oil Price Analysis Dashboard

##  Overview
Interactive dashboard for analyzing the impact of geopolitical events on Brent oil prices (1987-2022).

##  Quick Start

### Prerequisites
- Python 3.8+
- Node.js 14+
- npm 6+

### 1. Clone Repository
```bash
git clone <https://github.com/tsionb/brent-oil-analysis>
cd brent-oil-analysis
```

### 2. Setup Backend
```bash
cd backend
pip install -r requirements.txt
python app.py
```
Backend runs at http://localhost:5000

### 3. Setup Frontend
```bash
cd frontend
npm install
npm start
```
Frontend runs at http://localhost:3000

##  Project Structure
```
brent-oil-analysis/
├── backend/
│   ├── app.py              # Flask API
│   ├── data/               # CSV files
│   └── requirements.txt    # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── App.js         # Main dashboard
│   │   └── App.css        # Styles
│   └── package.json       # Node dependencies
└── README.md
```

##  API Endpoints
- `GET /api/prices` - Oil price data
- `GET /api/events` - Historical events
- `GET /api/summary` - Summary statistics
- `GET /api/change_points` - Detected change points

##  Features
- Interactive price chart with event highlighting
- Date range filtering
- Summary statistics cards
- Responsive mobile design
- Event correlation visualization



## Built With
- Flask - Python backend
- React - Frontend framework
- Recharts - Charting library
- Axios - API requests
