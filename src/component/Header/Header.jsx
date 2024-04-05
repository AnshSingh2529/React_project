import React from 'react';
import { Container, Logo, Logoutbtn } from '../index';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true
    },
    {
      name: 'Login',
      slug: '/login',
      active: !authStatus
    },
    {
      name: 'SignUp',
      slug: '/signup',
      active: !authStatus
    },
    {
      name: 'All Posts',
      slug: '/all-posts',
      active: authStatus
    },
    {
      name: 'Add Posts',
      slug: '/add-posts',
      active: authStatus
    },
  ];

  return (
    <header className='py-3 shadow'>
      <Container>
        <nav className='flex items-center justify-between'>
          <Link to='/'>
            <Logo />
          </Link>
          <ul className='flex item-center'>
            {navItems.map((item) => (
              item.active ? (
                <li key={item.name} className='ml-2'>
                  <button
                    onClick={() => navigate(item.slug)}
                    className='inline-block px-4 py-2 duration-200 hover:bg-orange-300 rounded-full hover:text-black'
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            ))}
            
          </ul>
          <ul className='flex item-center bg-black rounded-lg hover:bg-blue-800 hover:text-blue-50'>
          
             {/* if User is authenticated then show them Logout button... */}
            {authStatus && (
              <li className='ml-2'>
                <Logoutbtn />
              </li>
            )}
          
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
