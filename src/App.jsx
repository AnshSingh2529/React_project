import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./component/index";
import { Outlet } from "react-router-dom";
import Loading from "./component/Loading";

function App() {
  const [loader, setLoader] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.log("userData Error :", error);
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

  return !loader ? (
    <>
    <div className="flex-none text-orange-400">
        <Header />
      </div>

    <div className=" w-full min-h-screen flex flex-col">
      
      <div className="flex-grow bg-[#fdf0d5] flex justify-center">
        <main className="w-full max-w-screen-lg">
          <Outlet />
        </main>
      </div>
      <div className="flex-none">
        <Footer />
      </div>
    </div></>
  ) : (
    <Loading />
  );
}

export default App;
