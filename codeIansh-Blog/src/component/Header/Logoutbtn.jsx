import React from 'react';
import {useDispatch} from 'react-redux';
import authService from '../../appwrite/auth';
import {logout} from '../../store/authSlice';
import {useNavigate} from 'react-router-dom';

function Logoutbtn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = () => {
        authService.UserLogout()
        .then( () => {
            dispatch(logout())
            navigate('/codeIansh/login')
        })
    }
  return (
    <button className='inline-block px-6 py-2 duration-200 hover:bg-orange-300 rounded-full'
    onClick={logoutHandler}
    >logout</button>
  )
}

export default Logoutbtn