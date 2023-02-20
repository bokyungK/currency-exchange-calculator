import logo from './logo.svg';
import './App.css';
import { useEffect, useState, useRef } from 'react';

function App() {
  const [countryState, setCountryState] = useState();
  const beforeCountry = useRef();
  const afterCountry = useRef();
  const before = useRef();
  const after = useRef();

  useEffect(() => {
    fetch('https://api.exchangerate.host/latest')
    .then(res => res.json())
    .then(data => {
      const rates = data.rates;
      const countryArr = [];

      for (const country in rates) {
          countryArr.push(country);
      }
      setCountryState(countryArr);
    })
  }, []);

    const handleGetRates = () => {
      const currentCountry = beforeCountry.current.value;

      fetch(`https://api.exchangerate.host/latest?base=${currentCountry}`)
      .then(res => res.json())
      .then(data => data.rates)
      .then(rates => {
        const NewCountry = afterCountry.current.value;

        if (currentCountry === NewCountry) {
          window.alert('같은 나라입니다!');
          return;
        }

        if (before.current.value === '') {
          window.alert('계산할 숫자를 입력해주세요!');
          return
        }
      
        const newRate = rates[NewCountry];
        const result = newRate * before.current.value;
        after.current.value = result;
      })
    }
    
  return (
    <div className="App">
      <h1>환전 계산기</h1>
      <div className='section'>
        <input ref={before} className="box" type='number' placeholder='숫자를 입력해주세요!'>
        </input>
        <select ref={beforeCountry} className='selectBox'>
          {
            countryState ? (
              countryState.map((name) => {
                return <option key={name}>{name}</option>
              })
            ) : ''
          }
        </select>
      </div>
      <div className='section'>
        <input ref={after} className="box" type='number' disabled>
        </input>
        <select ref={afterCountry} className='selectBox'>
          {
            countryState ? (
              countryState.map((name) => {
                return <option key={name}>{name}</option>
              })
            ) : ''
          }
        </select>
      </div>
      <button className='section button' onClick={handleGetRates}>계산</button>
    </div>
  );
}

export default App;
