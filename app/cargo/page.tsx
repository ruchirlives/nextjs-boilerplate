// Import the Image component from Next.js
import Image from 'next/image';
import React from 'react';
import { fetchCargoRecords } from './fetchCargoRecords';

const CargoPage = async () => {
  const wikiUrl = 'https://digitaltransformation.miraheze.org';
  const tableName = 'DigitalResource';
  const records = await fetchCargoRecords(wikiUrl, tableName, 80);

  return (
    <div className="m-4 text-gray-800 dark:text-gray-200">
      <h1 className="text-2xl font-bold mb-4">Cargo Records</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {records.map((record, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md p-4 flex flex-col items-center">
            {/* Check if record.image exists before trying to display it */}
            {record.image && (
              <div className="w-full h-64 relative mb-4">
                {/* Use the Image component for optimized loading */}
                <Image src={record.image} alt={record.title} layout="fill" objectFit="cover" />
              </div>
            )}
            <h2 className="font-bold text-lg mb-2">{record.title}</h2>
            <p>{record.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CargoPage;
