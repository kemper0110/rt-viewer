import {useId} from "react";

export default function SearchParamList({params, onChoice, defaultValue}) {
    const rt_id = useId();
    const inn_id = useId();
    return (
        <>
            <div className="form-check">
                <input className="form-check-input active" onClick={() => onChoice('Номер заявки')} type="radio" name="flexRadioDefault" id={rt_id}/>
                <label className="form-check-label" htmlFor={rt_id}>
                    Номер заявки
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" onClick={() => onChoice('Номер заявки')} type="radio" name="flexRadioDefault" id={inn_id}/>
                <label className="form-check-label" htmlFor={inn_id}>
                    ИНН
                </label>
            </div>
        </>
    );
}