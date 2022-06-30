import React, {  useState } from "react";
import { useNavigate } from 'react-router-dom';

function Signup(props) {
    const [credentials, setcredentials] = useState({name:"",email:" ",password:" ",cpassword:""})
    let navigate = useNavigate();
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const {name,email,password}=credentials
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              
            },
            body: JSON.stringify({name,email,password})
          });
          const json = await response.json()
          console.log(json)
          if(json.success){
              localStorage.setItem("token", json.authToken)
              navigate('/');
              props.showAlert("Account create successfully" ,"success");
          }else{
            props.showAlert("Invalid crededital" ,"danger");
          }
        } 
        const onChange = (e) => {
            setcredentials({ ...credentials, [e.target.name]: e.target.value });
          };
  return (
    <div className='container-mx-3'>
      <h2>Sign In to continue the iNotebook</h2>
        <form  onSubmit={handleSubmit}>
        <div className="mb-3">
    <label htmlFor="name" className="form-label">Name </label>
    <input type="name" className="form-control" id="name" name="name" aria-describedby="emailHelp" onChange={onChange}/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="cPassword" className="form-label">confirm Password</label>
    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Signup