import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {

    const { register, handleSubmit, errors } = useForm();
    const navigate = useNavigate();
    const savePost = async (data) => {
        const resp = await fetch('https://mi-proyecto-7bd3d-default-rtdb.firebaseio.com/postv2/.json', {
            method: 'post',
            body: JSON.stringify(data)
        })
        navigate('/');
    }

    return (
        <>
            <div className="container">
                <h1 className='text-center mt-5'>Crear Post</h1>
                <div className="row mt-5 d-flex justify-content-center">
                    <div className="col-12" style={{ maxWidth: '600px' }}>
                        <form className='form-group bg-dark p-5 rounded' onSubmit={handleSubmit(savePost)}>
                            {/* register your input into the hook by invoking the "register" function */}
                            <input id='title' placeholder='Titulo del Post' className='form-control mt-3' defaultValue="" {...register("title")} />
                            <input id='content' placeholder='Contenido del Post' className='form-control mt-3' defaultValue="" {...register("content")} />
                            <input id='cover' placeholder='Url de la imagen' className='form-control mt-3' defaultValue="" {...register("cover")} />
                            <input id='autor' placeholder='Autor' className='form-control mt-3' defaultValue="" {...register("autor")} />
                            <input id='tags' placeholder='#reactNative #flutter' className='form-control mt-3' defaultValue="" {...register("tags")} />
                            {/* {errors.exampleRequired && <span>This field is required</span>} */}
                            <button  type="submit"  className='btn btn-primary mt-3' >Enviar</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreatePost