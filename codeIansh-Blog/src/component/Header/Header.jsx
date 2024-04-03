import React from 'react'
import {Container, Logo, Logoutbtn} from '../index';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function Header() {
  const authStatus = useSelector( (state) => state.auth.status);

  const navigate = useNavigate();


  const navItems = [
    {
      name: 'Home',
      slug: '/codeIansh/',
      active: true

    },
    {
      name:'Login',
      slug:'/codeIansh/login',
      active: !authStatus

    },
    {
      name: 'SignUp',
      slug:'/codeIansh/signup',
      active: !authStatus

    },
    {
      name:'All Posts',
      slug: '/codeIansh/all-posts',
      active: authStatus

    },
    {
      name:'Add Posts',
      slug:'/codeIansh/add-posts',
      active: authStatus

    },
  ]


  return (
    <header className='py-3 shadow'>

    <Container>
      <nav className='flex'>
        <div className='mr-4'>
          <Link to='/'>
            <Logo />
          </Link>
        </div>

        <ul className='flex ml-auto'>
          {navItems.map( (items) => 
            items.active ? (
              <li key={items.name}>
                <button
                onClick={ () => navigate(items.slug)}
                className='inline-block px-6 py-2 duration-200 hover:bg-orange-300 rounded-full hover:text-black'
                >{items.name}</button>
              </li>
            ) : null

          )}
{/* if User is authenticated then show them Logout button... */}

          {authStatus && (
            <li>
                <Logoutbtn />
            </li>
          )}

        </ul>
      </nav>
    </Container>

    </header>
  )
}

export default Header