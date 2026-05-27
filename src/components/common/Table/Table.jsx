import './Table.scss';

const Table = ({ columns, data, renderActions }) => {

    return (
        <table className="custom-table">

            <thead>

                <tr>

                    {
                        columns.map((col) => (
                            <th key={col.key}>
                                {col.title}
                            </th>
                        ))
                    }

                    {
                        renderActions && (
                            <th>Action</th>
                        )
                    }

                </tr>

            </thead>

            <tbody>

                {
                    data.map((item, index) => (

                        <tr key={index}>

                            {
                                columns.map((col) => (
                                    <td key={col.key}>
                                        {item[col.key]}
                                    </td>
                                ))
                            }

                            {
                                renderActions && (
                                    <td>
                                        {renderActions(item)}
                                    </td>
                                )
                            }

                        </tr>
                    ))
                }

            </tbody>

        </table>
    );
};

export default Table;