import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AddVisitDrawer = () => {
  const { setActiveDrawer, addVisit, clients, pets, doctorNames } = useApp();

  const [selectedClient, setSelectedClient] = useState('');
  const [selectedPet, setSelectedPet] = useState('');
  const [doctorName, setDoctorName] = useState(doctorNames[0] || 'Unassigned');

  // Once a client is chosen, only their pets are offered (imported pets may have no owner yet).
  const client = clients.find(c => c.id === selectedClient);
  const clientPets = client ? pets.filter(p => p.owners?.includes(client.id) || client.pets?.includes(p.id)) : [];
  const petOptions = clientPets.length ? clientPets : pets;

  const handleClientChange = (clientId) => {
    setSelectedClient(clientId);
    setSelectedPet('');
  };
  const [visitType, setVisitType] = useState('Check-up');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('08:00 PM');
  const [state, setState] = useState('scheduled');
  const [reason, setReason] = useState('General checkup');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedPet || !date) {
      alert('Please fill out all required fields (Pet and Visit Date).');
      return;
    }
    addVisit({
      clientId: selectedClient,
      petId: selectedPet,
      doctorName,
      visitType,
      date,
      time,
      state,
      reason
    });
    setActiveDrawer(null);
  };

  return (
    <div className="drawer-backdrop" onClick={() => setActiveDrawer(null)}>
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <div>
            <h3>Add Visit</h3>
            <p>Create a new visit and link it to both a client and a pet.</p>
          </div>
          <button className="icon-btn" onClick={() => setActiveDrawer(null)}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="drawer-body">
          <div className="form-group">
            <label>Client</label>
            <select 
              className="form-control"
              value={selectedClient}
              onChange={(e) => handleClientChange(e.target.value)}
            >
              <option value="">Select a client</option>
              {clients.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Pet</label>
            <select 
              className="form-control"
              value={selectedPet}
              onChange={(e) => setSelectedPet(e.target.value)}
              required
            >
              <option value="" disabled>Select a pet</option>
              {petOptions.map(p => (
                <option key={p.id} value={p.id}>{p.name} ({p.species})</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Doctor</label>
            <select 
              className="form-control"
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
            >
              {doctorNames.map(name => (
                <option key={name} value={name}>{name}</option>
              ))}
              <option value="Unassigned">Unassigned</option>
            </select>
          </div>

          <div className="form-group">
            <label>Visit Type</label>
            <select 
              className="form-control"
              value={visitType}
              onChange={(e) => setVisitType(e.target.value)}
            >
              <option value="Check-up">Check-up</option>
              <option value="Vaccination">Vaccination</option>
              <option value="Surgery">Surgery</option>
              <option value="Follow-up">Follow-up</option>
              <option value="Emergency">Emergency</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Visit Date</label>
              <input 
                type="date" 
                className="form-control"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Time (Africa/Cairo)</label>
              <input 
                type="text" 
                className="form-control"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Visit State</label>
            <select 
              className="form-control"
              value={state}
              onChange={(e) => setState(e.target.value)}
            >
              <option value="scheduled">scheduled</option>
              <option value="in-progress">in-progress</option>
              <option value="completed">completed</option>
              <option value="cancelled">cancelled</option>
            </select>
          </div>

          <div className="form-group">
            <label>Visit Reason</label>
            <input 
              type="text" 
              className="form-control"
              placeholder="Reason for visit"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>

          <div className="drawer-footer margin-top-auto">
            <button type="button" className="btn-secondary" onClick={() => setActiveDrawer(null)}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Create Visit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
