import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AddPetDrawer = () => {
  const { setActiveDrawer, addPet, clients } = useApp();

  const [name, setName] = useState('');
  const [ageValue, setAgeValue] = useState(1);
  const [ageUnit, setAgeUnit] = useState('years');
  const [species, setSpecies] = useState('cat');
  const [gender, setGender] = useState('male');
  const [vaccinated, setVaccinated] = useState(true);
  const [deworming, setDeworming] = useState(false);
  const [antiflea, setAntiflea] = useState(false);
  const [castrated, setCastrated] = useState(false);
  const [breed, setBreed] = useState('');
  const [temperament, setTemperament] = useState('Calm');
  const [selectedOwner, setSelectedOwner] = useState(clients[0]?.id || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return alert('Please enter pet name.');
    addPet({
      name,
      ageValue,
      ageUnit,
      species,
      gender,
      vaccinated,
      deworming,
      antiflea,
      castrated,
      breed,
      temperament,
      nutrition: ['Dry food'],
      owners: selectedOwner ? [selectedOwner] : []
    });
    setActiveDrawer(null);
  };

  return (
    <div className="drawer-backdrop" onClick={() => setActiveDrawer(null)}>
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <div>
            <h3>Add pet</h3>
            <p>Manage pet profile, health details, and owner assignments.</p>
          </div>
          <button className="icon-btn" onClick={() => setActiveDrawer(null)}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="drawer-body">
          <div className="form-group">
            <label>Pet name *</label>
            <input 
              type="text" 
              className="form-control"
              placeholder="Pet name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Age *</label>
              <div className="flex gap-xs">
                <input 
                  type="number" 
                  className="form-control"
                  value={ageValue}
                  onChange={(e) => setAgeValue(e.target.value)}
                />
                <select 
                  className="form-control"
                  value={ageUnit}
                  onChange={(e) => setAgeUnit(e.target.value)}
                >
                  <option value="years">years</option>
                  <option value="months">months</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Species *</label>
              <select 
                className="form-control"
                value={species}
                onChange={(e) => setSpecies(e.target.value)}
              >
                <option value="cat">cat</option>
                <option value="dog">dog</option>
                <option value="turtle">turtle</option>
                <option value="bird">bird</option>
                <option value="other">other</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Gender</label>
              <select 
                className="form-control"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="male">male</option>
                <option value="female">female</option>
              </select>
            </div>
            <div className="form-group">
              <label>Vaccinated</label>
              <select 
                className="form-control"
                value={vaccinated ? 'yes' : 'no'}
                onChange={(e) => setVaccinated(e.target.value === 'yes')}
              >
                <option value="yes">yes</option>
                <option value="no">no</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Deworming</label>
              <select 
                className="form-control"
                value={deworming ? 'yes' : 'no'}
                onChange={(e) => setDeworming(e.target.value === 'yes')}
              >
                <option value="no">no</option>
                <option value="yes">yes</option>
              </select>
            </div>
            <div className="form-group">
              <label>Antiflea</label>
              <select 
                className="form-control"
                value={antiflea ? 'yes' : 'no'}
                onChange={(e) => setAntiflea(e.target.value === 'yes')}
              >
                <option value="no">no</option>
                <option value="yes">yes</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Breed (optional)</label>
            <input 
              type="text" 
              className="form-control"
              placeholder="Breed"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Owners</label>
            <select 
              className="form-control"
              value={selectedOwner}
              onChange={(e) => setSelectedOwner(e.target.value)}
            >
              <option value="">Select owner</option>
              {clients.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="drawer-footer margin-top-auto">
            <button type="button" className="btn-secondary" onClick={() => setActiveDrawer(null)}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Create pet
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .gap-xs { gap: 6px; }
      `}</style>
    </div>
  );
};
