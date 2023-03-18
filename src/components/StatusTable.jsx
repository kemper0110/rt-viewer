import {makeAutoObservable} from "mobx";
import {observer} from "mobx-react-lite";
import {useSearcherStore} from "../contexts/SearcherStoreContext";

export class StatusTableStore {
    data = []
    parent

    constructor(parent) {
        this.parent = parent
        makeAutoObservable(this)
    }

    setData(data) {
        this.data = data;
    }
}

const StatusTable = observer(function StatusTable() {
    const store = useSearcherStore();
    const selected = store.columnSelectorStore.selected;
    const columns = store.columnSelectorStore.columns;
    const ordered = columns.filter(col => selected.has(col));
    return (
        <div>
            <table className="table table-bordered table-success">
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
                        key={row['Дата входа заявки в статус'] + ' ' + row['Статус']} row={row} columns={ordered}/>)
                }
                </tbody>
            </table>
        </div>
    )
})

const Status = ({row, columns}) => {
    return (
        <tr className='h6'>
            {
                columns.map(col => <td key={col}>{row[col]}</td>)
            }
        </tr>
    )
}

export default StatusTable;