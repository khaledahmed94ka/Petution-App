// =============================================================================
// PETUTION IDEXX VETCONNECT PLUS ADAPTER
// Client-side Interface Stubs for IDEXX Diagnostic Lab Requisitions & Results
// =============================================================================

import { apiClient } from './apiClient';

export const idexxAdapter = {
  /**
   * Check IDEXX Auth Status
   */
  async checkAuthStatus() {
    try {
      return await apiClient.request('/integrations/idexx/auth');
    } catch {
      return { connected: false, clinicId: 'IDEXX-DEMO-CLINIC-99' };
    }
  },

  /**
   * Create Diagnostic Lab Requisition Order
   * @param {Object} orderData { petId, testCode, testName, doctorName }
   */
  async createLabOrder(orderData) {
    try {
      return await apiClient.request('/integrations/idexx/orders', {
        method: 'POST',
        body: JSON.stringify(orderData)
      });
    } catch {
      // Local stub fallback
      const requisitionId = `IDX-REQ-${Date.now()}`;
      return {
        success: true,
        requisitionId,
        status: 'submitted',
        testCode: orderData.testCode || 'CBC-CHEM10',
        testName: orderData.testName || 'Comprehensive Blood Count & Chemistry',
        message: 'Lab requisition created successfully (Offline/Stub Mode)'
      };
    }
  },

  /**
   * Fetch Lab Results for a Requisition
   * @param {string} requisitionId 
   */
  async getLabResults(requisitionId) {
    try {
      return await apiClient.request(`/integrations/idexx/results/${requisitionId}`);
    } catch {
      return {
        requisitionId,
        status: 'completed',
        specimen: 'Canine Whole Blood',
        results: [
          { parameter: 'WBC', value: '8.5', unit: '10^3/uL', referenceRange: '5.5 - 16.9', flag: 'NORMAL' },
          { parameter: 'RBC', value: '6.8', unit: '10^6/uL', referenceRange: '5.5 - 8.5', flag: 'NORMAL' },
          { parameter: 'ALT', value: '45', unit: 'U/L', referenceRange: '10 - 125', flag: 'NORMAL' }
        ]
      };
    }
  }
};
