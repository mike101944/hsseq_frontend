// InputField.jsx
import React from 'react';
import { AlertCircle ,Eye ,EyeOff  } from 'lucide-react';

export const InputField = ({ 
  icon: Icon, 
  label, 
  type = 'text', 
  name, 
  value, 
  onChange, 
  error, 
  placeholder,
  disabled = false,
  showPasswordToggle = false,
  onTogglePassword 
}) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <div className="relative">
      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon size={20} className="text-gray-400" />
        </div>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all ${
          error ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      />
      {showPasswordToggle && (
        <button
          type="button"
          onClick={onTogglePassword}
          disabled={disabled}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          {type === 'text' ? (
            <EyeOff size={20} className="text-gray-400 hover:text-gray-600" />
          ) : (
            <Eye size={20} className="text-gray-400 hover:text-gray-600" />
          )}
        </button>
      )}
    </div>
    {error && (
      <div className="flex items-center gap-2 text-sm text-red-600">
        <AlertCircle size={14} />
        {error}
      </div>
    )}
  </div>
);
