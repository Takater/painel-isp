import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Plot from './components/Plot';

function App() {

  //
  const [areaSelect, setAreaSelect] = useState('')

  useEffect(() => {

    let area_choice = document.getElementById("area_choice")?.nodeValue;

    function handleAreaChange() {
      area_choice && setAreaSelect(area_choice);
    }

    document.getElementById("area_choice")?.addEventListener('change', handleAreaChange);

  }, [areaSelect])

  return (
    <div className="App">
      <header>
        <h1>Painel de Dados ISP - RJ</h1>
        <br />
        <select name="area_choice" id="area_choice">
          <option value="all">Todos munícipios</option>
        </select>
      </header>
      <Plot />
    </div>
  );
}

export default App;
