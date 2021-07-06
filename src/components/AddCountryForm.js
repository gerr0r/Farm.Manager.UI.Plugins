import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_COUNTRY } from "../gql";

const AddCountryForm = () => {
  const [errors, setErrors] = useState(null);
  const [values, setValues] = useState({
    code: "",
    name: "",
  });

  const [addCountry] = useMutation(ADD_COUNTRY, {
    variables: { ...values },
    update(cache, { data: { addCountry } }) {
      cache.modify({
        fields: {
          getCountries(oldCountries = []) {
            return [...oldCountries, addCountry];
          },
        },
      });
    },
    onCompleted() {
      setValues({
        code: "",
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
      <h3>Add country</h3>
      <input
        type="text"
        name="name"
        value={values.name}
        placeholder="Name"
        onChange={changeValue}
      />
      <input
        type="text"
        name="code"
        value={values.code}
        placeholder="ISO code"
        onChange={changeValue}
      />
      {errors && <small>{errors}</small>}
      <button onClick={addCountry}>Add</button>
    </div>
  );
};

export default AddCountryForm;
