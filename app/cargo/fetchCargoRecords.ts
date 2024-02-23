import fetch from 'node-fetch';

// This interface accurately reflects the expected structure of each record.
interface CargoRecord {
  title: string;
  description: string;
}

// If CargoData is intended to represent the structure of data as returned by the API,
// ensure it matches the actual data structure. Assuming that `title` is indeed supposed to be an object,
// ensure that the structure of this object is correctly represented. 
// For example, if the title object contains `title` and `Description` fields, 
// you would define it as shown below. Adjust this according to the actual data structure.
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
    // If you expect the response to match a specific structure, it's a good practice to type it accordingly.
    // Assuming the JSON response has a specific structure, you would adjust this typing.
    const data: { cargoquery: CargoData[] } = await response.json();

    const records = data.cargoquery || [];
    const simplifiedRecords: CargoRecord[] = records.map((record) => ({
      // Ensure these mappings are correct according to your actual data structure.
      title: record.title.title,
      description: record.title.Description // Adjust according to actual response structure
    }));

    return simplifiedRecords;
  } catch (e) {
    console.error(`Error fetching records from Cargo table: ${e}`);
    return [];
  }
}
