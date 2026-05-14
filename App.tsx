
import React, { useState, useEffect, useMemo } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ArrowLeftRight, 
  History, 
  Plus, 
  Menu, 
  X,
  AlertTriangle,
  ArrowUpCircle,
  ArrowDownCircle,
  Loader2,
  Trash2,
  Edit2,
  Filter,
  RotateCcw,
  AlertCircle,
  LogOut,
  Lock,
  User,
  TrendingUp,
  Activity,
  Layers,
  Search,
  Box,
  BarChart2,
  PieChart as PieIcon
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend, LabelList } from 'recharts';

import { MasterBarang, LogTransaksi } from './types';
import { sheetService } from './services/sheetService';

const LOGO_URL = "https://ekop.kopgiat.id//logo_giat.ico";

// --- HELPERS ---
const numericSort = (a: MasterBarang, b: MasterBarang) => {
  const idA = a.IDBarang.toString();
  const idB = b.IDBarang.toString();
  return idA.localeCompare(idB, undefined, { numeric: true, sensitivity: 'base' });
};

// --- THEME COLORS ---
const COLORS = {
  primary: 'blue-600',
  primaryDark: 'blue-800',
  secondary: 'red-600',
  secondaryDark: 'red-800',
  bgDark: 'slate-950',
  sidebarItemActive: 'bg-gradient-to-r from-blue-600 to-red-600',
};

// --- AUTH COMPONENTS ---

const LoginPage = ({ onLogin }: { onLogin: () => void }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulated login check
    setTimeout(() => {
      if (username === 'OneDev' && password === '12345') {
        onLogin();
      } else {
        setError('Username atau Password salah!');
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-red-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.05),transparent_70%)]"></div>

      <div className="w-full max-w-md z-10">
        <div className="bg-white rounded-[40px] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden relative">
          <div className="h-2 w-full flex">
            <div className="h-full flex-1 bg-blue-600"></div>
            <div className="h-full flex-1 bg-red-600"></div>
          </div>

          <div className="p-12">
            <div className="flex flex-col items-center mb-10 text-center">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-red-600 rounded-3xl blur-lg opacity-20 animate-pulse"></div>
                <div className="relative w-24 h-24 bg-white rounded-3xl shadow-xl p-4 border border-slate-50 flex items-center justify-center">
                  <img src={LOGO_URL} alt="Logo" className="w-full h-full object-contain" />
                </div>
              </div>
              <h1 className="text-4xl font-black tracking-tighter leading-none mb-1">
                <span className="bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">ATK GIAT</span>
              </h1>
              <div className="h-1 w-12 bg-gradient-to-r from-blue-600 to-red-600 rounded-full mx-auto mt-2"></div>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-bold animate-in slide-in-from-top-2">
                  <AlertCircle size={18} />
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Username</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 group-focus-within:text-blue-600 transition-colors">
                    <User size={20} />
                  </div>
                  <input 
                    type="text" 
                    required 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:bg-white focus:border-blue-600 outline-none transition-all font-bold text-slate-700 placeholder:text-slate-300"
                    placeholder="Masukkan Username"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 group-focus-within:text-red-600 transition-colors">
                    <Lock size={20} />
                  </div>
                  <input 
                    type="password" 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:bg-white focus:border-red-600 outline-none transition-all font-bold text-slate-700 placeholder:text-slate-300"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-red-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:brightness-110 transition-all shadow-[0_20px_40px_-12px_rgba(37,99,235,0.3)] disabled:opacity-50 flex items-center justify-center gap-3 mt-4 active:scale-[0.98]"
              >
                {isLoading ? <Loader2 className="animate-spin" size={24} /> : 'Masuk Akun'}
              </button>
            </form>
          </div>
          
          <div className="bg-slate-50/50 p-6 text-center border-t border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Powered by OneDev Team</p>
          </div>
        </div>
        
        <p className="mt-8 text-center text-slate-400 text-xs font-medium">
          Hak Cipta &copy; {new Date().getFullYear()} ATK GIAT. Seluruh Hak Dilindungi.
        </p>
      </div>
    </div>
  );
};

// --- COMPONENTS ---

