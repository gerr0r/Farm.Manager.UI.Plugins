import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../gql";

const AddUserForm = () => {
  const [errors, setErrors] = useState(null);
  const [values, setValues] = useState({
      email: "",
      password: "",
  });

  const [addUser] = useMutation(ADD_USER, {
    variables: { ...values },
    update(cache, { data: { addUser } }) {
      cache.modify({
        fields: {
          accountUsers(oldUsers = []) {
            return [...oldUsers, addUser];
          },
        },
      });
    },
    onCompleted() {
      setValues({
        password: "",
        email: "",
      });
      setErrors(null);
    },
    onError(error) {
      setErrors(error.message);
    },
  });

  function changeValue(e) {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className="form2">
      <h3>Create new user</h3>
      <input
        type="text"
        name="email"
        value={values.email}
        placeholder="Email"
        onChange={changeValue}
      />
      <input
        type="password"
        name="password"
        value={values.password}
        placeholder="Password"
        onChange={changeValue}
      />
      {errors && <small>{errors}</small>}
      <button onClick={addUser}>Create</button>
    </div>
  );
};

export default AddUserForm;
