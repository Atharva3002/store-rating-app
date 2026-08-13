import React from "react";

export default function SortableHeader({ label, field, sortBy, sortOrder, onSort }) {
    const isActive = sortBy === field;
    const icon = isActive ? (sortOrder === "ASC" ? "fa-arrow-up" : "fa-arrow-down") : "fa-sort";

    return (
        <th className="sortable" onClick={() => onSort(field)}>
            {label} <i className={`fa-solid ${icon}`}></i>
        </th>
    );
}
