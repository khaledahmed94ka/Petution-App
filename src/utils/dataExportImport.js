/**
 * Utility functions for exporting and importing CSV and JSON data
 */

// Convert array of objects to CSV string and trigger browser download
export function exportToCSV(dataArray, filename = 'export.csv') {
  if (!dataArray || !dataArray.length) {
    alert('No data available to export.');
    return;
  }

  // Extract headers
  const headers = Object.keys(dataArray[0]);
  
  const csvRows = [];
  csvRows.push(headers.join(','));

  for (const row of dataArray) {
    const values = headers.map(header => {
      let val = row[header];
      if (val === null || val === undefined) val = '';
      if (typeof val === 'object') val = JSON.stringify(val);
      // Escape double quotes
      const stringVal = String(val).replace(/"/g, '""');
      return `"${stringVal}"`;
    });
    csvRows.push(values.join(','));
  }

  const csvContent = csvRows.join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Export complete system JSON backup
export function exportSystemBackupJSON(fullState, filename = 'petution_backup.json') {
  const jsonContent = JSON.stringify(fullState, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Parse CSV text into array of objects
export function parseCSVText(csvText) {
  const lines = csvText.trim().split('\n');
  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
  const results = [];

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    // Match CSV cells considering quoted strings
    const cells = lines[i].match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g) || lines[i].split(',');
    const obj = {};

    headers.forEach((header, index) => {
      let rawVal = cells[index] ? cells[index].trim() : '';
      if (rawVal.startsWith('"') && rawVal.endsWith('"')) {
        rawVal = rawVal.substring(1, rawVal.length - 1).replace(/""/g, '"');
      }
      obj[header] = rawVal;
    });

    results.push(obj);
  }

  return results;
}
