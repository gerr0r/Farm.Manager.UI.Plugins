import React from 'react'
import { useLocation } from 'react-router-dom'

const Employee = () => {
    const { state: { employee }} = useLocation()

    return (
        <div>
            <h3>Employee details</h3>
            <h4>Name: {employee.name}</h4>
            <h4>Address: {employee.address}</h4>
            <h4>Phone: {employee.number}</h4>
            <h4>Salary: {employee.salary}&euro;</h4>
            <h4>Farm: {employee.farm.name}</h4>
            <h4>Farm location: {employee.farm.region.name}, {employee.farm.region.country.name}</h4>
        </div>
    )
}

export default Employee
