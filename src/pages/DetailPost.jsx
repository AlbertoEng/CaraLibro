import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import dayjs from 'dayjs';

const DetailPost = () => {

    const params = useParams();
    const [id, setId] = useState(params.id)
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
        getPostById()
    }, [])

    useEffect(()=>{
        const getMessages = async () => {
            const response = await fetch(`https://mi-proyecto-7bd3d-default-rtdb.firebaseio.com/replies/.json`);
            const data = await response.json()
            const objectToList = Object.entries(data).map(([clave, valor]) => {
                valor.key = clave
                return valor
            })
            console.log('pase aqui')
            setListMessages(objectToList)
        }
        getMessages();
    }, [message])

    const handleChangeMessage = (ev) => {
        setMessage({ ...message, [ev.target.name]: ev.target.value, createdAt: `${new Date()}` })
    }

    const handleAddComment = async(ev) => {
        ev.preventDefault()
        const createMessage = async () => {
            const response = await fetch(`https://mi-proyecto-7bd3d-default-rtdb.firebaseio.com/replies/.json`, {
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
    }

    return (
        <div className="container mb-3">
            <nav className="nav p-3 hover">
                <Link to='/' className="nav-link" aria-current="page">Home</Link>
            </nav>
            <div className="row mt-3 ">
                <div className="col-12 ">
                    <div className=''>
                        <div className='d-flex flex-column justify-content-center h-50 align-items-center' >
                            {
                                post.cover
                                    ? <img src={post.cover} className="img-fluid rounded shadow" alt="..." style={{ width: '800px' }} />
                                    : <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                            }

                            <div className="row w-100" style={{ maxWidth: '800px'}}>
                                <div className="col-12">

                                    <h1 className='mt-3'>{post.title}</h1>
                                    <h6 className='fw-bold'>{post.autor}</h6>
                                    <h6 className='fw-bold '>{post.tags}</h6>
                                    <h6 className=''>{post.content}</h6>
                                    <h3 className='mt-5'>Agrega un Comentario</h3>
                                    <textarea onChange={handleChangeMessage} value={message.comment} type="texa" name='comment' className='form-control' />
                                    <button onClick={handleAddComment} className='btn btn-primary mt-3'>Agregar Comentario</button>
                                    <div className="row">
                                        <div className="col-12">
                                            <h2>comments</h2>
                                            <ul className='list-group'>
                                                {
                                                    listMessages.map((mess) => {

                                                        return mess.id === id ? <div key={mess.key} className="card mt-3">
                                                            <div className="card-header">
                                                                Jesus Eng
                                                            </div>
                                                            <div className="card-body">
                                                                <blockquote className="blockquote mb-0">
                                                                    <p>{mess.comment}</p>
                                                                    <footer className="blockquote-footer">creado en <cite title="Source Title">{dayjs(post.createdAt).format('DD-MM-YYYY')}</cite></footer>
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
        </div>
    )
}

export default DetailPost