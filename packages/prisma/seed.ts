import { getPrismaClient } from "./index";

const prisma = getPrismaClient(process.env.DATABASE_URL || "");

async function main() {
  if (!prisma) {
    throw new Error("Failed to initialize Prisma Client");
  }

  console.log("Seeding database...");

  // Clean up existing data
  await prisma.user.deleteMany();

  const userData = [
    { name: "Alice Smith", email: "alice.smith@example.com" },
    { name: "Bob Jones", email: "bob.jones@test.co" },
    { name: "Charlie Brown", email: "charlie.brown@domain.net" },
    { name: "Diana Prince", email: "diana.prince@mysite.org" },
    { name: "Evan Wright", email: "evan.wright@company.io" },
  ];

  // Create users
  const users = await Promise.all(
    userData.map((user) =>
      prisma.user.create({
        data: user,
      }),
    ),
  );

  console.log(`Created ${users.length} users.`);

  // Explicitly exit because the pg pool in index.ts is not exposed for closing
  // and Prisma with adapters doesn't close the pool on $disconnect
  process.exit(0);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    if (prisma) {
      await prisma.$disconnect();
    }
  });
