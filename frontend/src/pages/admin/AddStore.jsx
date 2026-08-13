import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios.js";
import Alert from "../../components/Alert.jsx";

export default function AdminAddStore() {
    const [form, setForm] = useState({
        storeName: "", storeEmail: "", storeAddress: "",
        ownerName: "", ownerEmail: "", ownerAddress: "", ownerPassword: ""
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);
        try {
            await api.post("/admin/stores", form);
            setSuccess("Store added successfully");
            setTimeout(() => navigate("/admin/stores"), 800);
        } catch (err) {
            setError(err.response?.data?.message || "Could not add store.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ maxWidth: "500px" }}>
            <div className="card shadow-sm">
                <div className="card-body p-4">
                    <h4 className="mb-3"><i className="fa-solid fa-store me-2"></i>Add New Store</h4>
                    <Alert message={error} />
                    <Alert type="success" message={success} />
                    <form onSubmit={handleSubmit}>
                        <h6 className="text-muted mt-2">Store Details</h6>
                        <div className="mb-3">
                            <label className="form-label">Store Name</label>
                            <input type="text" className="form-control" name="storeName" required
                                minLength={20} maxLength={60}
                                value={form.storeName} onChange={handleChange} />
                            <div className="form-text">20-60 characters</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Store Email</label>
                            <input type="email" className="form-control" name="storeEmail" required
                                value={form.storeEmail} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Store Address</label>
                            <textarea className="form-control" name="storeAddress" required
                                maxLength={400} rows={2}
                                value={form.storeAddress} onChange={handleChange}></textarea>
                        </div>

                        <hr />
                        <h6 className="text-muted">Store Owner Account</h6>
                        <div className="mb-3">
                            <label className="form-label">Owner Name</label>
                            <input type="text" className="form-control" name="ownerName" required
                                minLength={20} maxLength={60}
                                value={form.ownerName} onChange={handleChange} />
                            <div className="form-text">20-60 characters</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Owner Email</label>
                            <input type="email" className="form-control" name="ownerEmail" required
                                value={form.ownerEmail} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Owner Address</label>
                            <textarea className="form-control" name="ownerAddress" required
                                maxLength={400} rows={2}
                                value={form.ownerAddress} onChange={handleChange}></textarea>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Owner Login Password</label>
                            <input type="password" className="form-control" name="ownerPassword" required
                                value={form.ownerPassword} onChange={handleChange} />
                            <div className="form-text">8-16 characters, at least 1 uppercase letter & 1 special character</div>
                        </div>
                        <button type="submit" className="btn btn-dark w-100" disabled={loading}>
                            {loading ? "Adding..." : "Add Store"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
