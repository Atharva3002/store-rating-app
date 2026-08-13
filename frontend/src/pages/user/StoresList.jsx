import React, { useEffect, useState } from "react";
import api from "../../api/axios.js";
import Alert from "../../components/Alert.jsx";
import StarRating from "../../components/StarRating.jsx";

export default function UserStoresList() {
    const [stores, setStores] = useState([]);
    const [filters, setFilters] = useState({ name: "", address: "" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const fetchStores = async () => {
        try {
            const res = await api.get("/stores", { params: filters });
            setStores(res.data.stores);
        } catch (err) {
            setError(err.response?.data?.message || "Could not load stores.");
        }
    };

    useEffect(() => { fetchStores(); }, []);

    const handleFilterChange = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });

    const handleSearch = (e) => {
        e.preventDefault();
        fetchStores();
    };

    const handleRate = async (storeId, rating) => {
        setError("");
        setSuccess("");
        try {
            await api.post(`/stores/${storeId}/rating`, { rating });
            setSuccess("Rating saved");
            fetchStores();
        } catch (err) {
            setError(err.response?.data?.message || "Could not submit rating.");
        }
    };

    return (
        <div className="container">
            <h4 className="mb-3"><i className="fa-solid fa-store me-2"></i>Browse Stores</h4>

            <Alert message={error} />
            <Alert type="success" message={success} />

            <form className="row g-2 mb-3" onSubmit={handleSearch}>
                <div className="col-md-5">
                    <input type="text" className="form-control" placeholder="Search by Name"
                        name="name" value={filters.name} onChange={handleFilterChange} />
                </div>
                <div className="col-md-5">
                    <input type="text" className="form-control" placeholder="Search by Address"
                        name="address" value={filters.address} onChange={handleFilterChange} />
                </div>
                <div className="col-md-2">
                    <button type="submit" className="btn btn-outline-dark w-100">
                        <i className="fa-solid fa-magnifying-glass me-1"></i>Search
                    </button>
                </div>
            </form>

            <div className="row g-3">
                {stores.length === 0 && <p className="text-muted">No stores found</p>}
                {stores.map((store) => (
                    <div className="col-md-6" key={store.id}>
                        <div className="card shadow-sm h-100">
                            <div className="card-body">
                                <h5 className="card-title">{store.name}</h5>
                                <p className="card-text text-muted mb-1">
                                    <i className="fa-solid fa-location-dot me-1"></i>{store.address}
                                </p>
                                <p className="mb-2">
                                    Overall Rating:
                                    <i className="fa-solid fa-star text-warning mx-1"></i>
                                    {store.overallRating}
                                </p>
                                <div>
                                    <small className="text-muted d-block mb-1">
                                        {store.userRating ? "Your Rating (click to change):" : "Rate this store:"}
                                    </small>
                                    <StarRating
                                        value={store.userRating || 0}
                                        onChange={(rating) => handleRate(store.id, rating)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
