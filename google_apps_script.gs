
/**
 * GOOGLE APPS SCRIPT BACKEND FOR ATK STOCK APP
 * 1. Create a new Google Sheet.
 * 2. Name sheets as 'Master_Barang' and 'Log_Transaksi'.
 * 3. Add headers as specified in the prompt.
 * 4. Open Extensions > Apps Script and paste this code.
 * 5. Deploy as Web App (Execute as: Me, Access: Anyone).
 */

const SS = SpreadsheetApp.getActiveSpreadsheet();
const MASTER_SHEET = SS.getSheetByName('Master_Barang');
const LOG_SHEET = SS.getSheetByName('Log_Transaksi');

function doGet(e) {
  const action = e.parameter.action;
  
  if (action === 'getData') {
    return createResponse({
      master: getSheetData(MASTER_SHEET),
      logs: getSheetData(LOG_SHEET)
    });
  }
}

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const action = data.action;

  try {
    if (action === 'addBarang') {
      const newRow = [
        data.idBarang, 
        data.namaBarang, 
        data.kategori, 
        data.stokSaatIni, 
        data.minimumStok, 
        data.satuan, 
        new Date().toISOString()
      ];
      MASTER_SHEET.appendRow(newRow);
      return createResponse({ success: true, message: 'Barang added' });
    }

    if (action === 'updateBarang') {
      const rows = MASTER_SHEET.getDataRange().getValues();
      for (let i = 1; i < rows.length; i++) {
        if (rows[i][0].toString() === data.idBarang.toString()) {
          const range = MASTER_SHEET.getRange(i + 1, 1, 1, 7);
          range.setValues([[
            data.idBarang, 
            data.namaBarang, 
            data.kategori, 
            data.stokSaatIni, 
            data.minimumStok, 
            data.satuan, 
            new Date().toISOString()
          ]]);
          break;
        }
      }
      return createResponse({ success: true });
    }

    if (action === 'deleteBarang') {
      const rows = MASTER_SHEET.getDataRange().getValues();
      for (let i = 1; i < rows.length; i++) {
        if (rows[i][0].toString() === data.idBarang.toString()) {
          MASTER_SHEET.deleteRow(i + 1);
          break;
        }
      }
      return createResponse({ success: true });
    }

    if (action === 'addLog') {
      // 1. Log Transaction
      const logRow = [
        data.idTransaksi,
        data.idBarang,
        data.namaBarang,
        data.tipe,
        data.jumlah,
        data.catatan,
        new Date().toISOString()
      ];
      LOG_SHEET.appendRow(logRow);

      // 2. Update Stock in Master
      const rows = MASTER_SHEET.getDataRange().getValues();
      for (let i = 1; i < rows.length; i++) {
        if (rows[i][0].toString() === data.idBarang.toString()) {
          let currentStock = Number(rows[i][3]);
          if (data.tipe === 'Masuk') currentStock += Number(data.jumlah);
          if (data.tipe === 'Keluar') currentStock -= Number(data.jumlah);
          
          MASTER_SHEET.getRange(i + 1, 4).setValue(currentStock);
          MASTER_SHEET.getRange(i + 1, 7).setValue(new Date().toISOString());
          break;
        }
      }
      return createResponse({ success: true });
    }

  } catch (err) {
    return createResponse({ success: false, error: err.toString() });
  }
}

function getSheetData(sheet) {
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);
  return rows.map(row => {
    let obj = {};
    headers.forEach((h, i) => {
      obj[h.replace(/\s+/g, '')] = row[i];
    });
    return obj;
  });
}

function createResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
