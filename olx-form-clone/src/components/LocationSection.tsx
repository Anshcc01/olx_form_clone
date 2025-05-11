import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Responsive design breakpoints
const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  laptop: '1024px'
};

interface LocationSectionProps {
  onChange: (field: string, value: string) => void;
}

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #002f34;
`;

const FormField = styled.div`
  margin-bottom: 16px;
`;

const Tabs = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const Tab = styled.div<{ isActive: boolean }>`
  padding: 12px 24px;
  font-size: 14px;
  font-weight: ${props => props.isActive ? '700' : '400'};
  color: #002f34;
  cursor: pointer;
  border-bottom: 2px solid ${props => props.isActive ? '#002f34' : 'transparent'};
  flex: 1;
  text-align: center;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
  color: #002f34;
`;

const RequiredStar = styled.span`
  color: red;
  margin-left: 2px;
`;

const SelectDropdown = styled.select<{ hasError?: boolean }>`
  width: 100%;
  padding: 10px;
  border: 1px solid ${props => props.hasError ? 'red' : '#d8dfe0'};
  border-radius: 4px;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: right 10px top 50%;
  background-size: 12px auto;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? 'red' : '#23e5db'};
  }
`;

const RequiredText = styled.p`
  font-size: 12px;
  color: red;
  margin-top: 4px;
`;

const LocationItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #d8dfe0;
`;

const LocationLabel = styled.div`
  font-size: 14px;
  color: #002f34;
`;

const LocationValue = styled.div`
  font-size: 14px;
  color: #002f34;
  font-weight: 500;
`;

// Mock data for cities by state
const citiesByState: Record<string, string[]> = {
  'Delhi': ['Delhi'],
  'Uttar Pradesh': ['Allahabad', 'Agra', 'Lucknow', 'Kanpur', 'Varanasi', 'Noida', 'Ghaziabad'],
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik'],
  'Karnataka': ['Bangalore', 'Mysore', 'Hubli', 'Mangalore'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem'],
  'Telangana': ['Hyderabad', 'Warangal', 'Nizamabad']
};

// Mock data for neighborhoods by city
const neighborhoodsByCity: Record<string, string[]> = {
  'Delhi': ['Connaught Place', 'Karol Bagh', 'Dwarka', 'Rohini', 'Meera Bagh'],
  'Allahabad': ['Civil Lines', 'Georgetown', 'Neta Nagar', 'Katra', 'Tagore Town'],
  'Mumbai': ['Andheri', 'Bandra', 'Juhu', 'Colaba', 'Worli'],
  'Bangalore': ['Koramangala', 'Indiranagar', 'Whitefield', 'Jayanagar', 'JP Nagar'],
  'Hyderabad': ['Banjara Hills', 'Jubilee Hills', 'Hitech City', 'Gachibowli', 'Secunderabad']
};

const LocationSection: React.FC<LocationSectionProps> = ({ onChange }) => {
  const [activeTab, setActiveTab] = useState<'list' | 'current'>('list');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [currentLocation, setCurrentLocation] = useState({
    state: 'Delhi',
    city: 'Delhi',
    neighborhood: 'Meera Bagh'
  });
  const [errors, setErrors] = useState<{
    state?: boolean;
    city?: boolean;
    neighborhood?: boolean;
  }>({});

  // Simulate getting user's location
  useEffect(() => {
    // In a real app, you would use the Geolocation API here
    // For demo purposes, we're just setting a fake location
    const timeout = setTimeout(() => {
      setCurrentLocation({
        state: 'Delhi',
        city: 'Delhi',
        neighborhood: 'Meera Bagh'
      });
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  const handleTabChange = (tab: 'list' | 'current') => {
    setActiveTab(tab);
    
    if (tab === 'current') {
      // Use the current location values
      onChange('state', currentLocation.state);
      onChange('city', currentLocation.city);
      onChange('neighborhood', currentLocation.neighborhood);
    } else {
      // Use the manually selected values
      onChange('state', state);
      onChange('city', city);
      onChange('neighborhood', neighborhood);
    }
  };
  
  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setState(value);
    setCity('');
    setNeighborhood('');
    onChange('state', value);
    setErrors({...errors, state: value === ''});
  };
  
  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setCity(value);
    setNeighborhood('');
    onChange('city', value);
    setErrors({...errors, city: value === ''});
  };
  
  const handleNeighborhoodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setNeighborhood(value);
    onChange('neighborhood', value);
    setErrors({...errors, neighborhood: value === ''});
  };
  
  const validateFields = () => {
    const newErrors = {
      state: state === '',
      city: city === '',
      neighborhood: neighborhood === ''
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };
  
  return (
    <div>
      <SectionTitle>CONFIRM YOUR LOCATION</SectionTitle>
      
      <Tabs>
        <Tab 
          isActive={activeTab === 'list'} 
          onClick={() => handleTabChange('list')}
        >
          LIST
        </Tab>
        <Tab 
          isActive={activeTab === 'current'} 
          onClick={() => handleTabChange('current')}
        >
          CURRENT LOCATION
        </Tab>
      </Tabs>
      
      {activeTab === 'list' ? (
        <>
          <FormField>
            <Label>State<RequiredStar>*</RequiredStar></Label>
            <SelectDropdown 
              onChange={handleStateChange} 
              value={state}
              hasError={errors.state}
              onBlur={() => validateFields()}
            >
              <option value="">Select State</option>
              <option value="Delhi">Delhi</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Telangana">Telangana</option>
            </SelectDropdown>
            {errors.state && (
              <RequiredText>This field is mandatory</RequiredText>
            )}
          </FormField>
          
          <FormField>
            <Label>City<RequiredStar>*</RequiredStar></Label>
            <SelectDropdown 
              onChange={handleCityChange} 
              value={city}
              disabled={!state}
              hasError={errors.city}
              onBlur={() => validateFields()}
            >
              <option value="">Select City</option>
              {state && citiesByState[state]?.map((cityName) => (
                <option key={cityName} value={cityName}>{cityName}</option>
              ))}
            </SelectDropdown>
            {errors.city && (
              <RequiredText>This field is mandatory</RequiredText>
            )}
          </FormField>
          
          <FormField>
            <Label>Neighbourhood<RequiredStar>*</RequiredStar></Label>
            <SelectDropdown 
              onChange={handleNeighborhoodChange} 
              value={neighborhood}
              disabled={!city}
              hasError={errors.neighborhood}
              onBlur={() => validateFields()}
            >
              <option value="">Select Neighbourhood</option>
              {city && neighborhoodsByCity[city]?.map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </SelectDropdown>
            {errors.neighborhood && (
              <RequiredText>This field is mandatory</RequiredText>
            )}
          </FormField>
        </>
      ) : (
        <div>
          <LocationItem>
            <LocationLabel>State</LocationLabel>
            <LocationValue>{currentLocation.state}</LocationValue>
          </LocationItem>
          <LocationItem>
            <LocationLabel>City</LocationLabel>
            <LocationValue>{currentLocation.city}</LocationValue>
          </LocationItem>
          <LocationItem>
            <LocationLabel>Neighbourhood</LocationLabel>
            <LocationValue>{currentLocation.neighborhood}</LocationValue>
          </LocationItem>
        </div>
      )}
    </div>
  );
};

export default LocationSection; 