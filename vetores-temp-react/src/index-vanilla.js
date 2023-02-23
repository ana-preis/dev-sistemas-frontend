const generateTemp = () => {
    let random = ((Math.random() * 23) + 12);
    return Math.round(random);
}

const appendTempList = () => {
    let dia = {
        maxTemp: 0,
        minTemp: 0,
        numDia: 0
    }

    let tempA = generateTemp();
    let tempB = generateTemp();

    if (tempA > tempB) {
        dia.minTemp = tempB;
        dia.maxTemp = tempA;
        return (dia)
    }
    dia.minTemp = tempA;
    dia.maxTemp = tempB;
    return (dia)
}

const init = () => {
    let dias = []
    for (i=0; i<30; i++) {
        let dia = appendTempList();
        dia.numDia = i+1;
        dias.push(dia);
    } 
    return dias;
}

const tempMediaMes = (dias) => {
    let media = {
        min:0,
        max:0,
    }
    let somaMax = 0;
    let somaMin = 0;
    for (i = 0; i<30; i++) {
        somaMax += dias[i].maxTemp;
        somaMin += dias[i].minTemp;
    }
    media.max =  Math.round(somaMax/30);
    media.min = Math.round(somaMin/30);
    return media;
}

const mediaDia = (a, b) => {
    return (a + b) / 2;
}

let dias = init();
let mediaMes = tempMediaMes(dias);

const renderTabelaDias = (element, dias) => {
    let diaMax;
    let maxMonthlyTemp = {};
    maxMonthlyTemp = getMaxTemp();
    dias.forEach(e => {
        let media = mediaDia(e.maxTemp, e.minTemp);
        let divDia = document.createElement('div');
        divDia.innerText = `Dia: ${e.numDia} | Temperatura Máxima: ${e.maxTemp} | Temepratura Mínima: ${e.minTemp} | Temperatura média: ${media}`
        element.appendChild(divDia);
        if (maxMonthlyTemp === e.maxTemp) {
            diaMax = e.numDia;
        }
    });
    let divMaxTemp = document.createElement('div');
    divMaxTemp.innerText = `Temperatura máxima do mês: ${maxMonthlyTemp} no dia ${diaMax}`;
    element.appendChild(divMaxTemp);
}

const handleVerificar = () => {
    let result = document.getElementById("temp");
    result.innerHTML = '';
    let input = document.getElementById("diaInfo");
    let idx = input.value - 1;
    let media = mediaDia(dias[idx].maxTemp, dias[idx].minTemp);
    let divDia = document.createElement('div');
    divDia.innerText = `Dia: ${dias[idx].numDia} | Temperatura Máxima: ${dias[idx].maxTemp} | Temepratura Mínima: ${dias[idx].minTemp} | Temperatura média: ${media}`
    result.appendChild(divDia);
}

const getMaxTemp = () => {
    let obj = {
        max:[],
        dia:0
    };
    let maxList = [];
    for (i = 0 ; i < dias.length ; i++) {
        maxList.push(dias[i].maxTemp);
    }
    maxList.sort(function(a, b) {
        return a - b;
    });
    obj.max = maxList[maxList.length-1];
    return obj.max;
} 

let diasElement = document.getElementById("dias");

renderTabelaDias(diasElement, dias);

let button = document.getElementById("button");
button.onclick = handleVerificar;