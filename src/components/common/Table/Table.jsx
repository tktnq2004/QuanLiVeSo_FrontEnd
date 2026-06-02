import './Table.scss';

const Table = ({ columns, data, renderActions }) => {

    return (
        <table className="custom-table">

            <thead>
                <tr>
                    {columns.map((col) => (
                        <th key={col.key}>{col.title}</th>
                    ))}
                    {renderActions && <th>Action</th>}
                </tr>
            </thead>

            <tbody>
                {data.map((item) => (

                    // ✅ key dùng ID thực thay vì index
                    <tr key={item.MaCap ?? item.ID ?? item.Ma}>

                        {columns.map((col) => (
                            <td key={col.key}>
                                {/* ✅ Gọi col.render nếu có */}
                                {col.render
                                    ? col.render(item)
                                    : item[col.key]
                                }
                            </td>
                        ))}

                        {renderActions && (
                            <td>{renderActions(item)}</td>
                        )}

                    </tr>
                ))}
            </tbody>

        </table>
    );
};
export default Table;