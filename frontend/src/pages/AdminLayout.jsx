import React from 'react'
import AdminNavbar from '../components/AdminNavbar'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div>
      <AdminNavbar/>
      <Outlet/>
    </div>
  )
}

export default AdminLayout
