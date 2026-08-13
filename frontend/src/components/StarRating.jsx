import React, { useState } from "react";

export default function StarRating({ value, onChange, disabled }) {
    const [hovered, setHovered] = useState(0);

    const stars = [1, 2, 3, 4, 5];

    return (
        <span className="star-rating">
            {stars.map((star) => (
                <i
                    key={star}
                    className={`fa-solid fa-star ${star <= (hovered || value) ? "filled" : ""}`}
                    onMouseEnter={() => !disabled && setHovered(star)}
                    onMouseLeave={() => !disabled && setHovered(0)}
                    onClick={() => !disabled && onChange && onChange(star)}
                    style={{ opacity: disabled ? 0.6 : 1, cursor: disabled ? "default" : "pointer" }}
                ></i>
            ))}
        </span>
    );
}
