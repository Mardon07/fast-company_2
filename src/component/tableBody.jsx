import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { Link } from "react-router-dom";
const TableBody = ({ data, columns }) => {
    const renderContend = (item, column) => {
        if (columns[column].component) {
            const component = columns[column].component;
            if (typeof component === "function") {
                return component(item);
            }
            return component;
        }

        const component = _.get(item, columns[column].path);
        if (column === "name") {
            return <Link to={"/users/" + item._id}>{component}</Link>;
        }
        return component;
    };

    return (
        <tbody>
            {data.map((item) => (
                <tr key={item._id}>
                    {Object.keys(columns).map((column) => (
                        <td key={column}>{renderContend(item, column)}</td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
};

TableBody.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.object.isRequired
};
export default TableBody;
