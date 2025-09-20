# SolidStart, Elysia, and Drizzle Boilerplate

This is a boilerplate project that combines SolidStart for the frontend, Elysia for the backend, and Drizzle ORM for database access.

## Tech Stack

- **Framework**: [SolidStart](https://start.solidjs.com/)
- **API**: [Elysia](https://elysiajs.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Drizzle](https://orm.drizzle.team/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Linting/Formatting**: [Biome](https://biomejs.dev/)

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
3. Start the database
   ```sh
   docker-compose up -d
   ```
4. Run the development server
   ```sh
   bun run dev
   ```

## Available Scripts

- `bun run dev`: Starts the development server.
- `bun run build`: Builds the application for production.
- `bun run start`: Starts the production server.
- `bun run push`: Pushes database schema changes.
- `bun run format`: Formats the code.
- `bun run lint`: Lints the code.

## Project Structure

```
.
├── src
│   ├── components
│   ├── database
│   │   └── schema
│   ├── routes
│   │   └── api
│   ├── app.css
│   ├── app.tsx
│   ├── entry-client.tsx
│   ├── entry-server.tsx
│   └── global.d.ts
├── public
├── drizzle.config.ts
├── compose.yml
└── package.json
```

## License

This project is licensed under the MIT License.