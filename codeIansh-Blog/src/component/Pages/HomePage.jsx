import React,{useEffect, useState} from 'react';
import storeService from '../../appwrite/storage';
import Container from '../index';
import PostCards from '../Forms/PostCards';


function HomePage() {
    const [posts, setPosts] = useState([]);

    useEffect( () => {
        storeService.getPosts()
        .then( (posts) => {
            if(posts){
                setPosts(posts.documents);
            }
        })
    },[])

    if(posts.length === 0){
        return (
            <div className='w-full text-center py-8 mt-4'>
                <Container>
                    <div className='flex flex-wrap'>
                        <span className=' inline-block  p-2'>
                            <h1 className='text-4xl font-bold hover:bg-black/40'>Login to read Posts</h1>
                        </span>
                    </div>
                </Container>
            </div>
        )
    }
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

export default HomePage