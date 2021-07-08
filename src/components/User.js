import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { USER_FARMS } from "../gql";
import FarmsDropdown from "./FarmsDropdown";

const User = () => {
    const { state: { user } } = useLocation()

    const {loading , data} = useQuery(USER_FARMS, {
        variables: { accountId: user.id }
    })

    if (loading) return null
  return (
    <div>
      <h3>{user.email} farms access</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Farm name</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {data.userFarms.map(({farm}) => (
            <tr key={farm.id}>
              <td>
                <Link
                  to={{
                    pathname: `/farms/${farm.id}`,
                    state: { farm },
                  }}
                >
                  {farm.name}
                </Link>
              </td>
              <td>
                {farm.region.name}, {farm.region.country.name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Select farm to add access:</h3>
      <FarmsDropdown accountId={user.id} />
    </div>
  );
};

export default User;
