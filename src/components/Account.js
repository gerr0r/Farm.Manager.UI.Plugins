import React from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { ACCOUNT, REMOVE_ASSIGNMENT } from "../gql";
import { getDate } from "../utils/date";
import CountriesDropdown from "./CountriesDropdown";

const Account = () => {
  const { accountId } = useParams();
  const { loading, data, error } = useQuery(ACCOUNT, {
    variables: {
      id: accountId,
    },
  });

  const [remove] = useMutation(REMOVE_ASSIGNMENT, {
    update(cache, { data: { removeAssignment } }) {
      cache.modify({
        // TODO FIX: CACHE DOESN'T UPDATE
        id: cache.identify(`Account:${accountId}`),
        fields: {
          countries(oldCountries = [], { readField }) {
            return oldCountries.filter(({ country }) => {
              removeAssignment.country.code !== readField("code", country);
            });
          },
        },
      });
    },
  });

  function removeAssignment(countryCode) {
    remove({
      variables: {
        accountId,
        countryCode,
      },
    });
  }

  if (loading) return null;
  return (
    <div>
      <h3>Account Info</h3>
      <h4>Account name: {data.account.email}</h4>
      <h4>Registration date: {getDate(data.account.createdAt)}</h4>
      <h4>Country assignments:</h4>

      {data.account.countries.length === 0 ? (
        <small>No assignments found</small>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {data.account.countries.map(({ country }) => (
              <tr key={country.code}>
                <td>{country.name}</td>
                <td>
                  <button onClick={() => removeAssignment(country.code)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      
      <h4>Select country to assign:</h4>
      <CountriesDropdown accountId={accountId} />
    </div>
  );
};

export default Account;
