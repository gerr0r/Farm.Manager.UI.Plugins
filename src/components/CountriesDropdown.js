import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { COUNTRIES, ADD_ASSIGNMENT } from "../gql";

const CountriesDropdown = ({ accountId }) => {
  const [errors, setErrors] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState("");
  const { loading, data } = useQuery(COUNTRIES);

  const [assignCountry] = useMutation(ADD_ASSIGNMENT, {
    variables: {
      accountId,
      countryCode: selectedCountry,
    },
    update(cache, { data: { addAssignment: newCountry } }) {
      cache.modify({
        // TODO FIX: CACHE DOESN'T UPDATE
        fields: {
          id: cache.identify(accountId),
          accountCountries(oldCountries = []) {
            return [...oldCountries, newCountry];
          },
        },
      });
    },
    onError(error) {
      setErrors(error.message)
    },
    onCompleted() {
      setErrors(null)
    }
  });

  if (loading) return null;
  return (
    <div className="form3">
      <select
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
      >
        <option disabled value={undefined}></option>
        {data.getCountries.map((country) => (
          <option key={country.code} value={country.code}>
            {country.name}
          </option>
        ))}
      </select>
      {errors && <small>{errors}</small> }
      <button disabled={!Boolean(selectedCountry)} onClick={assignCountry}>
        Assign
      </button>
    </div>
  );
};

export default CountriesDropdown;
