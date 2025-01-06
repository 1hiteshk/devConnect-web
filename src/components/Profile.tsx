import React from 'react'
import EditProfile from './EditProfile'
import { useSelector } from 'react-redux'

type Props = {}

const Profile = (props: Props) => {
  const user = useSelector((store:any)=>store.user)
  return (
    user && <div >
    <EditProfile user={user} />
  </div>
  )
}

export default Profile