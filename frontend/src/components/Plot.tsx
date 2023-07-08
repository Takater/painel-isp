import React, { useState, useEffect } from 'react';

export default function Plot () {

    const [plotData, setPlotData] = useState('');

    useEffect(() => {

        const loadData = async () => {
            const response = await fetch('/serve_plot');
            const blob = await response.blob();
            const reader = new FileReader();

            reader.onloadend = () => {
                const plotDataURL = reader.result as string;
                setPlotData(plotDataURL);
            };

            reader.readAsDataURL(blob);
        }

        loadData();

    }, [])

    return <img src={plotData} alt="Plot" />
}