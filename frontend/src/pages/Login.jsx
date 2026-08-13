import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";
import Alert from "../components/Alert.jsx";

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const res = await api.post("/auth/login", form);
            login(res.data.token, res.data.user);

            const role = res.data.user.role;
            if (role === "admin") navigate("/admin/dashboard");
            else if (role === "store_owner") navigate("/store-owner/dashboard");
            else navigate("/stores");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ maxWidth: "420px" }}>
            <div className="card shadow-sm">
                <div className="card-body p-4">
                    <h4 className="text-center mb-3">
                        <i className="fa-solid fa-store me-2"></i>Store Rating Login
                    </h4>
                    <Alert message={error} />
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" name="email" required
                                value={form.email} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" name="password" required
                                value={form.password} onChange={handleChange} />
                        </div>
                        <button type="submit" className="btn btn-dark w-100" disabled={loading}>
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>
                    <p className="text-center mt-3 mb-0">
                        New user? <Link to="/signup">Create an account</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
