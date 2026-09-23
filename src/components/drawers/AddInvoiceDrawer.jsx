import React, { useState } from 'react';
import { X, Plus, Trash2, AlertTriangle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { calculateInvoice, lineTotal } from '../../utils/invoice';

const emptyLine = () => ({ productId: '', quantity: 1, unitPrice: '' });

const money = (value) => `EGP ${Number(value || 0).toFixed(2)}`;

// visitId is set when the invoice is started from a visit.
export const AddInvoiceDrawer = ({ visitId }) => {
  const { setActiveDrawer, setActiveModalItem, addInvoice, pets, clients, visits, products } = useApp();

  const startVisit = visits.find(v => v.id === visitId);
  const [selectedPet, setSelectedPet] = useState(startVisit?.petId || '');
  const [selectedVisit, setSelectedVisit] = useState(startVisit?.id || '');
  const [invoiceState, setInvoiceState] = useState('pending');
  const [discountType, setDiscountType] = useState('none');
  const [discountValue, setDiscountValue] = useState(0);
  const [taxPercent, setTaxPercent] = useState(14);
  const [lines, setLines] = useState([emptyLine()]);

  const pet = pets.find(p => p.id === selectedPet);
  const owner = clients.find(c => pet?.owners?.includes(c.id) || c.pets?.includes(pet?.id));
  const petVisits = visits.filter(v => v.petId === selectedPet).sort((a, b) => String(b.date).localeCompare(String(a.date)));

  // A blank price means "use the product's list price".
  const toItem = (line) => {
    const product = products.find(p => p.id === line.productId);
    return {
      productId: line.productId,
      name: product?.name || 'Item',
      type: product?.type || 'product',
      quantity: Number(line.quantity) || 0,
      unitPrice: line.unitPrice === '' ? Number(product?.pricePerUnit) || 0 : Number(line.unitPrice) || 0
    };
  };

  const items = lines.filter(line => line.productId).map(toItem);

  const totals = calculateInvoice(items, discountType, discountValue, taxPercent);

  const close = () => {
    setActiveModalItem(null);
    setActiveDrawer(null);
  };

  const updateLine = (idx, changes) => setLines(prev => prev.map((line, i) => (i === idx ? { ...line, ...changes } : line)));

  const handlePetChange = (petId) => {
    setSelectedPet(petId);
    setSelectedVisit('');
  };

  const stockWarning = (line) => {
    const product = products.find(p => p.id === line.productId);
    if (!product || product.type !== 'product') return null;
    const wanted = lines.filter(l => l.productId === line.productId).reduce((sum, l) => sum + (Number(l.quantity) || 0), 0);
    return wanted > Number(product.quantity || 0) ? `Only ${product.quantity ?? 0} in stock` : null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedPet) return alert('Please select a pet.');
    if (!items.length || items.some(item => item.quantity <= 0)) {
      return alert('Add at least one item, each with a quantity above zero.');
    }
    const shortages = [...new Set(lines.filter(l => stockWarning(l)).map(l => `${products.find(p => p.id === l.productId).name}: ${stockWarning(l)}`))];
    if (shortages.length && invoiceState !== 'cancelled' &&
      !confirm(`Some items don't have enough stock (${shortages.join('; ')}). Create the invoice anyway? Stock will go below zero.`)) {
      return;
    }
    addInvoice({
      petId: selectedPet,
      clientId: owner?.id || '',
      visitId: selectedVisit,
      items,
      status: invoiceState,
      discountType,
      discountValue: Number(discountValue),
      taxPercentage: Number(taxPercent)
    });
    close();
  };

  return (
    <div className="drawer-backdrop" onClick={close}>
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <div>
            <h3>Add Invoice</h3>
            <p>Bill a pet's owner for products and services. Products are taken out of stock.</p>
          </div>
          <button className="icon-btn" onClick={close}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="drawer-body">
          <div className="form-row">
            <div className="form-group">
              <label>Pet *</label>
              <select
                className="form-control"
                value={selectedPet}
                onChange={(e) => handlePetChange(e.target.value)}
                required
              >
                <option value="" disabled>Select a pet</option>
                {pets.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
              {pet && <span className="text-xs text-muted margin-top-xs">Owner: {owner ? owner.name : 'Not linked to a client'}</span>}
            </div>
            <div className="form-group">
              <label>Visit (optional)</label>
              <select
                className="form-control"
                value={selectedVisit}
                onChange={(e) => setSelectedVisit(e.target.value)}
                disabled={!selectedPet}
              >
                <option value="">No visit</option>
                {petVisits.map(v => (
                  <option key={v.id} value={v.id}>{v.date} • {v.visitType}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <div className="flex justify-between items-center">
              <label style={{ marginBottom: 0 }}>Items *</label>
              <button type="button" className="btn-secondary text-xs" onClick={() => setLines(prev => [...prev, emptyLine()])}>
                <Plus size={14} /> Add item
              </button>
            </div>

            {lines.map((line, idx) => {
              const product = products.find(p => p.id === line.productId);
              const warning = stockWarning(line);
              return (
                <div key={idx} className="invoice-line margin-top-xs">
                  <select
                    className="form-control line-product"
                    value={line.productId}
                    aria-label={`Item ${idx + 1}`}
                    onChange={(e) => updateLine(idx, { productId: e.target.value, unitPrice: '' })}
                  >
                    <option value="" disabled>Select an item or service</option>
                    {products.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.name}{p.type === 'product' ? ` (${p.quantity ?? 0} in stock)` : ''}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    min="1"
                    className="form-control line-qty"
                    aria-label={`Quantity ${idx + 1}`}
                    value={line.quantity}
                    onChange={(e) => updateLine(idx, { quantity: e.target.value })}
                  />
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    className="form-control line-price"
                    aria-label={`Unit price ${idx + 1}`}
                    placeholder={product ? String(product.pricePerUnit ?? 0) : 'Price'}
                    value={line.unitPrice}
                    onChange={(e) => updateLine(idx, { unitPrice: e.target.value })}
                  />
                  <span className="line-total text-xs font-semibold">
                    {product ? money(lineTotal(toItem(line))) : '—'}
                  </span>
                  {lines.length > 1 && (
                    <button type="button" className="icon-btn text-red" title="Remove item" onClick={() => setLines(prev => prev.filter((_, i) => i !== idx))}>
                      <Trash2 size={16} />
                    </button>
                  )}
                  {warning && (
                    <span className="line-warning text-xs"><AlertTriangle size={12} /> {warning}</span>
                  )}
                </div>
              );
            })}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Discount Type</label>
              <select
                className="form-control"
                value={discountType}
                onChange={(e) => setDiscountType(e.target.value)}
              >
                <option value="none">none</option>
                <option value="percentage">percentage</option>
                <option value="fixed_amount">fixed amount</option>
              </select>
            </div>

            <div className="form-group">
              <label>Discount Value</label>
              <input
                type="number"
                min="0"
                className="form-control"
                value={discountValue}
                onChange={(e) => setDiscountValue(e.target.value)}
                disabled={discountType === 'none'}
              />
            </div>

            <div className="form-group">
              <label>Tax %</label>
              <input
                type="number"
                min="0"
                className="form-control"
                value={taxPercent}
                onChange={(e) => setTaxPercent(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Invoice State</label>
            <select
              className="form-control"
              value={invoiceState}
              onChange={(e) => setInvoiceState(e.target.value)}
            >
              <option value="pending">pending</option>
              <option value="paid">paid</option>
              <option value="cancelled">cancelled</option>
            </select>
          </div>

          {/* Calculator Box */}
          <div className="calc-summary-box card margin-top-md">
            <div className="flex justify-between text-xs">
              <span>Subtotal</span>
              <span>{money(totals.subtotal)}</span>
            </div>
            <div className="flex justify-between text-xs margin-top-xs">
              <span>Discount</span>
              <span>- {money(totals.discountAmount)}</span>
            </div>
            <div className="flex justify-between text-xs margin-top-xs">
              <span>Tax ({Number(taxPercent) || 0}%)</span>
              <span>{money(totals.taxAmount)}</span>
            </div>
            <div className="flex justify-between font-bold text-base margin-top-md border-top pt-xs">
              <span>Total Amount</span>
              <span data-testid="invoice-total">{money(totals.totalAmount)}</span>
            </div>
          </div>

          <div className="drawer-footer margin-top-auto">
            <button type="button" className="btn-secondary" onClick={close}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Create Invoice
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .calc-summary-box { background: #f8fafc; padding: 16px; }
        .text-base { font-size: 1.1rem; }
        .pt-xs { padding-top: 8px; }
        .border-top { border-top: 1px solid var(--border-card); }
        .invoice-line {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 64px 90px 84px 36px;
          gap: 6px;
          align-items: center;
        }
        .invoice-line .line-total { text-align: right; }
        .invoice-line .line-warning {
          grid-column: 1 / -1;
          color: #b45309;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        @media (max-width: 639px) {
          .invoice-line { grid-template-columns: minmax(0, 1fr) 56px 76px 36px; }
          .invoice-line .line-total { display: none; }
        }
      `}</style>
    </div>
  );
};
