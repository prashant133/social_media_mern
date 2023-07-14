import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import userService from "../../services/userService";

//CSS
import './Register.css';

const Register = () => {

  const service = userService();
  const navigate = useNavigate();
  const[isSubmit,setIsSubmit] = useState(false);
  const [userData, setUserData] = useState({
    userName: '',
    email: '',
    password: ''
  });

  const [usersList, setUsersList] = useState([]);

  const [formErrors, setFormErrors] = useState({});
  // const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/api/users")
      .then(res => {
        setUsersList(res.data);
      })
      .catch(err => {
        console.log(err);
      })

  }, [])


  const handleChange = (e) => {                          //כדי לעדכן את ה הערך של האינפוט למה ש היוזר מכניס בתוכו
    setUserData({
      ...userData, [e.target.name]: e.target.value
    })
    console.log(e.target.value);
  }


  const mapthrowUserNames = usersList.map((user) => {
    return user.userName;
  })
  const mapthrowEmails = usersList.map((user) => {
    return user.email;
  })




  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validata(userData));
    service.addUser(userData);
    // navigate('/');
    setIsSubmit(true);
  }

  const validata = (values) => {
    const errors = {}
    const regexp = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;


    if (!values.userName) {
      errors.userName = 'UserName is required!'
    }


    for (let index = 0; index < mapthrowUserNames.length; index++) {
      const userNameExists = mapthrowUserNames[index];
      if (values.userName === userNameExists) {
        errors.userName = 'UserName already exists!';
      }
    }

    if (!values.email) {
      errors.email = 'Email is required!'
    } else if (!regexp.test(values.email)) {
      errors.email = 'This is not a valid email format!';
    }

    for (let index = 0; index < mapthrowEmails.length; index++) {
      const emailExists = mapthrowEmails[index];
      if (values.email === emailExists) {
        errors.email = 'user with given email already exist!';
      }
    }

    if (!values.password) {
      errors.password = 'Password is required!'
    }
    else if (values.password.length < 4) {
      errors.password = 'Password must be at least 4 characters'
    }
    else if (values.password.length > 11) {
      errors.password = 'Password must be less than 11 characters'
      console.log(values.email);
    }

    // else{
      //   errors.password = 'userCreated Successfully'
    // }

    return errors;
  }



  return (
    <div className="wrapper">
      {Object.keys(formErrors).length === 0 && isSubmit ? (<div className="success-message">User Created Successfully</div>): null}
      <div className="form-wrapper">
        <h1>Register</h1>
        <form onSubmit={handleSubmit} noValidate>
          <div className="userName">
            <label htmlFor="userName">User Name</label>
            <input
              // className={formErrors.userName.length > 0 ? "error" : null}
              placeholder="User Name"
              type="text"
              name="userName"
              // noValidate
              value={userData.userName}
              onChange={handleChange}      //לעדכון הערך של היוזרניים למה שהיוזר כתב
            /> <br />
            <span className="errorsColor">{formErrors.userName}</span>
            {/* {formErrors.userName.length > 0 && (
              <span className="errorMessage">{formErrors.userName}</span>
            )} */}
          </div>


          <div className="email">
            <label htmlFor="email">Email</label>
            <input
              // className={formErrors.email.length > 0 ? "error" : null}
              placeholder="Email"
              type="email"
              name="email"
              // noValidate
              value={userData.email}
              onChange={handleChange}
            /> <br />

            <span className="errorsColor">{formErrors.email}</span>
            {/* {formErrors.email.length > 0 && (
              <span className="errorMessage">{formErrors.email}</span>
            )} */}
          </div>
          <div className="password">
            <label htmlFor="password">Password</label>
            <input
              // className={formErrors.password.length > 0 ? "error" : null}
              placeholder="Password"
              type="password"
              name="password"
              // noValidate
              value={userData.password}
              onChange={handleChange}
            /> <br />
            <span className="errorsColor">{formErrors.password}</span>
          </div>
          <div className="createAccount">
            <button type="submit">Create Account</button>
            <div className="nextTo">
              <small className="children">Already Have an Account?</small>
              <h5 className="children"> <Link to='/'>Login here</Link></h5>
            </div>
          </div>
        </form>
      </div>
    </div>

  )

}
export default Register;