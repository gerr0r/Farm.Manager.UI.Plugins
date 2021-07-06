import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_REGION } from "../gql";

const AddRegionForm = ({ countryCode }) => {
  const [errors, setErrors] = useState(null);
  const [values, setValues] = useState({
    name: "",
  });

  const [addRegion] = useMutation(ADD_REGION, {
    variables: { ...values, countryId: countryCode },
    update(cache, { data: { addRegion } }) {
      cache.modify({
        fields: {
          getRegions(oldRegions = []) {
            return [...oldRegions, addRegion];
          },
        },
      });
    },
    onCompleted() {
      setValues({
        name: "",
      });
      setErrors(null);
    },
    onError(error) {
      setErrors(error.message);
    },
  });

  function changeValue(e) {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className="form2">
      <h3>Add region</h3>
      <input
        type="text"
        name="name"
        value={values.name}
        placeholder="Name"
        onChange={changeValue}
      />
      {errors && <small>{errors}</small>}
      <button onClick={addRegion}>Add</button>
    </div>
  );
};

export default AddRegionForm;
