import React, { useState } from 'react';
import styled from 'styled-components';

// Responsive design breakpoints
const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  laptop: '1024px'
};

interface PriceSectionProps {
  onChange: (price: string) => void;
}

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #002f34;
`;

const InputContainer = styled.div`
  position: relative;
  max-width: 300px;
  
  @media (max-width: ${breakpoints.mobile}) {
    max-width: 100%;
  }
`;

const CurrencySymbol = styled.span`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #002f34;
  font-size: 14px;
  font-weight: 500;
`;

const PriceInput = styled.input<{ hasError?: boolean }>`
  width: 100%;
  padding: 10px 30px 10px 30px;
  border: 1px solid ${props => props.hasError ? 'red' : '#d8dfe0'};
  border-radius: 4px;
  font-size: 14px;
  
  @media (max-width: ${breakpoints.mobile}) {
    font-size: 13px;
  }
  
  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? 'red' : '#23e5db'};
  }
`;

const CheckCircleIcon = styled.span`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #008000;
  font-weight: bold;
  font-size: 16px;
  z-index: 1;
`;

const ValidationMessage = styled.p`
  font-size: 12px;
  color: red;
  margin-top: 4px;
`;

const PriceSection: React.FC<PriceSectionProps> = ({ onChange }) => {
  const [price, setPrice] = useState('');
  const [error, setError] = useState(false);
  
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers
    if (/^\d*$/.test(value)) {
      setPrice(value);
      onChange(value);
      if (value) {
        setError(false);
      }
    }
  };
  
  const handleBlur = () => {
    if (!price) {
      setError(true);
    }
  };
  
  return (
    <div>
      <SectionTitle>SET A PRICE</SectionTitle>
      
      <InputContainer>
        <CurrencySymbol>₹</CurrencySymbol>
        <PriceInput 
          type="text" 
          placeholder="Price" 
          value={price}
          onChange={handlePriceChange}
          onBlur={handleBlur}
          hasError={error}
        />
        {price && !error && <CheckCircleIcon>✓</CheckCircleIcon>}
      </InputContainer>
      
      {error && (
        <ValidationMessage>Price is mandatory. Please complete the required field.</ValidationMessage>
      )}
    </div>
  );
};

export default PriceSection; 