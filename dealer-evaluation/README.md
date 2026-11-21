# Dealer Evaluation - Microservices Final Project

| Folder | Tech | Purpose | Port |
|---|---|---|---|
| product-details-service | Python / Flask | Products + dealers per product | 8080 |
| dealer-pricing-service | Node.js / Express | Dealer prices | 8080 |
| dealer-evaluation-frontend | HTML + nginx | UI | 80 |

## Endpoints
Python: `GET /products`, `GET /products/<name>/dealers`
Node:   `GET /price/<product>`, `GET /price/<product>/<dealerId>`
