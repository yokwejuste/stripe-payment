import json
import os
import uuid

import stripe
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS

from utils import BASE_DIR

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/create-payment-intent/": {"origins": "http://localhost:3000"}}, supports_credentials=True)
CORS(app, resources={r"/items/": {"origins": "http://localhost:3000"}}, supports_credentials=True)
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

with open(os.path.join(BASE_DIR, 'data/items.json'), 'r') as json_file:
    items = json.load(json_file)


@app.route('/items/', methods=['GET'])
def get_items():
    return jsonify(items)


@app.route('/create-payment-intent/', methods=['POST'])
def create_payment():
    data = request.json
    item_id = data['id']
    item = next((item for item in items if item['id'] == item_id), None)

    if not item:
        return jsonify(error="Item not found"), 404

    intent = stripe.PaymentIntent.create(
        amount=item['price'],
        currency='usd',
        idempotency_key=str(uuid.uuid4()),
        payment_method_types=['card']
    )
    return jsonify({'clientSecret': intent['client_secret']})


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
