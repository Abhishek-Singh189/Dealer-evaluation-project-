const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

// product -> dealerId -> price (USD)
const PRICES = {
  Laptop:     { D1: 950,  D2: 925,  D3: 970 },
  Smartphone: { D1: 699,  D4: 679,  D5: 710 },
  Tablet:     { D2: 429,  D3: 445,  D4: 419 },
  Headphones: { D1: 199,  D2: 189,  D5: 205 },
  Monitor:    { D3: 289,  D5: 275 },
};
const DEALER_NAMES = { D1: "TechWorld", D2: "GadgetHub", D3: "ByteMart", D4: "MobileZone", D5: "CellPlanet" };

app.get("/", (req, res) => res.json({ service: "dealer-pricing", status: "ok" }));

// price of one dealer for a product
app.get("/price/:product/:dealerId", (req, res) => {
  const { product, dealerId } = req.params;
  const price = PRICES[product] && PRICES[product][dealerId];
  if (price === undefined) return res.status(404).json({ error: "Price not found" });
  res.json({ product, dealerId, dealer: DEALER_NAMES[dealerId], price });
});

// prices of all dealers for a product
app.get("/price/:product", (req, res) => {
  const { product } = req.params;
  if (!PRICES[product]) return res.status(404).json({ error: "Product not found" });
  const prices = Object.entries(PRICES[product]).map(([id, price]) => ({
    dealerId: id, dealer: DEALER_NAMES[id], price,
  }));
  res.json({ product, prices });
});

const port = process.env.PORT || 8080;
app.listen(port, "0.0.0.0", () => console.log("Dealer pricing listening on " + port));
