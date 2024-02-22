// app/cargo/page.server.tsx
import React from 'react';
import { fetchCargoRecords } from '../../utils/fetchCargoRecords';

CargoPageServer() = () => {
  const wikiUrl = 'https://digitaltransformation.miraheze.org';
  const tableName = 'DigitalResource';
  // Adjust the limit as needed
  const records = await fetchCargoRecords(wikiUrl, tableName, 80);

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
}

export default CargoPageServer;
