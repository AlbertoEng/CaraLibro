import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const [listPosts, setListPosts] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        const getPosts = async () => {
            const response = await fetch('https://mi-proyecto-7bd3d-default-rtdb.firebaseio.com/postv2/.json');
            const data = await response.json()
            const objectToList = Object.entries(data).map(([clave, objeto]) => {
                objeto.key = clave;
                return objeto;
            })
            setListPosts(objectToList)
        }
        getPosts()
    }, [])

    const handleClick = (ev, key)=>{
        navigate(`/detail/${key}`);
    }


    return (
        <>
            <div className="container mb-5">
                <nav className="nav p-3 hover">
                    <a className="nav-link" aria-current="page" href="#">Home</a>
                    <Link className="nav-link" to={'/create'}>Crear Post</Link>
                </nav>
                <h1 className='text-center mt-5 fw-bold '>Cara-Libro</h1>
                <div className="row d-flex justify-content-center">
                    <div className="col-12  " style={{ maxWidth: '700px' }}>
                        {
                            listPosts.map((post) => {
                                return (
                                    <div key={post.key} className="card mt-3 shadow">
                                        <img src={post.cover} className="card-img-top" alt="..." />
                                        <div className="card-body ">
                                            <h2 className="card-title">{post.title}</h2>
                                            <h4>{post.tags}</h4>
                                            <p className="card-text mt-3">{post.content}</p>
                                            <div className='d-flex justify-content-end '>
                                                <a href="#" onClick={ (ev)=>handleClick(ev, post.key)} className="btn btn-primary">Ver mas</a>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home