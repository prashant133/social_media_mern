import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userService from "../../services/userService";
// import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { GoogleLogin } from '@react-oauth/google';
//CSS 
import './LogIn.css'
const LogIn = () => {
    const service = userService();
    const navigate = useNavigate();

    const [loginInfo, setLoginInfo] = useState({
        userName: '',
        password: ''
    })

    const [isSubmit, setIsSubmit] = useState(true);

    const handleChange = (e) => {
        setLoginInfo({
            ...loginInfo, [e.target.name]: e.target.value
        })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = await service.logUser(loginInfo);

        if (user.data.message === 'logged in successfully') {
            console.log('logged in');
            setIsSubmit(true);
            localStorage.setItem("currentUser", loginInfo.userName);
            navigate(`/mainPage/${loginInfo.userName}`);
        }
        else {
            console.log('password or email does not exist');
            setIsSubmit(false);
        }
        // localStorage.setItem('user', loginInfo)
    }

    // const onSuccess = (res) => {
    //     console.log("LOGIN SUCCESS! , current user: ", res.propfileObj);

    // }

    // const onFailure = (res) => {
    //     console.log('LOGIN FAILED, res: ', res);
    // }

    // const onSignOut = () => {
    //     alert('you have been signed out successfully');
    //     console.clear();
    // }
    const succeeded = (credentialResponse) => {
        console.log(credentialResponse);
    }
    const failed = () => {
        console.log('Login Failed');
    }


    return (

        <div className="wrapper">
            <div className="form-wrapper">
                <h1>Log In</h1>
                <form onSubmit={handleSubmit}>
                    <div className="userName">
                        <label htmlFor="userName">User Name</label>
                        <input
                            autoComplete="off"
                            placeholder="User Name"
                            type="text"
                            name="userName"
                            onChange={handleChange}
                            value={loginInfo.userName}
                        />
                        <br />
                    </div>
                    <div className="password">
                        <label htmlFor="password">Password</label>
                        <input
                            placeholder="Password"
                            type="password"
                            name="password"
                            onChange={handleChange}
                            value={loginInfo.password}
                        />
                        {!isSubmit ? <> <br /> <span className="errorsColor"> username or password are not valid, please try again!</span> </> : null}
                    </div>
                    <div className="LogAccount">

                        <div className="orginizeInRow">
                            <button className="insideOrginizeDiv" type="submit">Login</button>
                            {/* <h5 className="insideOrginizeDiv"><Link to='/resetPassword'>forgot password?</Link> </h5> */}
                        </div>
                        <div className="nextTo">
                            <small className="children">Not a member yet?</small>
                            <h5 className="children"><Link to='/register'>Sign up</Link></h5>
                        </div>
                        <br />
                    </div>

                    <GoogleLogin
                        onSuccess={succeeded}
                        onError={failed}
                    />


                    {/* <div>
                        <GoogleLogin
                            clientId="320695691819-62aumhislhpbkprqjhephopj743v53na.apps.googleusercontent.com"
                            buttonText="Login"
                            onSuccess={onSuccess}
                            onFailure={onFailure}
                            cookiePolicy={'single_host_origin'}
                        // isSignedIn = {true}
                        />
                    </div> */}
                    {/* <div>
                        <GoogleLogout
                            clientId={clientId}
                            buttonText="Sign Out"
                            onLogoutSuccess={onSignOut}
                        />
                    </div> */}
                </form>
            </div>
        </div>
    )

}

export default LogIn;