import { auth } from '@/auth'
import React from 'react'

const SettingsPage = async () => {

  const session = await auth()

  console.log("User: ", session);
  
  return <div>{JSON.stringify(session)}</div>;
}

export default SettingsPage