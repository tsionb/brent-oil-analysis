# BRENT OIL PRICE DASHBOARD API

from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import os

# INITIALIZE FLASK APP

app = Flask(__name__, static_folder='static', static_url_path='')
CORS(app)  # Allow React to talk to Flask

print(" Flask app initialized")
print(f" Current directory: {os.getcwd()}")
print(f" Data path: {os.path.join(os.getcwd(), 'data')}")

# LOAD DATA ON STARTUP

def load_data():
    """Load all CSV files into memory"""
    try:
        # Load oil prices
        prices_path = os.path.join('data', 'BrentOilPrices.csv')
        df_prices = pd.read_csv(prices_path)
        
        # Convert dates - TRY MULTIPLE FORMATS
        try:
            df_prices['Date'] = pd.to_datetime(df_prices['Date'], format='%b %d, %Y')
        except:
            try:
                df_prices['Date'] = pd.to_datetime(df_prices['Date'], format='%d-%b-%y')
            except:
                df_prices['Date'] = pd.to_datetime(df_prices['Date'])
        
        df_prices = df_prices.sort_values('Date')
        
        # Calculate log returns
        df_prices['Log_Return'] = np.log(df_prices['Price']) - np.log(df_prices['Price'].shift(1))
        
        # Load events
        events_path = os.path.join('data', 'events.csv')
        df_events = pd.read_csv(events_path)
        df_events['Date'] = pd.to_datetime(df_events['Date'])
        
        print(f" Loaded {len(df_prices)} price records")
        print(f" Loaded {len(df_events)} events")
        print(f" Date range: {df_prices['Date'].min().date()} to {df_prices['Date'].max().date()}")
        
        return df_prices, df_events
    except Exception as e:
        print(f" Error loading data: {e}")
        return pd.DataFrame(), pd.DataFrame()

# Global variables to hold data
prices_df, events_df = load_data()

# API ENDPOINTS

@app.route('/')
def serve_dashboard():
    """Serve the React app (we'll use this later)"""
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/api/prices', methods=['GET'])
def get_prices():
    """Get oil price data with optional date filtering"""
    try:
        df = prices_df.copy()
        
        # Get query parameters
        start_date = request.args.get('start')
        end_date = request.args.get('end')
        format = request.args.get('format', 'full')
        
        # Filter by date if provided
        if start_date:
            df = df[df['Date'] >= start_date]
        if end_date:
            df = df[df['Date'] <= end_date]
        
        # Limit data for charts (too many points slow down React)
        if format == 'chart' and len(df) > 500:
            # Sample every nth row
            n = len(df) // 500
            df = df.iloc[::n]
        
        # Convert to JSON
        result = {
            'dates': df['Date'].dt.strftime('%Y-%m-%d').tolist(),
            'prices': df['Price'].tolist(),
            'log_returns': df['Log_Return'].fillna(0).tolist()
        }
        
        return jsonify({
            'success': True,
            'data': result,
            'count': len(df)
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

@app.route('/api/events', methods=['GET'])
def get_events():
    """Get all events"""
    try:
        df = events_df.copy()
        
        # Filter date range if provided
        start_date = request.args.get('start')
        end_date = request.args.get('end')
        
        if start_date:
            df = df[df['Date'] >= start_date]
        if end_date:
            df = df[df['Date'] <= end_date]
        
        # Convert to list of dictionaries
        events = []
        for _, row in df.iterrows():
            events.append({
                'date': row['Date'].strftime('%Y-%m-%d'),
                'name': row['Event Name'],
                'description': row['Description'],
                'impact_type': row['Impact Type']
            })
        
        return jsonify({
            'success': True,
            'events': events,
            'count': len(events)
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

@app.route('/api/summary', methods=['GET'])
def get_summary():
    """Get summary statistics"""
    try:
        df = prices_df.copy()
        
        # Overall statistics
        summary = {
            'total_days': len(df),
            'date_from': df['Date'].min().strftime('%Y-%m-%d'),
            'date_to': df['Date'].max().strftime('%Y-%m-%d'),
            'min_price': float(df['Price'].min()),
            'max_price': float(df['Price'].max()),
            'avg_price': float(df['Price'].mean()),
            'std_price': float(df['Price'].std()),
            'avg_log_return': float(df['Log_Return'].mean()),
            'std_log_return': float(df['Log_Return'].std()),
            'volatility': float(df['Log_Return'].std() * np.sqrt(252))  # Annualized
        }
        
        return jsonify({
            'success': True,
            'summary': summary
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

@app.route('/api/change_points', methods=['GET'])
def get_change_points():
    """Get change point from Task 2 Bayesian analysis"""

    change_points = [
        {
            'date': '2005-02-23',
            'price': 48.16,
            'impact': 'Structural price regime shift (mean increased by 252.7%)',
            'confidence': 'High',
            'details': {
                'before_mean': 21.44,
                'before_ci': [20.88, 22.01],
                'after_mean': 75.60,
                'after_ci': [75.04, 76.16],
                'absolute_change': 54.17,
                'percentage_increase': 252.7
            },
            'associated_event': {
                'event_name': 'Iraq War',
                'event_date': '2003-03-20',
                'impact_type': 'Conflict',
                'days_from_change': 706,
                'note': 'No direct 30-day alignment; possible delayed market response'
            }
        }
    ]

    return jsonify({
        'success': True,
        'model': 'Single Change Point Bayesian Model',
        'convergence': 'Excellent (r_hat < 1.01)',
        'limitations': [
            'Single change point oversimplifies long-term dynamics',
            'Model detects mean shifts only, not volatility changes',
            'Correlation does not imply causation'
        ],
        'change_points': change_points
    })


# RUN THE APP

if __name__ == '__main__':
    print("\n" + "="*50)
    print(" STARTING BRENT OIL PRICE API")
    print("="*50)
    print(" Server will run at: http://localhost:5000")
    print(" Available endpoints:")
    print("   - GET /api/prices")
    print("   - GET /api/events")
    print("   - GET /api/summary")
    print("   - GET /api/change_points")
    print("="*50 + "\n")
    
    app.run(debug=True, port=5000)