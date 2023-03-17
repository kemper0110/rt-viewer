const StatusTable = ({data}) => {
    return (
        <div>
            <table className="table table-bordered table-success">
                <thead>
                <tr>
                    <td>Номер заявки</td>
                    <td>Клиент</td>
                    <td>ИНН</td>
                    <td>Статус</td>
                    <td>Дата входа заявки в статус</td>
                    <td>Услуга</td>
                </tr>
                </thead>
                <tbody>
                {
                    data && data.map(row => <Status data={row}/>)
                }
                </tbody>
            </table>
        </div>
    )
}

const Status = ({data}) => {
    return (
        <tr>
            <td>{data['Номер заявки']}</td>
            <td>{data['Клиент*']}</td>
            <td>{data['ИНН']}</td>
            <td>{data['Статус']}</td>
            <td>{data['Дата входа заявки в статус']}</td>
            <td>{data['Услуга']}</td>
        </tr>
    )
}

export default StatusTable;