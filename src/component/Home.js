import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { addData, DeleteData, updateData } from "./context/ContextProvider";

export default function Home() {
  const [getUser, setUserdata] = useState([]);
  const {Delete,setDelete} =useContext(DeleteData)

  const getDara = async (e) => {
    const res = await fetch("https://crud24.herokuapp.com/getdata", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 404 || !data) {
      console.log("error ");
      alert("error");
    } else {
      // history.push("/")
      setUserdata(data);
      // console.log("data added");
    }
  };
  useEffect(() => {
    getDara();
  }, []);

  const DeleteUSer = async (id) => {
    const res = await fetch(`https://crud24.herokuapp.com/deleteuser/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const deletedata = await res.json();
    if (res.status === 422 || !deletedata) {
      alert("error delete");
    } else {
      alert("DEleted");
      getDara();
      setDelete(deletedata)
    }
  };

  const { Udata, setUdata } = useContext(addData);
  const { update, setUPdata} = useContext(updateData);

  return (
    <>
      {Udata ? (
        <>
          <div
            class="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            <strong>{Udata.name}!</strong> Added User successfully
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        </>
      ) : (
        ""
      )}
      {update ? (
        <>
          <div
            class="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            <strong>{update.name}!</strong> Edited User successfully
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        </>
      ) : (
       ""
      )}
      {
        Delete?<><div
            class="alert alert-warning alert-dismissible fade show"
            role="alert"
          >
            <strong>{Delete.name}!</strong> Deleted User successfully
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div></>:""
      }
      <div className="mt-5">
        <div className="container">
          <div className="add-btn mt-2">
            <NavLink to="/register" className="btn btn-primary mb-2">
              {" "}
              ADD
            </NavLink>
          </div>
          <div>
            <table class="table">
              <thead>
                <tr className="table-dark">
                  <th scope="col">id</th>
                  <th scope="col">Username</th>
                  <th scope="col">email</th>
                  <th scope="col">Job</th>
                  <th scope="col">Number</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {getUser.map((ele, id) => {
                  return (
                    <>
                      <tr>
                        <th scope="row">{id + 1}</th>
                        <td>{ele.name}</td>
                        <td>{ele.email}</td>
                        <td>{ele.work}</td>
                        <td>@mdo</td>
                        <td className="d-flex justify-content-between">
                          <NavLink to={`/view/${ele._id}`}>
                            <button className="btn btn-success">
                              <i class="fa-solid fa-eye"></i>
                            </button>
                          </NavLink>
                          <NavLink to={`/Edit/${ele._id}`}>
                            <button className="btn btn-primary">
                              <i class="fa-solid fa-pencil"></i>
                            </button>
                          </NavLink>
                          <button
                            className="btn btn-danger"
                            onClick={() => DeleteUSer(ele._id)}
                          >
                            <i class="fa-solid fa-trash-can"></i>
                          </button>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
