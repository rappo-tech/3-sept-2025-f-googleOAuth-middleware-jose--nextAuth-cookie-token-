'use client'
import { ChangeEvent, useEffect, useRef, useState } from "react"
import axios from "axios"


export default function Vdo() {

const vdo=useRef<HTMLVideoElement|null>(null)
const inputFile=useRef<HTMLInputElement|null>(null)
const [vdoUrl,setVdoUrl]=useState<string>('')
const [totalDuration,setTotalDuration]=useState<number>(0)
const [progress,setProgress]=useState<number>(0)
const [isOn,setIsOn]=useState<boolean>(false)
const[userName,setUserName]=useState<string>('')


const saveBackend=async()=>{
const response=await axios.post('/protect/createPost',{userName},{headers:{'Content-Type':"application/json"}})
if(response.status===201){
setUserName('')
}
}


const saveBackend2=async()=>{
const response=await axios.post('/protect/secondPost',{userName},{headers:{'Content-Type':"application/json"}})
if(response.status===201){
setUserName('')
}
}


//if vdoUrl then delte the url
useEffect(()=>{
return ()=>{
if(vdoUrl){
URL.revokeObjectURL(vdoUrl)
}
}
},[vdoUrl])

//open fileGallery
const openFilefallery=()=>{
inputFile.current?.click()
}
//select and input the form
const handleInputVdoFile=(e:ChangeEvent<HTMLInputElement>)=>{
const fileName=e.target.files?.[0]
if(fileName&& vdo.current){
const url=URL.createObjectURL(fileName)
setVdoUrl(url)
vdo.current.src=url
vdo.current.play()
}
}
//set vdo total durtaion and progressDuration 
const setVdoDuration=()=>{
if(vdo.current){
setProgress(vdo.current.currentTime)
setTotalDuration(vdo.current.duration)
}
}
//drag the duration 
const dragDuration=(e:ChangeEvent<HTMLInputElement>)=>{
if(vdo.current){
vdo.current.currentTime=Math.floor(Number(e.target.value))
setProgress(Math.floor(Number(e.target.value)))
}
}
//pauseNPlay
const pause=()=>{
if(!vdo.current) return 
if(isOn){
vdo.current.play()
}else{
vdo.current.pause()
}
setIsOn(!isOn)
}




    return (<div>
<h1> vdo page </h1>

<input
type="text"
placeholder="enter userNmae "
value={userName}
onChange={(e)=>setUserName(e.target.value)}
/>
<button onClick={saveBackend} className="bg-green-700">sign in </button>
<button onClick={saveBackend2} className="bg-amber-400">2nd signIn </button>

<p>{isOn?'vdo is on  ':"vdo is off "}</p>

<input 
ref={inputFile}
type="file"
placeholder="enter your price "
onChange={handleInputVdoFile}
/>
<button onClick={openFilefallery}>open a fileGallery</button>


<video
autoPlay
muted
playsInline
className="w-48 h-36 rounded-2xl border-2"
ref={vdo}
onTimeUpdate={setVdoDuration}
></video>


<input
type="range"
max={100|totalDuration}
min={0}
value={progress}
onChange={dragDuration}
></input>

<button  className="bg-red-500" onClick={pause}>playNPause

</button>

    </div>)
}