import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import validateManyFields from '../validations';
import Input from './utils/Input';
import { useDispatch, useSelector } from "react-redux";
import { postLoginData } from '../redux/actions/authActions';
import Loader from './utils/Loader';
import { useEffect } from 'react';

const LoginForm = ({ redirectUrl }) => {

  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  const authState = useSelector(state => state.authReducer);
  const { loading, isLoggedIn } = authState;
  const dispatch = useDispatch();


  useEffect(() => {
    if (isLoggedIn) {
      navigate(redirectUrl || "/");
    }
  }, [authState, redirectUrl, isLoggedIn, navigate]);



  const handleChange = e => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
    const errors = validateManyFields("login", formData);
    setFormErrors({});
    if (errors.length > 0) {
      setFormErrors(errors.reduce((total, ob) => ({ ...total, [ob.field]: ob.err }), {}));
      return;
    }
    dispatch(postLoginData(formData.email, formData.password));
  }



  const fieldError = (field) => (
    <p className={`mt-1 text-pink-600 text-sm ${formErrors[field] ? "block" : "hidden"}`}>
      <i className='mr-2 fa-solid fa-circle-exclamation'></i>
      {formErrors[field]}
    </p>
  )

  return (
    <>
      <form className="m-auto my-16 max-w-[500px] bg-white p-8 shadow-md rounded-md bg-gradient-to-t from-slate-800 to-teal-900">
        {loading ? (
          <Loader />
        ) : (
          <>
            <h2 className="text-white text-center mb-4 text-2xl font-semibold">
              Welcome User
            </h2>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-200 mb-1"
              >
                Email
              </label>
              <Input
                type="text"
                name="email"
                id="email"
                value={formData.email}
                placeholder="youremail@domain.com"
                onChange={handleChange}
              />
              {fieldError("email")}
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-200 mb-1"
              >
                Password
              </label>
              <Input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                placeholder="Your password.."
                onChange={handleChange}
              />
              {fieldError("password")}
            </div>

            <button
              className="py-2 px-3 cursor-pointer text-white text-center
            shadow-md shadow-green-400 font-mono bg-gradient-to-t from-green-600 to-teal-900
            hover:bg-green-600 hover:shadow-none transition hover:text-emerald-50 rounded-full mt-4"
              onClick={handleSubmit}
            >
              Submit
            </button>

            <div className="pt-4">
              <Link to="/signup" className="text-blue-400">
                Don't have an account? Signup here
              </Link>
            </div>
          </>
        )}
      </form>
    </>
  );
}

export default LoginForm