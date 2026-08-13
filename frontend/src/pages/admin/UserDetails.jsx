import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api/axios.js";
import Alert from "../../components/Alert.jsx";

export default function AdminUserDetails() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [rating, setRating] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        api.get(`/admin/users/${id}`)
            .then((res) => {
                setUser(res.data.user);
                setRating(res.data.rating);
            })
            .catch((err) => setError(err.response?.data?.message || "Could not load user."));
    }, [id]);

    return (
        <div className="container" style={{ maxWidth: "500px" }}>
            <Link to="/admin/users" className="btn btn-sm btn-outline-secondary mb-3">
                <i className="fa-solid fa-arrow-left me-1"></i>Back to Users
            </Link>

            <Alert message={error} />

            {user && (
                <div className="card shadow-sm">
                    <div className="card-body p-4">
                        <h4 className="mb-3"><i className="fa-solid fa-user me-2"></i>User Details</h4>
                        <table className="table table-borderless mb-0">
                            <tbody>
                                <tr><th style={{ width: "140px" }}>Name</th><td>{user.name}</td></tr>
                                <tr><th>Email</th><td>{user.email}</td></tr>
                                <tr><th>Address</th><td>{user.address}</td></tr>
                                <tr><th>Role</th><td><span className="badge bg-secondary">{user.role.replace("_", " ")}</span></td></tr>
                                {user.role === "store_owner" && (
                                    <tr>
                                        <th>Store Rating</th>
                                        <td><i className="fa-solid fa-star text-warning me-1"></i>{rating}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
