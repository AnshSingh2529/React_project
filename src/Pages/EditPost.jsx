import React,{useState, useEffect} from 'react';
import storeService from '../appwrite/storage';
import PostForm from '../Forms/PostForm';
import {Container} from '.././component/index';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../component/Loading';

export default function EditPost() {

  const [post, setPosts] = useState(null);
  const {slug} = useParams();
  const navigate = useNavigate();

  useEffect( ()=> {

    if(slug){

      storeService.getPost(slug)
      .then( (post)=> {
        if(post){
          setPosts(post)
        } 
      })

    } else{
      navigate('/');
    }

  }, [slug, navigate])


  return post ? (
    <div className='py-8'>

      <Container>
        <PostForm post={post} />
      </Container>
      
    </div>
  ) : <Loading />
  
}
