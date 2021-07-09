import { useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import { USER_FARMS } from "../gql";

const UserMenu = () => {
  const { loading, data } = useQuery(USER_FARMS);

  if (loading) return null;
  return (
    <div className="menu">
      {data.userFarms.map(({ farm }) => (
        <Link
          key={farm.id}
          to={{ pathname: `/farms/${farm.id}`, state: { farm } }}
        >
          {farm.name}
        </Link>
      ))}
    </div>
  );
};

export default UserMenu;
