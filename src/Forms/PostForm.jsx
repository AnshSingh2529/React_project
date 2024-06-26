import React, { useCallback, useEffect } from 'react';
import {useForm} from 'react-hook-form';
import {Button, Input, Select, RTE} from '.././component/index';
import storeService from '../appwrite/storage';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


function PostForm({post}) {

    const {register, handleSubmit, watch, setValue, getValues, control} = useForm(
      {
      defaultValues:{
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active"
        
      }
    });

    const navigate = useNavigate();
    const userData = useSelector( (state) => state.auth.userData);

    const submit = async(data) => {
      try{
      if(post){
        const file = data.image[0] ?  await storeService.uploadFile(data.image[0]) : null;

        if(file){
          storeService.deleteFile(post.featuredImage)
        }
        const dbPost = await storeService.updatePost(
          post.$id, 
          {
            ...data,
            featuredImage: file ? file.$id : undefined

          }
        );

        if(dbPost){
          navigate(`/post/${dbPost.$id}`)
        }
      } else{
        const file = await storeService.uploadFile(data.image[0]);

        if(file){
          const fileId = file.$id;
          data.featuredImage = fileId;

         const dbPost =  await storeService.createPost({
            ...data,
            userID: userData.$id 
          })

          if(dbPost){
            navigate(`/post/${dbPost.$id}`);
          }
        }
      }
    } catch (error){
      console.log("Error in submit PostForm.jsx ", error);
    }
    };

    const slugTransform = useCallback( (value) => {
      if(value && typeof value === 'string')
        return value
                    .trim()
                    .toLowerCase()
                    .replace(/[^a-zA-Z\d\s]+/g, '-')
                    .replace(/\s/g, '-');

          return ""

      
    }, [])

    useEffect( () => {

      const subscribtion = watch( (value, {name}) => {
        if(name === 'title'){
          setValue('slug', slugTransform(value.title), {shouldValidate: true})  ;
        }
      })
        return (() => subscribtion.unsubscribe()) ;

    }, [watch, setValue, slugTransform])

  return (
    <form onSubmit={handleSubmit(submit)} className='flex flex-wrap justify-center items-center'>

      <div className='w-2/3 px-2'>
        <Input 
        label='Title :'
        placeholder='Title'
        className='mb-4'
        {...register('title',{required: true})}
        />
        <Input 
        label='Slug :'
        placeholder='Slug'
        className='mb-4'
        {...register('slug',{required: true})}

        onInput= { (e) => {
          setValue('slug', slugTransform(e.currentTarget.value), {shouldValidate: true})
        }}
        />

        <RTE 
          label="Content :"
          name='content'
          control={control}
          defaultValue={getValues('content')}
        />
      </div>
      <div className='w-2/3 px-2'>
        <Input 
        label='FeaturedImage:'
        type = 'file'
        className='mb-4'
        accept='image/jpg, image/jpeg, image/png, image/gif'
        {...register('image', {required: !post})}
        />

        {post && (
        <div className='w-full mb-4'>
          <img 
          src={storeService.getfilePreview(post.featuredImage)} 
          alt={post.title} 
          className='rounded-lg' />
        </div>
        
        )}

        <Select 
        label='Status'
        options ={['active', 'inactive']}
        className='mb-4'
         {...register('status',{required: true})}
        />
        <Button 
        type='submit'
        bgColor={post ? 'bg-green-500' : undefined}
        className='w-full'
        >
          {post ? "Update" : "Submit"}
          
        </Button>  
        </div>
    </form>
  )
}

export default PostForm