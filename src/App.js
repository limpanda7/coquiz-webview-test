import {useState, useEffect} from "react";
import './App.css';

const App = () => {

  const [address, setAddress] = useState('');
  const [form, setForm] = useState({
    userId: '',
    rank: '',
    joinTime: '',
  });

  const {userId, rank, joinTime} = form;

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

  const postMessageToApp = (type, value) => {
    const message = {
      type,
      value
    };
    window.ReactNativeWebView.postMessage(JSON.stringify(message));
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
        <button onClick={() => postMessageToApp('updateUser', form)}>아래 정보를 네이티브로 보내기</button>
        <div>
          <span style={{marginRight: '10px'}}>아이디</span>
          <input name='userId' value={userId} onChange={handleInput}/>
        </div>
        <div>
          <span style={{marginRight: '10px'}}>랭크</span>
          <input name='rank' value={rank} onChange={handleInput}/>
        </div>
        <div>
          <span style={{marginRight: '10px'}}>참여횟수</span>
          <input name='joinTime' value={joinTime} onChange={handleInput}/>
        </div>
      </div>
    </div>
  );
}

export default App;
