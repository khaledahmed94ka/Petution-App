import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';

// Builds the receipt with text nodes so names from records or imports can't inject HTML/script.
const printReceipt = (invoice, petName, clinicName) => {
  const receiptWindow = window.open('', '_blank');
  if (!receiptWindow) {
    alert('Allow pop-ups for this site to print receipts.');
    return;
  }
  const doc = receiptWindow.document;
  doc.title = `Receipt - ${clinicName}`;
  doc.body.style.cssText = 'font-family: sans-serif; padding: 30px;';
  const add = (tag, text) => {
    const el = doc.createElement(tag);
    el.textContent = text;
    doc.body.appendChild(el);
    return el;
  };
  add('h2', `${clinicName} Receipt`);
  add('p', `Invoice ID: ${invoice.id}`);
  add('p', `Pet: ${petName}`);
  add('h3', `Total Amount: ${invoice.totalAmount} EGP`);
  add('p', `Status: ${String(invoice.status || '').toUpperCase()}`);
  add('button', 'Print').addEventListener('click', () => receiptWindow.print());
};

export const InvoicesView = () => {
  const { invoices, pets, settings, setActiveDrawer } = useApp();
  const [statusFilter, setStatusFilter] = useState('all');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const filteredInvoices = invoices.filter(i => {
    if (statusFilter !== 'all' && i.status !== statusFilter) return false;
    if (fromDate && i.createdAt < fromDate) return false;
    if (toDate && i.createdAt > toDate) return false;
    return true;
  });

  return (
    <div className="invoices-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <h2>Invoices</h2>
          <p className="text-muted">Manage billing and invoice states for clinic: petution.</p>
        </div>
        <div className="flex gap-sm">
          <button className="btn-primary" onClick={() => setActiveDrawer('addInvoice')}>
            <Plus size={18} />
            Add Invoice
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="table-container">
        <div className="filter-bar">
          <div className="form-group">
            <label>Filter by state</label>
            <select 
              className="form-control"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">all</option>
              <option value="pending">pending</option>
              <option value="paid">paid</option>
              <option value="cancelled">cancelled</option>
            </select>
          </div>

          <div className="form-group">
            <label>From date</label>
            <input 
              type="date" 
              className="form-control" 
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>To date</label>
            <input 
              type="date" 
              className="form-control" 
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>

          <button className="btn-secondary self-end" onClick={() => { setStatusFilter('all'); setFromDate(''); setToDate(''); }}>
            Clear filters
          </button>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Pet Name</th>
              <th>Amount</th>
              <th>Creation Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty-state">
                  No invoices found. Create invoices from visits to start billing.
                </td>
              </tr>
            ) : (
              filteredInvoices.map(inv => {
                const pet = pets.find(p => p.id === inv.petId);
                return (
                  <tr key={inv.id}>
                    <td className="font-semibold">{pet ? pet.name : 'General Client'}</td>
                    <td className="font-bold">{inv.totalAmount} EGP</td>
                    <td className="text-muted">{inv.createdAt}</td>
                    <td>
                      <span className={`badge ${
                        inv.status === 'paid' ? 'badge-teal' :
                        inv.status === 'pending' ? 'badge-amber' : 'badge-rose'
                      }`}>
                        {inv.status}
                      </span>
                    </td>
                    <td>
                      <button 
                        className="btn-secondary text-xs"
                        onClick={() => printReceipt(inv, pet ? pet.name : 'Client', settings.orgName || 'Petution Clinic')}
                      >
                        Print Receipt
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
