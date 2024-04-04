import React, {useEffect, useState} from "react";  
import {useDispatch} from 'react-redux';
import authService from './appwrite/auth';
import {login, logout} from './store/authSlice';
import {Header, Footer} from './component/index';
import {Outlet} from 'react-router-dom';
import Loading from "./component/Loading";



function App() {
    const [loader, setLoader] = useState(true);
    const dispatch = useDispatch();

    useEffect( () => {
       authService.getCurrentUser()
        .then( (userData) => {
          if(userData){
            dispatch(login({userData}))
          } else{
            dispatch(logout())
          }
        })
        .catch( (error) => {
          console.log('userData Error :' , error);
        })
        .finally( () => {
          setLoader(false);
        })

    }, [])

  return !loader ? 

   <>
    <div className="text-[#ffc300]"> 
      <Header />
    </div>
    
    <div className=" min-h-screen flex flex-wrap content-between bg-[#fdf0d5] m-5 rounded-lg">
      <div className="w-full flex justify-center ">
       
        <main>
         <Outlet /> 
        </main>

        
      </div>
    </div>
    <div className="text-[#ced4da]">
    <Footer />
    </div>
   </>
   : <Loading />;
}

export default App
