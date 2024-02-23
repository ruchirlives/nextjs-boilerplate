// app/cargo/page.server.tsx
import React from 'react';
import { fetchCargoRecords } from './fetchCargoRecords';

const CargoPage = async () => {

      const wikiUrl = 'https://digitaltransformation.miraheze.org';
      const tableName = 'DigitalResource';
      const records = await fetchCargoRecords(wikiUrl, tableName, 80);


  return (
    <div>
      <h1>Cargo Records</h1>
      <ul>
        {records.map((record, index) => (
          <li key={index}>{record.title}: {record.Description}</li>
        ))}
      </ul>
    </div>
  );
};

export default CargoPage;
