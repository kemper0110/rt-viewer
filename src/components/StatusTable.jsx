const StatusTable = ({data}) => {
    return (
        <div>
            <table className="table table-active">
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
            <td></td>
            <td></td>
            <td></td>
        </tr>
    )
}

export default StatusTable;