from django.http import JsonResponse
import requests
import os
import pandas as pd
from django.views.decorators.csrf import csrf_exempt
from sklearn.linear_model import LinearRegression
import numpy as np
from django.http import HttpResponse
import json
from django.shortcuts import render

# Make sure to set your Polygon.io API key in the environment variables
POLYGON_API_KEY = os.getenv('POLYGON_API_KEY')


def home(request):
    return HttpResponse('<h1>Welcome to  My Django App!</h1>')

def index(request):
    return render(request, 'index.html')

def get_polygon_data(request):
     # Get the ticker symbol from the request query parameters, default to 'AAPL'
    ticker_symbol = request.GET.get('ticker', 'AAPL')
    
    POLYGON_API_KEY = 'Xpqp9eQKWwHPvbnNuqs9xmXJR7nHXcby'
   
    # Construct the URL for the Polygon.io API request
    url = f'https://api.polygon.io/v1/meta/symbols/{ticker_symbol}/company?apiKey={POLYGON_API_KEY}'

    response = requests.get(url)

    try:
        # Send a GET request to the Polygon.io API
        response = requests.get(url)
        # Check if the request was successful
        response.raise_for_status()
          # Convert the response to JSON
        data = response.json()
        
        json_response = JsonResponse({'data': data})

        # Set CORS headers in the response
        json_response["Access-Control-Allow-Origin"] = "http://127.0.0.1:8000"
        
        return json_response
    
        # Check if the request was successful
    except requests.exceptions.RequestException as e:
        # Return error response if request fails
        return JsonResponse({'error': str(e)})
 
    
def get_topgainer_data(request):
    
    ALPHAVANTAGE_API_KEY = 'Xpqp9eQKWwHPvbnNuqs9xmXJR7nHXcby'
    
    
    # Construct the URL for the alphavantage.co API request
    url = f'https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey={ALPHAVANTAGE_API_KEY}'

    response = requests.get(url)

    try:
        # Send a GET request to the Polygon.io API
        response = requests.get(url)
        # Check if the request was successful
        response.raise_for_status()
          # Convert the response to JSON
        data = response.json()
        
        json_response = JsonResponse({'data': data})

        # Set CORS headers in the response
        json_response["Access-Control-Allow-Origin"] = "http://127.0.0.1:8000"
        print("\nData " , json_response)
        return json_response
    
        # Check if the request was successful
    except requests.exceptions.RequestException as e:
        # Return error response if request fails
        return JsonResponse({'error': str(e)})
    
        
def get_marketnews_data(request):
    
    ticker_symbol = request.GET.get('ticker', 'AAPL')
    
    ALPHAVANTAGE_API_KEY = 'Xpqp9eQKWwHPvbnNuqs9xmXJR7nHXcby'
   
    # functions = TOP_GAINERS_LOSERS
    
    
    # Construct the URL for the alphavantage.co API request
    url = f'https://www.alphavantage.co/query?function=NEWS_SENTIMENT&{ticker_symbol}&apikey={ALPHAVANTAGE_API_KEY}'

    response = requests.get(url)

    try:
        # Send a GET request to the Polygon.io API
        response = requests.get(url)
        # Check if the request was successful
        response.raise_for_status()
          # Convert the response to JSON
        data = response.json()
        
        json_response = JsonResponse({'data': data})

        # Set CORS headers in the response
        json_response["Access-Control-Allow-Origin"] = "http://127.0.0.1:8000"
        print("\nData " , json_response)
        return json_response
    
        # Check if the request was successful
    except requests.exceptions.RequestException as e:
        # Return error response if request fails
        return JsonResponse({'error': str(e)})
    
    
    
def get_globalmarket_data(request):
    
    
    ALPHAVANTAGE_API_KEY = 'Xpqp9eQKWwHPvbnNuqs9xmXJR7nHXcby'
    functions = "MARKET_STATUS"
   
    
    # Construct the URL for the alphavantage.co API request
    url = f'https://www.alphavantage.co/query?function=MARKET_STATUS&apikey={ALPHAVANTAGE_API_KEY}'

    response = requests.get(url)

    try:
        # Send a GET request to the Polygon.io API
        response = requests.get(url)
        # Check if the request was successful
        response.raise_for_status()
          # Convert the response to JSON
        data = response.json()
        
        json_response = JsonResponse({'data': data})

        # Set CORS headers in the response
        json_response["Access-Control-Allow-Origin"] = "http://127.0.0.1:8000"
        print("\nGlobal Market Data " , json_response)
        return json_response
    
        # Check if the request was successful
    except requests.exceptions.RequestException as e:
        # Return error response if request fails
        return JsonResponse({'error': str(e)})
    
    
    
# Expenses Prediction

def train_linear_regression_model(X, y):
    model = LinearRegression()
    model.fit(X, y)
    return model

def predict_next_month_expense(last_3_month_expenses):
    X = np.array(last_3_month_expenses).reshape(-1, 3)
    y = np.mean(last_3_month_expenses, axis=1)

    model = train_linear_regression_model(X, y)

    next_month_expense = model.predict(np.array(last_3_month_expenses[-1]).reshape(1, -1))
    return next_month_expense[0]

@csrf_exempt
def predict_expense(request):
    if request.method == 'POST':
        current_directory = os.path.dirname(__file__)
        file_path = os.path.join(current_directory, 'data', 'expenses_dataset.csv')
        
        try:
            dataset = pd.read_csv(file_path)
        except FileNotFoundError:
            return JsonResponse({'error': 'Dataset file not found.'}, status=500)


        X = dataset[['Month1', 'Month2', 'Month3']]
        y = dataset['NextMonthExpense']

        model = train_linear_regression_model(X, y)

       
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON format provided.'}, status=400)
        
        month1_str = data.get('month1')
        month2_str = data.get('month2')
        month3_str = data.get('month3')
        
        if all([month1_str, month2_str, month3_str]):
            try:
                month1 = float(month1_str)
                month2 = float(month2_str)
                month3 = float(month3_str)
            except ValueError:
                return JsonResponse({'error': 'Invalid numeric values provided.'}, status=400)
        
            predicted_expense = predict_next_month_expense([[month1, month2, month3]])
        
            return JsonResponse({'predictedExpense': predicted_expense})
        else:
            return JsonResponse({'error': 'Please provide values for all three months.'}, status=400)
    else:
        return JsonResponse({'error': 'Only POST requests are allowed for this endpoint.'}, status=405)