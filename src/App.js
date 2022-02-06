import './App.css';
import { useEffect, useState } from 'react';
import Card from './components/card';

function App() {

  const [person, setPerson] = useState([]);

  useEffect(() => {
    async function fetchData(){
      const data = await fetch('https://randomuser.me/api'); 
      const res = await data.json();
      return res;
    }

    for (let index = 0; index < 6; index++) {
      fetchData().then(({ results }) => {
        const { first, last } = results[0].name;
        setPerson(p => [ ...p,`${first} ${last}`]);
      });      
    }
  },[]);

  return (
    <div className="App">
      <header className="bg-gray-800 flex flex-wrap justify-center">
          {person && person.map((el,i) => {
            return (
              <Card key={i} personName={el} index={i} />
            )
          })}
      </header>
    </div>
  );
}

export default App;
