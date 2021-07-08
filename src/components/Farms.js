import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { FARMS } from "../gql";
import AddFarmForm from "./AddFarmForm";

const Farms = () => {
  const { loading, data } = useQuery(FARMS);

  if (loading) return null;
  return (
    <div>
      <h3>Farms</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {data.getFarms.map((farm) => (
            <tr key={farm.id}>
              <td>
                <Link
                  to={{
                    pathname: `/farms/${farm.id}`,
                    state: { farm },
                  }}
                >
                  {farm.name}
                </Link>
              </td>
              <td>
                {farm.region.name}, {farm.region.country.name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddFarmForm />
    </div>
  );
};

export default Farms;
