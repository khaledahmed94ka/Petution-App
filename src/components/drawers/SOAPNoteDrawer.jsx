import React, { useState } from 'react';
import { X, FileText, Stethoscope, Printer, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { RecordNotFoundDrawer } from './RecordNotFoundDrawer';

// Vitals are only what the vet measured: blank stays blank (saved as null), never a default.
const vitalOrBlank = (value) => (value === null || value === undefined ? '' : value);
const vitalOrNull = (value) => (value === '' || value === null || value === undefined || Number.isNaN(Number(value)) ? null : Number(value));
const showVital = (value, unit) => (value === '' || value === null || value === undefined ? '—' : `${value} ${unit}`);

export const SOAPNoteDrawer = ({ visitId }) => {
  const { setActiveDrawer, visits, pets, clients, soapNotes, saveSOAPNote, settings, user } = useApp();

  const visit = visits.find(v => v.id === visitId);
  const pet = pets.find(p => p.id === visit?.petId);
  const owner = clients.find(c => pet?.owners?.includes(c.id));
  const vetName = visit?.doctorName && visit.doctorName !== 'Unassigned' ? visit.doctorName : (user?.name || '');

  const existingSoap = soapNotes.find(s => s.visitId === visit?.id);

  const [subjective, setSubjective] = useState(existingSoap?.subjective || visit?.reason || '');
  const [tempC, setTempC] = useState(vitalOrBlank(existingSoap?.tempC));
  const [weightKg, setWeightKg] = useState(vitalOrBlank(existingSoap?.weightKg));
  const [heartRateBpm, setHeartRateBpm] = useState(vitalOrBlank(existingSoap?.heartRateBpm));
  const [respiratoryRateBpm, setRespiratoryRateBpm] = useState(vitalOrBlank(existingSoap?.respiratoryRateBpm));
  const [assessment, setAssessment] = useState(existingSoap?.assessment || '');
  const [plan, setPlan] = useState(existingSoap?.plan || '');

  // Nothing is prescribed until the vet adds it.
  const [rxMedications, setRxMedications] = useState(existingSoap?.rxMedications || []);

  const addRxItem = () => {
    setRxMedications(prev => [
      ...prev,
      { name: '', dosage: '', frequency: 'Once daily (SID)', duration: '5 days' }
    ]);
  };

  const removeRxItem = (idx) => {
    setRxMedications(prev => prev.filter((_, i) => i !== idx));
  };

  const updateRxItem = (idx, field, value) => {
    setRxMedications(prev => prev.map((item, i) => i === idx ? { ...item, [field]: value } : item));
  };

  const handleSave = (e) => {
    if (e) e.preventDefault();
    saveSOAPNote({
      id: existingSoap?.id,
      visitId: visit.id,
      petId: pet.id,
      vetName,
      date: visit.date || new Date().toISOString().split('T')[0],
      subjective,
      tempC: vitalOrNull(tempC),
      weightKg: vitalOrNull(weightKg),
      heartRateBpm: vitalOrNull(heartRateBpm),
      respiratoryRateBpm: vitalOrNull(respiratoryRateBpm),
      assessment,
      plan,
      rxMedications: rxMedications.filter(rx => rx.name.trim())
    });
    alert('SOAP Clinical Note & Prescriptions saved successfully!');
    setActiveDrawer(null);
  };

  const handlePrintRx = () => {
    window.print();
  };

  if (!visit || !pet) {
    return (
      <RecordNotFoundDrawer
        title="Visit not found"
        message="This visit or its patient no longer exists, so no clinical note can be opened for it."
      />
    );
  }

  return (
    <div className="drawer-backdrop" onClick={() => setActiveDrawer(null)}>
      <div className="drawer-panel soap-panel" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="drawer-header no-print">
          <div>
            <h3 className="flex items-center gap-xs">
              <Stethoscope size={20} className="text-teal" /> SOAP Medical Record & Rx Prescriptions
            </h3>
            <p>Clinical consultation notes for {pet.name} ({String(pet.species || '').toUpperCase()}).</p>
          </div>
          <div className="flex gap-xs">
            <button className="btn-secondary text-xs flex items-center gap-xs" onClick={handlePrintRx}>
              <Printer size={16} /> Print Prescription (Rx)
            </button>
            <button className="icon-btn" onClick={() => setActiveDrawer(null)}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div className="drawer-body soap-body">
          {/* Printable Prescription Slip Layout */}
          <div className="rx-printable-card">
            <div className="rx-header">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="font-bold text-lg">{settings.orgName || 'Petution Veterinary Center'}</h2>
                  <p className="text-xs text-muted">{settings.address || 'Cairo, Egypt'} • Tel: {settings.phone || '+20 100 000 000'}</p>
                </div>
                <div className="rx-symbol">℞</div>
              </div>
            </div>

            <div className="rx-patient-bar margin-top-sm margin-bottom-md">
              <div className="flex justify-between text-xs">
                <span><strong>Patient:</strong> {pet.name} ({pet.species} • {pet.breed || 'Cross'})</span>
                <span><strong>Owner:</strong> {owner ? owner.name : 'Unassigned'}</span>
                <span><strong>Date:</strong> {visit.date}</span>
              </div>
              <div className="flex justify-between text-xs margin-top-xs">
                <span><strong>Weight:</strong> {showVital(weightKg, 'kg')}</span>
                <span><strong>Temp:</strong> {showVital(tempC, '°C')}</span>
                <span><strong>Vet:</strong> {vetName || '—'}</span>
              </div>
            </div>

            {/* Form Editor */}
            <form onSubmit={handleSave} className="soap-form">
              {/* S - Subjective */}
              <div className="form-group">
                <label className="font-bold text-teal text-xs">S — SUBJECTIVE (Client Complaint & History)</label>
                <textarea 
                  className="form-control"
                  rows="2"
                  placeholder="Primary complaint, duration of symptoms, appetite, energy..."
                  value={subjective}
                  onChange={(e) => setSubjective(e.target.value)}
                />
              </div>

              {/* O - Objective Vitals */}
              <div className="form-group">
                <label className="font-bold text-teal text-xs">O — OBJECTIVE (Vitals & Physical Exam)</label>
                <div className="vitals-grid">
                  <div>
                    <span className="text-xs text-muted">Temp (°C)</span>
                    <input 
                      type="number" 
                      step="0.1" 
                      className="form-control font-bold"
                      placeholder="—"
                      value={tempC}
                      onChange={(e) => setTempC(e.target.value)}
                    />
                  </div>
                  <div>
                    <span className="text-xs text-muted">Weight (kg)</span>
                    <input 
                      type="number" 
                      step="0.1" 
                      className="form-control font-bold"
                      placeholder="—"
                      value={weightKg}
                      onChange={(e) => setWeightKg(e.target.value)}
                    />
                  </div>
                  <div>
                    <span className="text-xs text-muted">Heart Rate (bpm)</span>
                    <input 
                      type="number" 
                      className="form-control"
                      placeholder="—"
                      value={heartRateBpm}
                      onChange={(e) => setHeartRateBpm(e.target.value)}
                    />
                  </div>
                  <div>
                    <span className="text-xs text-muted">Resp Rate (rpm)</span>
                    <input 
                      type="number" 
                      className="form-control"
                      placeholder="—"
                      value={respiratoryRateBpm}
                      onChange={(e) => setRespiratoryRateBpm(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* A - Assessment */}
              <div className="form-group">
                <label className="font-bold text-teal text-xs">A — ASSESSMENT (Diagnosis & Findings)</label>
                <textarea 
                  className="form-control"
                  rows="2"
                  placeholder="Primary diagnosis, tentative diagnosis, differential findings..."
                  value={assessment}
                  onChange={(e) => setAssessment(e.target.value)}
                />
              </div>

              {/* P - Plan & Prescriptions */}
              <div className="form-group">
                <div className="flex justify-between items-center margin-bottom-xs">
                  <label className="font-bold text-teal text-xs">P — PLAN & PRESCRIPTION MEDICATIONS (Rx)</label>
                  <button 
                    type="button" 
                    className="btn-secondary text-xs no-print"
                    onClick={addRxItem}
                  >
                    <Plus size={14} /> Add Medication
                  </button>
                </div>

                <div className="rx-items-stack">
                  {rxMedications.length === 0 && (
                    <p className="text-xs text-muted">No medications prescribed. Use "Add Medication" to prescribe.</p>
                  )}
                  {rxMedications.map((rx, idx) => (
                    <div key={idx} className="rx-item-row card">
                      <div className="form-row">
                        <div className="form-group flex-2">
                          <label className="text-xs">Medication Name</label>
                          <input 
                            type="text" 
                            className="form-control text-xs font-bold"
                            placeholder="e.g. Amoxicillin Drops"
                            value={rx.name}
                            onChange={(e) => updateRxItem(idx, 'name', e.target.value)}
                          />
                        </div>
                        <div className="form-group flex-1">
                          <label className="text-xs">Dosage</label>
                          <input 
                            type="text" 
                            className="form-control text-xs"
                            placeholder="e.g. 0.5 ml"
                            value={rx.dosage}
                            onChange={(e) => updateRxItem(idx, 'dosage', e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="form-row margin-top-xs">
                        <div className="form-group flex-1">
                          <label className="text-xs">Frequency</label>
                          <select 
                            className="form-control text-xs"
                            value={rx.frequency}
                            onChange={(e) => updateRxItem(idx, 'frequency', e.target.value)}
                          >
                            <option value="Once daily (SID)">Once daily (SID)</option>
                            <option value="Twice daily (BID)">Twice daily (BID)</option>
                            <option value="Three times daily (TID)">Three times daily (TID)</option>
                            <option value="Every 8 hours">Every 8 hours</option>
                            <option value="As needed (PRN)">As needed (PRN)</option>
                          </select>
                        </div>
                        <div className="form-group flex-1">
                          <label className="text-xs">Duration</label>
                          <input 
                            type="text" 
                            className="form-control text-xs"
                            placeholder="e.g. 7 days"
                            value={rx.duration}
                            onChange={(e) => updateRxItem(idx, 'duration', e.target.value)}
                          />
                        </div>
                        <div className="form-group flex-0 no-print" style={{ justifyContent: 'flex-end', paddingTop: '22px' }}>
                          <button 
                            type="button" 
                            className="icon-btn text-rose"
                            onClick={() => removeRxItem(idx)}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="form-group margin-top-sm">
                  <label className="text-xs text-muted">Additional Treatment Plan & Advice</label>
                  <textarea 
                    className="form-control"
                    rows="2"
                    placeholder="Dietary instructions, follow-up recommendations..."
                    value={plan}
                    onChange={(e) => setPlan(e.target.value)}
                  />
                </div>
              </div>

              {/* Doctor Signature Block */}
              <div className="rx-footer-sig margin-top-lg">
                <div className="text-right">
                  <div className="sig-line-doctor">{vetName || '\u00a0'}</div>
                  <span className="text-xs text-muted">Veterinary Surgeon Signature</span>
                </div>
              </div>

              {/* Drawer Actions */}
              <div className="drawer-footer margin-top-lg no-print">
                <button type="button" className="btn-secondary" onClick={() => setActiveDrawer(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save SOAP Record & Rx
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .soap-panel { max-width: 760px; }
        .rx-printable-card {
          background: #ffffff;
          border: 1px solid var(--border-card);
          border-radius: var(--radius-md);
          padding: 20px;
        }
        .rx-header {
          border-bottom: 2px solid var(--primary-teal);
          padding-bottom: 12px;
        }
        .rx-symbol {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--primary-teal);
          font-family: serif;
        }
        .rx-patient-bar {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          padding: 10px 14px;
          border-radius: var(--radius-sm);
        }
        .vitals-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
        }
        .rx-items-stack {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .rx-item-row {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          padding: 12px;
        }
        .flex-2 { flex: 2; }
        .flex-1 { flex: 1; }
        .flex-0 { flex: 0; }
        .sig-line-doctor {
          font-weight: 700;
          font-size: 0.9rem;
          border-top: 1px solid #000;
          padding-top: 4px;
          display: inline-block;
          min-width: 200px;
        }
        @media print {
          .no-print { display: none !important; }
          .drawer-backdrop { background: none; position: static; }
          .drawer-panel { max-width: 100%; box-shadow: none; border: none; }
          body { background: #ffffff; }
        }
      `}</style>
    </div>
  );
};
