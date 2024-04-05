import React, { useEffect, useState } from 'react';
import storeService from '../appwrite/storage';
import { Container } from '../component/index';
import PostCards from '../Forms/PostCards';
import { useSelector } from 'react-redux';
import {Logoutbtn} from '../component/index';

function HomePage() {
  const [posts, setPosts] = useState([]);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    storeService.getPosts([])
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents);
        }
      })
  }, []);

  if (posts.length === 0 && !authStatus) {
    return (
      <div className='min-h-screen flex justify-center items-center'>
        <Container>
          <div className='text-center'>
            <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif mb-6'>WELCOME</h1>
            <h2 className='text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold'>Please login to see posts!</h2>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className='py-8'>
      <Container>
        <div className='flex flex-wrap -mx-4'>
          {posts.map(post => (
            <div key={post.$id} className='w-full h-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-4 mb-8'>
              <PostCards {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default HomePage;
