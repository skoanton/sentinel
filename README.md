# Sentinel - Server Monitoring Dashboard

Sentinel is a self-hosted server dashboard that provides real-time monitoring of server status, Docker containers, Roomba data, weather updates, and network-connected devices.

## 🚀 Getting Started

### **1. Set Up Environment Variables**

Copy the `.env.example` files and rename them to `.env` in the **root**, **server**, and **client** directories:

```bash
cp .env.example .env
cp server/.env.example server/.env
cp client/.env.example client/.env
```

### **2. Start PostgreSQL (Docker)**

Run the following command to start the PostgreSQL database:

```bash
docker-compose up postgres
```

### **3. Install and Set Up the Backend**

Navigate to the **server** directory and install dependencies:

```bash
cd server
npm install
npm run setup
```

The `npm run setup` command sets up Prisma, a database toolkit. Here are some basic Prisma commands you can use:

- **Migrate the database**: Applies pending migrations to the database.

  ```bash
  npm run prisma:migrate
  ```

- **Generate Prisma Client**: Generates the Prisma Client based on the schema.

  ```bash
  npm run prisma:generate
  ```

- **Open Prisma Studio**: Opens Prisma Studio, a GUI for the database.

  ```bash
  npm run prisma:studio
  ```

- **Seed the database**: Seeds the database with initial data.
  ```bash
  npm run prisma:seed
  ```

### **4. Start the Backend**

Run the backend API:

```bash
npm run dev
```

### **5. Install and Start the Frontend**

Navigate to the **client** directory and install dependencies:

```bash
cd client
npm install
npm run dev
```

### **6. Access the Dashboard**

Once both the backend and frontend are running, open your browser and go to:

```
http://localhost:3000
```
