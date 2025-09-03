'use client'
import Link from "next/link"
import { useSession,signIn,signOut } from "next-auth/react"

export  default function HOME() {
const{data:session,status}=useSession()
if(status==='loading'){
return <p>checking info... </p>
}
//9973144117
if(status==='unauthenticated'){
return <button className="bg-green-400 hover:bg-amber-50"  
onClick={()=>signIn('google')}
>sign in </button>
}

  return (<div>

<Link href={'/vdo'}>
<button className="bg-pink-900 hover:bg-amber-50">go to vdo  </button>
</Link>

<p className="bg-yellow-500">{session?.user?.name}</p>
<p>id: {session?.user?.id}</p>
<p>img:{session?.user?.image}</p>
<p>exp : {session?.expires}</p>
<p>token : {session?.user?.customToken}</p>
<button onClick={()=>signOut()}>log out </button>

  </div>)
}