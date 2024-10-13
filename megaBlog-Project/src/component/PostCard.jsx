import React from 'react'
import { Link } from 'react-router-dom'
import appwriteService from "../appwrite/config"
const PostCard = ({$id , tittle , featuredImage}) => {
    console.log(featuredImage , 'image');
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={appwriteService.getFilePreview(featuredImage)} alt={tittle}
                className='rounded-xl' />
            </div>
            <h2
            className='text-xl font-bold'
            >{tittle}</h2>
        </div>
    </Link>
  )
}

export default PostCard