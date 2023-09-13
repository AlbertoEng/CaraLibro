import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

const DetailPost = () => {

    const { id } = useParams();
    const [post, setPost] = useState({})
    const [listMessages, setListMessages] = useState([])
    const navigate = useNavigate();
    const [message, setMessage] = useState({
        comment: '',
        createdAt: '',
        id
    })

    

    useEffect(() => {
        const getPostById = async () => {
            const response = await fetch(`https://mi-proyecto-7bd3d-default-rtdb.firebaseio.com/postv2/${id}/.json`);
            const data = await response.json();
            setPost(data);
        }
        const getMessages = async()=>{
            const response = await fetch(`https://mi-proyecto-7bd3d-default-rtdb.firebaseio.com/replies/.json`);
            const data = await response.json()
            const objectToList = Object.entries(data).map(([clave, valor])=>{
                valor.key = clave
                return valor
            })
            console.log(objectToList)
            setListMessages(objectToList)
        }
        getPostById()
        getMessages()
    }, [id])

    const handleChangeMessage = ( ev )=>{
        setMessage({...message, [ev.target.name]: ev.target.value, createdAt: `${new Date()}`})
    }

    const handleAddComment = (ev)=>{
        ev.preventDefault()
        const createMessage = async () => {
            const response = await fetch(`https://mi-proyecto-7bd3d-default-rtdb.firebaseio.com/replies/.json`,{
                method: 'post',
                body: JSON.stringify(message),
                postId: id
            });
            const data = await response.json();
            setMessage({
                comment: '',
                createdAt: '',
                id
            });
        }
        createMessage()
        navigate(`/detail/${id}`)
    }

    return (
        <div className="container mb-5">
            <nav className="nav p-3 hover">
                <Link to='/' className="nav-link" aria-current="page">Home</Link>
            </nav>
            <div className="row mt-5 ">
                <div className="col-12 ">
                    <div className=''>
                        <div className='d-flex flex-column justify-content-center h-50 align-items-center' >
                            <img src={post.cover} className="img-fluid rounded shadow" alt="..." style={{ width: '800px' }} />
                            <h6 className='mt-5'>{post.autor}</h6>
                            <h6 className=''>{post.tags}</h6>
                            <h1 className=''>{post.title}</h1>
                            <h6 className=''>{post.content}</h6>
                            <div className="row w-100">
                                <div className="col-12 p-5">
                                    <h3>Agrega un Comentario</h3>
                                    <textarea onChange={handleChangeMessage} type="texa" name='comment'  className='form-control' />
                                    <button onClick={handleAddComment} className='btn btn-primary mt-3'>Agregar Comentario</button>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <h2>comments</h2>
                                        <ul className='list-group'>
                                            {
                                                listMessages.map(( mess )=>{

                                                    return mess.id === id ? <div key={mess.key} className="card mt-3">
                                                    <div className="card-header">
                                                      Jesus Eng
                                                    </div>
                                                    <div className="card-body">
                                                      <blockquote className="blockquote mb-0">
                                                        <p>{mess.comment}</p>
                                                        <footer className="blockquote-footer">creado en <cite title="Source Title">{mess.createdAt}</cite></footer>
                                                      </blockquote>
                                                    </div>
                                                  </div> : null
                                                })
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailPost