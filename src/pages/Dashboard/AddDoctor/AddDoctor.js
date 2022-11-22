import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddDoctor = () => {
    const imageBBKey = process.env.REACT_APP_imageBB;
    const navigate = useNavigate();
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { data: specialities = [] } = useQuery({
        queryKey: ['speciality'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/appointmentSpeciality');
            const data = await res.json();
            return data;
        }
    })


    const handleAddDoctor = (data) => {
        const img = data.img[0];
        const formData = new FormData();
        formData.append('image', img);
        const url = `https://api.imgbb.com/1/upload?key=${imageBBKey}`;
        fetch(url, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    const doctor = {
                        imgUrl: imgData.data.url,
                        doctorName: data.name,
                        doctorEmail: data.email,
                        speciality: data.speciality
                    }
                    fetch('http://localhost:5000/doctors', {
                        method: "POST",
                        headers: {
                            'content-type': 'application/json',
                            authorization: `bearer ${localStorage.getItem('doctors-token')}`
                        },
                        body: JSON.stringify(doctor)
                    })
                        .then(res => res.json())
                        .then(resData => {
                            if (resData.acknowledged) {
                                toast.success(`${data.name} is added successfully`);
                                navigate('/dashboard/manage-doctors');
                            }
                        })
                }
            })
    }

    return (
        <div>
            <h3 className="text-3xl font-serif">Add a Doctor</h3>
            <div className='w-[540px]'>
                <form onSubmit={handleSubmit(handleAddDoctor)} className='p-12 w-[440px] mx-auto'>
                    <div className="form-control pl-3">
                        <label className="label"><span className="label-text">Name</span></label>
                        <input {...register("name", { required: "We need to know your name!", maxLength: { value: 20, message: "Gotta keep your name within 20 characters!" } })}
                            type="text" className="input input-bordered w-80 h-11" />
                        {errors.name && <p className='text-red-600 text-center text-sm pt-2'>{errors.name?.message}</p>}
                    </div>
                    <div className="form-control pl-3">
                        <label className="label"><span className="label-text">Email</span></label>
                        <input {...register("email", { required: "Email is required to Register!" })}
                            type="email" className="input input-bordered w-80 h-11" />
                        {errors.email && <p className='text-red-600 text-center text-sm pt-2'>{errors.email?.message}</p>}
                    </div>
                    <div className="form-control pl-3">
                        <label className="label"><span className="label-text">Speciality</span></label>
                        <select {...register('speciality')}
                            className="select select-bordered w-full max-w-xs">
                            <option disabled defaultValue>Pick a Speciality</option>
                            {
                                specialities.length && specialities.map(speciality => <option
                                    key={speciality._id}
                                    value={speciality.name}
                                >{speciality.name}</option>)
                            }
                        </select>
                    </div>
                    <div className="form-control pl-3">
                        <label className="label"><span className="label-text">Photo</span></label>
                        <input {...register("img", { required: "We need to know your name!", maxLength: { value: 20, message: "Gotta keep your name within 20 characters!" } })}
                            type="file" className="input input-bordered w-80 h-11" />
                        {errors.img && <p className='text-red-600 text-center text-sm pt-2'>{errors.img?.message}</p>}
                    </div>

                    <input className='btn btn-accent w-full mt-6' value="Add Doctor" type="submit" />
                </form>
            </div>
        </div>
    );
};

export default AddDoctor;