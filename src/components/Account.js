import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { ACCOUNT_COUNTRIES, REMOVE_ASSIGNMENT } from "../gql";
import { getDate } from "../utils/date";
import CountriesDropdown from "./CountriesDropdown";

const Account = () => {
  const { state: { account } } = useLocation()
  const { loading, data, error } = useQuery(ACCOUNT_COUNTRIES, {
    variables: {
      accountId: account.id,
    },
  });

  const [remove] = useMutation(REMOVE_ASSIGNMENT, {
    update(cache, { data: { removeAssignment } }) {
      cache.modify({
        fields: {
          id: cache.identify(account.id),
          accountCountries(oldCountries = []) {
            oldCountries.filter(({ country }) => {
              removeAssignment.country.code !== country.code;
            });
          },
        },
      });
    },
  });

  function removeAssignment(countryCode) {
    remove({
      variables: {
        accountId: account.id,
        countryCode,
      },
    });
  }

  if (loading) return null;
  return (
    <div>
      <h3>Account Info</h3>
      <h4>Account name: {account.email}</h4>
      <h4>Registration date: {getDate(account.createdAt)}</h4>
      <h4>Country assignments:</h4>

      {data.accountCountries.length === 0 ? (
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
            {data.accountCountries.map(({ country }) => (
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
      <CountriesDropdown accountId={account.id} />
    </div>
  );
};

export default Account;
