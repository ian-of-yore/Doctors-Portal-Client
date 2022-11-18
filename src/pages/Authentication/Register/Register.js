import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';

const Register = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { createUser, socialLogInGoogle } = useContext(AuthContext);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleRegister = (data) => {

        setSuccessMessage('');
        setErrorMessage('');


        createUser(data.email, data.password)
            .then((result) => {
                console.log(result.user);
                setSuccessMessage('Registration Successfull!')
            })
            .catch((err) => {
                console.log(err);
                setErrorMessage(err.message);
            })
    }

    const handleGoogleSignIn = () => {
        socialLogInGoogle()
            .then((result) => {
                console.log(result.user)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className='h-[480px] flex justify-center items-center mt-10'>
            <div className='w-96 p-7 shadow-2xl'>
                <h2 className='text-center text-2xl font-mono font-semibold my-3'>Register</h2>
                <form onSubmit={handleSubmit(handleRegister)}>
                    <div className="form-control">
                        <label className="label"><span className="label-text">Name</span></label>
                        <input {...register("name", { required: "We need to know your name!", maxLength: { value: 20, message: "Gotta keep your name within 20 characters!" } })}
                            type="text" className="input input-bordered w-80 h-11" />
                        {errors.name && <p className='text-red-600 text-center text-sm pt-2'>{errors.name?.message}</p>}
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text">Email</span></label>
                        <input {...register("email", { required: "Email is required to Register!" })}
                            type="email" className="input input-bordered w-80 h-11" />
                        {errors.email && <p className='text-red-600 text-center text-sm pt-2'>{errors.email?.message}</p>}
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text">Password</span></label>
                        <input {...register("password",
                            {
                                pattern: {
                                    value: /^(?=(.*[a-z]))(?=(.*[A-Z]))(?=(.*[0-9]))(?=(.*[!@#$%^&*()\-__+.])).{8,}$/,
                                    message: 'Create a storng password with special character, digit and uppercase letters worth of 8 characters in length'
                                }
                            })}
                            type="password" className="input input-bordered w-80 h-11" />
                        {errors.password && <p className='text-red-600 text-center text-xs pt-2'>{errors.password?.message}</p>}
                    </div>
                    {
                        errorMessage && <p className='text-red-600 text-sm'>{errorMessage}</p>
                    }
                    {
                        successMessage && <p className='text-green-600 text-sm'>{successMessage}</p>
                    }
                    <input className='btn btn-accent w-full mt-6' value="Register" type="submit" />
                    <p className='text-center mt-2'>Already have an accout? <Link to='/login'><span className='text-secondary underline text-sm'>LogIn</span></Link></p>
                </form>
                <div className="divider">OR</div>
                <button onClick={handleGoogleSignIn} className='btn btn-outline w-full'>Continue With Google</button>
            </div>
        </div>
    );
};

export default Register;