import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Tasks from "../components/Tasks";
import MainLayout from "../layouts/MainLayout";

const Home = () => {
  const authState = useSelector((state) => state.authReducer);
  const { isLoggedIn } = authState;

  useEffect(() => {
    document.title = authState.isLoggedIn
      ? `${authState.user.name}'s tasks`
      : "Task Manager";
  }, [authState]);

  return (
    <>
      <MainLayout>
        {!isLoggedIn ? (
          <div className="bg-gradient-to-t from-green-600 to-teal-900 shadow-lg shadow-green-400 text-white h-[50vh] py-8 text-center m-5 pt-20 items-center rounded-full">
            <h1 className="text-4xl mb-8 font-bold">
              Welcome to Task Manager App
            </h1>
            <Link
              to="/signup"
              className="mt-10 text-xl border-x-1 shadow-lg shadow-lime-400 py-2 px-6 rounded-full hover:bg-lime-500 transition duration-300"
            >
              <span className="transition-[margin]">
                Join now to manage your tasks
              </span>
              <span className="relative ml-4 text-base transition-[margin]">
                <i className="fa-solid fa-arrow-right"></i>
              </span>
            </Link>

            <div className="mt-12 flex flex-col items-center">
              <h2 className="text-2xl mb-4 font-semibold text-lime-300">
                Meet the Team
              </h2>
              <ul className="list-none text-xl text-green-50">
                <li className="mb-2">🚀 Abel Zeleke</li>
                <li className="mb-2">🌟 Bereket Tadele</li>
                <li className="mb-2">🎨 Rebecca Asrat</li>
                <li className="mb-2">⚙️ Tsion Tegene</li>
              </ul>
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-4xl text-white mt-8 mx-8 border-b border-b-gray-300">
              Welcome {authState.user.name}
            </h1>
            <Tasks />
          </>
        )}
      </MainLayout>
    </>
  );
};

export default Home;
