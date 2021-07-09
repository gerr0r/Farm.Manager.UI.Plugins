import { useQuery } from '@apollo/client'
import React from 'react'
import { useLocation } from 'react-router-dom'
import { MACHINE } from '../gql'

const MachineDetails = () => {
    const { state: { machineId }} = useLocation()

    const {loading, data} = useQuery(MACHINE, {
        variables: { id: machineId }
    })

    if (loading) return null
    return (
        <div>
            <h3>Machine details:</h3>
            <h4>Model name: {data.getMachine.model}</h4>
            <h4>Machine type: {data.getMachine.type}</h4>
            {data.getMachine.engine && <h4>Engine type: {data.getMachine.engine}</h4>}
        </div>
    )
}

export default MachineDetails
