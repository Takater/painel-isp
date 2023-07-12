import React, { useEffect, useState } from 'react'

export default function CitiesList() {

    const [lista, setLista] = useState<string[]>([])

    const [loadingList, setLoadingList] = useState(true)

    useEffect(() => {
        const loadList = async () => {
            setLoadingList(true);
            const response = await fetch('/cidades');
            const data = await response.json();
            data.cidades && setLista(data.cidades);
        };

        loadList();
    }, [])

    return (
        <select name="city_choice" id="city_choice" disabled={loadingList}>
            {loadingList && <option>Carregando cidades...</option>}
            {lista && lista.map((cidade, index) => {
                return index == lista.length - 1 ?
                (
                    <>
                    <option key={cidade} value={cidade}>
                        {cidade}
                    </option>
                    <option key="all" value="all" onLoad={() => setLoadingList(false)}>Todos</option>
                    </>
                ):
                    <option key={cidade} value={cidade}>
                        {cidade}
                    </option>
            })}
        </select>
    )
}