import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';

const MyAppointments = () => {

    const { user } = useContext(AuthContext);
    const url = `http://localhost:5000/bookings?email=${user?.email}`;

    const { data: myAppointments = [] } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('doctors-token')}`
                }
            });
            const data = await res.json();
            return data;
        }
    })



    return (
        <div>
            <h3 className='text-3xl font-sans'>These are my appointments</h3>

            <div className="overflow-x-auto mt-6 pr-10">

                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Patient</th>
                            <th>Treatment</th>
                            <th>Date</th>
                            <th>Slot</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myAppointments.map((singleData, index) => <tr
                                key={singleData._id}
                            >
                                <th>{index + 1}</th>
                                <td>{singleData.patientName}</td>
                                <td>{singleData.treatmentName}</td>
                                <td>{singleData.appointmentDate}</td>
                                <td>{singleData.selectedSlot}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyAppointments;