import React, { useEffect, useState } from "react";
import api from "../../api/axios.js";
import Alert from "../../components/Alert.jsx";

export default function AdminDashboard() {
    const [stats, setStats] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        api.get("/admin/dashboard")
            .then((res) => setStats(res.data.stats))
            .catch((err) => setError(err.response?.data?.message || "Could not load dashboard."));
    }, []);

    return (
        <div className="container">
            <h4 className="mb-4"><i className="fa-solid fa-gauge me-2"></i>Admin Dashboard</h4>
            <Alert message={error} />
            {stats && (
                <div className="row g-3">
                    <div className="col-md-4">
                        <div className="card text-center shadow-sm">
                            <div className="card-body">
                                <i className="fa-solid fa-users fa-2x mb-2 text-primary"></i>
                                <h2>{stats.totalUsers}</h2>
                                <p className="text-muted mb-0">Total Users</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card text-center shadow-sm">
                            <div className="card-body">
                                <i className="fa-solid fa-store fa-2x mb-2 text-success"></i>
                                <h2>{stats.totalStores}</h2>
                                <p className="text-muted mb-0">Total Stores</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card text-center shadow-sm">
                            <div className="card-body">
                                <i className="fa-solid fa-star fa-2x mb-2 text-warning"></i>
                                <h2>{stats.totalRatings}</h2>
                                <p className="text-muted mb-0">Total Ratings</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
