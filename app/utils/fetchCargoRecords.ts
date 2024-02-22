import fetch from 'node-fetch';

interface CargoRecord {
  title: string;
}

// Assuming the structure of your API response
interface ApiResponse {
  cargoquery: Array<{
    title: {
      title: string; // Adjust this path based on the actual structures.
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
    const data = await response.json() as ApiResponse; // Type assertion here

    const records = data.cargoquery || [];
    const simplifiedRecords: CargoRecord[] = records.map(record => ({
      title: record.title.title,
    }));

    return simplifiedRecords;
  } catch (e) {
    console.error(`Error fetching records from Cargo table: ${e}`);
    return [];
  }
}


