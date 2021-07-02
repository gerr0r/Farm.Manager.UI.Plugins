import React from 'react'
import { Link } from 'react-router-dom'

const AdminMenu = () => {
    return (
        <div className="menu">
            <Link to="/farms">Farms</Link>
            <Link to="/users">Users</Link>
            <Link to="/employees">Employees</Link>
            <Link to="/profile">Profile</Link>
        </div>
    )
}

export default AdminMenu
