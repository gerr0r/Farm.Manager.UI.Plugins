import React from 'react'

import { COUNTRIES } from "../gql";
import { useQuery } from "@apollo/client";

const Countries = () => {
  const { loading, data, error } = useQuery(COUNTRIES);

  if (loading) return null;
  return (
    <div>
      <h3>Countries</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>ISO Code</th>
          </tr>
        </thead>
        <tbody>
          {data.getCountries.map((country) => (
            <tr key={country.code}>
              <td>{country.name}</td>
              <td>{country.code}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Countries
