import axios from "axios"

const getCoinList= async ()=>{
    try{
        const {data: coinList}= await axios.get('/coins');
        console.log({coinList});
        return coinList;
    }catch(e){
        console.log(e);
        return [];
    }
}

const getCoinDetail= async (id)=>{
    try{
        const {data: coinDetail}= await axios.get(/*`/coins/${id}`*/ '/coins/'+ id);
        console.log({coinDetail});
        return coinDetail;
    }catch(e){
        console.log(e);
        return {};
    }
}

const getCoinChart= async (id)=>{
    try{
        const params ={
            cs_currency: 'usd',
            days: 30
        }
        const {data: coinDetail}= await axios.get(/*`/coins/${id}`*/ '/coins/'+ id+ '/market_chart?vs_currency=usd&days=30');//oppure  + {params} ma non va?!
        console.log({coinDetail});
        return coinDetail;
    }catch(e){
        console.log(e);
        return {};
    }
}

export  {
    getCoinList, 
    getCoinDetail,
    getCoinChart
};