import { /*useEffect, useMemo,*/ useState } from 'react';
import  {getCoinChart/*, getCoinList*/}  from '../api/index.js';
//import  {getCoinDetail}  from '../api/index.js';
import Chart from 'react-apexcharts';
import { Button, CircularProgress } from '@mui/material';

function CoinRow({coin}) {

  const options = {
    chart: { id: "basic-bar"},
    xaxis: { categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]}
  }
  const series = [{
      name: "series-1",
      data: [30, 40, 45, 50, 49, 60, 70, 91]
    }]
  const defaultChart={
    options,
    series
  }

  const [open, setOpen]= useState(false);
  const [chartSet, setChartSet]= useState(defaultChart);
  const [mostragrafico, setMostragrafico]= useState(true);//xke????
  const [caricagrafico, setCaricagrafico]= useState(false);
  const [caricam, setCaricam]= useState(false);


  const onClickRow= async (coin)=>{
    console.log({selectedCoin: coin});
    /*const coinDetail= await getCoinDetail(coin.id);
    const coinChart= await getCoinChart(coin.id);
    console.log({chart: coinChart});*/
  }

  const clickGrafico= async (coin)=>{
    if(mostragrafico===true){
      setMostragrafico(false);
    }else{
      setMostragrafico(true);      
    }
    
    setCaricagrafico(false);
    if(mostragrafico===true){
 
      /*
      se quel grafico guà caricato prima non richiedere
      ?
      */
      setCaricam(true);
      const coinChart= await getCoinChart(coin.id);
      console.log({chart: coinChart});
      const newChartSet= {
        options:{
          chart: { id: "basic-bar"},
          xaxis: { categories: coinChart.prices.map(price => price[0])}
        },
        series:[{
          name: "series-1",
          data: coinChart.prices.map(price=> price[1].toFixed(0))
        }]
      }
      setChartSet(newChartSet);
      setCaricam(false);
      setCaricagrafico(true);
    }
  }
//commenti tutti in fondo altrimenti crea problemi
/*
{/* commento  
            {open && <p>
            {coin.market_data.circulating_supply} pezzi
            </p>}
            *//*}
      {/* se aggiungo una sola riga --> tutte stesso colore*//*}
 {/* non sapevo cosa altro mettere come key *//*}
*/
  return ([
    <tr key={coin.id} onClick={()=> onClickRow(coin)}
        onMouseEnter={()=> {setOpen(true)}}
        onMouseLeave={()=> {setOpen(false)}}  
    >
        <td>
            <img
            src={coin.image.small}
            alt=""
            style={{width: '40px', height: '40px'}}
            className="rounded-circle App-logo"
            />
        </td>
        <td>
            {coin.name}
            
        </td>
        <td>
            {coin.symbol}
        </td>
    </tr>,
    <tr key={coin.id+1}
    onMouseEnter={()=> {setOpen(true)}}
    onMouseLeave={()=> {setOpen(false)}}> 
      {open && <td colSpan={3}>
      {coin.market_data.circulating_supply} pezzi
      </td>}
    </tr>,
    <tr key={coin.id+2}
    onMouseEnter={()=> {setOpen(true)}}
    onMouseLeave={()=> {setOpen(false)}}>
      {open && <td colSpan={3}>
      <Button variant="contained" onClick={()=> clickGrafico(coin)} style={{backgroundColor: 'yellowgreen'}}>grafico 
        {caricam && <CircularProgress color="inherit" disableShrink style={{width: 25+'px', height: 25+'px'}}/>}
      </Button>
      </td>}
    </tr>,
    <tr key={coin.id+3}
    onMouseEnter={()=> {setOpen(true)}}
    onMouseLeave={()=> {setOpen(false)}}>
      {open && caricagrafico && <td colSpan={3}>
      <Chart options={chartSet.options} series={chartSet.series} type='line' height={300} />
      </td>}
    </tr>
    
  ]);
}

//xke open && <altro>

export default CoinRow;
