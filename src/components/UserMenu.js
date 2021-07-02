import React from 'react'
import { Link } from 'react-router-dom'

const farms = [
    {id: 1, name: 'farm1'},
    {id: 2, name: 'farm2'},
    {id: 3, name: 'farm3'},
    {id: 4, name: 'farm4'},
    {id: 5, name: 'farm5'},
]

const UserMenu = () => {
    if (!farms) return null
    return (
        <div className="menu">
            {farms.map(farm =>
                <Link key={farm.id} to={`/farms/${farm.id}`}>{farm.name}</Link>
            )}
        </div>
    )
}

export default UserMenu
