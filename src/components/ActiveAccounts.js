import React from "react";
import { Link } from 'react-router-dom'
import { ACTIVE_ACCOUNTS, DEACTIVATE } from "../gql";
import { useQuery, useMutation } from "@apollo/client";
import { getDate } from "../utils/date";

const ActiveAccounts = () => {
  const { loading, data, error } = useQuery(ACTIVE_ACCOUNTS);

  const [deactivate, { loading: mLoading, data: mData, error: mError }] =
    useMutation(DEACTIVATE, {
      update(cache, { data: { deactivate: id } }) {
        cache.modify({
          fields: {
            activeAccounts(oldAccounts, { readField }) {
              return oldAccounts.filter(
                (account) => id !== readField("id", account)
              );
            },
          },
        });
      },
    });

  function deactivateAccount(id) {
    deactivate({
      variables: {
        id,
      },
    });
  }

  if (loading) return null;
  return (
    <div>
      <h3>Active Accounts</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Account</th>
            <th>Registered on</th>
            <th>Deactivate</th>
          </tr>
        </thead>
        <tbody>
          {data.activeAccounts.map((account) => (
            <tr key={account.id}>
              <td><Link to={`/active-accounts/${account.id}`}>{account.email}</Link></td>
              <td>
                {getDate(account.createdAt)}
              </td>
              <td>
                <button onClick={() => deactivateAccount(account.id)}>
                  Dectivate
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActiveAccounts;
