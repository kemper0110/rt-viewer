import {useId} from "react";
import {observer} from "mobx-react-lite";
import {useSearcherStore} from "../contexts/SearcherStoreContext";
import '../ui/styles.scss';


const ColumnSelector = observer(function ColumnSelector() {
    const {columnSelectorStore: store} = useSearcherStore();
    const id = useId();
    return (
        <div className="btn-group">
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" data-bs-auto-close="false" aria-expanded="false">
                Колонки
            </button>
            <ul className="dropdown-menu">
                <input type='text' placeholder='Колонка' onChange={e => store.setFilter(e.target.value)}
                       value={store.filter}/>
                <ul className="list-group overflow-scroll" style={{maxHeight: 300}}>
                    {
                        (store.filter === "" ? store.columns :
                            store.columns.filter(label => label.toLowerCase().includes(store.filter.toLowerCase())))
                            .map(label => <Selector key={label} label={label} selected={store.isSelected(label)}
                                                    onChange={state => store.setSelected(label, state)}
                            />)
                    }
                </ul>
            </ul>
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
