import {observer} from "mobx-react-lite";
import {useSearcherStore} from "../contexts/SearcherStoreContext";
import {differenceInDays, status_states} from "../utils/algo";

const StatusTable = observer(function StatusTable() {
    const store = useSearcherStore();
    const selected = store.columnSelectorStore.selected;
    const columns = store.columnSelectorStore.columns;
    const ordered = columns.filter(col => selected.has(col));
    return (
        <div>
            <table className="table table-bordered table-primary">
                <thead>
                <tr>
                    {
                        ordered.map(col => <td className='h6' key={col}>{col}</td>)
                    }
                </tr>
                </thead>
                <tbody>
                {
                    store.statusTableStore.data.map(row => <Status
                        key={row['Номер заявки'] + ' ' + row['Дата входа заявки в статус'] + ' ' + row['Статус']} row={row} columns={ordered}/>)
                }
                </tbody>
            </table>
        </div>
    )
})

const style_by_status = (status) => {
    if(status_states.nonLiquid.has(status))
        return {backgroundColor: 'red'}
    else if(status_states.final.has(status))
        return {backgroundColor: 'green'}
    else if(status_states.liquid.has(status))
        return {backgroundColor: 'yellow'}
    return {}
}
const style_by_days = (value) => {
    if(differenceInDays(new Date(), value) > 5)
        return {backgroundColor: 'red'}
}
const status_style = (col, value, row) => {
    if(col === 'Статус')
        return style_by_status(value);
    if(status_states.liquid.has(row['Статус']))
        if(col === 'Дата входа заявки в статус')
            return style_by_days(value);
    return {};
}
// const status_component = (col, value) => {
//     if(col === 'Номер заявки')
//         return <Link >{value}</Link>
// }

const Status = ({row, columns}) => {
    return (
        <tr className='h6'>
            {
                columns.map(col => <td key={col} style={status_style(col, row[col], row)}>{row[col]}</td>)
            }
        </tr>
    )
}


export default StatusTable;