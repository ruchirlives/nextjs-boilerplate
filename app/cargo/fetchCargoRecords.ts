import fetch from 'node-fetch';

interface CargoData {
  title: object;
}

type SimplifiedCargoRecord = Record<string, string>;

export async function fetchCargoRecords(wikiUrl: string, table: string, limit: number = 10): Promise {
  const apiUrl = `${wikiUrl}/w/api.php`;

  const params = new URLSearchParams({
    action: 'cargoquery',
    tables: table,
    limit: limit.toString(),
    format: 'json',
    fields: '_pageName=title,Description=description,Image=image,Link=link,Type=type',
  });

  try {
    const response = await fetch(`${apiUrl}?${params.toString()}`);
    const data: any = await response.json();

    const records: CargoData[] = data.cargoquery || [];
    const simplifiedRecords = records.map(({ title }: { title: any }) => ({
      ...title
    }));

    return simplifiedRecords;
  } catch (e) {
    console.error(`Error fetching records from Cargo table: ${e}`);
    return [];
  }
}
