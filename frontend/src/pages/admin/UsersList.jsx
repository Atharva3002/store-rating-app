import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios.js";
import Alert from "../../components/Alert.jsx";
import SortableHeader from "../../components/SortableHeader.jsx";

export default function AdminUsersList() {
    const [users, setUsers] = useState([]);
    const [filters, setFilters] = useState({ name: "", email: "", address: "", role: "" });
    const [sortBy, setSortBy] = useState("name");
    const [sortOrder, setSortOrder] = useState("ASC");
    const [error, setError] = useState("");

    const fetchUsers = async () => {
        try {
            const params = { ...filters, sortBy, sortOrder };
            const res = await api.get("/admin/users", { params });
            setUsers(res.data.users);
        } catch (err) {
            setError(err.response?.data?.message || "Could not load users.");
        }
    };

    useEffect(() => { fetchUsers(); }, [sortBy, sortOrder]);

    const handleFilterChange = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });

    const handleSearch = (e) => {
        e.preventDefault();
        fetchUsers();
    };

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC");
        } else {
            setSortBy(field);
            setSortOrder("ASC");
        }
    };

    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4><i className="fa-solid fa-users me-2"></i>Users</h4>
                <Link to="/admin/users/add" className="btn btn-dark btn-sm">
                    <i className="fa-solid fa-plus me-1"></i>Add User
                </Link>
            </div>

            <Alert message={error} />

            <form className="row g-2 mb-3" onSubmit={handleSearch}>
                <div className="col-md-3">
                    <input type="text" className="form-control" placeholder="Filter by Name"
                        name="name" value={filters.name} onChange={handleFilterChange} />
                </div>
                <div className="col-md-3">
                    <input type="text" className="form-control" placeholder="Filter by Email"
                        name="email" value={filters.email} onChange={handleFilterChange} />
                </div>
                <div className="col-md-3">
                    <input type="text" className="form-control" placeholder="Filter by Address"
                        name="address" value={filters.address} onChange={handleFilterChange} />
                </div>
                <div className="col-md-2">
                    <select className="form-select" name="role" value={filters.role} onChange={handleFilterChange}>
                        <option value="">All Roles</option>
                        <option value="admin">Admin</option>
                        <option value="user">Normal User</option>
                        <option value="store_owner">Store Owner</option>
                    </select>
                </div>
                <div className="col-md-1">
                    <button type="submit" className="btn btn-outline-dark w-100">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>
            </form>

            <div className="table-responsive">
                <table className="table table-bordered table-hover bg-white">
                    <thead>
                        <tr>
                            <SortableHeader label="Name" field="name" sortBy={sortBy} sortOrder={sortOrder} onSort={handleSort} />
                            <SortableHeader label="Email" field="email" sortBy={sortBy} sortOrder={sortOrder} onSort={handleSort} />
                            <SortableHeader label="Address" field="address" sortBy={sortBy} sortOrder={sortOrder} onSort={handleSort} />
                            <SortableHeader label="Role" field="role" sortBy={sortBy} sortOrder={sortOrder} onSort={handleSort} />
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length === 0 && (
                            <tr><td colSpan="5" className="text-center text-muted">No users found</td></tr>
                        )}
                        {users.map((u) => (
                            <tr key={u.id}>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td>{u.address}</td>
                                <td><span className="badge bg-secondary">{u.role.replace("_", " ")}</span></td>
                                <td>
                                    <Link to={`/admin/users/${u.id}`} className="btn btn-sm btn-outline-dark">
                                        <i className="fa-solid fa-eye"></i>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
