import NewMeetupForm from '@/components/meetups/NewMeetupForm'
import { useRouter } from 'next/router'
import React from 'react'

const NewMeetupPage = () => {
  const router=useRouter()
  async function addMeetupHandler(data){
    const response =await fetch('/api/new-meetup',{
      method:'POST',
      headers:{'Content-type': 'application/json'},
      body:JSON.stringify(data)
    })
const result=await response.json()
console.log(result);
    router.push('/')
  }

  return (
    <NewMeetupForm  onAddMeetup={addMeetupHandler} />
  )
}

export default NewMeetupPage