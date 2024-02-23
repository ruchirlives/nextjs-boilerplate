import React from 'react';
import { fetchCargoRecords } from './fetchCargoRecords';

const CargoPage = async () => {
  const wikiUrl = 'https://digitaltransformation.miraheze.org';
  const tableName = 'DigitalResource';
  const records = await fetchCargoRecords(wikiUrl, tableName, 80);

  return (
    <div className="m-4">
      <h1 className="text-2xl font-bold mb-4">Cargo Records</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {records.map((record, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 shadow-md p-4">
            <h2 className="font-bold text-lg mb-2">{record.title}</h2>
            <p>{record.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CargoPage;
