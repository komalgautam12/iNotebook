import React,{useState,useContext} from 'react'
import { useNavigate } from "react-router-dom";
import NoteContext from "../context/notes/noteContext";
export const Signup = () => {
  const { showalert } = useContext(NoteContext);
  const credencialHost="http://localhost:5000/api/auth"
  const [credencial, setcredencial] = useState({
    name:"",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const change = async (e) => {
    setcredencial({ ...credencial, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name,email, password } =credencial;
    console.log(email, password);
    const url = `${credencialHost}/signup`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name,email, password }),
    });
    const data = await res.json();
    const status = data.response.sucess;
    if(status==="true"){
      localStorage.setItem('jwt', data.token); 
      showalert("Sucessfully signup" ,"Success")
      navigate("/")
    }else{
      showalert(data.response.message ,"Error")
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}  >
      <div className="loginMain">
        <div className="card loginCard">
        <div className="mb-3 my-3 row ">
            <label for="name" className=" col-form-label">
              Name
            </label>
            <div className="col">
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                onChange={change}
                
              />
            </div>
          </div>
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
          <div className="mb-3 my-3 row">
            <label for="inputcPassword" className="col-form-label">
              cPassword
            </label>
            <div className="col">
              <input
                type="password"
                onChange={change}
                name="cpassword"
                className="form-control"
                id="inputcPassword"
              />
            </div>
          </div>
          <div className="mb-3 my-3 text-center">
            <button
              type="submit"
              className="btn btn-primary"
             
            >
              Signup
            </button>
          </div>
        </div>
      </div>
      </form>
    </>
    
  )
}
