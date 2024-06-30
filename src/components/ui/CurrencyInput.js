import React from 'react';

const CurrencyInput = ({ value, onChange, currency }) => {
  const handleChange = (e) => {
    let value = e.target.value.replace(/[^0-9.]/g, '');
    onChange(value);
  };

  return (
    <div className="relative currency-input-container">
      <span className="currency-symbol">{currency}</span>
      <input
        type="text"
        className="custom-amount-input"
        value={value}
        onChange={handleChange}
        inputMode="decimal"
        placeholder="0.00"
      />
    </div>
  );
};

export default CurrencyInput;