import {useId} from "react";
import {makeAutoObservable, observable} from "mobx";
import {observer} from "mobx-react-lite";
import {useSearcherStore} from "../contexts/SearcherStoreContext";


export class ColumnSelectorStore {
    selected = new Set(['Номер заявки', 'Клиент*', 'ИНН', 'Статус', 'Дата входа заявки в статус', 'Услуга'])
    columns = []
    parent
    constructor(parent, columns) {
        this.columns = columns
        this.parent = parent
        makeAutoObservable(this)
    }

    setSelected(label, state = true) {
        if (state)
            this.selected.add(label)
        else
            this.selected.delete(label)
    }

    isSelected(label) {
        return this.selected.has(label)
    }
}

const ColumnSelector = observer(function ColumnSelector() {
    const {columnSelectorStore: store} = useSearcherStore();
    const id = useId();
    return (
        <div>
            <button className="btn btn-primary" type="button" data-bs-toggle="collapse"
                    data-bs-target={'#' + id} aria-expanded="false" aria-controls="collapseExample">
                Выбор колонок
            </button>
            <div className="collapse" id={id}>
                <ul className="list-group overflow-scroll" style={{maxHeight: 400}}>
                    {
                        store.columns.map(label => <Selector key={label} label={label} selected={store.isSelected(label)}
                                                             onChange={state => store.setSelected(label, state)}
                        />)
                    }
                </ul>
            </div>
        </div>
    )
})
const Selector = ({label, selected, onChange}) => {
    const id = useId();
    const onChangeLocal = e => {
        // console.log("current: " + selected);
        const state = e.target.checked;
        onChange(state);
        // console.log(state);
    }
    return (
        <li className='list-group-item'>
            <div className='m-1 form-check'>
                <input className="form-check-input" type="checkbox" autoComplete="off" id={id} checked={selected}
                       onChange={onChangeLocal}
                />
                <label className="form-check-label" htmlFor={id}>
                    {label}
                </label>
            </div>
        </li>
    )
};

export default ColumnSelector;
