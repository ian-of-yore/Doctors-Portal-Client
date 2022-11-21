import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const AllUsers = () => {

    const { data: allUsers = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/users');
            const data = await res.json();
            return data;
        }
    })

    const handleMakeAdmin = (userId) => {
        fetch(`http://localhost:5000/users/admin/${userId}`, {
            method: "PUT",
            headers: {
                authorization: `bearer ${localStorage.getItem('doctors-token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.modifiedCount > 0) {
                    toast.success('The user role has been updated to Admin!')
                    refetch();
                }
            })
    }

    return (
        <div>
            <h3 className="text-3xl mb-6">All Users</h3>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allUsers.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{
                                    user?.role !== 'Admin' && <button onClick={() => handleMakeAdmin(user._id)} className='btn btn-sm btn-success'>Make Admin</button>
                                }
                                </td>
                                <td><button className='btn btn-sm btn-warning text-gray-800'>Delete User</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;