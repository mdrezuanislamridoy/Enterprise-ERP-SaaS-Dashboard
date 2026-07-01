const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function test() {
  const user = await prisma.user.findUnique({ where: { email: 'admin@nexus.com' } });
  console.log("User:", user);
  const isValid = await bcrypt.compare('Admin123!', user.password);
  console.log("IsValid:", isValid);
}
test().catch(console.error).finally(() => prisma.$disconnect());
