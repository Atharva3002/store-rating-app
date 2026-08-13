import React, { useState } from "react";
import api from "../api/axios.js";
import Alert from "../components/Alert.jsx";

export default function UpdatePassword() {
    const [form, setForm] = useState({ oldPassword: "", newPassword: "" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);
        try {
            const res = await api.put("/auth/update-password", form);
            setSuccess(res.data.message);
            setForm({ oldPassword: "", newPassword: "" });
        } catch (err) {
            setError(err.response?.data?.message || "Could not update password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ maxWidth: "420px" }}>
            <div className="card shadow-sm">
                <div className="card-body p-4">
                    <h4 className="mb-3"><i className="fa-solid fa-key me-2"></i>Update Password</h4>
                    <Alert message={error} />
                    <Alert type="success" message={success} />
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Current Password</label>
                            <input type="password" className="form-control" name="oldPassword" required
                                value={form.oldPassword} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">New Password</label>
                            <input type="password" className="form-control" name="newPassword" required
                                value={form.newPassword} onChange={handleChange} />
                            <div className="form-text">8-16 characters, at least 1 uppercase letter & 1 special character</div>
                        </div>
                        <button type="submit" className="btn btn-dark w-100" disabled={loading}>
                            {loading ? "Updating..." : "Update Password"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
