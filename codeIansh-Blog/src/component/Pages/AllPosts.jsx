import React,{useState, useEffect} from 'react';
import storeService from '../../appwrite/storage';
import PostCards from '../Forms/PostCards'
import Container from '../index';

function AllPosts() {

  const [posts, setPost] = useState([]);
  
  useEffect( () => {
    storeService.getPosts([])
    .then( (posts) => {
      if(posts){
        setPost(posts.documents);
      }
    })
  })
  return (
    <div className='w-full py-8'>
      <Container>
      <div className='flex flex-wrap'>
      {posts.map( (post) => (
        <div key={post.$id} className='p-2 w-1/4'>
        <PostCards  post={post} />
        </div>
        ))}
      </div>
      </Container>
    </div>
  )
}

export default AllPosts