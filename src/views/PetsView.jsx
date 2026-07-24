import React, { useState } from 'react';
import { Search, Plus, Download, Upload } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { exportToCSV } from '../utils/dataExportImport';

export const PetsView = () => {
  const { pets, clients, setActiveDrawer } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState('All');

  const speciesOptions = ['All', 'Cat', 'Dog', 'Turtle', 'Bird', 'Other'];

  const filteredPets = pets.filter(pet => {
    const matchesSearch = pet.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecies = selectedSpecies === 'All' || pet.species.toLowerCase() === selectedSpecies.toLowerCase();
    return matchesSearch && matchesSpecies;
  });

  const handleExport = () => {
    const exportData = pets.map(p => {
      const owner = clients.find(c => p.owners?.includes(c.id));
      return {
        PetName: p.name,
        Species: p.species,
        Breed: p.breed,
        Age: `${p.ageValue} ${p.ageUnit}`,
        Vaccinated: p.vaccinated ? 'Yes' : 'No',
        OwnerName: owner ? owner.name : 'Unassigned',
        CreatedDate: p.createdAt
      };
    });
    exportToCSV(exportData, 'petution_pets_export.csv');
  };

  return (
    <div className="pets-page">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h2>Pets</h2>
          <p className="text-muted">Manage pets and owner assignments across the clinic.</p>
        </div>
        <div className="flex gap-sm">
          <button className="btn-secondary" onClick={handleExport} title="Export Pets CSV">
            <Download size={16} /> Export CSV
          </button>
          <button className="btn-secondary" onClick={() => setActiveDrawer('importPets')} title="Import Pets CSV">
            <Upload size={16} /> Import CSV
          </button>
          <button className="btn-primary" onClick={() => setActiveDrawer('addPet')}>
            <Plus size={18} />
            Add Pet
          </button>
        </div>
      </div>

      {/* Summary Metric Cards */}
      <div className="metrics-grid-4">
        <div className="card">
          <span className="card-title">Total Pets</span>
          <div className="card-value">{pets.length}</div>
          <span className="text-muted text-xs">Current filtered pets</span>
        </div>
        <div className="card">
          <span className="card-title">New Pets This Month</span>
          <div className="card-value">{pets.length}</div>
          <span className="text-muted text-xs">Created during this month</span>
        </div>
        <div className="card">
          <span className="card-title">New Pets Today</span>
          <div className="card-value">0</div>
          <span className="text-muted text-xs">Created today</span>
        </div>
      </div>

      {/* Table & Controls */}
      <div className="table-container">
        <div className="table-controls-stack">
          <div className="controls-row">
            <div className="search-input-wrapper">
              <Search size={16} className="search-icon" />
              <input 
                type="text" 
                placeholder="Search by pet name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Species Chips */}
          <div className="chip-group margin-top-sm">
            {speciesOptions.map(species => (
              <button
                key={species}
                className={`chip ${selectedSpecies === species ? 'active' : ''}`}
                onClick={() => setSelectedSpecies(species)}
              >
                {species}
              </button>
            ))}
          </div>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Owner Name</th>
              <th>Type (Species)</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPets.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty-state">
                  No pets found. Try changing filters or search.
                </td>
              </tr>
            ) : (
              filteredPets.map(pet => {
                const owner = clients.find(c => pet.owners?.includes(c.id));
                return (
                  <tr key={pet.id}>
                    <td className="font-semibold">{pet.name}</td>
                    <td>{owner ? owner.name : <span className="text-muted">Unassigned</span>}</td>
                    <td>
                      <span className="badge badge-teal">{pet.species.toUpperCase()}</span>
                      {pet.breed && <span className="text-muted text-xs margin-left-xs">({pet.breed})</span>}
                    </td>
                    <td className="text-muted">{pet.createdAt}</td>
                    <td>
                      <button 
                        className="btn-secondary text-xs"
                        onClick={() => alert(`Pet Health Card: ${pet.name}\nSpecies: ${pet.species.toUpperCase()}\nBreed: ${pet.breed || 'N/A'}\nAge: ${pet.ageValue} ${pet.ageUnit}\nVaccinated: ${pet.vaccinated ? 'Yes' : 'No'}\nDeworming: ${pet.deworming ? 'Yes' : 'No'}\nAntiflea: ${pet.antiflea ? 'Yes' : 'No'}`)}
                      >
                        View Health Card
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <style>{`
        .margin-left-xs { margin-left: 6px; }
      `}</style>
    </div>
  );
};
