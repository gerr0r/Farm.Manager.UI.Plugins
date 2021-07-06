import React from "react";
import { Link } from 'react-router-dom'
import { INACTIVE_ACCOUNTS, ACTIVATE } from "../gql";
import { useQuery, useMutation } from "@apollo/client";
import { getDate } from "../utils/date";

const InactiveAccounts = () => {
  const { loading, data, error } = useQuery(INACTIVE_ACCOUNTS);

  const [activate, { loading: mLoading, data: mData, error: mError }] =
    useMutation(ACTIVATE, {
      update(cache, { data: { activate: {id, email, createdAt} } }) {
        cache.modify({
          fields: {
            inactiveAccounts(oldAccounts, { readField }) {
              return oldAccounts.filter(
                (account) => id !== readField("id", account)
              );
            },
            activeAccounts(oldAccounts = []) {
              return [...oldAccounts, {id, email, createdAt}]
            }
          },
        });
      },
      onError(error) {
        console.log(error);
      }
    });

  function activateAccount(id) {
    activate({
      variables: {
        id,
      },
    });
  }

  if (loading) return null;
  return (
    <div>
      <h3>Inactive Accounts</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Account</th>
            <th>Registered on</th>
            <th>Activate</th>
          </tr>
        </thead>
        <tbody>
          {data.inactiveAccounts.map((account) => (
            <tr key={account.id}>
              <td><Link to={`/inactive-accounts/${account.id}`}>{account.email}</Link></td>
              <td>
                {getDate(account.createdAt)}
              </td>
              <td>
                <button onClick={() => activateAccount(account.id)}>
                  Activate
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InactiveAccounts;
