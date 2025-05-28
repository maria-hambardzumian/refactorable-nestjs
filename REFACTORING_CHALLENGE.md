# NestJS Refactoring Challenge 🚀

## Overview
This repository contains a **deliberately poorly written** NestJS module designed as a technical interview exercise for middle-level NestJS developers. The goal is to identify and fix the numerous anti-patterns, code smells, and architectural issues present in the codebase.

## The Challenge
You are presented with a User Management module that, while functional, violates many best practices and contains numerous issues that would make it unmaintainable in a production environment.

## Your Task
Refactor the provided code to follow NestJS and general software development best practices. You should aim to:

1. **Identify** all the issues in the current implementation
2. **Explain** why each issue is problematic
3. **Refactor** the code to fix these issues
4. **Demonstrate** your understanding of NestJS architecture and best practices

## Time Allocation
- **Analysis**: 10-15 minutes to review and identify issues
- **Discussion**: 10-15 minutes to explain the problems found
- **Refactoring**: 45-60 minutes to implement fixes
- **Review**: 10-15 minutes to present the refactored solution

## Files to Review
The main files containing issues are:
- `src/bad-user.controller.ts` - Controller with multiple anti-patterns
- `src/bad-user.service.ts` - Service layer with architectural problems
- `src/user.entity.ts` - Entity with mixed concerns
- `src/user-management.module.ts` - Module structure

## Major Issue Categories to Look For

### 🎯 **Architecture & Design Patterns**
- Violation of Single Responsibility Principle
- Missing separation of concerns
- Improper dependency management
- No repository pattern implementation

### 🔧 **NestJS Best Practices**
- Improper use of decorators
- Missing DTOs and validation
- Direct response manipulation
- Inconsistent error handling

### 🛡️ **Security Issues**
- Plain text password storage
- No input validation
- Unrestricted field updates
- Missing authorization checks

### 📊 **Data Management**
- No proper database integration
- Hard-coded data
- Missing transaction management
- No proper error handling

### 🧹 **Code Quality**
- Mixed business and presentation logic
- Inconsistent async/await usage
- Poor error messages
- No proper typing

## Expected Improvements

After refactoring, the code should demonstrate:

1. **Proper Controller Structure**
   - Thin controllers focused on HTTP concerns
   - Proper use of DTOs for validation
   - Consistent response formats
   - Appropriate HTTP status codes

2. **Clean Service Layer**
   - Business logic separation
   - Repository pattern implementation
   - Proper error handling
   - Interface-based design

3. **Security Enhancements**
   - Password hashing
   - Input validation and sanitization
   - Authorization guards
   - Secure data handling

4. **Modern NestJS Features**
   - Pipes for validation
   - Guards for authorization
   - Interceptors for response formatting
   - Custom decorators where appropriate

## Bonus Points
- Implementing proper logging
- Adding comprehensive error handling
- Creating reusable components
- Demonstrating testing strategies
- Discussing scalability considerations

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run start:dev

# Test the endpoints
curl http://localhost:3000/users
```

## API Endpoints (Current Implementation)
- `GET /users` - Get all users with filtering and pagination
- `GET /users/:id` - Get user by ID
- `POST /users` - Create new user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user
- `POST /users/:id/send-welcome-email` - Send welcome email
- `GET /users/:id/profile` - Get user profile

## Evaluation Criteria

You will be evaluated on:

1. **Problem Identification** (25%)
   - Ability to spot anti-patterns and issues
   - Understanding of why each issue is problematic

2. **Solution Quality** (40%)
   - Implementation of proper NestJS patterns
   - Code organization and structure
   - Security improvements

3. **Best Practices** (25%)
   - Following NestJS conventions
   - Proper error handling
   - Input validation and sanitization

4. **Communication** (10%)
   - Explaining your thought process
   - Justifying architectural decisions
   - Discussing trade-offs

## Tips for Success
- Start by identifying the most critical issues first
- Focus on architectural improvements before minor code style issues
- Explain your reasoning as you make changes
- Ask questions if you need clarification on requirements
- Don't try to fix everything - prioritize based on impact

Good luck! 🍀
