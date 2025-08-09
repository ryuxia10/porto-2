// src/games/MySqlGame.jsx

import { useState } from 'react';
import './MySqlGame.css';
import BrewButton from './BrewButton';

// --- DATA PALSU (Seolah-olah dari Database) ---
const ramuanTable = [
  { id: 1, nama_ramuan: 'Ramuan Api Abadi', efek: 'Tahan Panas', elemen_id: 1 },
  { id: 2, nama_ramuan: 'Eliksir Napas Naga', efek: 'Menyemburkan Api', elemen_id: 1 },
  { id: 3, nama_ramuan: 'Tetesan Embun Peri', efek: 'Penyembuhan Ringan', elemen_id: 2 },
  { id: 4, nama_ramuan: 'Bolas Salju Cair', efek: 'Membekukan Target', elemen_id: 2 },
  { id: 5, nama_ramuan: 'Tonik Kekuatan Golem', efek: 'Kekuatan Fisik', elemen_id: 3 },
];

const elemenTable = [
  { id: 1, nama_elemen: 'Api' },
  { id: 2, nama_elemen: 'Air' },
  { id: 3, nama_elemen: 'Tanah' },
];


const MySqlGame = () => {
  // --- STATE MANAGEMENT (Otak dari Game) ---
  const [selectedColumns, setSelectedColumns] = useState(new Set());
  const [whereClause, setWhereClause] = useState('*');
  const [generatedQuery, setGeneratedQuery] = useState('-- Klik "RACIK" untuk melihat mantra --');
  const [resultData, setResultData] = useState('-- Hasil akan muncul di sini --');

  // --- FUNGSI HANDLER (Tangan yang Bekerja) ---
  const handleColumnChange = (column) => {
    const newSelectedColumns = new Set(selectedColumns);
    if (newSelectedColumns.has(column)) {
      newSelectedColumns.delete(column);
    } else {
      newSelectedColumns.add(column);
    }
    setSelectedColumns(newSelectedColumns);
  };

  const handleFilterChange = (event) => {
    setWhereClause(event.target.value);
  };
  
  // =======================================================
  // --- LOGIKA UTAMA (Sihir di dalam Tombol "RACIK") ---
  // =======================================================
  const handleBrewClick = () => {
    // --- BAGIAN 1: MEMBUAT STRING QUERY (Mantra SQL) ---
    const columnsToSelect = selectedColumns.size > 0 ? Array.from(selectedColumns).join(', ') : '*';
    let query = `SELECT ${columnsToSelect}\nFROM Ramuan`;
    
    if (whereClause !== '*') {
      const elemen = elemenTable.find(e => e.id == whereClause);
      query += `\nWHERE elemen_id = ${whereClause}; -- (${elemen.nama_elemen})`;
    } else {
      query += ';';
    }
    setGeneratedQuery(query);

    // --- BAGIAN 2: MEMFILTER DATA (Sihir Ekstraksi) ---
    // 2a. Filter berdasarkan klausa WHERE
    let filteredData = ramuanTable;
    if (whereClause !== '*') {
      filteredData = ramuanTable.filter(ramuan => ramuan.elemen_id == whereClause);
    }

    // 2b. Pilih kolom yang diinginkan (SELECT)
    const finalResult = filteredData.map(item => {
      if (selectedColumns.size === 0) {
        return item; // Jika SELECT *, kembalikan semua data
      }
      // Jika memilih kolom spesifik, buat objek baru hanya dengan kolom tsb
      const selectedItem = {};
      selectedColumns.forEach(column => {
        if (item.hasOwnProperty(column)) {
          selectedItem[column] = item[column];
        }
      });
      return selectedItem;
    });

    // --- BAGIAN 3: MEMPERBARUI TAMPILAN (Menampilkan Hasil) ---
    // Ubah hasil menjadi string JSON yang rapi
    setResultData(JSON.stringify(finalResult, null, 2));
  };


  return (
    <div className="mysql-game-container">
      <div className="game-panel ingredients-panel">
        <h3 className="panel-title">Bahan Baku (Tabel)</h3>
        <div className="table-selection">
          <p className="table-name">🧪 Ramuan</p>
          <div className="columns">
            <label><input type="checkbox" checked={selectedColumns.has('id')} onChange={() => handleColumnChange('id')} /> id</label>
            <label><input type="checkbox" checked={selectedColumns.has('nama_ramuan')} onChange={() => handleColumnChange('nama_ramuan')} /> nama_ramuan</label>
            <label><input type="checkbox" checked={selectedColumns.has('efek')} onChange={() => handleColumnChange('efek')} /> efek</label>
            <label><input type="checkbox" checked={selectedColumns.has('elemen_id')} onChange={() => handleColumnChange('elemen_id')} /> elemen_id</label>
          </div>
        </div>
      </div>

      <div className="game-panel recipe-panel">
        <h3 className="panel-title">Buku Resep (Query)</h3>
        <div className="query-builder">
          <div className="query-line">
            <span className="sql-keyword">SELECT</span>
            <span className="sql-value">{Array.from(selectedColumns).join(', ') || '*'}</span>
          </div>
          <div className="query-line">
            <span className="sql-keyword">FROM</span>
            <span className="sql-value">Ramuan</span>
          </div>
          <div className="query-line">
            <span className="sql-keyword">WHERE</span>
            <select className="sql-filter" value={whereClause} onChange={handleFilterChange}>
              <option value="*">Semua Elemen</option>
              {elemenTable.map(elemen => (
                <option key={elemen.id} value={elemen.id}>{elemen.nama_elemen}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-center mt-4">
            <BrewButton onClick={handleBrewClick} />
        </div>
      </div>

      <div className="game-panel result-panel">
        <h3 className="panel-title">Hasil Ekstraksi</h3>
        <div className="result-box spell-scroll">
          <p className="result-title">📜 Mantra SQL</p>
          <pre className="sql-query-result">{generatedQuery}</pre>
        </div>
        <div className="result-box data-crystal">
          <p className="result-title">💎 Kristal Data (JSON)</p>
          <pre className="json-result">{resultData}</pre>
        </div>
      </div>
    </div>
  );
};

export default MySqlGame;