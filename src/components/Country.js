import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { REGIONS } from "../gql";
import AddRegionForm from "./AddRegionForm";

const Country = () => {
  const { countryCode } = useParams();
  const { state } = useLocation();

  const { loading, data } = useQuery(REGIONS, {
    variables: { code: countryCode },
  });

  if (loading) return null;
  return (
    <div>
      <h3>{state.countryName} regions:</h3>
      {data.getRegions.length === 0 ? (
        <div>No regions currently added</div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {data.getRegions.map((region) => (
              <tr key={region.id}>
                <td>{region.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <AddRegionForm countryCode={countryCode} />
    </div>
  );
};

export default Country;
