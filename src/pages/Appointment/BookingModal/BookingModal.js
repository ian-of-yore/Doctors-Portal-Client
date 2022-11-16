import { format } from 'date-fns';
import React from 'react';

const BookingModal = ({ treatment, setTreatment, selectedDate }) => {
    const { name, slots } = treatment;
    const appointmentDate = format(selectedDate, 'PP');

    const handleAppointmentBooking = (event) => {
        event.preventDefault();
        const form = event.target;
        const treatmentName = treatment.name;
        const date = appointmentDate;
        const patientName = form.name.value;
        const patientPhone = form.phone.value;
        const patientEmail = form.email.value;
        const selectedSlot = form.slot.value;
        const bookingDetails = {
            treatmentName,
            date,
            patientName,
            patientPhone,
            patientEmail,
            selectedSlot
        }

        console.log(bookingDetails);
        setTreatment(null)
    }


    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-xl font-bold">{name}</h3>
                    <form onSubmit={handleAppointmentBooking} className='grid gap-4 grid-cols-1 mt-10'>
                        <input type="text" value={appointmentDate} disabled className="input input-bordered w-full" />
                        <select className="select select-bordered w-full" name='slot'>
                            {
                                slots.map((slot, index) => <option
                                    key={index}
                                    value={slot}
                                >{slot}</option>)
                            }
                        </select>
                        <input type="text" placeholder="Full Name" name='name' className="input input-bordered w-full" />
                        <input type="text" placeholder="Phone Number" name='phone' className="input input-bordered w-full" />
                        <input type="email" placeholder="Email" name='email' className="input input-bordered w-full" />
                        <input type="submit" value="Submit" className='w-full btn btn-accent mt-3' />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;