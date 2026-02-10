# **Analysis Plan for Brent Oil Price Change Point Analysis**

## **1. Data Preparation**
- Load Brent oil price data (May 20, 1987 to Nov 14, 2022)
- Convert date format from '20-May-87' to datetime
- Confirm no missing values in dataset
- Sort data chronologically by date

## **2. Exploratory Data Analysis (EDA)**
- Visualize price trends over 35-year period
- Calculate descriptive statistics (mean: $48.42, std: $32.86)
- Analyze distribution of prices (range: $9.10 to $143.95)
- Compute yearly averages to identify long-term trends
- Prepare log returns for volatility analysis and stationarity testing

## **3. Event Research & Compilation**
- Identify 10-15 key geopolitical and economic events (1987-2022)
- Research OPEC decisions, conflicts, economic crises, and policy changes
- Create structured CSV with event dates, descriptions, and impact types
- Cross-reference events with observed price movements

## **4. Bayesian Change Point Modeling**
- Implement change point detection using PyMC
- Define model with switch point (tau) as discrete uniform prior
- Specify before/after mean parameters (μ₁, μ₂)
- Configure likelihood using normal distribution
- Run MCMC sampling (2,000 samples, 1,000 tuning)
- Validate convergence using r_hat values and trace plots

## **5. Change Point Interpretation & Event Association**
- Extract posterior distribution of change points
- Identify high-certainty change points (sharp posterior peaks)
- Compare detected change dates with researched events
- Quantify price impacts: average shifts and percentage changes
- Formulate causal hypotheses for significant associations

## **6. Dashboard Development**
- Build Flask API endpoints for price data, events, and change points
- Create React frontend with interactive price timeline
- Implement event highlighting and date range filtering
- Design responsive visualizations for desktop and mobile
- Include volatility indicators and impact metrics

## **7. Reporting & Communication**
- Compile findings in Medium-style blog post or PDF report
- Visualize change points with posterior distributions
- Present quantified impact statements for key events
- Document limitations and assumptions
- Propose future analysis extensions

---

## **Initial Observations from EDA**

**1. Data Range**: May 20, 1987 to November 14, 2022  
**2. Price Range**: Minimum $9.10, Maximum $143.95, Mean $48.42  
**3. Data Quality**: 9,011 daily records with zero missing values  
**4. Distribution**: Right-skewed with multiple price regimes visible  
**5. Yearly Trends**:  
   - Stable prices ($15-$25) through early 2000s  
   - Sharp increase to $100+ peak around 2008  
   - Volatile period 2011-2014 with prices $100-$120  
   - Major drop in 2014-2015 to $30-$50 range  
   - COVID-19 crash to ~$20 in 2020 followed by recovery  

**6. Next Steps**:  
   - Calculate log returns for stationarity testing  
   - Identify exact dates of major price shifts visible in plot  
   - Research specific events corresponding to 2008, 2014, 2020 price movements  

---

## **Assumptions & Limitations**

**Assumptions**:  
1. Daily price data accurately reflects market conditions  
2. Major geopolitical/economic events have detectable price impacts  
3. Change points represent structural shifts in price dynamics  
4. Bayesian model adequately captures mean shifts in price regimes  

**Limitations**:  
1. **Correlation ≠ Causation**: Temporal alignment doesn't prove causality  
2. **Multiple Concurrent Factors**: Price changes result from complex interactions  
3. **Delayed Effects**: Some events may have lagged impacts beyond detection window  
4. **Model Simplicity**: Initial model detects only mean changes, not volatility shifts  
5. **Event Selection Bias**: Researcher-selected events may miss important factors  

**Communication Plan**:  
- Primary: Interactive dashboard for exploratory analysis  
- Secondary: PDF report with methodology and key findings  
- Supplementary: GitHub repository with complete code and documentation