import React,{ useEffect, useState} from 'react';
import storeService from '../appwrite/storage';
import {Container} from '.././component/index';
import PostCards from '../Forms/PostCards';
import Loading from '../component/Loading';


function HomePage() {
    const [posts, setPosts] = useState([]);

    useEffect( () => {
        storeService.getPosts([])
        .then( (posts) => {
            if(posts){
                setPosts(posts.documents);
            }
        })
    },[])

    if(posts.length === 0){
        return  <Loading /> && (
         
            <div className='w-full text-center flex justify-center  min-h-screen'>
                <Container>
                    <div className='flex'>
                        <span className='inline p-10'>
                            <h1 className='text-9xl font-serif border-black border-b-2'>WELCOME</h1>
                            <h1 className='text-4xl font-bold mt-20'>Please Login to see Posts!</h1>
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
                {posts.map( post => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCards  {...post} />
                    </div>
                    ))}
            </div>
        </Container>
    </div>
  )
}

export default HomePage