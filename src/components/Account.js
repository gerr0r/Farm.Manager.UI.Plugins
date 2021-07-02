import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { ACCOUNT } from "../gql";
import { getDate } from "../utils/date";

const Account = () => {
  const { accountId } = useParams();
  const { loading, data, error } = useQuery(ACCOUNT, {
    variables: {
      id: accountId,
    },
  });

  if (loading) return null;
  return (
    <div>
      <h3>Account Info</h3>
      <h1>Account name: {data.account.email}</h1>
      <h1>Registration date: {getDate(data.account.createdAt)}</h1>
      {data.account.countries.map(({ country }) => (
        <div key={country.code}>{country.name}</div>
      ))}
    </div>
  );
};

export default Account;
