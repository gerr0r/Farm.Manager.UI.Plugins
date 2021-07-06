import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { COUNTRIES, ADD_ASSIGNMENT, NEW_COUNTRY } from "../gql";

const CountriesDropdown = ({ accountId }) => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const { loading, data } = useQuery(COUNTRIES);

  const [assignCountry] = useMutation(ADD_ASSIGNMENT, {
    variables: {
      accountId,
      countryCode: selectedCountry,
    },
    update(cache, { data: { addAssignment } }) {
      cache.modify({
        // TODO FIX: CACHE DOESN'T UPDATE
        id: cache.identify(`Account:${accountId}`),
        fields: {
          countries(oldCountries = []) {
            const newCountry = cache.writeFragment({
              data: addAssignment,
              fragment: NEW_COUNTRY,
            });
            return [...oldCountries, newCountry];
          },
        },
      });
    },
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
      <button disabled={!Boolean(selectedCountry)} onClick={assignCountry}>
        Assign
      </button>
    </div>
  );
};

export default CountriesDropdown;
