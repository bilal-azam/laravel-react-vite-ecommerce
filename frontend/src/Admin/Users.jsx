import axios from '../lib/axios.js';
import { useEffect, useState } from 'react';

function Users() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    function fetchUsers() {
        axios
            .get('/api/admin/users')
            .then((response) => {
                setUsers(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center max-w-7xl mx-auto">
                <span className="loading loading-spinner text-primary"></span>
            </div>
        );
    }

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name / E-mail</th>
                            <th>Admin</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={user.avatar} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <div className="font-bold">{user.name}</div>
                                        <div className="text-sm opacity-50">{user.email}</div>
                                    </div>
                                </td>
                                <td>{user.is_admin ? 'Yes' : 'No'}</td>
                                <th>
                                    <button className="btn btn-error btn-outline btn-xs">Delete</button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Users;
