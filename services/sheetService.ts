
// This would be your GAS Web App URL after deployment
// Add explicit : string type to prevent TypeScript literal type overlap errors
const GAS_URL: string = 'https://script.google.com/macros/s/AKfycbzSGJMO2S6G8q0fvywlMKlXuTPmYwni0ffWOQvgI8UUyfd5YJ3SLLFZ-KDlsnnmVz5G/exec';

export const sheetService = {
  // Since we can't actually call a remote GAS without the user's URL,
  // we'll implement a mock persistence for demonstration if URL is not provided.
  async getData() {
    try {
      // Comparison fixed by adding : string type to GAS_URL above
      if (GAS_URL === 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL') {
         return this.getMockData();
      }
      const response = await fetch(`${GAS_URL}?action=getData`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      return this.getMockData();
    }
  },

  async addBarang(data: any) {
    return this.postData({ action: 'addBarang', ...data });
  },

  async updateBarang(data: any) {
    return this.postData({ action: 'updateBarang', ...data });
  },

  async deleteBarang(idBarang: string | number) {
    return this.postData({ action: 'deleteBarang', idBarang });
  },

  async addLog(log: any) {
    return this.postData({ action: 'addLog', ...log });
  },

  async postData(payload: any) {
    try {
      // Comparison fixed by adding : string type to GAS_URL above
      if (GAS_URL === 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL') {
        console.log("Mocking POST request:", payload);
        return { success: true };
      }
      const response = await fetch(GAS_URL, {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      return await response.json();
    } catch (error) {
      console.error("Error posting data:", error);
      return { success: false, error: "Connection Failed" };
    }
  },

  getMockData() {
    return {
      master: [
        { IDBarang: 'B001', NamaBarang: 'Kertas A4 80gr', Kategori: 'Kertas', StokSaatIni: 45, MinimumStok: 50, Satuan: 'Rim', UpdateTerakhir: new Date().toISOString() },
        { IDBarang: 'B002', NamaBarang: 'Bolpoint Pilot Blue', Kategori: 'Alat Tulis', StokSaatIni: 120, MinimumStok: 24, Satuan: 'Pcs', UpdateTerakhir: new Date().toISOString() },
        { IDBarang: 'B003', NamaBarang: 'Tinta Epson 003 Black', Kategori: 'Tinta', StokSaatIni: 8, MinimumStok: 10, Satuan: 'Botol', UpdateTerakhir: new Date().toISOString() },
        { IDBarang: 'B004', NamaBarang: 'Map Diamond Biru', Kategori: 'Map', StokSaatIni: 200, MinimumStok: 50, Satuan: 'Pcs', UpdateTerakhir: new Date().toISOString() },
      ],
      logs: [
        { IDTransaksi: 'T001', IDBarang: 'B001', NamaBarang: 'Kertas A4 80gr', Tipe: 'Keluar', Jumlah: 5, Catatan: 'Divisi Keuangan', Waktu: new Date().toISOString() },
        { IDTransaksi: 'T002', IDBarang: 'B002', NamaBarang: 'Bolpoint Pilot Blue', Tipe: 'Masuk', Jumlah: 50, Catatan: 'Restock Supplier', Waktu: new Date().toISOString() }
      ]
    };
  }
};