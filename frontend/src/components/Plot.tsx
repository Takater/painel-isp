import React, { useState, useEffect, ReactComponentElement, ReactNode } from 'react';

export interface PlotData {
    'area': string;
    'city': string;
    'time': string;
}

export default function Plot (dataPlot: PlotData) {


    const [plotData, setPlotData] = useState<string[]>([]);

    useEffect(() => {

        const loadData = async () => {

            // Retrieve plot data from 
            const response = await fetch('/serve_plot',{
                headers: {
                    'Area': dataPlot.area,
                    'City': dataPlot.city,
                    'Time': dataPlot.time
                }
            });
            const data = await response.json()
            data.file_paths && setPlotData(data.file_paths);
        }

        loadData();

    }, [])

    return (
        <div>
            {plotData ? plotData.map((each, index) => {
                return <img src={URL.createObjectURL(new Blob([each]))} alt={`Plot ${index + 1}`}/>
            }) : <h2>Carregando gráfico...</h2>}
        </div>
        )
}