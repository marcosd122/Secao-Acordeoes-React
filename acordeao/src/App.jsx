
import React, {useState} from 'react';
import './styles.css';
import Accordion from './Accordion';

export default function App() {
  const [active, setActive] = useState("");
  return (
    <div className='App'>
     <Accordion título="Título1" active={active} setActive={setActive} />
     <Accordion título="Título2" active={active} setActive={setActive} />
     <Accordion título="Título3" active={active} setActive={setActive} />
     <Accordion título="Título4" active={active} setActive={setActive} />
    </div>
  );
}


