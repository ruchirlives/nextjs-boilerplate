// app/cargo/page.tsx
import React, { useEffect, useState } from 'react';
import { fetchCargoRecords } from '../../utils/fetchCargoRecords';

const CargoPage = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const wikiUrl = 'https://digitaltransformation.miraheze.org';
      const tableName = 'DigitalResource';
      const data = await fetchCargoRecords(wikiUrl, tableName, 80);
      setRecords(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Cargo Records</h1>
      <ul>
        {records.map((record, index) => (
          <li key={index}>{record.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default CargoPage;
