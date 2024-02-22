// app/cargo/page.tsx
import React, { useEffect, useState } from 'react';
import { fetchCargoRecords } from '../../utils/fetchCargoRecords';

const CargoPage = async () => {

      const wikiUrl = 'https://digitaltransformation.miraheze.org';
      const tableName = 'DigitalResource';
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
};

export default CargoPage;
