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
          <div key={post.$id} className='p-2 w-1/4'>
          <PostCards  {...post} />
          </div>
          ))}
        </div>

      </Container>
    </div>
  )
}

export default AllPosts