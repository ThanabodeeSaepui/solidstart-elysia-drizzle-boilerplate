# SolidStart, Elysia, and Drizzle Boilerplate

A production-ready boilerplate project that combines SolidStart for the frontend, Elysia for the backend, and Drizzle ORM for database access.

## Tech Stack

- **Framework**: [SolidStart](https://start.solidjs.com/)
- **API**: [Elysia](https://elysiajs.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Drizzle](https://orm.drizzle.team/)
- **Authentication**: [Better Auth](https://better-auth.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Linting/Formatting**: [Biome](https://biomejs.dev/)
- **Logging**: [Pino](https://getpino.io/)
- **API Documentation**: [Swagger/OpenAPI](https://elysiajs.com/plugins/swagger)

## Features

- ✅ Type-safe API with Elysia and Eden client
- ✅ Authentication with Better Auth (email/password)
- ✅ Database ORM with Drizzle
- ✅ Repository pattern for data access
- ✅ Structured error handling
- ✅ Request logging with Pino
- ✅ Rate limiting
- ✅ CORS configuration
- ✅ Health check endpoint
- ✅ Swagger API documentation at `/api/docs`
- ✅ Environment variable validation
- ✅ Multi-stage Docker build

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/)
- [Docker](https://www.docker.com/)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/ThanabodeeSaepui/solidstart-elysia-drizzle-boilerplate
   ```
2. Install dependencies
   ```sh
   bun install
   ```
3. Copy environment variables
   ```sh
   cp .env.example .env
   ```
4. Update `.env` with your configuration (especially `BETTER_AUTH_SECRET`)
5. Start the database
   ```sh
   docker-compose up -d
   ```
6. Push database schema
   ```sh
   bun run db:push
   ```
7. Run the development server
   ```sh
   bun run dev
   ```

## Available Scripts

- `bun run dev`: Starts the development server.
- `bun run build`: Builds the application for production.
- `bun run start`: Starts the production server.
- `bun run db:push`: Pushes database schema changes (development).
- `bun run db:generate`: Generates database migrations.
- `bun run db:migrate`: Runs database migrations.
- `bun run db:studio`: Opens Drizzle Studio for database management.
- `bun run format`: Formats the code.
- `bun run lint`: Lints the code.

## Project Structure

```
.
├── src
│   ├── components/       # UI components
│   │   └── auth/         # Authentication components
│   ├── database/         # Database configuration
│   │   └── schema/       # Drizzle schemas
│   ├── lib/              # Utilities and plugins
│   │   ├── auth.ts       # Better Auth configuration
│   │   ├── auth-client.ts # Auth client for frontend
│   │   ├── env.ts        # Environment validation
│   │   ├── errors.ts     # Error handling
│   │   └── logger.ts     # Pino logger
│   ├── repositories/     # Data access layer
│   ├── routes/           # SolidStart routes
│   │   └── api/          # Elysia API routes
│   │       └── controllers/ # API controllers
│   ├── app.css           # Global styles
│   ├── app.tsx           # Root app component
│   ├── entry-client.tsx  # Client entry point
│   └── entry-server.tsx  # Server entry point
├── public/               # Static assets
├── drizzle.config.ts     # Drizzle configuration
├── compose.yml           # Docker Compose for development
├── Dockerfile            # Production Docker image
└── package.json
```

## API Documentation

Once the server is running, access the Swagger documentation at:
- Development: http://localhost:3000/api/docs

## API Endpoints

### Health
- `GET /api/health` - Health check endpoint

### Authentication
- `POST /api/auth/sign-in/email` - Sign in with email
- `POST /api/auth/sign-up/email` - Sign up with email
- `GET /api/auth/session` - Get current session
- `POST /api/auth/sign-out` - Sign out

### Todos
- `GET /api/todo` - Get all todos for authenticated user
- `POST /api/todo` - Create a new todo
- `GET /api/todo/:id` - Get a specific todo
- `PATCH /api/todo/:id` - Update a todo
- `DELETE /api/todo/:id` - Delete a todo

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port | No (default: 3000) |
| `VITE_HOST_URL` | Frontend URL | No |
| `VITE_SERVER_URL` | API URL for frontend | No |
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `BETTER_AUTH_SECRET` | Secret for Better Auth (min 32 chars) | Yes |
| `BETTER_AUTH_URL` | Base URL for Better Auth | Yes |
| `CORS_ORIGIN` | Allowed CORS origin | Yes |
| `LOG_LEVEL` | Pino log level | No (default: info) |

## Docker

### Development
```sh
docker-compose up -d
```

### Production Build
```sh
docker build --build-arg VITE_HOST_URL=https://your-domain.com -t your-app .
docker run -p 3000:3000 your-app
```

## License

This project is licensed under the MIT License.
