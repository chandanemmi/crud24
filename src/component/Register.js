import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { addData } from "./context/ContextProvider";
export default function Register() {
  const { Udata, setUdata } = useContext(addData);
  const navigate = useNavigate();
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

  const addinpdata = async (e) => {
    e.preventDefault();

    const { name, email, work, address, mobile, Description, age } = inpt;

    const res = await fetch("https://crud24.herokuapp.com/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        work,
        address,
        mobile,
        Description,
        age,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error ");
      alert("error");
    } else {
      navigate("/");
      setUdata(data);
      console.log("data added");
    }
  };
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
            onClick={addinpdata}
            className="btn btn-primary"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
