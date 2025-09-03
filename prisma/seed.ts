import prisma from "../lib/prisma";

export  async function main() {
await  prisma.allInstaUser.createMany({
data:[
{userName:'roy'},
{userName:'benthem'},
{userName:'peter'},
{userName:'ross'},
{userName:'marty'},
]
})
console.log('seed done for all admins')



console.log ('seedng done  for  all users ')
}


main()
  .catch((err) => {
    console.error("❌ Error seeding:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

  /*
  npx prisma db push --force-reset 
  This deletes data AND creates tables from current schema.prisma
or, 
 Create a new schema for each app clone (e.g., Netflix).
 Run npx prisma migrate reset to clear the database.
 Run npx prisma migrate dev --name init to apply the new schema.
 Run npx prisma generate to update the client.
,Test locally with the direct URL (5432).
 Deploy to Vercel with the transaction pooling URL (6432) in .env




  */


console.log('seed  is working ')