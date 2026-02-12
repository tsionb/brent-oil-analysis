import requests
import json

base_url = "http://localhost:5000"

# Test summary
response = requests.get(f"{base_url}/api/summary")
print("Summary:", json.dumps(response.json(), indent=2))

# Test prices
response = requests.get(f"{base_url}/api/prices?format=chart")
print("Prices count:", len(response.json()['data']['dates']))