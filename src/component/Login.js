import React, { useState,useContext } from "react";
import NoteContext from "../context/notes/noteContext";
import { useNavigate } from "react-router-dom";
export const Login = () => {
  const { showalert } = useContext(NoteContext);
  const loginHost="http://localhost:5000/api/auth"
  const [login, setlogin] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const change = async (e) => {
    setlogin({ ...login, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } =login;
    console.log(email, password);
    const url = `${loginHost}/login`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    const status = data.response.sucess;
    if(status==="true"){
      localStorage.setItem('jwt', data.token); 
      navigate("/")
      showalert("Sucessfully login" ,"Success")
    }else{
     
      showalert(data.response.message ,"Error")
    }
  };
  return (
    <>
    <form onSubmit={handleSubmit}  >
      <div className="loginMain my-4">
        <div className="card loginCard">
          <div className="mb-3 my-3 row ">
            <label for="staticEmail" className=" col-form-label">
              Email
            </label>
            <div className="col">
              <input
                type="text"
                className="form-control"
                id="staticEmail"
                name="email"
                onChange={change}
                placeholder="email@example.com"
              />
            </div>
          </div>
          <div className="mb-3 my-3 row">
            <label for="inputPassword" className="col-form-label">
              Password
            </label>
            <div className="col">
              <input
                type="password"
                onChange={change}
                name="password"
                className="form-control"
                id="inputPassword"
              />
            </div>
          </div>
          <div className="mb-3 my-3 text-center">
            <button
              type="submit"
              className="btn btn-primary"
             
            >
              Login
            </button>
          </div>
        </div>
      </div>
      </form>
    </>
  );
};
