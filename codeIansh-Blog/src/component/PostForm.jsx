import React from 'react';
import {useForm} from 'react-hook-form';
import {Button, Input, Select, RTE} from './index';
import storeService from '../appwrite/storage';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


function PostForm() {

    const {register, handleSubmit, watch, setValue, getValues, control} = useForm({defaultValues:{title:'',}});
    const navigate = useNavigate();
    const
  return (
    <div>PostForm</div>
  )
}

export default PostForm