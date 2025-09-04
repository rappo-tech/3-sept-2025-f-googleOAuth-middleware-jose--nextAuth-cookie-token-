import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function POST(req:NextRequest) {
try{
const body= await req.json()
console.log('req came backend next api  form second post ')
if(!body){
return NextResponse.json('cant find body',{status:404})
}
const {userName}= body
const result=await prisma.allInstaUser.create({
data:{userName}, 
select:{id:true}
})
console.log(` resultId: ${result.id} from backend from second post  `)
return NextResponse.json(`${result.id}`,{status:201})
}catch{
return NextResponse.json('try catch error ',{status:500})
}
}