import { useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import { FARM_EMPLOYEES } from "../gql";

const FarmEmployees = ({farmId}) => {

    const {loading, data} = useQuery(FARM_EMPLOYEES, {
        variables: { farmId }
    })

    if (loading) return null

    return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Address</th>
          <th>Phone Number</th>
          <th>Salary</th>
        </tr>
      </thead>
      <tbody>
        {data.getFarmEmployees.map((employee) => (
          <tr key={employee.id}>
            <td>
              <Link
                to={{
                  pathname: `/employees/${employee.id}`,
                  state: { employee },
                }}
              >
                {employee.name}
              </Link>
            </td>
            <td>
              {employee.address}
            </td>
            <td>{employee.number}</td>
            <td>{employee.salary}</td>
          </tr>
        ))}
      </tbody>
    </table>
    )
}

export default FarmEmployees
