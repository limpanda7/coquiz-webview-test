import {useState, useEffect} from "react";
import './App.css';
import detectEthereumProvider from '@metamask/detect-provider'

const App = () => {

  useEffect(() => {
    document.addEventListener('message', e => {
      alert('받은 데이터: ' + e.data);
    })
  }, []);

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

  const connectWallet = async() => {
    const provider = await detectEthereumProvider();
    if (!provider) {
      alert('Please install Metamask!');
    } else {
      const data = await provider.request({
        method: 'eth_requestAccounts'
      });
      setAddress(data[0]);
      postMessageToApp('address', data[0]);
    }
  }

  return (
    <div>
      <div>
        <button onClick={() => connectWallet()}>지갑연결</button><br/>
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
