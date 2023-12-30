import React,{useState}from 'react'
import { useNavigate } from 'react-router-dom';
const Signup = (props) => {
  const [credentials,setCredentials] = useState({name:"",email:"",Password:"",CPassword:""})
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
   const {name,email,Password} = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      
        method: 'POST',
        // headers: {
        //   'Content-Type': 'application/json',
        //   "auth-token":  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUxNmE0YThlYTE5YmQzOWUxOGRjNjJhIn0sImlhdCI6MTY5ODE1NTQwOH0.PQAwsWlayZtNkq2izFzJ7OLcqD3dBO9IyG8fGiipWLQ"
        // }
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({name,email,Password})
    });
    const json = await response.json()
    console.log(json); 
        //Save the auth token and redirect
        if(json.success){
        localStorage.setItem('token',json.authtoken);
        navigate('/');
        props.showAlert("Successfully Created your Account","success")
        }
        
         else{
          props.showAlert("Invalid Credentials","danger")
         }
}
const onChange = (e) => {
    // console.log("Updating the note...", note)
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
}
  return (
    <div className="container mt-3">
    <h2>Create an Acoount to continue</h2>
     <form onSubmit={handleSubmit}>
  <div className="form-group">
    <label htmlFor="name">Name</label>
    <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email"/>
  </div>
  <div className="form-group">
    <label htmlFor="email">Email address</label>
    <input type="email" className="form-control" id="email" name="email"  onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email"/>
  </div>
  <div className="form-group">
    <label htmlFor="Password">Password</label>
    <input type="Password" className="form-control" id="Password" name="Password" onChange={onChange} placeholder="Password" minLength={5} required/>
  </div>
  <div className="form-group">
    <label htmlFor="CPassword">Confirm Password</label>
    <input type="CPassword" className="form-control" id="CPassword" name="CPassword" onChange={onChange} placeholder="CPassword" minLength={5} required/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Signup
