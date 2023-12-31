import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Plot from './components/Plot';
import { PlotData } from './components/Plot';
import CitiesList from './components/CitiesList';
import { error } from 'console';

function App() {
  
  // Plot data hook
  const [plotData, setPlotData] = useState<PlotData>()

  // City list hook
  const [listCities, setListCities] = useState(false);

  const [loadingPlot, setLoadingPlot] = useState(true);

  useEffect(() => {
    
    const setPlot = async (area_choice: HTMLSelectElement, city_choice: HTMLSelectElement | null, time_choice: HTMLSelectElement) => {
      setLoadingPlot(true)

      // Build new data with updated change
      const newData:PlotData = {
        area: area_choice.value,
        city: city_choice ? (city_choice.value as string) : '',
        time: time_choice ? time_choice.value : 'year'
      }

      // Set hooks
      setListCities(newData.area == 'city');
      setPlotData(newData)
      setLoadingPlot(false)
    }
    
    const areaSelect = document.getElementById("area_choice") as HTMLSelectElement;
    const citySelect = document.getElementById("city_choice") as HTMLSelectElement;
    const timeSelect = document.getElementById("time_choice") as HTMLSelectElement;
    
    function handlePlotChange() {
      setPlot(areaSelect, citySelect, timeSelect)
    }
    
    areaSelect?.addEventListener('change', handlePlotChange);
    citySelect?.addEventListener('change', handlePlotChange);
    timeSelect?.addEventListener('change', handlePlotChange);
    
    if (!plotData) {
      setPlot(areaSelect, citySelect, timeSelect);
    }

    return () => {
      areaSelect?.removeEventListener('change', handlePlotChange);
      citySelect?.removeEventListener('change', handlePlotChange);
      timeSelect?.removeEventListener('change', handlePlotChange);
    }

  }, [plotData])

  return (
    <div className="App">
      <header>
        <h1>Painel de Dados ISP - RJ</h1>
        <br />
        <div id="data-selects">
          <select name="area_choice" id="area_choice">
            <option value="state">Estado</option>
            <option value="city">Munícipio</option>
          </select>
          {listCities ? 
            <CitiesList />
          :
            <select name="time_choice" id="time_choice">
              <option value="year">Anual</option>
              <option value="month">Mensal</option>
            </select>
          }
          
        </div>
      </header>
      {(!loadingPlot && plotData) && <Plot {...plotData} />}
    </div>
  );
}

export default App;
