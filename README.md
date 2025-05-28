# NestJS Refactoring Challenge

A deliberately poorly written NestJS application designed as a technical interview exercise for middle-level NestJS developers.

## 🎯 Purpose

This repository contains a User Management API with **intentional anti-patterns, code smells, and architectural issues**. The goal is to assess a candidate's ability to:

- Identify problems in existing code
- Understand NestJS best practices  
- Refactor code to improve maintainability and security
- Apply proper software architecture principles

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start the development server
npm run start:dev

# Test the API endpoints (optional)
./test-api.sh
```

The API will be available at `http://localhost:3000`

## 📁 Key Files

- **`src/bad-user.controller.ts`** - Controller with multiple anti-patterns
- **`src/bad-user.service.ts`** - Service layer with architectural problems  
- **`src/user.entity.ts`** - Entity with mixed concerns
- **`src/user-management.module.ts`** - Module structure

## 📋 For Candidates

👉 **Read the [REFACTORING_CHALLENGE.md](./REFACTORING_CHALLENGE.md)** for detailed instructions

## 📋 For Interviewers  

👉 **Read the [INTERVIEWER_GUIDE.md](./INTERVIEWER_GUIDE.md)** for evaluation criteria and all issue references

## 🔧 API Endpoints

- `GET /users` - Get all users (with filtering/pagination)
- `GET /users/:id` - Get user by ID
- `POST /users` - Create new user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user  
- `POST /users/:id/send-welcome-email` - Send welcome email
- `GET /users/:id/profile` - Get user profile

## ⚠️ Warning

**This code is intentionally bad!** Do not use this as a reference for production applications. It contains security vulnerabilities, poor practices, and anti-patterns for educational purposes only.

## 🎓 Learning Objectives

After completing this challenge, candidates should demonstrate understanding of:

- NestJS architecture and best practices
- Security considerations in web applications
- Proper separation of concerns
- Input validation and error handling
- Repository pattern and dependency injection
- Testing strategies for NestJS applications

## 📝 License

This project is for educational purposes only.
