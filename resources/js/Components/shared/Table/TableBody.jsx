import React from "react";

const TableBody = ({ data, columns }) => {
    const placeCellData = (row, column) => {
        let value = row[column.accessor];
        if (column.accessor && column.accessor.includes(".")) {
            try {
                value = eval("row." + column.accessor);
            } catch (error) {
                console.error(error);
            }
        }

        // Combined logic for 'status' column
        if (column.accessor === "status") {
            if (row.claimed_at) {
                return "Claimed";
            }
            if (value === "Active" || value === "Expire") {
                return value;
            }
        }

        if (column.call && typeof column.call === "function") {
            return (
                <>
                    {column.call({
                        original: row,
                        value,
                    })}
                </>
            );
        }

        return value;
    };

    return (
        <tbody>
            {data?.map((item) => (
                <tr key={item.id}>
                    {columns.map((column, index) => (
                        <td key={index} className={column?.tdClass ?? ""}>
                            {placeCellData(item, column)}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
};

export default TableBody;
