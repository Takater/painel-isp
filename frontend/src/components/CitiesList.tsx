import React, { useEffect, useState } from 'react'

export default function CitiesList() {

    const [lista, setLista] = useState<string[]>([])

    useEffect(() => {
        const loadList = async () => {
            const response = await fetch('/cidades');
            const data = await response.json();
            data.cidades && setLista(data.cidades);
        };

        loadList();
    }, [])

    return (
        <select name="city_choice" id="city_choice">
            {lista && lista.map((cidade, index) => {
                return index == lista.length - 1 ?
                (
                    <>
                    <option key={cidade} value={cidade}>
                        {cidade}
                    </option>
                    <option key="all" value="all">Todos</option>
                    </>
                ):
                    <option key={cidade} value={cidade}>
                        {cidade}
                    </option>
            })}
        </select>
    )
}