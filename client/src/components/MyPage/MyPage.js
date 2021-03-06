import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';

// const ctrl = require('/workspace/App_with_Alternative_coin/server/controllers/controllers');

// require("dotenv").config({ path: __dirname + "/.env" });

function MyPage() {

  // const [value, SetValue] = useState('');
  const [Result, SetResult] = useState('');
  const [Dbdata, SetDbdata] = useState([]);
  const [Avalue, SetValue] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [sendAddress, SetAddress] = useState('');
  const [sendAmount, SetAmount] = useState('');
  const [Bvalue, BSetValue] = useState('');
  const [Cvalue, CSetValue] = useState('');
  const [Dvalue, DSetValue] = useState('');

  useEffect(()=>{ //마이페이지에 들어왔을 때 콘솔에 walletinfo 띄움.
    axios.get('http://localhost:3001/mywallet/show').then(({data})=>{
        SetDbdata((data[0]));
      // console.log(data[0]);
    })
  }, []);

// console.log(Dbdata);

    // window.localStorage.setItem('logindata', JSON.stringify(Dbdata));
  // console.log('Dbdata:' + Dbdata);

  // ↓↓↓↓↓↓↓↓↓↓↓ 지갑생성

const handlechange = ({ target: { value }}) => SetValue(value);
const handlechange2 = ({ target: { value }}) => SetAddress(value);
const handlechange3 = ({ target: { value }}) => SetAmount(value);
const handlechange4 = ({ target: { value }}) => BSetValue(value);

const IDSubmit = async (event) => {
  setDisabled(true);
  event.preventDefault();
  await new Promise((r) => setTimeout(r, 1000));
  alert(`지갑생성완료: ${Avalue}`);

axios.post('http://localhost:3001/mywallet/getnewaddress',{
  account: Avalue
}).then(()=>{
  console.log('post완료')
  console.log(Avalue)
});  
  setDisabled(false);
  
};
//↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑지갑생성

// ↓↓↓↓↓↓↓↓↓↓↓ 지갑찾기
const FindWalletSubmit = async (event) => {
  setDisabled(true);
  event.preventDefault();
  await new Promise((r) => setTimeout(r, 1000));
  alert(`찾을 지갑의 계정: ${Avalue}`);

axios.post('http://localhost:3001/mywallet/getaddressesbyaccount/taesu1',{
  account: Avalue
}).then((result)=>{
  // console.log(result.data.result[0])
  SetResult(result.data.result[0]); //변경값을 이렇게 설정한 이유는 인풋에서 설정하려고하면 속성을 못읽어서 새로고침하면 값이 날아가버려오류생김.
  
});
  setDisabled(false);
  
};
//↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑지갑찾기

// ↓↓↓↓↓↓↓ 거래내역

const listTransactionsSubmit = async (event) => {
  setDisabled(true);
  event.preventDefault();
  await new Promise((r) => setTimeout(r, 1000));
  alert(`거래내역 확인할 지갑의 주소: ${Bvalue}`);
console.log(Bvalue)
axios.post('http://localhost:3001/mywallet/listtransactions',{
  account: Bvalue
}).then((data)=>{
  // console.log(data.data.result);
  data.data.result.reverse();
  console.log(data.data.result);
  CSetValue("블록해쉬값: " + data.data.result[0].blockhash);
  DSetValue("txid값: " +  data.data.result[0].txid);
  
 
  // console.log(Reverseforlist);
  
  // console.log("블록해쉬값: " + data.data.result.reverse());
  // console.log("txid값: " +  data.data.result.reverse())
});
setDisabled(false);
}
//↑↑↑↑↑↑↑↑ 거래내역

// ↓↓↓↓↓↓↓↓↓↓↓ 코인보내기
const sendToAddressSubmit = async (event) => {
  setDisabled(true);
  event.preventDefault();
  await new Promise((r) => setTimeout(r, 1000));
  alert(`보낼 지갑의 주소: ${sendAddress}` + `보낼 수량: ${sendAmount}`+"개");

  axios.post('http://localhost:3001/mywallet/sendtoaddress', {
    address: sendAddress,
    amount: sendAmount
  }).then((result)=>{
    console.log(result);
    SetAddress(result.address);
    SetAmount(result.amount);
  });
  setDisabled(false);
}
// ↑↑↑↑↑↑↑↑↑↑↑↑↑ 코인 보내기
// console.log(Dbdata);
console.log(Bvalue);
const selectList = ["bonocoin", "bitcoin", "etherium", "litecoin"];
  const [Selected, setSelected] = useState("");

  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

  var userid=window.localStorage.getItem('user') //로그인정보 로컬에서 빼오기
  console.log(userid);
    return (
      <>
          <MyPageBox>
            <ul>
              <MyPageTitle>마이페이지</MyPageTitle>
              <MyPageList>
                아이디
                <li>                
                  <input value={userid || ''} onChange={handlechange} style={{width : '353px' ,marginBottom : '20px' , border : '1px solid #23518C', padding: '12px', borderRadius: '10px'}}>
                  </input>       
                </li>
                {/* 이메일
                <li> 
                  <input value={Dbdata.email || ''} onChange={handlechange} style={{width : '353px' ,marginBottom : '20px' , border : '1px solid #23518C', padding: '12px', borderRadius: '10px'}}>
                  </input> 
                </li>  */}
                코인 보유 수량
                <li>                
                <select onChange={handleSelect} value={Selected} style={{width : '40%' ,marginTop : '10px',marginBottom : '20px' , border : '1px solid #23518C', padding: '12px', borderRadius: '10px'}}>
                  {selectList.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </select>
                <input type='text' placeholder='0.00000000' onChange={handlechange} style={{width: '53%', marginBottom : '20px' , marginLeft : '10px' , border : '1px solid #23518C', padding: '12px', borderRadius: '10px'}}></input> 
                </li>
                <li>
                  <form onSubmit={IDSubmit}>
                    
                  <input style={{width : '353px' ,marginBottom : '20px' , border : '1px solid #23518C', padding: '12px', borderRadius: '10px'}} type='text' placeholder='원하는 id입력' name="account" value={Avalue || ''} onChange={handlechange}></input>
                  <button type="submit" disabled={disabled} style={{marginLeft : '10px', width : '170px' ,marginBottom : '20px' , border : '1px solid #23518C', padding: '10px', borderRadius: '10px'}} >지갑생성</button>  
                  </form>
                </li>
              
                <li>
                <form onSubmit={FindWalletSubmit} >
                  <input placeholder='원하는 id입력' name="account" value={Avalue || ''} onChange={handlechange} style={{width : '353px' ,marginBottom : '20px' , border : '1px solid #23518C', padding: '12px', borderRadius: '10px'}}>
                  </input>  
                  <button type="submit" disabled={disabled} style={{marginLeft : '10px', width : '170px' ,marginBottom : '20px' , border : '1px solid #23518C', padding: '10px', borderRadius: '10px'}} >지갑주소찾기</button>
                  
                  </form>
                  <input type='text' placeholder='찾는 지갑주소' value={Result || ''} onChange={handlechange} style={{width: '537px', marginBottom : '20px' , border : '1px solid #23518C', padding: '12px', borderRadius: '10px'}}></input> 
                </li>            
              </MyPageList>
            </ul>
            <ul>
              <MyPageTitle>송금</MyPageTitle>
              <MyPageList>
                <li>
                  
                  <form onSubmit={sendToAddressSubmit} style={{marginBottom : '20px' , border : '1px solid #23518C', padding: '5px', borderRadius: '10px'}}>
                  보낼지갑주소 
                  <input name="sendAddress" onChange={handlechange2} value={sendAddress || ''} style={{width : '99%', borderWidth: '0', height: '25px', borderRadius: '6px', marginTop:'5px', marginBottom:'5px'}}/>                  
                  보내는수량 
                  <input name="sendAmount" onChange={handlechange3} value={sendAmount || ''} style={{width : '99%', borderWidth: '0', height: '25px', borderRadius: '6px', marginTop:'5px', marginBottom:'5px'}} placeholder='0.00000000'/> 
                  <button style={{width : '550px' ,marginTop:'20px',marginBottom : '20px' , border : '1px solid #23518C', padding: '10px', borderRadius: '10px'}} type="submit">보내기</button>              
                  </form>  
                </li>
                     
              </MyPageList>
            </ul>
            <ul>
              <MyPageTitle>송금내역</MyPageTitle>
              <MyPageList>
                <li>
                  <form onSubmit={listTransactionsSubmit} style={{marginBottom : '20px' , border : '1px solid #23518C', padding: '20px',borderRadius: '10px'}}>
                  <input placeholder='내역찾을 id입력' name="Bvalue" value={Bvalue || ''} onChange={handlechange4} style={{width : '303px' ,marginBottom : '20px' , border : '1px solid #23518C', padding: '12px', borderRadius: '10px'}}>
                  </input>  
                  <button type="submit" disabled={disabled} style={{marginLeft : '10px', width : '170px' ,marginBottom : '20px' , border : '1px solid #23518C', padding: '10px', borderRadius: '10px'}} >내역 검색</button>
                  최근 거래내역(latest blockhash + 해당 txid)
                  <input value={Cvalue || ''} onChange={handlechange4} style={{width : '99%', borderWidth: '0', height: '25px', borderRadius: '6px'}}/>
                  <input value={Dvalue || ''} onChange={handlechange4} style={{width : '99%', borderWidth: '0', height: '25px', borderRadius: '6px'}}/>
                  </form> 
                </li>                     
              </MyPageList>
            </ul>
          </MyPageBox>      
      </>
    )
}

export default MyPage;


const StyleForm = styled.form`
width : '99%';
border-width: '0';
height: '25px';
border-radius: '6px';
`;

const InputStyle = styled.input`
width : '99%';
border-width: '0';
height: '25px';
border-radius: '6px';
`;

const MyPageBox = styled.div`
  border-radius: 10px;
  width: 600px;
  padding: 50px;
  margin: 0 auto;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
  color: #23518C;
  background-color: #f0f1f2 ;
`;

const MyPageTitle = styled.li`
  display: flex;
  justify-content: center;
  font-size: 20px;
  padding-top: 3px;
  font-weight: 600;
  color: #23518C;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  text-align: center;
  margin-bottom: 10px;
  background-color: #f0f1f2 ;
`;

const MyPageList = styled.div`
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 30px;
  background-color: #f0f1f2;
`;