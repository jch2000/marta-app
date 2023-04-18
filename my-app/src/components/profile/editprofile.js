import React, { useState, useEffect } from "react";
import Axios from "axios";
import Navbar from "../Navbar/navbar";

function EditProfile() {
  const [firstnameProf, setfirstnameProf] = useState("");
  const [lastnameProf, setlastnameProf] = useState("");
  const [emailProf, setemailProf] = useState("");
  const [phoneProf, setphoneProf] = useState("");
  const [passwordProf, setpasswordProf] = useState("");
  const [editUserList, seteditUserList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/edit").then((response) => {
      seteditUserList(response.data);
    });
  }, []);

  const updateUser = (email) => {
    Axios.put(`http://localhost:3001/update/${email}`, {
      first_name: firstnameProf,
      last_name: lastnameProf,
      email: emailProf,
      phone: phoneProf,
      password: passwordProf,
    }).then((response) => {
      seteditUserList(
        editUserList.map((val) => {
          return val.email === email
            ? {
                ...val,
                firstnameProf: firstnameProf,
                lastnameProf: lastnameProf,
                emailProf: emailProf,
                phoneProf: phoneProf,
                passwordProf: passwordProf,
              }
            : val;
        })
      );
    });
  };

  const deleteUser = (email) => {
    Axios.delete(`http://localhost:3001/delete/${email}`).then(
      (response) => {
        seteditUserList(
          editUserList.filter((val) => {
            return val.email !== email;
          })
        );
      }
    );
  };

  return (
    <><Navbar />
    <div className="edit-profile">
          <div className="update-profile">
              <label>First Name</label>
              <input
                  type="text"
                  onChange={(e) => {
                      setfirstnameProf(e.target.value);
                  } } />
              <br />
              <label>Last Name</label>
              <input
                  type="text"
                  onChange={(e) => {
                      setlastnameProf(e.target.value);
                  } } />
              <br />
              <label>Email</label>
              <input
                  type="text"
                  onChange={(e) => {
                      setemailProf(e.target.value);
                  } } />
              <br />
              <label>Phone</label>
              <input
                  type="text"
                  onChange={(e) => {
                      setphoneProf(e.target.value);
                  } } />
              <br />
              <label>Password</label>
              <input
                  type="text"
                  onChange={(e) => {
                      setpasswordProf(e.target.value);
                  } } />
              <br />
          </div>
          <div className="update-delete-user">
              {editUserList.map((val, key) => {
                  return (
                      <div className="user" key={key}>
                          <div>
                              <h3>First Name: {val.first_name}</h3>
                              <h3>Last Name: {val.last_name}</h3>
                              <h3>Email: {val.email}</h3>
                              <h3>Phone: {val.phone}</h3>
                              <h3>Password: {val.password}</h3>
                          </div>
                          <div className="button-group">
                              <button onClick={() => updateUser(val.email)}>Save Changes</button>
                              <button onClick={() => deleteUser(val.email)}>Delete Account</button>
                          </div>
                      </div>
                  );
              })}
          </div>
      </div></>
  );
}

export default EditProfile
