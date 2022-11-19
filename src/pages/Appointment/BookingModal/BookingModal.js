import { format } from 'date-fns';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../contexts/AuthProvider';

const BookingModal = ({ treatment, setTreatment, selectedDate, refetch }) => {
    const { user } = useContext(AuthContext);

    const { name, slots } = treatment;
    const appointmentDate = format(selectedDate, 'PP');

    const handleAppointmentBooking = (event) => {
        event.preventDefault();
        const form = event.target;
        const treatmentName = treatment.name;
        const patientName = form.name.value;
        const patientPhone = form.phone.value;
        const patientEmail = form.email.value;
        const selectedSlot = form.slot.value;
        const bookingDetails = {
            appointmentDate,
            treatmentName,
            patientName,
            patientPhone,
            patientEmail,
            selectedSlot
        }

        fetch('http://localhost:5000/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(bookingDetails)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    setTreatment(null);
                    toast.success('Appointment Booking Successfull!');
                    refetch();
                }
            })

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
                        <input type="text" placeholder="Full Name" defaultValue={user?.displayName} readOnly name='name' className="input input-bordered w-full" />
                        <input type="text" placeholder="Phone Number" name='phone' className="input input-bordered w-full" />
                        <input type="email" placeholder="Email" defaultValue={user?.email} readOnly name='email' className="input input-bordered w-full" />
                        <input type="submit" value="Submit" className='w-full btn btn-accent mt-3' />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;