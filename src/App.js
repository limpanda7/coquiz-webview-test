import {useState, useEffect} from "react";
import './App.css';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

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

const App = () => {

  const [address, setAddress] = useState('');
  const [keys, setKeys] = useState(0);
  const [form, setForm] = useState({
    userId: '',
    rank: '',
    purchased: false
  });

  const {userId, rank, purchased} = form;

  const postMessageToApp = (str) => {
    window.ReactNativeWebView.postMessage(str);
  }

  useEffect(() => {
    document.addEventListener('message', e => {
      alert('받은 데이터: ' + e.data);
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

  return (
    <div>
      <div>
        <button onClick={() => postMessageToApp('wallet')}>지갑연결</button><br/>
        <span>연결된 지갑주소: {address}</span>
      </div>

      <hr/>

      <div>
        <button onClick={() => postMessageToApp('admob')}>광고시청</button><br/>
        <span>열쇠 갯수: {keys}</span>
      </div>

      <hr/>

      <div>
        <button>아래 정보를 GA로 보내기</button>
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

    </div>
  );
}

export default App;
