import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../../contexts/AuthProvider';
import useToken from '../../../hooks/useToken';

const LogIn = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { emailPasswordLogIn, socialLogInGoogle } = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState('');
    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [token] = useToken(loginUserEmail);

    let location = useLocation();
    let navigate = useNavigate();
    let from = location.state?.from?.pathname || '/';

    if(token){
        navigate(from, { replace: true });
    }

    const handleLogin = (data) => {
        setErrorMessage('');

        emailPasswordLogIn(data.email, data.password)
            .then((result) => {
                toast.success('Login Successfull!');
                setLoginUserEmail(data.email);
            })
            .catch((err) => {
                console.log(err);
                setErrorMessage(err.message)
            })
    }

    const handleGoogleSignIn = () => {
        socialLogInGoogle()
            .then((result) => {
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className='h-[480px] flex justify-center items-center mt-10'>
            <div className='w-96 p-8'>
                <h2 className='text-2xl font-mono font-semibold text-center mb-6'>Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="form-control w-full">
                        <label className="label"> <span className="label-text text-base pl-1">Email</span> </label>
                        <input type="text"
                            {...register("email", { required: "Email Address is required!" })}
                            className="input input-bordered w-80 h-11" />
                        {errors.email && <p className='text-red-600 text-sm font-semibold mt-1 text-center' role="alert">{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label"> <span className="label-text text-base pl-1">Password</span> </label>
                        <input type="password"
                            {...register("password", { required: "Password is required!" })}
                            className="input input-bordered w-80 h-11" />
                        {errors.password && <p className='text-red-600 text-sm font-semibold mt-1 text-center' role="alert">{errors.password?.message}</p>}
                        <label className="label"> <span className="text-xs underline">Forgot Password?</span> </label>
                    </div>
                    {
                        errorMessage && <p className='text-red-600 text-sm'>{errorMessage}</p>
                    }
                    <input className='btn btn-accent w-full mt-3' value="Login" type="submit" />
                    <p className='text-center mt-2'>New Here? <Link to='/register'><span className='text-sm text-secondary underline'>Create an account!</span></Link></p>
                    <div className="divider">OR</div>
                </form>
                <button onClick={handleGoogleSignIn} className='btn btn-outline w-full'>Continue With Google</button>
            </div>
        </div>
    );
};

export default LogIn;