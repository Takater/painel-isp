import React, { useState, useEffect, ReactComponentElement, ReactNode } from 'react';
export interface PlotData {
    area: string;
    city: string;
    time: string;
}

export default function Plot (dataPlot: PlotData) {

    const staticUrl = '/static/';

    const [plotData, setPlotData] = useState<string[]>([]);

    const [plotQuantity, setPlotQuantity] = useState(10);

    const [lastImage, setLastImage] = useState(false)

    
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
                (async () => {
                    if (data.file_paths.toString() !== plotData.toString()) {
                        setLastImage(false)
                    }
                })()
                setPlotData(data.file_paths)
            })
            .catch(error => console.log(error))
        }
    
        loadData();

    }, [plotData])

    return (
        <div id="plotsContainer">
            {!lastImage && (plotData.length > 1 ? <h2>Carregando gráficos...</h2>: <h2>Carregando gráfico...</h2>)}
            {
                plotData.slice(0, plotQuantity).map((imgPath, index) => (
                    (index == plotData.length - 1 || index == plotQuantity - 1) ? <img key={imgPath} src={`${staticUrl}${imgPath}`} alt={`Plot ${imgPath.split(".png")[0]}`} onLoad={() => setLastImage(true)}/> : <img key={imgPath} src={`${staticUrl}${imgPath}`} alt={`Plot ${imgPath.split(".png")[0]}`}/>
                ))}

                {plotData.length > plotQuantity && <><br /><button onClick={() => setPlotQuantity(plotQuantity+10)}>Mostrar mais</button></>
            }
        </div>
        )
}