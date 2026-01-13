"use client";
import React from 'react';
import { X } from 'lucide-react';

interface UpdatePlansFeildsProps {
  formData: any;
  onChange: (field: string, value: any) => void;
  edit?: boolean;
  view?: boolean;
  job?: any;
  onClose?: () => void;
}

const UpdatePlansFields: React.FC<UpdatePlansFeildsProps> = ({ formData, onChange, onClose, edit = false, view = false, job }) => {
  const disabled = false;

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  return (
    <div className="space-y-6 p-1">

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700">
            Plan Name
          </label>
          <span className="text-xs text-gray-400">Required</span>
        </div>
        <input
          type="text"
          name="name"
          value={formData.name || ''}
          onChange={handleInputChange}
          placeholder="e.g., Premium Plan, Basic Plan, Enterprise"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 hover:border-gray-400 placeholder:text-gray-400"
          disabled={disabled}
          required
        />
        <p className="text-xs text-gray-500">
          Choose a descriptive name for your plan
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <span className="text-xs text-gray-400">Required</span>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="text-gray-500 text-lg font-medium">£</span>
          </div>
          <input
            type="number"
            name="price"
            value={formData.price || ''}
            onChange={handleInputChange}
            placeholder="0.00"
            min="0"
            step="0.01"
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 hover:border-gray-400 placeholder:text-gray-400 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            disabled={disabled}
            required
          />
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
            <span className="text-gray-400 text-sm">POUNDS</span>
          </div>
        </div>
        <p className="text-xs text-gray-500">
          Enter the monthly subscription price
        </p>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Billing Cycle <span className="text-gray-400 font-normal">(Optional)</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => onChange('billingCycle', 'monthly')}
            className={`py-3 px-4 rounded-xl border transition-all duration-200 ${formData.billingCycle === 'monthly' || !formData.billingCycle ? 'border-yellow-400 bg-yellow-50 text-gray-900' : 'border-gray-300 hover:border-gray-400 text-gray-700'}`}
          >
            <div className="font-medium">Monthly</div>
            <div className="text-xs text-gray-500 mt-1">Billed every month</div>
          </button>
          <button
            type="button"
            onClick={() => onChange('billingCycle', 'yearly')}
            className={`py-3 px-4 rounded-xl border transition-all duration-200 ${formData.billingCycle === 'yearly' ? 'border-yellow-400 bg-yellow-50 text-gray-900' : 'border-gray-300 hover:border-gray-400 text-gray-700'}`}
          >
            <div className="font-medium">Yearly</div>
            <div className="text-xs text-gray-500 mt-1">Save with annual billing</div>
          </button>
        </div>
      </div>

      {(formData.name || formData.price) && (
        <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl border border-yellow-200">
          <h4 className="text-sm font-semibold text-gray-800 mb-3">Plan Preview</h4>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-semibold text-gray-900">
                {formData.name || 'Untitled Plan'}
              </div>
              <div className="text-sm text-gray-600">
                {formData.billingCycle === 'yearly' ? 'Yearly subscription' : 'Monthly subscription'}
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">
                ${parseFloat(formData.price || 0).toFixed(2)}
              </div>
              <div className="text-sm text-gray-500">
                {formData.billingCycle === 'yearly' ? 'per year' : 'per month'}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default UpdatePlansFields;