import React from 'react'
import { Outlet } from 'react-router-dom'

function ClientLayout() {
  return (
    <div className=''>
    client layout
    <Outlet />
  </div>
  )
}

export default ClientLayout