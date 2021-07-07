import { useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import { EMPLOYEES } from "../gql";

const Employees = () => {
    const {loading, data} = useQuery(EMPLOYEES)

    if (loading) return null
    return (
        <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>Salary</th>
            <th>Farm</th>
          </tr>
        </thead>
        <tbody>
          {data.getEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>
                <Link
                  to={{
                    pathname: `/employees/${employee.id}`,
                  //   state: { farm },
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
              <td>{employee.farmId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
}

export default Employees
