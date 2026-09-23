// Sample clinic shown in demo mode only. Real accounts start empty.
// Dates are relative to the day the demo opens, so the dashboard shows a realistic day.
import { addDays } from '../utils/metrics';
import { todayLocal } from '../utils/ids';

export const DEMO_USER = {
  id: 'demo',
  name: 'Demo Vet',
  email: 'demo@petution.app',
  role: 'Owner',
  provider: 'demo',
  isAuthenticated: true
};

export const createDemoSeed = (today = todayLocal()) => {
  const day = (offset) => addDays(today, offset);
  return {
    clients: [
      {
        id: 'cli-1',
        name: 'Ahmed Hassan',
        source: 'Facebook Ad',
        governorate: 'Cairo',
        district: 'Maadi',
        street: 'Road 9, Bldg 14',
        phones: [{ phone: '+201001234567', label: 'Primary', isPrimary: true, hasWhatsapp: true }],
        tags: ['VIP', 'Regular'],
        pets: ['pet-1'],
        createdAt: day(-60)
      },
      {
        id: 'cli-2',
        name: 'Sarah Mahmoud',
        source: 'Recommendation',
        governorate: 'Giza',
        district: 'Zayed',
        street: 'Compound 4',
        phones: [{ phone: '+201119876543', label: 'Primary', isPrimary: true, hasWhatsapp: true }],
        tags: ['New Client'],
        pets: ['pet-2'],
        createdAt: day(-2)
      }
    ],
    pets: [
      {
        id: 'pet-1',
        name: 'Milo',
        ageValue: 2,
        ageUnit: 'years',
        species: 'cat',
        gender: 'male',
        vaccinated: true,
        deworming: true,
        antiflea: true,
        castrated: true,
        neuterDate: '2025-03-15',
        breed: 'Persian',
        temperament: 'Calm',
        color: 'White',
        bloodGroup: 'A',
        cardNo: 'CRD-9982',
        protocolNo: 'PRT-102',
        microchipNumber: '985141002938471',
        microchipDate: '2025-01-10',
        microchipLocation: 'Left Scapular',
        isAggressive: false,
        isDeceased: false,
        deathDate: '',
        privateNotes: 'Sensitive skin. Prefers soft handling.',
        tags: ['VIP', 'Indoor Only'],
        nutrition: ['Dry food', 'Soft food'],
        owners: ['cli-1'],
        createdAt: day(-60)
      },
      {
        id: 'pet-2',
        name: 'Rocky',
        ageValue: 4,
        ageUnit: 'years',
        species: 'dog',
        gender: 'male',
        vaccinated: true,
        deworming: true,
        antiflea: false,
        castrated: false,
        neuterDate: '',
        breed: 'Golden Retriever',
        temperament: 'Playful',
        color: 'Golden',
        bloodGroup: 'DEA 1.1+',
        cardNo: 'CRD-4410',
        protocolNo: 'PRT-108',
        microchipNumber: '985141007728192',
        microchipDate: '2024-06-20',
        microchipLocation: 'Neck',
        isAggressive: true,
        isDeceased: false,
        deathDate: '',
        privateNotes: 'Caution: Barking at strange dogs.',
        tags: ['High Energy', 'Guard Dog'],
        nutrition: ['Dry food'],
        owners: ['cli-2'],
        createdAt: day(-2)
      }
    ],
    visits: [
      {
        id: 'vis-1',
        petId: 'pet-1',
        clientId: 'cli-1',
        doctorName: 'Demo Vet',
        visitType: 'Check-up',
        date: day(0),
        time: '06:00 PM',
        state: 'scheduled',
        reason: 'Annual Checkup'
      },
      {
        id: 'vis-2',
        petId: 'pet-1',
        clientId: 'cli-1',
        doctorName: 'Demo Vet',
        visitType: 'Check-up',
        date: day(-14),
        time: '11:00 AM',
        state: 'completed',
        reason: 'Sneezing for 2 days'
      },
      {
        id: 'vis-3',
        petId: 'pet-2',
        clientId: 'cli-2',
        doctorName: 'Dr. Sarah Mahmoud',
        visitType: 'Vaccination',
        date: day(0),
        time: '10:30 AM',
        state: 'in-progress',
        reason: 'First visit: vaccination and check-up'
      }
    ],
    products: [
      {
        id: 'prod-1',
        name: 'Feline Rabies Vaccine',
        type: 'product',
        unitType: 'Piece',
        pricingUnit: 'Piece',
        quantity: 45,
        pricePerUnit: 350,
        costPerUnit: 200,
        revenuePerUnit: 150,
        alertThreshold: 10,
        notes: 'Keep refrigerated'
      },
      {
        id: 'prod-2',
        name: 'Deworming Tablets (Drontal)',
        type: 'product',
        unitType: 'Box',
        pricingUnit: 'Piece',
        quantity: 4,
        pricePerUnit: 120,
        costPerUnit: 70,
        revenuePerUnit: 50,
        alertThreshold: 10,
        reminderDays: 90,
        notes: 'Reorder from wholesaler'
      },
      {
        id: 'serv-1',
        name: 'General Examination & Consultation',
        type: 'service',
        unitType: 'Session',
        pricingUnit: 'Session',
        quantity: 999,
        pricePerUnit: 500,
        costPerUnit: 100,
        revenuePerUnit: 400,
        alertThreshold: 0,
        notes: 'Standard vet examination'
      }
    ],
    invoices: [
      {
        id: 'inv-1',
        number: 'INV-DEMO-0001',
        petId: 'pet-1',
        clientId: 'cli-1',
        visitId: 'vis-2',
        items: [{ productId: 'serv-1', name: 'General Examination & Consultation', type: 'service', quantity: 1, unitPrice: 500 }],
        status: 'paid',
        discountType: 'none',
        discountValue: 0,
        taxPercentage: 14,
        subtotal: 500,
        discountAmount: 0,
        taxAmount: 70,
        totalAmount: 570,
        stockDeducted: true,
        paidAt: day(-14),
        createdAt: day(-14)
      },
      {
        id: 'inv-2',
        number: 'INV-DEMO-0002',
        petId: 'pet-2',
        clientId: 'cli-2',
        visitId: 'vis-3',
        items: [{ productId: 'serv-1', name: 'General Examination & Consultation', type: 'service', quantity: 1, unitPrice: 500 }],
        status: 'paid',
        discountType: 'none',
        discountValue: 0,
        taxPercentage: 14,
        subtotal: 500,
        discountAmount: 0,
        taxAmount: 70,
        totalAmount: 570,
        stockDeducted: true,
        paidAt: day(0),
        createdAt: day(0)
      }
    ],
    expenses: [
      { id: 'exp-1', title: 'Medical Supplies Wholesaler', vendor: 'El-Gomhouria Med', category: 'Supplies', amount: 4500, date: day(-5), paymentMethod: 'Bank Transfer', notes: 'Monthly vaccine & syringe order' },
      { id: 'exp-2', title: 'Clinic Electricity & Utilities', vendor: 'South Cairo Elec', category: 'Utilities', amount: 1200, date: day(-1), paymentMethod: 'Cash', notes: 'Monthly utility bill' }
    ],
    vaccines: [
      {
        id: 'vac-1',
        petId: 'pet-1',
        vaccineName: 'Tricat Trio (FVRCP)',
        manufacturer: 'Zoetis',
        batchNumber: 'ZT-99210',
        administeredDate: day(-100),
        dueDate: day(265),
        vetName: 'Demo Vet',
        notes: 'Booster given. No adverse reaction.'
      },
      {
        id: 'vac-2',
        petId: 'pet-1',
        vaccineName: 'Rabies Vaccine (Rabisin)',
        manufacturer: 'Boehringer Ingelheim',
        batchNumber: 'RB-44102',
        administeredDate: day(-100),
        dueDate: day(265),
        vetName: 'Demo Vet',
        notes: 'Annual Rabies shot.'
      },
      {
        id: 'vac-3',
        petId: 'pet-2',
        vaccineName: 'Vanguard 7 (DHPP + L4)',
        manufacturer: 'Zoetis',
        batchNumber: 'VG-77219',
        administeredDate: day(0),
        dueDate: day(365),
        vetName: 'Dr. Sarah Mahmoud',
        notes: '5-in-1 combo vaccine.'
      }
    ],
    soapNotes: [
      {
        id: 'soap-1',
        visitId: 'vis-2',
        petId: 'pet-1',
        vetName: 'Demo Vet',
        date: day(-14),
        subjective: 'Owner reports mild sneezing for 2 days after indoor stay.',
        tempC: 38.5,
        weightKg: 4.2,
        heartRateBpm: 120,
        respiratoryRateBpm: 24,
        assessment: 'Mild upper respiratory tract inflammation. Hydration good.',
        plan: 'Prescribed oral antibiotic drops and rest. Recheck in 5 days if not improving.',
        rxMedications: [
          { name: 'Amoxicillin Drops 100mg/ml', dosage: '0.5 ml', frequency: 'Twice daily (BID)', duration: '7 days' },
          { name: 'Vet Eye & Nasal Clear Drops', dosage: '2 drops', frequency: 'Three times daily (TID)', duration: '5 days' }
        ]
      }
    ],
    reminders: [
      { id: 'rem-1', clientId: 'cli-1', petId: 'pet-1', productId: 'prod-2', productName: 'Deworming Tablets (Drontal)', dueDate: day(5), status: 'pending', createdAt: day(-85) },
      { id: 'rem-2', clientId: 'cli-2', petId: 'pet-2', productId: 'prod-2', productName: 'Deworming Tablets (Drontal)', dueDate: day(-3), status: 'pending', createdAt: day(-93) }
    ],
    team: [
      { id: DEMO_USER.id, name: DEMO_USER.name, email: DEMO_USER.email, role: 'Owner', status: 'active' }
    ],
    invitations: [
      { id: 'invite-1', name: 'Dr. Sarah Mahmoud', email: 'sarah.m@petution.com', role: 'Vet', sentAt: day(-2), status: 'Pending' }
    ],
    stockLogs: [
      { id: 'log-1', itemName: 'Feline Rabies Vaccine', change: '+45 units', user: DEMO_USER.name, date: day(-60) }
    ],
    notifications: [
      { id: 'n-1', title: 'Welcome to the Petution demo! Changes stay in this browser.', time: 'Just now', read: false }
    ],
    workspaces: [
      { id: 'ws-demo', name: 'Petution Demo Clinic', slug: 'petution-demo', plan: 'Demo' }
    ],
    settings: [
      {
        id: 'global',
        orgName: 'Petution Demo Clinic',
        slug: 'petution-demo',
        phone: '+20 100 000 0000',
        address: 'Maadi, Cairo, Egypt',
        website: '',
        activeWorkspaceId: 'ws-demo'
      }
    ]
  };
};
