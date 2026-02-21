# CRUD Project

This repository contains a simple CRUD application with a Node/Express backend and a React (Vite) frontend. It supports user registration, login (JWT auth), and per-user tasks with ADMIN role capabilities.

This README includes API documentation and a Postman collection, and explains how Swagger and Postman documentation work.

## Quick start

- Backend: open `/backend`, create a `.env` with `MONGO_URI`, `PORT`, `JWT_SECRET`, then run:

```bash
cd backend
npm install
npm run start
```

- Frontend: open `/frontend` then:

```bash
cd frontend
npm install
npm run dev
```

The frontend expects the backend API base at `http://localhost:5000/api/v1` by default. You can override it by setting `VITE_API_URL` in the frontend environment.

## Authentication

- Register `POST /api/v1/auth/register` — returns `{ token }` on success.
- Login `POST /api/v1/auth/login` — returns `{ token }` on success.

All protected routes expect the header `Authorization: Bearer <token>`.

## API Endpoints

Auth

- `POST /api/v1/auth/register`
  - Body: `{ name, email, password, role? }`
  - Validation: name required, email valid, password >= 6 chars, role optional (USER|ADMIN)
  - Response success: `200 { token }`
  - Response error: `400 { message, errors: [{ field, message }] }`

- `POST /api/v1/auth/login`
  - Body: `{ email, password }`
  - Validation: email valid, password required
  - Response success: `200 { token }`
  - Response error: `400 { message, errors }`

Tasks (protected)

- `GET /api/v1/tasks`
  - Returns list of tasks. If user role is `ADMIN`, returns all tasks populated with user info.

- `POST /api/v1/tasks`
  - Body: `{ title }`
  - Validation: title required
  - Response success: `200 { _id, title, completed, user, createdAt, updatedAt }`

- `PUT /api/v1/tasks/:id`
  - Body: `{ title?, completed? }`
  - Validation: if present, title non-empty, completed boolean
  - ADMIN can update any task; regular users can only update their own tasks.

- `DELETE /api/v1/tasks/:id`
  - ADMIN can delete any task; regular users can only delete their own tasks.

Error format

All validation errors use the shape:

```json
{
  "message": "Validation failed",
  "errors": [ { "field": "title", "message": "Title is required" } ]
}
```

This is used by the frontend to display field-level errors.

## Postman collection

A Postman collection is included at `postman_collection.json`. Import it into Postman (File → Import) to get all endpoints pre-configured. Edit the `{{baseUrl}}` environment variable in Postman to point to your backend (e.g., `http://localhost:5000/api/v1`).

How Postman collections work:

- They are a structured JSON list of requests, folders, and optional environments.
- Importing into Postman creates a workspace collection you can run manually or with the Collection Runner.
- Use environment variables (`{{token}}`) to store dynamic values between requests (e.g. save login token).

## Swagger (OpenAPI)

Swagger (OpenAPI) generates interactive API documentation from an OpenAPI spec. Typical setup (not included by default) uses `swagger-jsdoc` to build the spec from JSDoc comments and `swagger-ui-express` to serve the UI at `/api-docs`.

How Swagger works:

- You define OpenAPI schemas and paths (either by writing a JSON/YAML spec or by annotating routes).
- `swagger-ui` reads the spec and renders an interactive UI where you can try requests directly from the browser.
- Benefits: interactive, machine-readable spec useful for codegen and clients.

If you want, I can add a small Swagger setup to the backend (`swagger-jsdoc` + `swagger-ui-express`) and generate the OpenAPI spec for the current endpoints.

## Notes & Security

- The backend uses `express-validator` to validate inputs; the frontend performs client-side checks and displays server validation responses.
- Remember to keep `JWT_SECRET` and `MONGO_URI` secure and not checked into source control.
- For production, add HTTPS, rate-limiting, helmet, CORS restrictions, and stronger password policies.

## Files added

- `postman_collection.json` — Postman collection for quick import

---
If you want, I can also generate a full OpenAPI `swagger.json` and wire Swagger UI to `/api-docs`. Would you like me to add that now?
