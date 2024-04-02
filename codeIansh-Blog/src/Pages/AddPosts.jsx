import React from 'react';
import {Container} from'.././component/index';
import PostForm from '../Forms/PostForm';

export default function AddPosts() {
  return (
    <div className='py-8'>
      <Container>
        <PostForm />
      </Container>

    </div>
    
  )
}
