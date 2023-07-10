import React, { useState, useEffect, ReactComponentElement, ReactNode } from 'react';
export interface PlotData {
    'area': string;
    'city': string;
    'time': string;
}

export default function Plot (dataPlot: PlotData) {

    const staticUrl = '/static/';

    const [plotData, setPlotData] = useState<string[]>([]);

    const [plotQuantity, setPlotQuantity] = useState(10);

    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        const loadData = () => {
            // Retrieve plot data from 
            fetch('/serve_plot',{
                headers: {
                    'Area': dataPlot.area,
                    'City': dataPlot.city,
                    'Time': dataPlot.time
                }
            })
            .then(response => response.json())
            .then(data => {
                setPlotData(data.file_paths)
                setLoading(false)
            })
            .catch(error => console.log(error));
        }
        
        loadData();

    }, [plotData])

    return (
        <div id="plotsContainer">
            {loading ? <h2>Carregando gráfico...</h2> :
            
                plotData.slice(0, plotQuantity).map((imgPath) => (
                    <img key={imgPath} src={`${staticUrl}${imgPath}`} alt={`Plot ${imgPath.split(".png")[0]}`}/>
                ))}
                {plotData.length > plotQuantity && <button onClick={() => setPlotQuantity(plotQuantity+10)}>Mostrar mais</button>
            }
        </div>
        )
}