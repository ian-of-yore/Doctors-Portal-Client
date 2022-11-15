import React from 'react';
import fluoride from '../../../assets/images/fluoride.png';
import cavity from '../../../assets/images/cavity.png';
import whitening from '../../../assets/images/whitening.png';
import treatment from '../../../assets/images/treatment.png';
import Service from './Service';

const Services = () => {

    const servicesData = [
        {
            id: 1,
            title: 'Fluoride Treatment',
            description: 'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the',
            icon: fluoride
        },
        {
            id: 2,
            title: 'Cavity Filling',
            description: 'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the',
            icon: cavity
        },
        {
            id: 3,
            title: 'Teeth Whitening',
            description: 'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the',
            icon: whitening
        }
    ]

    return (
        <div className='mt-16 mb-32'>
            <div className='text-center'>
                <h3 className='text-xl font-bold uppercase text-secondary'>Our Services</h3>
                <h2 className='text-4xl'>Services We Provide</h2>
            </div>
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    servicesData.map(service => <Service
                        key={service.id}
                        service={service}
                    ></Service>)
                }
            </div>

            <div className="card w-full md:9/12 lg:w-9/12 mx-auto lg:card-side bg-base-100 shadow-xl mt-20">
                <div className='lg:w-5/12'>
                    <figure><img src={treatment} className='h-[300px] md:h-[350px] lg:h-[556px] w-3/5 md:w-3/5 lg:w-full' alt="Album" /></figure>
                </div>
                <div className="card-body lg:w-7/12 lg:h-3/5 lg:pt-28">
                    <h2 className="card-title text-5xl mb-6">Exceptional Dental Care, on Your Terms</h2>
                    <p className='mb-6'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page</p>
                    <div className="card-actions justify-start">
                        <button className="btn btn-primary text-white bg-secondary">Get Started</button>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default Services;