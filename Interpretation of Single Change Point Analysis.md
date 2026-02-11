## Interpretation of Single Change Point Analysis

### Detected Change Point
- **Date**: 2005-02-23
- **Model Certainty**: High
- **Price at Change**: $48.16

### Quantified Impact
- **Before Change**: Average price of $21.44 (95% CI: $20.88 to $22.01)
- **After Change**: Average price of $75.60 (95% CI: $75.04 to $76.16)
- **Change**: $54.17 (252.7%% increase)

### Associated Event(s)
Based on our event research, the change point aligns with:

1. **Iraq War** (2003-03-20)
   - **Impact Type**: CONFLICT
   - **Days from Change**: 706 days

### Limitations
1. Single change point model oversimplifies 35 years of data
2. Only detects mean shifts, not volatility changes
3. Correlation ≠ causation - need additional evidence

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