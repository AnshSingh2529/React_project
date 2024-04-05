import React from 'react';
import {useDispatch} from 'react-redux';
import authService from '../../appwrite/auth';
import {logout} from '../../store/authSlice';
import {useNavigate} from 'react-router-dom';
import Loading from '../Loading';

function Logoutbtn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = () => {
        authService.UserLogout()
        .then( () => {
            dispatch(logout())
            navigate('/login')
        })
    }
    
    if(!logoutHandler){
      return <Loading />;
    }
  return (
    <button className='inline-block px-6 py-2 '
    onClick={logoutHandler}
    >logout</button>
  )
}

export default Logoutbtn