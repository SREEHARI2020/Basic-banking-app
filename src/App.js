import React,{useReducer} from 'react';
import './App.css';
const initialState={
  depositAmount:0,
  withdrawAmount:0,
  total:100,
  isWithdraw:false,
  isDeposit:false

}
const reducer=(state,action)=>
{
  switch(action.type){
    case 'DEPOSIT':
    return{...state,total:state.total+action.payload ,isWithdraw:false,  depositAmount:action.payload,
      isDeposit:true}
    case 'WITHDRAW':
      return{...state,total:state.total-action.payload,isWithdraw:true,  withdrawAmount:action.payload,
        isDeposit:false};
    default:
      return state ;
  }

}

function App() {
   const[state,dispatch]=useReducer(reducer,initialState);
  
   const transactionmoney=(money,type)=>{
    const bal=type==='deposit'?state.total-money:state.total+money ;
    return <div>
      <p>You just {type} <b>${money}</b></p>
      <p>Your previous balance was <b>${bal}</b></p>
      <p>Your current balance is <b>${state.total}</b></p>
    </div>
   }
   const random=Math.floor(Math.random()*20 +1);
   
  return (
    <div className="App">
   <div className="card">
     <h1>Bank of America</h1>
     <div className="cardbody">
       <button onClick={()=>dispatch({type:'DEPOSIT',payload:random})} className='add'><h2>Deposit</h2></button>
       <button onClick={()=>dispatch({type:'WITHDRAW' ,payload:random})} className='remove'><h2>Withdraw</h2></button>
       {state.isDeposit?transactionmoney(state.depositAmount,'deposit'):null}
       {state.isWithdraw?transactionmoney(state.withdrawAmount,'withdraw'):null}
     </div>
  <p>Your total balance is <b>${state.total}</b></p>
   </div>
    </div>
  );
}

export default App;
