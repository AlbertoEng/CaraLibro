import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const [listPosts, setListPosts] = useState([])
    const [searchText, setSearchText] = useState('')
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
    }, [listPosts])

    const handleClick = (ev, key) => {
        navigate(`/detail/${key}`);
    }

    const handleChangeText = (ev) => {
        setSearchText(ev.target.value);
        console.log(ev.target.value)
    }


    return (
        <>
            <div className="container-fluid mb-3">
                <nav className="nav p-3 hover">
                    <Link className="nav-link" to={'/create'}>Crear Post</Link>
                </nav>
                <h1 className='text-center fw-bold text-primary' style={{textShadow: '2px 2px 5px black'}}>Cara-Libro</h1>
                <div className="row d-flex justify-content-center">
                    <div className="col-12  " style={{ maxWidth: '700px' }}>
                        <div className='d-flex '>
                            <input onChange={handleChangeText} value={searchText} className='form-control shadow' type="text" placeholder='Buscar' />
                        </div>
                        {
                            !searchText &&
                            listPosts.map((post) => {
                                return (
                                    <div key={post.key} className="card mt-3 shadow rouded overflow-hidden">
                                        {
                                            post.cover
                                                ? <img src={post.cover} className="card-img-top" alt="..." style={{ width: '800px', height: '' }} />
                                                : <div className="spinner-border text-primary" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                        }
                                        <div className="card-body ">
                                            <h2 className="card-title">{post.title}</h2>
                                            <h4>{post.tags}</h4>
                                            <p className="card-text mt-3">{post.content.length > 50 ? post.content.slice(0, 50) + '...' : post.content}</p>
                                            <div className='d-flex justify-content-end '>
                                                <button onClick={(ev) => handleClick(ev, post.key)} className="btn btn-primary">Ver mas</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        {
                            searchText &&
                            listPosts.map((post) => {
                                return (
                                    post.title.toLowerCase().includes(searchText.toLowerCase()) || post.tags.toLowerCase().includes(searchText.toLowerCase()) ? <div key={post.key} className="card mt-3 shadow rounded overflow-hidden">
                                        <img src={post.cover} className="img-fluid h-50" alt="..." />
                                        <div className="card-body ">
                                            <h2 className="card-title">{post.title}</h2>
                                            <h4>{post.tags}</h4>
                                            <p className="card-text mt-3">{post.content.length > 50 ? post.content.slice(0, 50) + '...' : post.content}</p>
                                            <div className='d-flex justify-content-end '>
                                                <button onClick={(ev) => handleClick(ev, post.key)} className="btn btn-primary">Ver mas</button>
                                            </div>
                                        </div>
                                    </div> : null
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