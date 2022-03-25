import { TextField } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import  {getCoinList}  from '../api/index.js';
import CoinRow from './CoinRow.js';

function CoinList() {

  const [coins, setCoins]= useState([]);
  const [search, setSearch]= useState('');


  useEffect(()=>{
    refreshData();
    //getCoinList();
  },[]);

  const refreshData= async ()=>{
    const coinList= await getCoinList();
    setCoins(coinList);
  }

  console.log({coins});
  console.log({search});


  const filteredCoins= useMemo(()=>{
    const searched= coins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()));
    if(searched){
      return searched.splice(0, 99);
    }else{
      return coins.splice(0, 99);
    }

  }, [coins, search]);
  
  console.log({filteredCoins});

//use memo ritorna cose
//use effect no solo funzione

const onTextChange= (event)=>{
  setSearch(event.target.value);
}

//se stringa(nome) include
//visualizza
//coins.filter()

/*console.log(typeof(filteredCoins[0]))
console.log(filteredCoins[0].name)
filteredCoins.filter((coin)=>{
  coin.name.includes(search);
});                     in teoria funziona anche questo
console.log('ciao'+filteredCoins)*/

  return (
    <div style={{ width: '90%' }}>
    <div className='coin-list'>
      {/* 
      <input placeholder='cerca' onChange={onTextChange} style={{ margin: '10px' }}></input>
      text field da libreria  
      */}
      <TextField id="outlined-search" label="Search" type="search" margin="normal" 
        style={{backgroundColor: 'yellowgreen'}}
        onChange={onTextChange} />
      <br></br>
      <table className="table table-sm table-striped table-hover table-bordered table-dark">
      <tbody>
    
        {
            filteredCoins.map(coin =>{
              return(
                  <CoinRow coin={coin} key={coin.id}/>
              )
            })
        }
      </tbody>
      </table>
    </div>
    </div>
  );
}

export default CoinList;
