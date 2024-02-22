// app/cargo/page.server.tsx
import React from 'react';
import { fetchCargoRecords } from '../../utils/fetchCargoRecords';
import { useServerInsertedHTML } from 'next/navigation';

export default function CargoPageServer() {
  const records = useServerInsertedHTML(async () => {
    const wikiUrl = 'https://digitaltransformation.miraheze.org';
    const tableName = 'DigitalResource';
    // Adjust the limit as needed
    const records = await fetchCargoRecords(wikiUrl, tableName, 80);
    return records;
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
}
