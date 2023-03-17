import {useId, useState} from "react";

const ClientInput = (onClick) => {
    // const inputId = useId();
    const [id, setId] = useState("");
    return (
        <>
            <input type='text' placeholder='Номер заявки' value={id} onChange={e => setId(e.target.value)}/>
            <button onClick={() => onClick(id)}>Найти</button>
        </>
    )
}


export default ClientInput