import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { ACCOUNT_USERS } from "../gql";
import AddUserForm from "./AddUserForm";
import { getDate } from "../utils/date"

const Users = () => {
    const { loading, data } = useQuery(ACCOUNT_USERS);

    if (loading) return null;
    return (
      <div>
        <h3>Users</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Created at</th>
            </tr>
          </thead>
          <tbody>
            {data.accountUsers.map((user) => (
              <tr key={user.id}>
                <td>
                  <Link
                    to={{
                      pathname: `/users/${user.id}`,
                      state: { user },
                    }}
                  >
                    {user.email}
                  </Link>
                </td>
                <td>
                  {getDate(user.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <AddUserForm />
      </div>
    );
  };

export default Users
