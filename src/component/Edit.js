import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { updateData } from "./context/ContextProvider";

export default function Edit() {
  const navigate = useNavigate();
  const {update,setUPdata}=useContext(updateData)
  const [inpt, setInpt] = useState({
    name: "",
    age: "",
    email: "",
    address: "",
    mobile: "",
    work: "",
    Description: "",
  });

  const setData = (e) => {
    const { name, value } = e.target;
    setInpt((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const { id } = useParams("");
  const [userData, setUserData] = useState([]);

  const getUserData = async () => {
    console.log(`/getuser/${id}`);
    const res = await fetch(`https://crud24.herokuapp.com/getuser/${id}`, {
      method: "GET",
      header: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (res.status === 422 || !data) {
      alert("error");
    } else {
      setInpt(data);
      console.log(data);
    }
  };

  const updateUser = async (e) => {
    e.preventDefault();
    const { name, email, work, address, mobile, description, age } = inpt;
    const res2 = await fetch(`https://crud24.herokuapp.com/updateuser/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        work,
        address,
        mobile,
        description,
        age,
      }),
    });

    const data2 = await res2.json();
    if (res2.status == 422 || !data2) {
      alert("fill the data");
    } else {
      alert("data added");
      navigate("/");
      setUPdata(data2)
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="container">
      {" "}
      <NavLink to="/">Home</NavLink>
      <form className="mt-4">
        <div className="row">
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputEmail1" className="form-label">
              Name
            </label>
            <input
              type="text"
              value={inpt.name}
              name="name"
              onChange={setData}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" className="form-label">
              email
            </label>
            <input
              type="email"
              value={inpt.email}
              onChange={setData}
              name="email"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" className="form-label">
              age
            </label>
            <input
              type="number"
              value={inpt.age}
              onChange={setData}
              name="age"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>{" "}
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" className="form-label">
              Mobile
            </label>
            <input
              type="number "
              value={inpt.mobile}
              onChange={setData}
              name="mobile"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>{" "}
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" className="form-label">
              Work
            </label>
            <input
              type="text"
              value={inpt.work}
              onChange={setData}
              name="work"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" className="form-label">
              Address
            </label>
            <input
              type="text"
              value={inpt.address}
              name="address"
              onChange={setData}
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              type="text"
              onChange={setData}
              value={inpt.Description}
              name="Description"
              id=""
              cols="30"
              rows="5"
            ></textarea>
          </div>
          <button
            type="submit"
            onClick={updateUser}
            className="btn btn-primary"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
