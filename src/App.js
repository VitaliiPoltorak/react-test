import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import LoadingPersonsData from './components/LoadingPersonsData'
import DataAnt from './components/DataAnt'


function App() {

  const DataLoading =  LoadingPersonsData(DataAnt);

  const [appState, setAppState] = useState(
      {
        loading: false,
        persons: null,
      }
  )

  useEffect(() => {
    setAppState({loading: true})
    const apiUrl = 'https://gorest.co.in/public/v1/users?access-token=83fcc7cc60d2fc306303122bc0170a6b59b97b11d9b6e77198a1fdb50eb4ae91';
    axios.get(apiUrl).then((resp) => {
      const allPersons = resp.data.data;
      setAppState({
        loading: false,
        persons: allPersons
      });
    });
  }, [setAppState]);


  return (
      <div className="app">
        <DataLoading isLoading={appState.loading} persons={appState.persons} />
      </div>
  );
}

export default App;


