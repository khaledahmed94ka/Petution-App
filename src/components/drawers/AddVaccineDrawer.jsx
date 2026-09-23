import React, { useState } from 'react';
import { X, Syringe } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AddVaccineDrawer = ({ petId }) => {
  const { setActiveDrawer, setActiveModalItem, pets, addVaccine, user } = useApp();

  // Opened from a pet's passport: record the dose for that pet, never a default one.
  const [selectedPetId, setSelectedPetId] = useState(pets.some(p => p.id === petId) ? petId : '');
  const [vaccineName, setVaccineName] = useState('Tricat Trio (FVRCP)');
  const [otherVaccineName, setOtherVaccineName] = useState('');
  const [manufacturer, setManufacturer] = useState('Zoetis');
  const [batchNumber, setBatchNumber] = useState('');
  const [administeredDate, setAdministeredDate] = useState(new Date().toISOString().split('T')[0]);

  // Default due date: 1 year from today
  const nextYearDate = new Date();
  nextYearDate.setFullYear(nextYearDate.getFullYear() + 1);
  const [dueDate, setDueDate] = useState(nextYearDate.toISOString().split('T')[0]);

  const [vetName, setVetName] = useState(user?.name || '');
  const [notes, setNotes] = useState('');

  const commonVaccines = [
    'Tricat Trio (FVRCP)',
    'Rabies Vaccine (Rabisin)',
    'Vanguard 7 (DHPP + L4)',
    'Nobivac DHPPi',
    'Nobivac KC (Kennel Cough)',
    'Fel-O-Vax PCT',
    'Deworming Tablet (Drontal)',
    'Other'
  ];

  const backToPassport = (id = petId) => {
    setActiveModalItem(id);
    setActiveDrawer('petPassport');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalName = vaccineName === 'Other' ? otherVaccineName.trim() : vaccineName;
    if (!selectedPetId || !finalName) {
      return alert('Please select a pet and enter the vaccine name.');
    }

    addVaccine({
      petId: selectedPetId,
      vaccineName: finalName,
      manufacturer,
      batchNumber,
      administeredDate,
      dueDate,
      vetName,
      notes
    });

    backToPassport(selectedPetId);
  };

  return (
    <div className="drawer-backdrop" onClick={() => backToPassport()}>
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <div>
            <h3 className="flex items-center gap-xs">
              <Syringe size={20} className="text-teal" /> Record Vaccine Shot
            </h3>
            <p>Log dose administration, manufacturer batch #, and next due date.</p>
          </div>
          <button className="icon-btn" onClick={() => backToPassport()}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="drawer-body">
          <div className="form-group">
            <label>Select Patient / Pet *</label>
            <select 
              className="form-control"
              value={selectedPetId}
              onChange={(e) => setSelectedPetId(e.target.value)}
              required
            >
              <option value="" disabled>Select a pet</option>
              {pets.map(p => (
                <option key={p.id} value={p.id}>{p.name} ({String(p.species || '').toUpperCase()} • {p.breed || 'Cross'})</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Vaccine Name *</label>
            <select 
              className="form-control"
              value={vaccineName}
              onChange={(e) => setVaccineName(e.target.value)}
            >
              {commonVaccines.map(vac => (
                <option key={vac} value={vac}>{vac}</option>
              ))}
            </select>
            {vaccineName === 'Other' && (
              <input
                type="text"
                className="form-control margin-top-xs"
                placeholder="Vaccine name"
                value={otherVaccineName}
                onChange={(e) => setOtherVaccineName(e.target.value)}
                required
              />
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Manufacturer</label>
              <input 
                type="text" 
                className="form-control"
                placeholder="e.g. Zoetis, Boehringer"
                value={manufacturer}
                onChange={(e) => setManufacturer(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Batch / Serial #</label>
              <input 
                type="text" 
                className="form-control font-mono"
                placeholder="e.g. ZT-99210"
                value={batchNumber}
                onChange={(e) => setBatchNumber(e.target.value)}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Date Administered *</label>
              <input 
                type="date" 
                className="form-control"
                value={administeredDate}
                onChange={(e) => setAdministeredDate(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Next Due Date (Booster) *</label>
              <input 
                type="date" 
                className="form-control"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Administering Vet</label>
            <input 
              type="text" 
              className="form-control"
              value={vetName}
              onChange={(e) => setVetName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Clinical Notes / Observation</label>
            <textarea 
              className="form-control"
              rows="2"
              placeholder="Observation after injection, booster notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div className="drawer-footer margin-top-auto">
            <button type="button" className="btn-secondary" onClick={() => backToPassport()}>
              Back to Passport
            </button>
            <button type="submit" className="btn-primary">
              Log Vaccine Dose
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .font-mono { font-family: monospace; }
      `}</style>
    </div>
  );
};
