import React, { useState } from 'react';

export const DataContext = React.createContext();

// DataProvider.js
const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);

  // Method to store data
  const storeData = newData => {
    setData(newData);
  };

  // Method to retrieve data
  const retrieveData = () => {
    return data;
  };

  return (
    <DataContext.Provider value={{ storeData, retrieveData }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;