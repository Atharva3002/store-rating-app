import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios.js";
import Alert from "../../components/Alert.jsx";
import SortableHeader from "../../components/SortableHeader.jsx";

export default function AdminStoresList() {
    const [stores, setStores] = useState([]);
    const [filters, setFilters] = useState({ name: "", email: "", address: "" });
    const [sortBy, setSortBy] = useState("name");
    const [sortOrder, setSortOrder] = useState("ASC");
    const [error, setError] = useState("");

    const fetchStores = async () => {
        try {
            const params = { ...filters, sortBy, sortOrder };
            const res = await api.get("/admin/stores", { params });
            setStores(res.data.stores);
        } catch (err) {
            setError(err.response?.data?.message || "Could not load stores.");
        }
    };

    useEffect(() => { fetchStores(); }, [sortBy, sortOrder]);

    const handleFilterChange = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });

    const handleSearch = (e) => {
        e.preventDefault();
        fetchStores();
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
                <h4><i className="fa-solid fa-store me-2"></i>Stores</h4>
                <Link to="/admin/stores/add" className="btn btn-dark btn-sm">
                    <i className="fa-solid fa-plus me-1"></i>Add Store
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
                <div className="col-md-3">
                    <button type="submit" className="btn btn-outline-dark w-100">
                        <i className="fa-solid fa-magnifying-glass me-1"></i>Search
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
                            <SortableHeader label="Rating" field="rating" sortBy={sortBy} sortOrder={sortOrder} onSort={handleSort} />
                        </tr>
                    </thead>
                    <tbody>
                        {stores.length === 0 && (
                            <tr><td colSpan="4" className="text-center text-muted">No stores found</td></tr>
                        )}
                        {stores.map((store) => (
                            <tr key={store.id}>
                                <td>{store.name}</td>
                                <td>{store.email}</td>
                                <td>{store.address}</td>
                                <td>
                                    <i className="fa-solid fa-star text-warning me-1"></i>
                                    {parseFloat(store.rating).toFixed(1)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
