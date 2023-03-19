import {observer} from "mobx-react-lite";
import {useSearcherStore} from "../contexts/SearcherStoreContext";
import {useId} from "react";
import '../ui/styles.scss';

const ClientInput = observer(function ClientInput() {
    const {clientInputStore: store} = useSearcherStore();
    const checkId = useId();
    return (
        <>
            <div className="input-group align-content-center justify-content-center">
                <input type='text' placeholder={store.paramName} value={store.id}
                       style={{minWidth: "65%"}}
                       onChange={e => store.setParamValue(e.target.value)}/>
                <button className='btn btn-outline-primary' onClick={() => store.onSubmit()}>Найти</button>
            </div>
        </>
    )
})


export default ClientInput