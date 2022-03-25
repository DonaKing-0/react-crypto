import { useEffect, useMemo, useState } from 'react';
import  {getCoinList}  from '../api/index.js';
import  {getCoinDetail}  from '../api/index.js';

function CoinList({}) {

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

const onClickRow= async (coin)=>{
  console.log({selectedCoin: coin});
  const coinDetail= await getCoinDetail(coin.id);
  console.log(coinDetail);
}

  return (
    <div style={{ width: '90%' }}>
    <div className='coin-list'>

      <input placeholder='cerca' onChange={onTextChange} style={{ margin: '10px' }}></input>
      <br></br>
      <table className="table table-sm table-striped table-hover table-bordered table-dark">
      <tbody>
    
        {
            filteredCoins.map(coin =>{
              return(
                  <tr  key={coin.id} onClick={()=> onClickRow(coin)}>
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
                  </tr> 
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
