# Real-Time Inventory Management System

A scalable microservices-based inventory management system with real-time notifications using Node.js, Express, MongoDB, and Socket.IO.

## Architecture Overview

The system is built using a microservices architecture with two main services:

1. **Inventory Service**
   - Handles CRUD operations for inventory items
   - Manages stock levels and updates
   - Implements real-time stock notifications
   - Uses MongoDB for persistent storage

2. **Notification Service**
   - Handles real-time stock update notifications using Socket.IO
   - Maintains a log of all stock updates
   - Broadcasts updates to connected clients
   - Stores update history in MongoDB

## Technical Stack

- **Backend**: Node.js 18.x with Express.js
- **Database**: MongoDB
- **Real-time Communication**: Socket.IO
- **Containerization**: Docker & Docker Compose
- **Caching**: Redis
- **Authentication**: JWT
- **Security**: Helmet, Rate Limiting

## Project Structure

```
inventory-management/
├── inventory-service/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── socket.js
│   ├── tests/
│   ├── package.json
│   ├── .env
│   └── Dockerfile
├── notification-service/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   └── socket.js
│   ├── tests/
│   ├── package.json
│   ├── .env
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

## Getting Started

### Prerequisites

- Node.js >= 18.x
- MongoDB
- Redis
- Docker & Docker Compose
- Git

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd inventory-management
```

2. Install dependencies:
```bash
cd inventory-service
npm install
cd ../notification-service
npm install
```

3. Set up environment variables:
Create `.env` files in both services with the following variables:
```bash
# inventory-service/.env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://mongodb:27017/inventory
REDIS_URL=redis://redis:6379
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=24h
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100

# notification-service/.env
PORT=3001
NODE_ENV=development
MONGODB_URI=mongodb://mongodb:27017/inventory
```

4. Start services using Docker:
```bash
docker-compose up --build
```

## API Documentation

### Inventory Service Endpoints

- **POST /api/items**
  - Create a new inventory item
  - Required fields: name, quantity, price
  - Response: 201 Created

- **GET /api/items**
  - List all inventory items
  - Query params: page, limit, search, category, status
  - Response: 200 OK

- **GET /api/items/:id**
  - Get item by ID
  - Response: 200 OK or 404 Not Found

- **PUT /api/items/:id**
  - Update item details
  - Response: 200 OK or 404 Not Found

- **DELETE /api/items/:id**
  - Delete item
  - Response: 200 OK or 404 Not Found

### Socket.IO Events

- **stockUpdate**
  - Emitted when stock changes
  - Payload: { type: 'create/update/delete', item: { ... } }

## Testing

Run tests using:
```bash
npm test
```

## Deployment Guide (AWS EC2)

### Security Group Configuration

1. Create security group with these inbound rules:
   - HTTP: Port 80
   - HTTPS: Port 443
   - Custom TCP: Port 3000 (Inventory Service)
   - Custom TCP: Port 3001 (Notification Service)
   - MongoDB: Port 27017
   - Redis: Port 6379

2. Create IAM roles:
   - EC2 Instance Profile
   - MongoDB Atlas Access Role (if using Atlas)

### Environment Setup

1. Install Docker and Docker Compose
2. Configure environment variables
3. Deploy using docker-compose
4. Set up SSL certificates
5. Configure load balancer

## Architecture Decisions

1. **Microservices Architecture**
   - Separation of concerns
   - Independent scaling
   - Fault isolation
   - Technology flexibility

2. **Real-time Communication**
   - Socket.IO for real-time updates
   - Redis for message queuing
   - MongoDB for update history

3. **Security**
   - JWT authentication
   - Rate limiting
   - Helmet security headers
   - Environment-based configuration

4. **Performance**
   - Redis caching
   - MongoDB indexes
   - Pagination support
   - Efficient queries

5. **Scalability**
   - Containerized deployment
   - Load balancing support
   - Horizontal scaling
   - Microservice architecture

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License

## Support

For support, please open an issue in the GitHub repository.
