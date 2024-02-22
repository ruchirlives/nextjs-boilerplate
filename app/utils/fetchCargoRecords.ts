import fetch from 'node-fetch';

interface CargoRecord {
  title: string;
}

// Define a type for the expected structure of the API response
interface CargoQueryResponse {
  cargoquery?: Array<{
    title: {
      title: string; // Assuming 'title' is nested within each query item, adjust based on actual response
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
    fields: '_pageName=title,Description',
  });

  try {
    const response = await fetch(`${apiUrl}?${params.toString()}`);
    const data: CargoQueryResponse = await response.json(); // Use the defined type here

    const records = data.cargoquery || [];
    const simplifiedRecords: CargoRecord[] = records.map((record) => ({
      title: record.title.title, // Adjust based on actual response structure
    }));

    return simplifiedRecords;
  } catch (e) {
    console.error(`Error fetching records from Cargo table: ${e}`);
    return [];
  }
}

