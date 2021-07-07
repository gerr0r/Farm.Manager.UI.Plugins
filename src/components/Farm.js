import React from 'react'
import { useLocation } from 'react-router-dom'
import FarmFields from './FarmFields'
import FarmEmployees from './FarmEmployees'
import FarmMachines from './FarmMachines'
 
const Farm = () => {
    const { state: { farm } } = useLocation()

    return (
        <div>
            <h3>Farm details</h3>
            <div>Name: {farm.name}</div>
            <div>Country: {farm.region.country.name}</div>
            <div>Region: {farm.region.name}</div>
            <h3>Farm fields</h3>
            <FarmFields farmId={farm.id}/>
            <h3>Farm employees</h3>
            <FarmEmployees farmId={farm.id}/>
            <h3>Farm machines</h3>
            <FarmMachines farmId={farm.id}/>
        </div>
    )
}

export default Farm
