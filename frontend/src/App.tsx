import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Plot from './components/Plot';
import { PlotData } from './components/Plot';
import CitiesList from './components/CitiesList';

function App() {

  // Initial data
  const data:PlotData = {'area': 'state', 'city': '', 'time': 'year'};
  
  // Plot data hook
  const [plotData, setPlotData] = useState(data)

  // City list hook
  const [listCities, setListCities] = useState(data.area == 'city')

  useEffect(() => {
    
    function handlePlotChange(event: Event) {
      
      // Get changed select 
      let select = event.target as HTMLSelectElement
      let opt = select[select.selectedIndex] as unknown || HTMLSelectElement;
      let area_choice = opt as HTMLSelectElement;

      // Get attribute name to be changed
      let value_name = select.id.split("_")[0]

      // Build new data with updated change
      if (area_choice) {
        const newData:PlotData = {
          ...plotData,
          [value_name]: area_choice.value
        }

        // Set hooks
        setPlotData(newData);
        setListCities(newData.area == 'city');
      }
    }

    document.getElementById("area_choice")?.addEventListener('change', handlePlotChange);
    document.getElementById("city_choice")?.addEventListener('change', handlePlotChange);
    document.getElementById("time_choice")?.addEventListener('change', handlePlotChange);

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
          {listCities && 
            <CitiesList />
          }
          <select name="time_choice" id="time_choice">
            <option value="year">Anual</option>
            <option value="month">Mensal</option>
          </select>
        </div>
      </header>
      <Plot area={plotData.area} city={plotData.city} time={plotData.time}/>
    </div>
  );
}

export default App;
