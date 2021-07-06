import React from "react";
import { Link } from "react-router-dom";
import AddCountryForm from "./AddCountryForm";

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
              <td>
                <Link
                  to={{
                    pathname: `/countries/${country.code}`,
                    state: { countryName: country.name },
                  }}
                >
                  {country.name}
                </Link>
              </td>
              <td>{country.code}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddCountryForm />
    </div>
  );
};

export default Countries;
