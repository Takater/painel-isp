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
    }, [lista])

    return (
        <select name="city_choice" id="city_choice">
            <option key="all" value="all">Todos</option>
            {lista && lista.map((cidade) => (
                <option key={cidade} value={cidade}>
                    {cidade}
                </option>
            ))}
        </select>
    )
}