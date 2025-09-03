import { NextRequest, NextResponse } from "next/server";
export async function POST(req:NextRequest) {
try{
const body= await req.json()
console.log('req came backend next api  form second post ')
if(!body){
return NextResponse.json('cant find body',{status:404})
}
const {userName}= body
console.log(`${userName} from backend from second post  `)
return NextResponse.json('sucess',{status:201})
}catch{
return NextResponse.json('try catch error ',{status:500})
}
}