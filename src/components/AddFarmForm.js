import React, { useState } from "react";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { ACCOUNT_COUNTRIES, REGIONS, ADD_FARM } from "../gql";

const AddFarmForm = () => {
    const [errors, setErrors] = useState(false)
    const [values, setValues] = useState({
        name: "",
        country: "",
        region: ""
    });

    const { loading, data } = useQuery(ACCOUNT_COUNTRIES);
    const [getRegions, { data: regionsQuery }] = useLazyQuery(REGIONS)
    const [addFarm, {}] = useMutation(ADD_FARM, {
        variables: {
            name: values.name,
            regionId: values.region
        },
        update(cache, { data: { addFarm }}) {
            cache.modify({
                fields: {
                    getFarms(oldFarms = []) {
                        return [...oldFarms, addFarm]
                    }
                }
            })
        },
        onCompleted() {
            setValues({
                name: "",
                country: "",
                region: ""
            })
            setErrors(false)
        },
        onError(error) {
            setErrors(error.message)
        }
    })


  function changeValue(e) {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
      ...(e.target.name === "country" && { region: "" })
    });

    if (e.target.name === "country") {
        getRegions({
            variables: {
                code: e.target.value
            }
        })
    }
  }

  if (loading) return null
  return (
    <div className="form2">
      <h3>Add Farm</h3>
      <input
        type="text"
        name="name"
        value={values.name}
        placeholder="Name"
        onChange={changeValue}
      />
      <select
        name="country"
        value={values.country}
        onChange={changeValue}
      >
        <option disabled value={undefined}></option>
        {data.accountCountries.map(({country}) => (
          <option key={country.code} value={country.code}>
            {country.name}
          </option>
        ))}
      </select>
      <select
      name="region"
      disabled={!Boolean(values.country)}
      value={values.region}
      onChange={changeValue}
      >
        <option disabled value={undefined}></option>
        {regionsQuery && regionsQuery.getRegions.map((region) => (
            <option key={region.id} value={region.id}>
            {region.name}
          </option>
        ))}
      </select>
      {errors && <small>{errors}</small>}
      <button onClick={addFarm}>Add</button>
    </div>
  );
};

export default AddFarmForm;
