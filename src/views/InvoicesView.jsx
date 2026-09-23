import React, { useState } from 'react';
import { Plus, Printer, CheckCircle, XCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { lineTotal } from '../utils/invoice';

const money = (value) => `${Number(value || 0).toFixed(2)} EGP`;

// Builds the receipt with text nodes so names from records or imports can't inject HTML/script.
const printReceipt = ({ invoice, petName, ownerName, settings }) => {
  const receiptWindow = window.open('', '_blank');
  if (!receiptWindow) {
    alert('Allow pop-ups for this site to print receipts.');
    return;
  }
  const clinicName = settings.orgName || 'Petution Clinic';
  const doc = receiptWindow.document;
  doc.title = `Receipt - ${clinicName}`;
  doc.body.style.cssText = 'font-family: sans-serif; padding: 30px; max-width: 640px;';
  const add = (tag, text, parent = doc.body) => {
    const el = doc.createElement(tag);
    if (text !== undefined) el.textContent = text;
    parent.appendChild(el);
    return el;
  };

  add('h2', `${clinicName} Receipt`);
  if (settings.address || settings.phone) add('p', [settings.address, settings.phone].filter(Boolean).join(' • '));
  add('p', `Invoice: ${invoice.number || invoice.id}`);
  add('p', `Date: ${invoice.createdAt || ''}`);
  add('p', `Pet: ${petName}`);
  if (ownerName) add('p', `Owner: ${ownerName}`);

  if (invoice.items?.length) {
    const table = add('table');
    table.style.cssText = 'width: 100%; border-collapse: collapse; margin: 16px 0;';
    const header = add('tr', undefined, table);
    ['Item', 'Qty', 'Unit price', 'Total'].forEach(label => {
      const th = add('th', label, header);
      th.style.cssText = 'text-align: left; border-bottom: 1px solid #ccc; padding: 4px;';
    });
    invoice.items.forEach(item => {
      const row = add('tr', undefined, table);
      [item.name, String(item.quantity), money(item.unitPrice), money(lineTotal(item))].forEach(value => {
        const td = add('td', value, row);
        td.style.cssText = 'padding: 4px; border-bottom: 1px solid #eee;';
      });
    });
  }

  if (invoice.subtotal !== undefined) add('p', `Subtotal: ${money(invoice.subtotal)}`);
  if (invoice.discountAmount) add('p', `Discount: -${money(invoice.discountAmount)}`);
  if (invoice.taxAmount !== undefined) add('p', `Tax (${invoice.taxPercentage || 0}%): ${money(invoice.taxAmount)}`);
  add('h3', `Total Amount: ${money(invoice.totalAmount)}`);
  add('p', `Status: ${String(invoice.status || '').toUpperCase()}`);
  add('button', 'Print').addEventListener('click', () => receiptWindow.print());
};

export const InvoicesView = () => {
  const { invoices, pets, clients, settings, setActiveDrawer, setActiveModalItem, setInvoiceStatus } = useApp();
  const [statusFilter, setStatusFilter] = useState('all');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const filteredInvoices = invoices.filter(i => {
    if (statusFilter !== 'all' && i.status !== statusFilter) return false;
    if (fromDate && i.createdAt < fromDate) return false;
    if (toDate && i.createdAt > toDate) return false;
    return true;
  });

  const openAdd = () => {
    setActiveModalItem(null);
    setActiveDrawer('addInvoice');
  };

  const handleCancel = (inv) => {
    const message = inv.stockDeducted
      ? `Cancel invoice ${inv.number || inv.id}? Its products go back into stock.`
      : `Cancel invoice ${inv.number || inv.id}?`;
    if (confirm(message)) setInvoiceStatus(inv.id, 'cancelled');
  };

  return (
    <div className="invoices-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <h2>Invoices</h2>
          <p className="text-muted">Bill clients, track payments, and print receipts.</p>
        </div>
        <div className="flex gap-sm">
          <button className="btn-primary" onClick={openAdd}>
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
              <th>Invoice</th>
              <th>Pet / Owner</th>
              <th>Items</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.length === 0 ? (
              <tr>
                <td colSpan="6" className="empty-state">
                  No invoices found. Create invoices from visits to start billing.
                </td>
              </tr>
            ) : (
              filteredInvoices.map(inv => {
                const pet = pets.find(p => p.id === inv.petId);
                const owner = clients.find(c => c.id === inv.clientId) || clients.find(c => pet?.owners?.includes(c.id));
                const itemSummary = inv.items?.length
                  ? inv.items.map(item => `${item.quantity}× ${item.name}`).join(', ')
                  : '—';
                return (
                  <tr key={inv.id}>
                    <td>
                      <div className="font-semibold text-xs">{inv.number || inv.id}</div>
                      <div className="text-xs text-muted">{inv.createdAt}</div>
                    </td>
                    <td>
                      <div className="font-semibold">{pet ? pet.name : 'General Client'}</div>
                      {owner && <div className="text-xs text-muted">{owner.name}</div>}
                    </td>
                    <td className="text-xs">{itemSummary}</td>
                    <td className="font-bold">{money(inv.totalAmount)}</td>
                    <td>
                      <span className={`badge ${
                        inv.status === 'paid' ? 'badge-teal' :
                        inv.status === 'pending' ? 'badge-amber' : 'badge-rose'
                      }`}>
                        {inv.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-xs" style={{ flexWrap: 'wrap' }}>
                        <button
                          className="btn-secondary text-xs"
                          onClick={() => printReceipt({ invoice: inv, petName: pet ? pet.name : 'Client', ownerName: owner?.name, settings })}
                        >
                          <Printer size={14} /> Print Receipt
                        </button>
                        {inv.status === 'pending' && (
                          <button className="btn-secondary text-xs" onClick={() => setInvoiceStatus(inv.id, 'paid')}>
                            <CheckCircle size={14} className="text-teal" /> Mark Paid
                          </button>
                        )}
                        {inv.status !== 'cancelled' && (
                          <button className="btn-secondary text-xs text-rose" onClick={() => handleCancel(inv)}>
                            <XCircle size={14} /> Cancel
                          </button>
                        )}
                      </div>
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
