import React, { useCallback, useEffect, useState } from 'react';
import Hatch from './components/Hatch/Hatch';
import { HatchType, createCalendar } from './helpers';
import { GlobalStyle, StyledApp } from './App.styles';

const App: React.FC = () => {

  const[hatches, setHaches] = useState<HatchType[]>(localStorage.calendar ? JSON.parse(localStorage.calendar) : createCalendar());


  // Salvar calendario no localStorage
  useEffect(() => {
    localStorage.setItem("calendar", JSON.stringify(hatches))
  }, [hatches]) 

  const handleClickHatch = useCallback((nr: number) => {
    setHaches(prev => prev.map(hatch => (hatch.nr === nr ? {...hatch, open: !hatch.open} : hatch)))
  }, []);

  const isMatchEnable = useCallback((nr: number): boolean => {
    const date = new Date();

    const day = date.getUTCDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    //Só permitir revelar cads até a data de hoje, 08/02/2022
    //Os outros cards irão ser revelados de acordo com o passar do dia
    //Se o mês de fevereiro se encerrar, permitir a revelação de todos os cards
    if(year > 2022) return true;
    if(month === 1 && nr <= day) return true;

    return false;
  }, []);

  return (
    <StyledApp>
      <GlobalStyle />
      {hatches.map(hatch => (
        <Hatch key={hatch.nr} hatch={hatch} handleCLick={handleClickHatch} enableCallback={isMatchEnable}/>
      ))}
    </StyledApp>
  );
};

export default App;
