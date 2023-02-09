import {useState, useEffect} from "react";
import './App.css';
import { initializeApp } from "firebase/app";
import {getAnalytics, setUserProperties, setAnalyticsCollectionEnabled} from "firebase/analytics";

const App = () => {

  const firebaseConfig = {
    apiKey: "AIzaSyA4AZDvV_Exi4EarJ34_bzKfZSkRYpcn1s",
    authDomain: "coquiz-19d0e.firebaseapp.com",
    projectId: "coquiz-19d0e",
    storageBucket: "coquiz-19d0e.appspot.com",
    messagingSenderId: "1053063364183",
    appId: "1:1053063364183:web:459d13f952612c98b32d12",
    measurementId: "G-WW49S6440H"
  };

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  setAnalyticsCollectionEnabled(analytics, true);

  const [address, setAddress] = useState('');
  const [form, setForm] = useState({
    userId: '',
    rank: '',
    joinTime: '',
  });

  const {userId, rank, joinTime} = form;

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

  const pushDataLayer = () => {
    window.dataLayer.push({
      event: 'update',
      userId,
      rank,
    })

    setUserProperties(analytics, {
      joinTime,
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
          <span style={{marginRight: '10px'}}>참여횟수</span>
          <input name='joinTime' value={joinTime} onChange={handleInput}/>
        </div>
      </div>
    </div>
  );
}

export default App;
