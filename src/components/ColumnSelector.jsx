import {useId} from "react";
import {makeAutoObservable, observable} from "mobx";
import {observer} from "mobx-react-lite";


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

const ColumnSelector = observer(function ColumnSelector({store}) {
    const id = useId();
    return (
        <div>
            <button className="btn btn-primary" type="button" data-bs-toggle="collapse"
                    data-bs-target={'#' + id} aria-expanded="false" aria-controls="collapseExample">
                Выбор колонок
            </button>
            <div className="collapse" id={id}>
                <div className="btn-group" role="group">
                    {
                        store.columns.map(label => <Selector label={label} selected={store.isSelected(label)}
                                                                  onChange={state => store.setSelected(label, state)}
                        />)
                    }
                </div>
            </div>
        </div>
    )
})
export default ColumnSelector;

const Selector = ({label, selected, onChange}) => {
    const id = useId();
    const onChangeLocal = e => {
        onChange(e.target.checked);
    }
    return (
        <>
            <lable className="btn btn-outline-primary" htmlFor={id}>
                {label}
            </lable>
            <input className="btn-check" type="checkbox" autoComplete="off" id={id} checked={selected}
                   onChange={onChangeLocal}
            />
        </>
    )
};