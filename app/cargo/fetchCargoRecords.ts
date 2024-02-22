import fetch from 'node-fetch';

interface CargoRecord {
  title: string;
}

interface CargoData {
  title: object;
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
    const data: any = await response.json();

    const records: CargoData[] = data.cargoquery || [];
    const simplifiedRecords: CargoRecord[] = records.map((record: any) => ({
      title: record.title.title, // Adjust according to actual response structure
    }));

    return simplifiedRecords;
  } catch (e) {
    console.error(`Error fetching records from Cargo table: ${e}`);
    return [];
  }
}
