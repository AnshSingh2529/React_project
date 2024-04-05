import React from 'react';
import storeService from '../appwrite/storage';
import { Link } from 'react-router-dom';

function PostCards({
  $id,
  featuredImage,
  title
}) {
  return (
    <Link to={`/post/${$id}`} className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2'>
      <div className='w-full overflow-hidden bg-cyan-500 shadow-cyan-500/10 rounded-xl p-3 max-h-full hover:bg-cyan-200'>
        <div className='w-full justify-center mb-2'>
          <img src={storeService.getfilePreview(featuredImage)} alt={title} className='rounded-xl' />
        </div>
        <h2 className='text-xl font-serif font-medium'>{title}</h2>
      </div>
    </Link>
  );
}

export default PostCards;
