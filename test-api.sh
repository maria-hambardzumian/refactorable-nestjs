#!/bin/bash

echo "Testing the Bad NestJS API endpoints..."
echo "Make sure the server is running with: npm run start:dev"
echo ""

# Wait a moment for server to be ready
sleep 2

echo "1. Testing GET /users (get all users)"
curl -s http://localhost:3000/users | jq '.' || echo "Response received"
echo ""

echo "2. Testing GET /users with filters"
curl -s "http://localhost:3000/users?active=true&role=admin" | jq '.' || echo "Response received"
echo ""

echo "3. Testing GET /users/:id (get user by id)"
curl -s http://localhost:3000/users/1 | jq '.' || echo "Response received"
echo ""

echo "4. Testing POST /users (create user)"
curl -s -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","firstName":"Test","lastName":"User","email":"test@example.com","password":"password123","role":"user"}' \
  | jq '.' || echo "Response received"
echo ""

echo "5. Testing GET /users/:id/profile (get user profile)"
curl -s http://localhost:3000/users/1/profile | jq '.' || echo "Response received"
echo ""

echo "Testing complete!"
echo ""
echo "Note: This API contains many intentional issues for the refactoring challenge."
echo "See REFACTORING_CHALLENGE.md for details."
