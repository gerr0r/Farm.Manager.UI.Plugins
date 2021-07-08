import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { FARMS, SET_FARM_ACCESS, NEW_FARM } from "../gql";

const FarmsDropdown = ({ accountId }) => {
  const [errors, setErrors] = useState(false)
  const [selectedFarm, setSelectedFarm] = useState("");
  const { loading, data } = useQuery(FARMS);

  const [assignFarm] = useMutation(SET_FARM_ACCESS, {
    variables: {
      accountId,
      farmId: selectedFarm,
    },
    update(cache, { data: { setFarmAccess: newFarm } }) {
      cache.modify({
        fields: {
          id: cache.identify(accountId),
          userFarms(oldFarms = []) {
            return [...oldFarms, newFarm];
          },
        },
      });
    },
    onError(error) {
      setErrors(error.message)
    },
    onCompleted() {
      setErrors(false)
      setSelectedFarm("")
    }
  });

  if (loading) return null;
  return (
    <div className="form3">
      <select
        value={selectedFarm}
        onChange={(e) => setSelectedFarm(e.target.value)}
      >
        <option disabled value={undefined}></option>
        {data.getFarms.map((farm) => (
          <option key={farm.id} value={farm.id}>
            {`${farm.name} (${farm.region.name}, ${farm.region.country.name})`}
          </option>
        ))}
      </select>
      {errors && <small>{errors}</small>}
      <button disabled={!Boolean(selectedFarm)} onClick={assignFarm}>
        Set Access
      </button>
    </div>
  );
};

export default FarmsDropdown;
