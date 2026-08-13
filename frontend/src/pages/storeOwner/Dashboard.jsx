import React, { useEffect, useState } from "react";
import api from "../../api/axios.js";
import Alert from "../../components/Alert.jsx";

export default function StoreOwnerDashboard() {
    const [data, setData] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        api.get("/store-owner/dashboard")
            .then((res) => setData(res.data))
            .catch((err) => setError(err.response?.data?.message || "Could not load dashboard."));
    }, []);

    return (
        <div className="container">
            <h4 className="mb-3"><i className="fa-solid fa-gauge me-2"></i>Store Owner Dashboard</h4>
            <Alert message={error} />

            {data && (
                <>
                    <div className="card shadow-sm mb-4">
                        <div className="card-body">
                            <h5>{data.store.name}</h5>
                            <p className="text-muted mb-2">
                                <i className="fa-solid fa-location-dot me-1"></i>{data.store.address}
                            </p>
                            <p className="mb-0">
                                Average Rating:
                                <i className="fa-solid fa-star text-warning mx-1"></i>
                                <strong>{data.averageRating}</strong>
                            </p>
                        </div>
                    </div>

                    <h6 className="mb-2">Users who rated your store</h6>
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover bg-white">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Address</th>
                                    <th>Rating</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.raters.length === 0 && (
                                    <tr><td colSpan="4" className="text-center text-muted">No ratings yet</td></tr>
                                )}
                                {data.raters.map((r) => (
                                    <tr key={r.id}>
                                        <td>{r.name}</td>
                                        <td>{r.email}</td>
                                        <td>{r.address}</td>
                                        <td>
                                            <i className="fa-solid fa-star text-warning me-1"></i>
                                            {r.rating}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
}
