import { useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import { EMPLOYEES } from "../gql";

const Employees = () => {
  const { loading, data } = useQuery(EMPLOYEES);

  if (loading) return null;
  return (
    <div>
      <h3>Employees:</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>Salary</th>
            <th>Farm</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {data.getEmployees.map((employee) => (
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
              <td>{employee.address}</td>
              <td>{employee.number}</td>
              <td>{employee.salary}</td>
              <td>{employee.farm.name}</td>
              <td>
                {employee.farm.region.name}, {employee.farm.region.country.name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Employees;
