### Jobsy (_UNDER DEVELOPMENT_)

A job searching platform

---


### Technologies Used

1. [Sveltekit](https://kit.svelte.dev/)
2. [Prisma](https://www.prisma.io/)
3. [Lucia-auth](https://lucia-auth.com/)
4. [TailwindCSS](https://tailwindcss.com/)

### How to run it locally

If you want to run this project locally, you can follow the steps shown below.


#### Prerequisites

1. Node
2. pnpm

#### Commands

_ps_: The project uses SQLite for the database locally, if you want to use another DB, it's easy, follow the prisma docs or your database provider docs for the integration.

```sh
# Copy the environment variables and update them as you need
cp .env.example .env

# Install the dependencies
pnpm install

# Initialize the DB
pnpx prisma db push

# Generate your Prisma types
pnpx prisma generate

# Probably restart your TypeScript LSP

# Start the development server
pnpm run dev
```