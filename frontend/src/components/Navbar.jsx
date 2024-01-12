import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../redux/actions/authActions';

const Navbar = () => {

  const authState = useSelector(state => state.authReducer);
  const dispatch = useDispatch();
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  }

  const handleLogoutClick = () => {
    dispatch(logout());
  }

  return (
    <>
      <header className="flex justify-between sticky top-0 p-4 shadow-sm items-center bg-gradient-to-t bg-opacity-90 from-transparent to-green-900 h-24">
        <h2 className="cursor-pointer uppercase font-bold text-white text-3xl">
          <Link to="/"> Task Manager </Link>
        </h2>
        <ul className="hidden md:flex gap-4 uppercase font-medium">
          {authState.isLoggedIn ? (
            <>
              <li
                className="text-white shadow-md shadow-green-400 font-mono
               hover:bg-green-600 font-medium bg-gradient-to-t from-green-600 to-teal-900 rounded-full hover:shadow-none"
              >
                <Link to="/tasks/add" className="block w-full h-full px-4 py-2">
                  {" "}
                  <i className="fa-solid fa-plus"></i> Add task{" "}
                </Link>
              </li>
              <li
                className="py-2 px-3 cursor-pointer text-white text-center
                shadow-md shadow-green-400 font-mono bg-gradient-to-t from-green-600 to-teal-900
                 hover:bg-green-600 hover:shadow-none transition hover:text-emerald-50 rounded-full"
                onClick={handleLogoutClick}
              >
                Logout
              </li>
            </>
          ) : (
            <li
              className="py-2 px-3 cursor-pointer text-white text-center
                shadow-md shadow-green-400 font-mono bg-gradient-to-t from-green-600 to-teal-900
                 hover:bg-green-600 hover:shadow-none transition hover:text-emerald-50 rounded-full"
            >
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
        <span className="md:hidden cursor-pointer" onClick={toggleNavbar}>
          <i className="fa-solid fa-bars"></i>
        </span>

        <div
          className={`absolute md:hidden right-0 top-0 bottom-0 transition ${
            isNavbarOpen === true ? "translate-x-0" : "translate-x-full"
          } bg-gray-100 shadow-md w-screen sm:w-9/12 h-screen`}
        >
          <div className="flex">
            <span className="m-4 ml-auto cursor-pointer" onClick={toggleNavbar}>
              <i className="fa-solid fa-xmark"></i>
            </span>
          </div>
          <ul className="flex flex-col gap-4 uppercase font-medium text-center">
            {authState.isLoggedIn ? (
              <>
                <li className="bg-blue-700 text-green-400 hover:bg-blue-600 font-medium transition py-2 px-3">
                  <Link to="/tasks/add" className="block w-full h-full">
                    {" "}
                    <i className="fa-solid fa-plus"></i> Add task{" "}
                  </Link>
                </li>
                <li
                  className="py-2 px-3 cursor-pointer hover:bg-gray-200 transition rounded-sm"
                  onClick={handleLogoutClick}
                >
                  Logout
                </li>
              </>
            ) : (
              <li className="py-2 px-3 cursor-pointer text-primary hover:bg-gray-700 transition rounded-sm">
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </header>
    </>
  );
}

export default Navbar