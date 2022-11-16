import React from 'react';

const AppointmentOption = ({ appointmentOption, setTreatment }) => {
    const { name, slots } = appointmentOption;

    return (
        <div>
            <div className="hero">
                <div className="hero-content text-center shadow-xl px-16 py-8">
                    <div className="">
                        <h1 className="text-2xl text-primary font-bold">{name}</h1>
                        <p className='mt-4 font-semibold'>{slots.length > 0 ? slots[0] : 'Try another day'}</p>
                        <p className='mb-4 font-semibold'>{slots.length} {slots.length > 1 ? 'slots' : 'slot'} available</p>
                        <label
                            htmlFor="booking-modal"
                            className="btn btn-accent btn-wide text-white"
                            onClick={() => setTreatment(appointmentOption)}
                        >Book Appointment</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppointmentOption;