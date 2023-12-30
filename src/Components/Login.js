import React,{useState}from 'react'
import { useNavigate } from 'react-router-dom';
const host = "http://localhost:5000"
const Login = (props) => {
     const [credentials,setCredentials] = useState({email:"",Password:""})
     const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            // headers: {
            //   'Content-Type': 'application/json',
            //   "auth-token":  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUxNmE0YThlYTE5YmQzOWUxOGRjNjJhIn0sImlhdCI6MTY5ODE1NTQwOH0.PQAwsWlayZtNkq2izFzJ7OLcqD3dBO9IyG8fGiipWLQ"
            // }
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email:credentials.email,Password:credentials.Password})
        });
        const json = await response.json()
        console.log(json);
        if(json.success){
            //Save the auth token and redirect
            localStorage.setItem('token',json.authtoken);
            props.showAlert("Successfully logged in your Account","success")
            navigate('/');
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
        <div className='container mt-3'>
        <h2>Login to continue to iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" aria-describedby="emailHelp" name="email" placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="Password">Password</label>
                    <input type="Password" className="form-control" value={credentials.Password} onChange={onChange} id="Password" name="Password" placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </div>
    )
}

export default Login
