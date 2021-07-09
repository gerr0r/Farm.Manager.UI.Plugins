import { useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import { FARM_FIELDS } from "../gql";

const FarmFields = ({ farmId }) => {
  const { loading, data } = useQuery(FARM_FIELDS, {
    variables: { farmId },
  });

  if (loading) return null;
  return (
    <table className="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Soil type</th>
          <th>Crops</th>
        </tr>
      </thead>
      <tbody>
        {data.getFarmFields.map((field, index) => (
          <tr key={field.id}>
            <td>{index + 1}</td>
            <td>{field.soilType}</td>
            <td>
              <Link
                to={{
                  pathname: `/fields/${field.id}/crops`,
                  state: { field },
                }}
              >
                Show map
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FarmFields;
