import { useQuery } from "@apollo/client";
import React from "react";
import { FARM_MACHINES } from "../gql";
import { Link } from "react-router-dom";

const FarmMachines = ({farmId}) => {

    const { loading, data } = useQuery(FARM_MACHINES, {
        variables: { farmId }
    })

    if (loading) return null
    return (
        <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Model name</th>
            <th>Machines in farm</th>
          </tr>
        </thead>
        <tbody>
          {data.getFarmMachines.map((farmMachine, index) => (
            <tr key={farmMachine.id}>
                <td>{index + 1}</td>
              <td>
                <Link
                  to={{
                    pathname: `/machines/${farmMachine.machine.id}`,
                    state: { machineId: farmMachine.machine.id },
                  }}
                >
                  {farmMachine.machine.model}
                </Link>
              </td>
              <td>
                {farmMachine.quantity}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
}

export default FarmMachines
