import React from 'react';
import storeService from '../../appwrite/storage';
import {Link} from 'react-router-dom';


function PostCards({
    $id,
    featuredImage,
    title
}) {


  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-black rounded-xl p-4'>
        <div className='w-full justify-center mb-4'>
            <img src={storeService.getfilePreview(featuredImage)} alt={title} className='rounded-xl' />
        </div>
        <h2 className='text-xl font-serif font-medium'>{title}</h2>
        </div>
    </Link>
    )
}

export default PostCards