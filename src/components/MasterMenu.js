import React from 'react'
import { Link } from 'react-router-dom'

const MasterMenu = () => {
    return (
        <div className="menu">
            <Link to="/inactive-accounts">Inactive Accounts</Link>
            <Link to="/active-accounts">Active Accounts</Link>
            <Link to="/countries">Countries</Link>
        </div>
    )
}

export default MasterMenu
