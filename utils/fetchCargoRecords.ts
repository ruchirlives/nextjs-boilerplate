// If using CommonJS, you might need to adjust the import as per your setup, e.g.,
// const fetch = require('node-fetch').default; for CommonJS environments
import fetch from 'node-fetch';

interface CargoRecord {
  title: string;
  description?: string; // Assuming you might also want to extract the description
}

interface CargoQueryResponse {
  cargoquery: Array<{
    title: {
      title: string;
      Description?: string; // Ensure the field names match the API response
    };
  }>;
}

export async function fetchCargoRecords(wikiUrl: string, table: string, limit: number = 10): Promise<CargoRecord[]> {
  const apiUrl = `${wikiUrl}/w/api.php`;

  const params = new URLSearchParams({
    action: 'cargoquery',
    tables: table,
    limit: limit.toString(),
    format: 'json',
    fields: 'title,Description', // Ensure these field names match what's available in your Cargo table
  });

  try {
    const response = await fetch(`${apiUrl}?${params.toString()}`);
    const jsonResponse: { cargoquery?: CargoQueryResponse['cargoquery'] } = await response.json();

    if (!jsonResponse.cargoquery) {
      console.error('No cargoquery data found in response');
      return [];
    }

    const simplifiedRecords: CargoRecord[] = jsonResponse.cargoquery.map((record) => ({
      title: record.title.title,
      description: record.title.Description, // Extract description if needed
    }));

    return simplifiedRecords;
  } catch (e) {
    console.error(`Error fetching records from Cargo table: ${e}`);
    return [];
  }
}
