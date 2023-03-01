import React, { useEffect, useState } from 'react'
import './App.css';

function App() {

  const [dias, setDias] = useState([]);
  const [tabelaDias, setTabelaDias] = useState();
  const [infoValue, setInfoValue] = useState();
  const [mediaMesDiv, setMediaMesDiv] = useState();
  const [maxMonthlyTemp, setMaxMonthlyTemp] = useState()

  useEffect(() => {
    let diasTemp = []
    for (let i = 0 ; i < 30 ; i++) {
      let dia = appendTempList();
      dia.numDia = i+1;
      diasTemp.push(dia);
    } 
    let mediaMes = tempMediaMes(diasTemp)
    let maiorMedia = maiorMediaMes(diasTemp)
    setDias(diasTemp)
    renderTabelaDias(diasTemp)
    renderMediaMes(mediaMes, maiorMedia)
    let max = getMaxTemp(diasTemp)
    renderMonthMaxTemp(max)
  }, [])

  const generateTemp = () => {
    let random = ((Math.random() * 23) + 12);
    return Math.round(random);
  }

  const appendTempList = () => {
    let dia = {
        maxTemp: 0,
        minTemp: 0,
        media: 0,
        numDia: 0
    }
    let max = generateTemp();
    let min = generateTemp();
    // Regra do clã iluminatti
    while (max < min || min * 2 < max) {
      max = generateTemp();
      min = generateTemp();
    }
    dia.maxTemp = max;
    dia.minTemp = min;
    dia.media = (min + max) / 2;
    return dia
  }

  const tempMediaMes = (dias) => {
    let media = 0;
    let somaMedia = 0;
    for (let i = 0; i<30; i++) {
      somaMedia += dias[i].media;
    }
    media = (somaMedia/30).toFixed(1)
    return media;
  }

  const maiorMediaMes = (dias) => {
    let maiorMedia = {
      media: 0
    };
    for (let i = 0 ; i < dias.length ; i ++) {
      if (dias[i].media > maiorMedia.media) maiorMedia = dias[i]
    }
    return maiorMedia
  }

  const getMaxTemp = (dias) => {
    let obj = {
      max: dias[0].maxTemp,
      dia: [dias[0].numDia]
    };
    for (let i = 1 ; i < dias.length ; i++) {
      if (dias[i].maxTemp > obj.max) {
        obj.max = dias[i].maxTemp
        obj.dia = [dias[i].numDia]
      } else if (dias[i].maxTemp === obj.max) {
        obj.dia.push(dias[i].numDia)
      }
    }
    return obj;
  } 

  const renderTabelaDias = (dias) => {
    setTabelaDias(dias.map(dia => (
      <div className='day-cell'>
        <div className='num-dia'>
          {dia.numDia}
        </div>
        <div className='temp'>
          Máxima: {dia.maxTemp} °C Mínima: {dia.minTemp} °C Média: {dia.media} °C
        </div>
      </div>
    )));
  }

  const renderTabelaDiaFiltrado= (dia) => {
    setTabelaDias(
      <div className='day-cell'>
        <div className='num-dia'>
          {dia.numDia}
        </div>
        <div className='temp'>
          Máxima: {dia.maxTemp} °C Mínima: {dia.minTemp} °C Média: {dia.media} °C
        </div>
      </div>
    );
  }

  const renderMonthMaxTemp = (monthMaxTemp) => {
    setMaxMonthlyTemp(
      <div>
        Máxima do mês: {monthMaxTemp.max} °C no dia {monthMaxTemp.dia.length === 2 ? monthMaxTemp.dia.join(" e no dia ") : monthMaxTemp.dia[0]}
      </div>
    )
  }

  const renderMediaMes = (mediaMes, maiorMedia) => {
    setMediaMesDiv(
      <div>
         Média do mês: {mediaMes} °C | Maior média do mês: {maiorMedia.media} °C no dia {maiorMedia.numDia}
      </div>
    )
  }

  const handleVerificar = () => {
    if (!Number(infoValue)){
      renderTabelaDias(dias);
      return;
    }
    let idx = Number(infoValue) - 1;
    renderTabelaDiaFiltrado(dias[idx])
  }

  const handleInputChange = (event) => {
    setInfoValue(event.target.value)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Temperaturas Máximas e Mínimas em Junho</h1>
          <div>
            {maxMonthlyTemp}
          </div>
          <div>
            {mediaMesDiv}
          </div>
          <div className='info'>
            <div className='info-input'>
              <p>Filtre por um dia (de 1 a 30): </p>
              <input className='input' id="diaInfo" onChange={handleInputChange}></input>
              <button className='button' id="button" onClick={handleVerificar}>Verificar</button>
            </div>
          </div>
          <div className='div-dias' id="dias">
            {tabelaDias}
          </div>
      </header>
    </div>
  );
}

export default App;
