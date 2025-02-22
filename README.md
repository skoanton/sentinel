# Remix Template Setup

This template includes:

- Remix
- PostgreSQL
- Prisma
- Docker Compose

It is ready for production use.

## Setup Instructions

Follow these steps to set up your Remix template project:

1. **Copy the example environment file:**

   ```sh
   cp .env.example .env
   ```

2. **Install the necessary npm packages:**

   ```sh
   npm install
   ```

3. **Start the PostgreSQL database using Docker Compose:**

   ```sh
   docker compose up postgres
   ```

4. **Create a Prisma schema inside `schema.prisma`.**

5. **Run the Prisma migration:**

   ```sh
   npx prisma migrate dev --name init
   ```

6. **Set up the project:**

   ```sh
   npm run setup
   ```

7. **Start the development server:**

   ```sh
   npm run dev
   ```

8. **To run the project in production, simply use Docker Compose:**

   ```sh
   docker compose up
   ```
