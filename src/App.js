import {useState, useEffect} from "react";
import './App.css';

const App = () => {

  const [address, setAddress] = useState('');
  const [keys, setKeys] = useState(0);
  const [form, setForm] = useState({
    userId: '',
    rank: '',
    purchased: false
  });

  const {userId, rank, purchased} = form;

  const postMessageToApp = (type, value) => {
    const message = {
      type,
      value
    };
    window.ReactNativeWebView.postMessage(JSON.stringify(message));
  }

  useEffect(() => {
    document.addEventListener('message', e => {
      alert('네이티브로부터 받은 데이터: ' + e.data);

      const data = JSON.parse(e.data);
      switch (data.type) {
        case 'loadWallet':
          setAddress(data.value);
          break;
        default:
          break;
      }
    })
  }, [])

  const handleInput = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleCheckbox = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.checked,
    })
  }

  const pushDataLayer = () => {
    window.dataLayer.push({
      event: 'update',
      userId,
      rank,
      purchased: purchased ? 'Y' : 'N',
    })
    alert('GA로 보내기 완료');
  }

  return (
    <div>
      <div>
        <button onClick={() => postMessageToApp('connectWallet')}>지갑연결</button><br/>
        <button onClick={() => postMessageToApp('loadWallet')}>지갑조회</button><br/>
        <span>연결된 지갑주소: {address}</span>
      </div>

      <hr/>

      <div>
        <button onClick={() => pushDataLayer()}>아래 정보를 GA로 보내기</button>
        <div>
          <span style={{marginRight: '10px'}}>아이디</span>
          <input name='userId' value={userId} onChange={handleInput}/>
        </div>
        <div>
          <span style={{marginRight: '10px'}}>랭크</span>
          <input name='rank' value={rank} onChange={handleInput}/>
        </div>
        <div>
          <span style={{marginRight: '10px'}}>구매여부</span>
          <input type='checkbox' name='purchased' checked={purchased} onChange={handleCheckbox}/>
        </div>
      </div>

      {/*<hr/>*/}

      {/*<div>*/}
      {/*  <button onClick={() => postMessageToApp('watchAdmob')}>광고시청</button><br/>*/}
      {/*  <span>열쇠 갯수: {keys}</span>*/}
      {/*</div>*/}

    </div>
  );
}

export default App;
