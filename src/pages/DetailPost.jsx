import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const DetailPost = () => {

    const { id } = useParams();
    const [post, setPost] = useState({})

    useEffect(()=>{
        const getPostById = async()=>{
            const response = await fetch(`https://mi-proyecto-7bd3d-default-rtdb.firebaseio.com/postv2/${id}/.json`);
            const data = await response.json();
            setPost(data);
        } 
        getPostById()
    },[])

  return (
    <div className="container">
        <div className="row mt-5 ">
            <div className="col-12 ">
                <div className=''>
                    <div className='d-flex flex-column justify-content-center h-50 align-items-center' >
                        <img src={post.cover} className="img-fluid rounded shadow" alt="..." style={{ width: '800px'}} />
                        <h6 className='mt-5'>{post.autor}</h6>
                        <h6 className=''>{post.tags}</h6>
                        <h1 className=''>{post.title}</h1>
                        <h6 className=''>{post.content}</h6>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DetailPost