import React from 'react';
import chair from '../../../assets/images/chair.png';
import { DayPicker } from 'react-day-picker';

const AppointmentBanner = ({ selectedDate, setSelectedDate }) => {
    return (
        <section>
            <div className="hero">
                <div className="hero-content flex-col lg:flex-row-reverse lg:items-center">
                    <div className='lg:w-1/2 flex justify-center'>
                        <img src={chair} alt='' className="lg:w-4/5 rounded-lg shadow-2xl" />
                    </div>
                    <div className='lg:w-1/2 flex justify-center'>
                        <div className='lg:w-2/3 pl-16'>
                            <DayPicker
                                mode='single'
                                selected={selectedDate}
                                onSelect={setSelectedDate}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AppointmentBanner;