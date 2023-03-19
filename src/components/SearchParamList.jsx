import {useId} from "react";
import {observer} from "mobx-react-lite";
import {useSearcherStore} from "../contexts/SearcherStoreContext";
import ColumnSelector from "./ColumnSelector";

const SearchParamList = observer(function SearchParamList() {
    const {clientInputStore: store} = useSearcherStore();
    const choiced = store.paramName;
    const rt_id = useId();
    const inn_id = useId();
    return (
        <div className='d-flex justify-content-center align-content-center flex-row m-1'>
            {/*<div className='d-inline-block m-1'>*/}
                <Param isSelected={choiced === 'Номер заявки'} name={'Номер заявки'} onChoice={name => store.setParamName(name)}/>
            {/*</div>*/}
            {/*<div className='d-inline-block m-1'>*/}
                <Param isSelected={choiced === 'ИНН'} name={'ИНН'} onChoice={name => store.setParamName(name)}/>
            {/*</div>*/}
            {/*<div className='d-inline-block m-1'>*/}
                <Param isSelected={choiced === 'Клиент*'} name={'Клиент*'} onChoice={name => store.setParamName(name)}/>
            {/*</div>*/}
            {/*<div className='d-inline-block m-1'>*/}
                <Param isSelected={choiced === 'Нарушение SLA'} name={'Нарушение SLA'} onChoice={name => store.setParamName(name)}/>
            {/*</div>*/}
            {/*<div className='d-inline-block m-1'>*/}
            <div className='form-check'>
                <ColumnSelector/>
            </div>
            {/*</div>*/}
        </div>
    );
});

export default SearchParamList;

const Param = ({isSelected, onChoice, name}) => {
    const id = useId();
    return (
        <div className="form-check">
            <input type="checkbox" className="btn-check" id={id} autoComplete="off" name='params'
                   onChange={() => onChoice(name)}
                   checked={isSelected}
            />
            <label className="btn btn-primary" htmlFor={id}>
                {name}
            </label>
            {/*<input className={"form-check-input" + isSelected ? 'active' : ''} onClick={() => onChoice(name)}*/}
            {/*       type="radio" name="flexRadioDefault" id={id}*/}
            {/*       checked={isSelected}*/}
            {/*/>*/}
            {/*<label className="form-check-label m-1" htmlFor={id}>*/}
            {/*    {name}*/}
            {/*</label>*/}
        </div>
    )
}