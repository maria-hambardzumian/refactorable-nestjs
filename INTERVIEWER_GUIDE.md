# Issues Reference Guide for Interviewer 👨‍💼

This document lists all the intentional issues in the codebase for the interviewer's reference.

## Controller Issues (`bad-user.controller.ts`)

### Architectural Issues
1. **Too much business logic in controller** - Filtering, sorting, pagination logic should be in service
2. **Direct response manipulation** - Using `@Res()` and manual response handling instead of letting NestJS handle responses
3. **Mixed concerns** - Email functionality mixed with user management
4. **Inconsistent response formats** - Different endpoints return different response structures

### NestJS Anti-patterns
5. **No DTOs** - Using `any` types instead of proper Data Transfer Objects
6. **No validation pipes** - Manual validation instead of using NestJS validation decorators
7. **Improper error handling** - Manual try-catch instead of exception filters
8. **No proper HTTP status codes** - Not using NestJS's automatic status code handling

### Security Issues
9. **No input validation** - Accepting any data without proper validation
10. **No authorization** - Delete operations without checking permissions
11. **Sensitive data exposure** - Returning passwords and other sensitive information

### Code Quality Issues
12. **Inconsistent async handling** - Mix of async/await and promise handling
13. **Hard-coded business rules** - Magic numbers and business logic scattered throughout
14. **Poor error messages** - Generic error responses without proper context

## Service Issues (`bad-user.service.ts`)

### Architectural Issues
15. **No repository pattern** - Data access logic mixed with business logic
16. **In-memory storage** - Hard-coded data instead of proper database integration
17. **No interface/contract** - Service not implementing any interface
18. **Mixed responsibilities** - Email, password, stats, and CRUD operations in one service

### Security Issues
19. **Plain text passwords** - Storing passwords without hashing
20. **No duplicate prevention** - Can create users with same email
21. **Unrestricted updates** - Can update any field including sensitive ones
22. **Hard delete only** - No soft delete option

### Code Quality Issues
23. **Inconsistent return types** - Sometimes undefined, sometimes null
24. **No input validation** - No parameter checking
25. **Generic error handling** - Throwing generic Error objects
26. **No transaction support** - Operations not atomic

### Data Management Issues
27. **No proper async/await** - Inconsistent async patterns
28. **Direct array manipulation** - No proper data abstraction
29. **No cascade considerations** - Delete operations don't consider relationships
30. **Business logic in data layer** - Calculations and business rules in service

## Entity Issues (`user.entity.ts`)

### Design Issues
31. **Mixed concerns** - Business logic, formatting, and data in same class
32. **No encapsulation** - All properties public
33. **Password in main entity** - Security-sensitive data mixed with regular data
34. **Any types usage** - Using `any` instead of proper typing

### Architecture Issues
35. **No validation decorators** - Missing class-validator decorators
36. **Business logic in entity** - Methods like `isVip()` should be in business layer
37. **Data manipulation methods** - Update methods should be in repository
38. **No enum for role** - Using string instead of enum for role field

## Module Issues (`user-management.module.ts`)

39. **Poor naming** - "BadUserController" and "BadUserService" are not professional names
40. **No configuration** - Missing dependency injection configuration
41. **No database module imports** - Would need TypeORM or similar in real implementation

## Missing Components

### Infrastructure
42. **No DTOs** - Missing request/response DTOs with validation
43. **No guards** - No authentication/authorization guards
44. **No interceptors** - No response transformation or logging
45. **No pipes** - No custom validation pipes
46. **No exception filters** - No global error handling

### Database Layer
47. **No repository classes** - Missing repository pattern implementation
48. **No entities with decorators** - Missing TypeORM or similar ORM setup
49. **No migrations** - No database schema management
50. **No connection configuration** - No database connection setup

### Security
51. **No password hashing service** - Missing bcrypt or similar
52. **No JWT authentication** - No authentication mechanism
53. **No rate limiting** - No protection against abuse
54. **No input sanitization** - No XSS protection

### Validation & Error Handling
55. **No global validation** - Missing ValidationPipe setup
56. **No custom exceptions** - Using generic Error class
57. **No error logging** - No proper logging mechanism
58. **No request/response logging** - No audit trail

## Expected Solutions

### Proper Architecture
- Separate DTOs for request/response
- Repository pattern with interfaces
- Service layer focused on business logic
- Proper error handling with custom exceptions

### Security Improvements
- Password hashing service
- Input validation with class-validator
- Authorization guards
- Proper error responses (no sensitive data leakage)

### NestJS Best Practices
- Use of decorators for validation
- Proper dependency injection
- Exception filters for global error handling
- Interceptors for response formatting

### Code Quality
- TypeScript interfaces and types
- Consistent async/await usage
- Proper separation of concerns
- Unit and integration tests

## Scoring Guidelines

### Excellent (90-100%)
- Identifies 80%+ of issues
- Implements comprehensive solution with proper architecture
- Demonstrates deep NestJS knowledge
- Creates reusable, maintainable code

### Good (70-89%)
- Identifies 60-79% of issues
- Fixes major architectural problems
- Shows good understanding of NestJS patterns
- Creates functional improvements

### Satisfactory (50-69%)
- Identifies 40-59% of issues
- Fixes some architectural issues
- Shows basic NestJS knowledge
- Makes some improvements

### Needs Improvement (<50%)
- Identifies <40% of issues
- Makes minimal improvements
- Shows limited NestJS understanding
- Solution may introduce new problems

## Interview Discussion Points

1. **Priority of fixes** - Which issues would you tackle first and why?
2. **Architecture decisions** - How would you structure the module for scalability?
3. **Security considerations** - What security measures are most critical?
4. **Testing strategy** - How would you test the refactored code?
5. **Performance implications** - What performance issues do you see?
6. **Future enhancements** - How would you extend this module?
