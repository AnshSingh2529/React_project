import React,{useState, useEffect} from 'react';
import storeService from '../appwrite/storage';
import PostCards from '../Forms/PostCards';
import {Container} from '.././component/index';
import Loading from '../component/Loading';

function AllPosts() {

  const [posts, setPost] = useState([]);
  
  useEffect( () => {
    storeService.getPosts([])
    .then( (posts) => {
      if(posts){
        setPost(posts.documents);
      }
    })
  },[])

  if(posts.length === 0){
    return <Loading />
  }

  return (
    <div className='w-full py-8'>
      <Container>

        <div className='flex flex-wrap'>
        {posts.map( (post) => (
          <div key={post.$id} className='w-full h-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-4 mb-8'>
          <PostCards  {...post} />
          </div>
          ))}
        </div>

      </Container>
    </div>
  )
}

export default AllPosts