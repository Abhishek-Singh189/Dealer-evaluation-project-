import os
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# product -> dealers supplying it
PRODUCTS = {
    "Laptop":     [{"id": "D1", "name": "TechWorld"},  {"id": "D2", "name": "GadgetHub"},  {"id": "D3", "name": "ByteMart"}],
    "Smartphone": [{"id": "D1", "name": "TechWorld"},  {"id": "D4", "name": "MobileZone"}, {"id": "D5", "name": "CellPlanet"}],
    "Tablet":     [{"id": "D2", "name": "GadgetHub"},  {"id": "D3", "name": "ByteMart"},   {"id": "D4", "name": "MobileZone"}],
    "Headphones": [{"id": "D1", "name": "TechWorld"},  {"id": "D2", "name": "GadgetHub"},  {"id": "D5", "name": "CellPlanet"}],
    "Monitor":    [{"id": "D3", "name": "ByteMart"},   {"id": "D5", "name": "CellPlanet"}],
}

@app.route("/")
def health():
    return jsonify({"service": "product-details", "status": "ok"})

@app.route("/products")
def list_products():
    return jsonify(sorted(PRODUCTS.keys()))

@app.route("/products/<name>/dealers")
def product_dealers(name):
    if name not in PRODUCTS:
        return jsonify({"error": "Product not found"}), 404
    return jsonify({"product": name, "dealers": PRODUCTS[name]})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))