const Sidebar = ({ isOpen, toggle, onLogoutClick }: { isOpen: boolean; toggle: () => void; onLogoutClick: () => void }) => {
  const location = useLocation();
  const menuItems = [
    { label: 'Dashboard', path: '/', icon: LayoutDashboard },
    { label: 'Stock Barang', path: '/master', icon: Package },
    { label: 'Transaksi Stok', path: '/transaksi', icon: ArrowLeftRight },
    { label: 'Riwayat', path: '/logs', icon: History },
  ];

  return (
    <>
      <div 
        className={`fixed inset-0 z-20 bg-black/60 transition-opacity lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        onClick={toggle} 
      />
      <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-slate-950 text-white transform transition-transform lg:translate-x-0 flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center gap-3 p-6 border-b border-slate-800/50">
          <img src={LOGO_URL} alt="Logo" className="w-8 h-8 rounded shadow-lg shadow-blue-500/20" />
          <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent">ATK GIAT</h1>
          <button onClick={toggle} className="lg:hidden ml-auto"><X size={24} /></button>
        </div>
        <nav className="mt-6 px-4 space-y-2 flex-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => { if(window.innerWidth < 1024) toggle() }}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                (location.pathname === item.path) 
                  ? `${COLORS.sidebarItemActive} text-white shadow-lg shadow-blue-900/40` 
                  : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800/50">
          <button 
            onClick={onLogoutClick}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-red-600/10 hover:text-red-500 transition-all font-medium"
          >
            <LogOut size={20} />
            <span>Keluar Akun</span>
          </button>
        </div>
      </div>
    </>
  );
};

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, isLoading, confirmText = "Hapus" }: { 
  isOpen: boolean; 
  onClose: () => void; 
  onConfirm: () => void; 
  title: string; 
  message: string;
  isLoading?: boolean;
  confirmText?: string;
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-sm:max-w-xs max-w-sm p-8 shadow-2xl animate-in zoom-in duration-300 border-t-8 border-red-600">
        <div className="flex flex-col items-center text-center">
          <div className="p-4 bg-red-50 text-red-600 rounded-full mb-4">
            <AlertCircle size={40} />
          </div>
          <h3 className="text-xl font-black text-slate-900 mb-2 uppercase tracking-tight">{title}</h3>
          <p className="text-slate-500 text-sm font-medium mb-8">{message}</p>
          <div className="flex gap-3 w-full">
            <button 
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 px-4 py-3 border-2 border-slate-100 rounded-xl text-slate-400 font-bold hover:bg-slate-50 transition-colors uppercase text-xs disabled:opacity-50"
            >
              Batal
            </button>
            <button 
              onClick={onConfirm}
              disabled={isLoading}
              className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 shadow-lg shadow-red-200 transition-all disabled:opacity-50 flex items-center justify-center gap-2 font-bold uppercase text-xs"
            >
              {isLoading ? <Loader2 size={16} className="animate-spin" /> : confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- PAGES ---

const Dashboard = ({ master, logs }: { master: MasterBarang[], logs: LogTransaksi[] }) => {
  const lowStockItems = master.filter(item => item.StokSaatIni <= item.MinimumStok);
  const totalValue = master.length;

  // Data untuk Grafik Distribusi Kategori (Fokus: Alat Tulis, Kertas, Arsip)
  const categoryChartData = useMemo(() => {
    const targetCategories = ['Alat Tulis', 'Kertas', 'Arsip'];
    const counts: Record<string, number> = {
      'Alat Tulis': 0,
      'Kertas': 0,
      'Arsip': 0,
      'Lainnya': 0
    };
    
    master.forEach(item => {
      const cat = item.Kategori || '';
      const matched = targetCategories.find(tc => cat.toLowerCase().includes(tc.toLowerCase()));
      if (matched) {
        counts[matched] += 1;
      } else {
        counts['Lainnya'] += 1;
      }
    });

    return Object.entries(counts)
      .map(([name, total]) => ({ name, total }))
      .filter(item => item.total > 0 || targetCategories.includes(item.name))
      .sort((a, b) => b.total - a.total);
  }, [master]);

  // Data untuk Grafik Stok Kritis (Top 5 Paling Kritis)
  const criticalChartData = useMemo(() => {
    return lowStockItems
      .slice(0, 5)
      .map(item => ({
        name: item.NamaBarang.length > 15 ? item.NamaBarang.substring(0, 12) + '...' : item.NamaBarang,
        fullTitle: item.NamaBarang,
        current: item.StokSaatIni,
        min: item.MinimumStok
      }));
  }, [lowStockItems]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 relative">
      <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 left-0 w-48 h-48 bg-red-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-blue-600 to-red-600 rounded-2xl shadow-lg shadow-blue-500/20 text-white">
            <LayoutDashboard size={24} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Ringkasan Gudang</h2>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1 flex items-center gap-2">
              <TrendingUp size={14} className="text-blue-500" /> Dashboard Real-time
            </p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 overflow-hidden group hover:shadow-xl hover:shadow-blue-500/5 transition-all relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-[60px] -mr-4 -mt-4 transition-all group-hover:scale-110"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between text-slate-400 mb-6">
              <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-200">
                <Package size={20} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest">Total Varian</span>
            </div>
            <p className="text-4xl font-black text-slate-900 group-hover:translate-x-1 transition-transform">{totalValue}</p>
            <div className="mt-4 flex items-center gap-2">
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">Katalog Aktif</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 overflow-hidden group hover:shadow-xl hover:shadow-red-500/5 transition-all relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-50 rounded-bl-[60px] -mr-4 -mt-4 transition-all group-hover:scale-110"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between text-slate-400 mb-6">
              <div className="p-3 bg-red-600 text-white rounded-2xl shadow-lg shadow-red-200">
                <AlertTriangle size={20} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest">Stok Kritis</span>
            </div>
            <p className="text-4xl font-black text-red-600 group-hover:translate-x-1 transition-transform">{lowStockItems.length}</p>
            <div className="mt-4 flex items-center gap-2">
              <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">Butuh Atensi</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 overflow-hidden group hover:shadow-xl hover:shadow-blue-500/5 transition-all relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/50 rounded-bl-[60px] -mr-4 -mt-4 transition-all group-hover:scale-110"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between text-slate-400 mb-6">
              <div className="p-3 bg-blue-500 text-white rounded-2xl shadow-lg shadow-blue-100">
                <ArrowUpCircle size={20} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest">Mutasi Masuk</span>
            </div>
            <p className="text-4xl font-black text-slate-900 group-hover:translate-x-1 transition-transform">
              {logs.filter(l => l.Tipe === 'Masuk').reduce((acc, curr) => acc + Number(curr.Jumlah), 0)}
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Bulan Ini</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 overflow-hidden group hover:shadow-xl hover:shadow-red-500/5 transition-all relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-50/50 rounded-bl-[60px] -mr-4 -mt-4 transition-all group-hover:scale-110"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between text-slate-400 mb-6">
              <div className="p-3 bg-red-500 text-white rounded-2xl shadow-lg shadow-red-100">
                <ArrowDownCircle size={20} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest">Mutasi Keluar</span>
            </div>
            <p className="text-4xl font-black text-slate-900 group-hover:translate-x-1 transition-transform">
               {logs.filter(l => l.Tipe === 'Keluar').reduce((acc, curr) => acc + Number(curr.Jumlah), 0)}
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Bulan Ini</span>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
        <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 group">
          <h3 className="font-black text-slate-900 mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
              <span>Distribusi Katalog Barang</span>
            </div>
            <BarChart2 size={18} className="text-slate-300" />
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryChartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontWeight: 600}} dy={10} />
                <YAxis fontSize={10} axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                  formatter={(value) => [value, 'Jumlah Produk']}
                />
                <Bar dataKey="total" radius={[8, 8, 8, 8]} barSize={50}>
                  <LabelList dataKey="total" position="top" style={{ fill: '#475569', fontSize: '12px', fontWeight: 'bold' }} />
                  {categoryChartData.map((entry, index) => {
                    let color = '#3b82f6'; // Default Blue
                    if (entry.name === 'Alat Tulis') color = '#2563eb';
                    if (entry.name === 'Kertas') color = '#3b82f6';
                    if (entry.name === 'Arsip') color = '#60a5fa';
                    if (entry.name === 'Lainnya') color = '#94a3b8';
                    return <Cell key={`cell-${index}`} fill={color} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-center text-[10px] font-bold text-slate-400 uppercase mt-4 tracking-widest">Informasi jumlah varian produk per kategori utama</p>
        </div>

        <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100">
          <h3 className="font-black text-slate-900 mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 bg-red-600 rounded-full"></div>
              <span>Analisis Stok Kritis</span>
            </div>
            <AlertCircle size={18} className="text-red-300" />
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={criticalChartData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" fontSize={10} axisLine={false} tickLine={false} tick={{fill: '#64748b', fontWeight: 700}} width={80} />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                  labelFormatter={(label, payload) => payload[0]?.payload?.fullTitle}
                />
                <Legend iconType="circle" wrapperStyle={{paddingTop: '20px', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase'}} />
                <Bar dataKey="current" name="Stok Fisik" fill="#ef4444" radius={[0, 4, 4, 0]} barSize={12} />
                <Bar dataKey="min" name="Minimum" fill="#cbd5e1" radius={[0, 4, 4, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-center text-[10px] font-bold text-red-500 uppercase mt-4 tracking-widest">{lowStockItems.length} barang berada di bawah batas minimum</p>
        </div>
      </div>
    </div>
  );
};

const MasterStok = ({ data, onRefresh }: { data: MasterBarang[], onRefresh: () => void }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MasterBarang | null>(null);
  const [deletingItem, setDeletingItem] = useState<MasterBarang | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const sortedData = useMemo(() => {
    return data
      .filter(item => 
        item.NamaBarang.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.IDBarang.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort(numericSort);
  }, [data, searchTerm]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const idBarang = editingItem ? editingItem.IDBarang : formData.get('idBarang');
    
    const payload = {
      idBarang: idBarang,
      namaBarang: formData.get('namaBarang'),
      kategori: formData.get('kategori'),
      stokSaatIni: Number(formData.get('stokSaatIni')),
      minimumStok: Number(formData.get('minimumStok')),
      satuan: formData.get('satuan'),
    };

    if (editingItem) {
      await sheetService.updateBarang(payload);
    } else {
      await sheetService.addBarang(payload);
    }

    setIsLoading(false);
    setIsModalOpen(false);
    setEditingItem(null);
    onRefresh();
  };

  const handleConfirmDelete = async () => {
    if (!deletingItem) return;
    setIsLoading(true);
    const result = await sheetService.deleteBarang(deletingItem.IDBarang);
    setIsLoading(false);
    setIsDeleteModalOpen(false);
    setDeletingItem(null);
    if (result.success) onRefresh();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 relative">
      <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 -left-10 w-48 h-48 bg-red-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-blue-600 to-red-600 rounded-2xl shadow-lg shadow-blue-500/20 text-white">
            <Layers size={24} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Database Stok</h2>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1 flex items-center gap-2">
              <Package size={14} className="text-red-500" /> Katalog Barang Aktif
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Cari barang..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-11 pr-4 py-3 bg-white border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all w-full md:w-64 shadow-sm"
            />
          </div>
          <button 
            onClick={() => { setEditingItem(null); setIsModalOpen(true); }}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-red-600 text-white px-6 py-3.5 rounded-2xl font-black uppercase tracking-widest text-xs hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-blue-500/10"
          >
            <Plus size={18} />
            Barang Baru
          </button>
        </div>
      </header>

      <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden relative z-10">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 border-b border-slate-100">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">ID Barang</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Nama Produk</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Kategori</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Stok Fisik</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Min. Stok</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {sortedData.map((item) => (
                <tr key={item.IDBarang} className="hover:bg-blue-50/20 transition-all group">
                  <td className="px-8 py-5 text-sm font-black text-blue-600/60 uppercase tracking-tighter">#{item.IDBarang}</td>
                  <td className="px-8 py-5">
                    <p className="text-sm font-black text-slate-800">{item.NamaBarang}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mt-0.5 tracking-tight">Update: {new Date(item.UpdateTerakhir).toLocaleDateString('id-ID')}</p>
                  </td>
                  <td className="px-8 py-5">
                    <span className="inline-block whitespace-nowrap px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-bold uppercase tracking-tight group-hover:bg-blue-600 group-hover:text-white transition-all">
                      {item.Kategori}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <div className="flex flex-col items-center">
                      <div className={`text-xl font-black ${item.StokSaatIni <= item.MinimumStok ? 'text-red-600' : 'text-blue-600'}`}>
                        {item.StokSaatIni}
                      </div>
                      <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{item.Satuan}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm font-bold text-slate-400">{item.MinimumStok}</td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => { setEditingItem(item); setIsModalOpen(true); }}
                        className="p-3 bg-blue-50 text-blue-600 rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => { setDeletingItem(item); setIsDeleteModalOpen(true); }}
                        className="p-3 bg-red-50 text-red-600 rounded-2xl hover:bg-red-600 hover:text-white transition-all shadow-sm"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[40px] w-full max-w-lg p-10 shadow-2xl animate-in zoom-in duration-300 border-t-[12px] border-blue-600 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-bl-[100px] pointer-events-none"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-black text-slate-900 mb-8 uppercase tracking-tight flex items-center gap-3">
                <div className="p-2 bg-blue-600 text-white rounded-xl">
                   {editingItem ? <Edit2 size={20} /> : <Plus size={20} />}
                </div>
                {editingItem ? 'Edit Data Produk' : 'Input Produk Baru'}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">ID Katalog</label>
                    <input name="idBarang" defaultValue={editingItem?.IDBarang} required readOnly={!!editingItem} className={`w-full px-5 py-4 border-2 border-slate-50 rounded-2xl focus:border-blue-600 focus:bg-white outline-none transition-all font-bold text-slate-700 ${editingItem ? 'bg-slate-100 cursor-not-allowed' : 'bg-slate-50'}`} placeholder="Contoh: 1" />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Kategori</label>
                    <input name="kategori" defaultValue={editingItem?.Kategori} required className="w-full px-5 py-4 border-2 border-slate-50 rounded-2xl focus:border-blue-600 focus:bg-white outline-none transition-all font-bold text-slate-700 bg-slate-50" placeholder="Kertas/Alat Tulis" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Nama Lengkap Produk</label>
                  <input name="namaBarang" defaultValue={editingItem?.NamaBarang} required className="w-full px-5 py-4 border-2 border-slate-50 rounded-2xl focus:border-blue-600 focus:bg-white outline-none transition-all font-bold text-slate-700 bg-slate-50" placeholder="Masukkan nama barang..." />
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Stok Awal</label>
                    <input type="number" name="stokSaatIni" defaultValue={editingItem?.StokSaatIni || 0} required className="w-full px-5 py-4 border-2 border-slate-50 rounded-2xl focus:border-blue-600 focus:bg-white outline-none transition-all font-bold text-slate-700 bg-slate-50" />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Minimum</label>
                    <input type="number" name="minimumStok" defaultValue={editingItem?.MinimumStok || 0} required className="w-full px-5 py-4 border-2 border-slate-50 rounded-2xl focus:border-blue-600 focus:bg-white outline-none transition-all font-bold text-slate-700 bg-slate-50" />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Satuan</label>
                    <input name="satuan" defaultValue={editingItem?.Satuan} required className="w-full px-5 py-4 border-2 border-slate-50 rounded-2xl focus:border-blue-600 focus:bg-white outline-none transition-all font-bold text-slate-700 bg-slate-50" placeholder="Pcs/Rim" />
                  </div>
                </div>
                <div className="flex gap-4 pt-6">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-4 border-2 border-slate-100 rounded-2xl text-slate-400 font-black uppercase text-xs hover:bg-slate-50 transition-colors">Batal</button>
                  <button type="submit" disabled={isLoading} className="flex-[2] px-4 py-4 bg-gradient-to-r from-blue-600 to-red-600 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:brightness-110 active:scale-[0.98] transition-all shadow-xl flex items-center justify-center gap-3">
                    {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Box size={18} />}
                    {editingItem ? 'Simpan Perubahan' : 'Tambahkan Barang'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <ConfirmationModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleConfirmDelete} isLoading={isLoading} title="Hapus Dari Katalog?" message={`Barang "${deletingItem?.NamaBarang}" akan dihapus permanen.`} />
    </div>
  );
};

const TransaksiStok = ({ master, onRefresh }: { master: MasterBarang[], onRefresh: () => void }) => {
  const [isLoading, setIsLoading] = useState(false);

  // Mengurutkan master barang untuk dropdown
  const sortedMaster = useMemo(() => {
    return [...master].sort(numericSort);
  }, [master]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const idBarang = formData.get('idBarang');
    const item = master.find(m => m.IDBarang.toString() === idBarang?.toString());
    const payload = {
      idTransaksi: `T${Date.now()}`,
      idBarang: idBarang,
      namaBarang: item?.NamaBarang || '',
      tipe: formData.get('tipe'),
      jumlah: Number(formData.get('jumlah')),
      catatan: formData.get('catatan'),
    };
    await sheetService.addLog(payload);
    setIsLoading(false);
    (e.target as HTMLFormElement).reset();
    alert('Transaksi Berhasil!');
    onRefresh();
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Mutasi Persediaan</h2>
        <p className="text-slate-500 font-medium">Input pergerakan barang masuk dan keluar.</p>
      </div>
      <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 border-t-8 border-red-600">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase mb-2.5 ml-1">Pilih Produk</label>
            <select name="idBarang" required className="w-full p-4 border-2 border-slate-100 rounded-2xl bg-slate-50 outline-none focus:border-blue-500 transition-all font-bold text-slate-700 appearance-none">
              <option value="">-- Cari Nama Barang --</option>
              {sortedMaster.map(item => <option key={item.IDBarang} value={item.IDBarang}>#{item.IDBarang} - {item.NamaBarang} (Stok: {item.StokSaatIni} {item.Satuan})</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase mb-2.5 ml-1">Tipe Mutasi</label>
              <div className="grid grid-cols-2 gap-3">
                <label className="relative flex items-center justify-center p-4 border-2 border-slate-100 rounded-2xl cursor-pointer has-[:checked]:bg-blue-600 has-[:checked]:border-blue-600 has-[:checked]:text-white hover:bg-slate-100 transition-all">
                  <input type="radio" name="tipe" value="Masuk" required className="sr-only" />
                  <span className="font-black uppercase text-xs">Masuk</span>
                </label>
                <label className="relative flex items-center justify-center p-4 border-2 border-slate-100 rounded-2xl cursor-pointer has-[:checked]:bg-red-600 has-[:checked]:border-red-600 has-[:checked]:text-white hover:bg-slate-100 transition-all">
                  <input type="radio" name="tipe" value="Keluar" required className="sr-only" />
                  <span className="font-black uppercase text-xs">Keluar</span>
                </label>
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase mb-2.5 ml-1">Qty</label>
              <input type="number" name="jumlah" min="1" required className="w-full p-4 border-2 border-slate-100 rounded-2xl bg-slate-50 outline-none focus:border-blue-500 transition-all font-bold text-slate-700" placeholder="0" />
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase mb-2.5 ml-1">Keterangan / PIC</label>
            <textarea name="catatan" rows={3} className="w-full p-4 border-2 border-slate-100 rounded-2xl bg-slate-50 outline-none focus:border-blue-500 transition-all font-bold text-slate-700" placeholder="Tujuan atau asal barang..."></textarea>
          </div>
          <button type="submit" disabled={isLoading} className="w-full bg-slate-950 text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-red-700 transition-all disabled:opacity-50 flex items-center justify-center gap-3">
            {isLoading ? <Loader2 className="animate-spin" size={24} /> : <ArrowLeftRight size={24} />}
            Validasi & Simpan
          </button>
        </form>
      </div>
    </div>
  );
};

const RiwayatTransaksi = ({ logs }: { logs: LogTransaksi[] }) => {
  const [filterStart, setFilterStart] = useState('');
  const [filterEnd, setFilterEnd] = useState('');
  const filteredLogs = useMemo(() => {
    let result = [...logs].reverse();
    if (filterStart) {
      const start = new Date(filterStart);
      start.setHours(0, 0, 0, 0);
      result = result.filter(log => new Date(log.Waktu) >= start);
    }
    if (filterEnd) {
      const end = new Date(filterEnd);
      end.setHours(23, 59, 59, 999);
      result = result.filter(log => new Date(log.Waktu) <= end);
    }
    return result;
  }, [logs, filterStart, filterEnd]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Jurnal Transaksi</h2>
          <p className="text-slate-500 font-medium">Arsip digital mutasi stok barang.</p>
        </div>
        <div className="flex flex-wrap items-end gap-3 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <input type="date" value={filterStart} onChange={(e) => setFilterStart(e.target.value)} className="px-4 py-2 border-2 border-slate-50 rounded-xl text-sm font-bold bg-slate-50 focus:border-blue-500 outline-none" />
          <input type="date" value={filterEnd} onChange={(e) => setFilterEnd(e.target.value)} className="px-4 py-2 border-2 border-slate-50 rounded-xl text-sm font-bold bg-slate-50 focus:border-blue-500 outline-none" />
          <button onClick={() => { setFilterStart(''); setFilterEnd(''); }} className="flex items-center gap-2 px-5 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-xs font-black uppercase"><RotateCcw size={14} /> Reset</button>
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Waktu</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Produk</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Aliran</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Qty</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Catatan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredLogs.map((log, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-xs font-bold text-slate-400 whitespace-nowrap uppercase">{new Date(log.Waktu).toLocaleString('id-ID')}</td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-black text-slate-900">{log.NamaBarang}</p>
                    <p className="text-[10px] font-bold text-slate-400">REF: {log.IDTransaksi}</p>
                  </td>
                  <td className="px-6 py-4"><span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase ${log.Tipe === 'Masuk' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}>{log.Tipe}</span></td>
                  <td className={`px-6 py-4 text-sm font-black text-center ${log.Tipe === 'Masuk' ? 'text-blue-600' : 'text-red-600'}`}>{log.Jumlah}</td>
                  <td className="px-6 py-4 text-xs font-bold text-slate-500 max-w-xs truncate italic">"{log.Catatan}"</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [masterData, setMasterData] = useState<MasterBarang[]>([]);
  const [logData, setLogData] = useState<LogTransaksi[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authStatus = localStorage.getItem('atk_master_auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      fetchData();
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    const data = await sheetService.getData();
    setMasterData(data.master || []);
    setLogData(data.logs || []);
    setIsLoading(false);
  };

  const handleLogin = () => {
    localStorage.setItem('atk_master_auth', 'true');
    setIsAuthenticated(true);
    fetchData();
  };

  const handleLogout = () => {
    localStorage.removeItem('atk_master_auth');
    setIsAuthenticated(false);
    setIsLogoutModalOpen(false);
  };

  if (isAuthenticated === null) return <div className="min-h-screen flex items-center justify-center"><Loader2 size={40} className="text-blue-600 animate-spin" /></div>;
  if (!isAuthenticated) return <LoginPage onLogin={handleLogin} />;

  return (
    <Router>
      <div className="min-h-screen flex flex-col lg:flex-row bg-slate-50 text-slate-900">
        <Sidebar isOpen={isSidebarOpen} toggle={() => setIsSidebarOpen(!isSidebarOpen)} onLogoutClick={() => setIsLogoutModalOpen(true)} />
        <main className="flex-1 lg:ml-64 transition-all">
          <nav className="h-20 flex items-center justify-between px-8 bg-white/80 backdrop-blur-md border-b sticky top-0 z-10">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden text-slate-500 p-2"><Menu size={24} /></button>
            <div className="flex items-center gap-6">
              <button onClick={fetchData} className="p-3 text-slate-400 hover:text-blue-600 transition-all"><Loader2 className={`${isLoading ? 'animate-spin' : ''}`} size={22} /></button>
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 to-red-600 p-[2px]"><div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center font-black">AD</div></div>
            </div>
          </nav>
          <div className="p-6 md:p-10 max-w-7xl mx-auto">
            {isLoading && masterData.length === 0 ? <div className="flex flex-col items-center justify-center h-[60vh]"><Loader2 size={40} className="text-blue-600 animate-spin" /><p className="mt-4 font-black uppercase text-xs">Loading...</p></div> : (
              <Routes>
                <Route path="/" element={<Dashboard master={masterData} logs={logData} />} />
                <Route path="/master" element={<MasterStok data={masterData} onRefresh={fetchData} />} />
                <Route path="/transaksi" element={<TransaksiStok master={masterData} onRefresh={fetchData} />} />
                <Route path="/logs" element={<RiwayatTransaksi logs={logData} />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            )}
          </div>
        </main>
        <ConfirmationModal isOpen={isLogoutModalOpen} onClose={() => setIsLogoutModalOpen(false)} onConfirm={handleLogout} title="Keluar Akun" confirmText="Keluar" message="Yakin ingin keluar?" />
      </div>
    </Router>
  );
};

export default App;
