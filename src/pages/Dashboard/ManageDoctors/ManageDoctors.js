import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ConfirmationModal from '../../shared/ConfirmationModal/ConfirmationModal';

const ManageDoctors = () => {
    const [deleteDoctor, setDeleteDoctor] = useState(null);
    const closeModal = () => {
        setDeleteDoctor(null);
    }

    const { data: doctors = [], refetch } = useQuery({
        queryKey: ['doctors'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/doctors', {
                headers: {
                    authorization: `bearer ${localStorage.getItem('doctors-token')}`
                }
            });
            const data = await res.json();
            return data;
        }
    });

    const handleDeleteDoctor = (doctor) => {
        fetch(`http://localhost:5000/doctors/${doctor._id}`, {
            method: "DELETE",
            headers: {
                authorization: `bearer ${localStorage.getItem('doctors-token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success('Deletation Complete!')
                    refetch();
                }
            })
    }

    return (
        <div>
            <h3 className="text-4xl font-bold text-center my-10">Here You manage the doctors</h3>
            <div>
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Avatar</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Speciality</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                doctors.length && doctors.map((doctor, index) => <tr key={doctor._id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="w-20 rounded-xl">
                                                    <img src={doctor.imgUrl} alt='' />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="font-bold">{doctor.doctorName}</div>
                                    </td>
                                    <td>{doctor.doctorEmail}</td>
                                    <td>{doctor.speciality}</td>
                                    <th>
                                        <label onClick={() => setDeleteDoctor(doctor)} htmlFor="confirmation-modal" className="btn btn-error text-black">Delete</label>
                                    </th>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {
                deleteDoctor && <ConfirmationModal
                    title={`Are you sure you want to delete?`}
                    description={`Once ${deleteDoctor.doctorName} is deleted, you won't be able to retrieve the data`}
                    successAction={handleDeleteDoctor}
                    closeModal={closeModal}
                    modalData={deleteDoctor}
                ></ConfirmationModal>
            }
        </div>
    );
};

export default ManageDoctors;