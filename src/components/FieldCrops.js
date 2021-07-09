import { useQuery } from "@apollo/client";
import React from "react";
import { useLocation } from "react-router-dom";
import { FIELD_CROPS } from "../gql";

const FieldCrops = () => {
  const { state: { field } } = useLocation();

  const { loading , data } = useQuery(FIELD_CROPS, {
      variables: {
          fieldId: field.id
      }
  })

  if (loading) return null
  return (
    <div>
      <h3>Field soil type: {field.soilType}</h3>
      <h3>Field crops growth:</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Crop</th>
            <th>Growth (%)</th>
          </tr>
        </thead>
        <tbody>
          {data.getFieldCrops.map((fieldCrop) => (
            <tr key={fieldCrop.id}>
              <td>{fieldCrop.crop.name}</td>
              <td>{fieldCrop.growth}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FieldCrops;
