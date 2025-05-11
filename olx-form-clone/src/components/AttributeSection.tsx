import React, { useState } from 'react';
import styled from 'styled-components';

// Responsive design breakpoints
const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  laptop: '1024px'
};

interface AttributeSectionProps {
  onChange: (name: string, value: string) => void;
}

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #002f34;
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

const FormField = styled.div`
  margin-bottom: 16px;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
`;

const OptionButton = styled.button<{ isSelected: boolean }>`
  padding: 8px 12px;
  background-color: ${props => props.isSelected ? '#23e5db' : 'white'};
  border: 1px solid ${props => props.isSelected ? '#23e5db' : '#d8dfe0'};
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  color: #002f34;
  
  @media (max-width: ${breakpoints.mobile}) {
    padding: 6px 10px;
    font-size: 12px;
  }
  
  &:hover {
    border-color: #23e5db;
  }
`;

const NumberInput = styled.input<{ hasError?: boolean }>`
  width: 100%;
  max-width: 300px;
  padding: 10px 30px 10px 10px;
  border: 1px solid ${props => props.hasError ? 'red' : '#d8dfe0'};
  border-radius: 4px;
  font-size: 14px;
  
  @media (max-width: ${breakpoints.mobile}) {
    max-width: 100%;
  }
  
  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? 'red' : '#23e5db'};
  }
`;

const ValidationMessage = styled.p`
  font-size: 12px;
  color: red;
  margin-top: 4px;
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

const InputWrapper = styled.div`
  position: relative;
`;

const SelectDropdown = styled.select<{ hasError?: boolean }>`
  width: 100%;
  max-width: 300px;
  padding: 10px 30px 10px 10px;
  border: 1px solid ${props => props.hasError ? 'red' : '#d8dfe0'};
  border-radius: 4px;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: right 30px top 50%;
  background-size: 12px auto;
  
  @media (max-width: ${breakpoints.mobile}) {
    max-width: 100%;
  }
  
  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? 'red' : '#23e5db'};
  }
`;

const SelectWrapper = styled.div`
  position: relative;
`;

const AttributeSection: React.FC<AttributeSectionProps> = ({ onChange }) => {
  const [propertyType, setPropertyType] = useState('');
  const [bhk, setBhk] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [furnishing, setFurnishing] = useState('');
  const [projectStatus, setProjectStatus] = useState('');
  const [listedBy, setListedBy] = useState('');
  const [carParking, setCarParking] = useState('');
  const [inputs, setInputs] = useState({
    superBuiltupArea: '',
    carpetArea: '',
    maintenance: '',
    totalFloors: '',
    floorNo: '',
    projectName: '',
    facing: ''
  });
  const [errors, setErrors] = useState<{
    propertyType?: boolean;
    superBuiltupArea?: boolean;
    carpetArea?: boolean;
    facing?: boolean;
  }>({});
  
  const handlePropertyTypeChange = (value: string) => {
    setPropertyType(value);
    onChange('propertyType', value);
    setErrors({...errors, propertyType: false});
  };
  
  const handleBhkChange = (value: string) => {
    setBhk(value);
    onChange('bhk', value);
  };
  
  const handleBathroomsChange = (value: string) => {
    setBathrooms(value);
    onChange('bathrooms', value);
  };
  
  const handleFurnishingChange = (value: string) => {
    setFurnishing(value);
    onChange('furnishing', value);
  };
  
  const handleProjectStatusChange = (value: string) => {
    setProjectStatus(value);
    onChange('projectStatus', value);
  };
  
  const handleListedByChange = (value: string) => {
    setListedBy(value);
    onChange('listedBy', value);
  };
  
  const handleCarParkingChange = (value: string) => {
    setCarParking(value);
    onChange('carParking', value);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const value = e.target.value;
    setInputs({
      ...inputs,
      [field]: value
    });
    onChange(field, value);
    
    if ((field === 'superBuiltupArea' || field === 'carpetArea') && value) {
      setErrors({
        ...errors,
        [field]: false
      });
    }
  };
  
  const handleInputBlur = (field: string) => {
    if ((field === 'superBuiltupArea' || field === 'carpetArea') && !inputs[field]) {
      setErrors({
        ...errors,
        [field]: true
      });
    }
  };
  
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setInputs({
      ...inputs,
      facing: value
    });
    onChange('facing', value);
    
    if (value) {
      setErrors({
        ...errors,
        facing: false
      });
    }
  };
  
  const handleSelectBlur = () => {
    if (!inputs.facing) {
      setErrors({
        ...errors,
        facing: true
      });
    }
  };
  
  return (
    <div>
      <SectionTitle>INCLUDE SOME DETAILS</SectionTitle>
      
      <FormField>
        <Label>Type<RequiredStar>*</RequiredStar></Label>
        <ButtonGroup>
          <OptionButton 
            isSelected={propertyType === 'Flats / Apartments'} 
            onClick={() => handlePropertyTypeChange('Flats / Apartments')}
          >
            Flats / Apartments
          </OptionButton>
          <OptionButton 
            isSelected={propertyType === 'Independent / Builder Floors'} 
            onClick={() => handlePropertyTypeChange('Independent / Builder Floors')}
          >
            Independent / Builder Floors
          </OptionButton>
          <OptionButton 
            isSelected={propertyType === 'Farm House'} 
            onClick={() => handlePropertyTypeChange('Farm House')}
          >
            Farm House
          </OptionButton>
          <OptionButton 
            isSelected={propertyType === 'House & Villa'} 
            onClick={() => handlePropertyTypeChange('House & Villa')}
          >
            House & Villa
          </OptionButton>
        </ButtonGroup>
        {errors.propertyType && (
          <ValidationMessage>Type is mandatory. Please complete the required field.</ValidationMessage>
        )}
      </FormField>
      
      <FormField>
        <Label>BHK</Label>
        <ButtonGroup>
          <OptionButton 
            isSelected={bhk === '1'} 
            onClick={() => handleBhkChange('1')}
          >
            1
          </OptionButton>
          <OptionButton 
            isSelected={bhk === '2'} 
            onClick={() => handleBhkChange('2')}
          >
            2
          </OptionButton>
          <OptionButton 
            isSelected={bhk === '3'} 
            onClick={() => handleBhkChange('3')}
          >
            3
          </OptionButton>
          <OptionButton 
            isSelected={bhk === '4'} 
            onClick={() => handleBhkChange('4')}
          >
            4
          </OptionButton>
          <OptionButton 
            isSelected={bhk === '4+'} 
            onClick={() => handleBhkChange('4+')}
          >
            4+
          </OptionButton>
        </ButtonGroup>
      </FormField>
      
      <FormField>
        <Label>Bathrooms</Label>
        <ButtonGroup>
          <OptionButton 
            isSelected={bathrooms === '1'} 
            onClick={() => handleBathroomsChange('1')}
          >
            1
          </OptionButton>
          <OptionButton 
            isSelected={bathrooms === '2'} 
            onClick={() => handleBathroomsChange('2')}
          >
            2
          </OptionButton>
          <OptionButton 
            isSelected={bathrooms === '3'} 
            onClick={() => handleBathroomsChange('3')}
          >
            3
          </OptionButton>
          <OptionButton 
            isSelected={bathrooms === '4'} 
            onClick={() => handleBathroomsChange('4')}
          >
            4
          </OptionButton>
          <OptionButton 
            isSelected={bathrooms === '4+'} 
            onClick={() => handleBathroomsChange('4+')}
          >
            4+
          </OptionButton>
        </ButtonGroup>
      </FormField>
      
      <FormField>
        <Label>Furnishing</Label>
        <ButtonGroup>
          <OptionButton 
            isSelected={furnishing === 'Furnished'} 
            onClick={() => handleFurnishingChange('Furnished')}
          >
            Furnished
          </OptionButton>
          <OptionButton 
            isSelected={furnishing === 'Semi-Furnished'} 
            onClick={() => handleFurnishingChange('Semi-Furnished')}
          >
            Semi-Furnished
          </OptionButton>
          <OptionButton 
            isSelected={furnishing === 'Unfurnished'} 
            onClick={() => handleFurnishingChange('Unfurnished')}
          >
            Unfurnished
          </OptionButton>
        </ButtonGroup>
      </FormField>
      
      <FormField>
        <Label>Project Status</Label>
        <ButtonGroup>
          <OptionButton 
            isSelected={projectStatus === 'New Launch'} 
            onClick={() => handleProjectStatusChange('New Launch')}
          >
            New Launch
          </OptionButton>
          <OptionButton 
            isSelected={projectStatus === 'Ready to Move'} 
            onClick={() => handleProjectStatusChange('Ready to Move')}
          >
            Ready to Move
          </OptionButton>
          <OptionButton 
            isSelected={projectStatus === 'Under Construction'} 
            onClick={() => handleProjectStatusChange('Under Construction')}
          >
            Under Construction
          </OptionButton>
        </ButtonGroup>
      </FormField>
      
      <FormField>
        <Label>Listed by</Label>
        <ButtonGroup>
          <OptionButton 
            isSelected={listedBy === 'Builder'} 
            onClick={() => handleListedByChange('Builder')}
          >
            Builder
          </OptionButton>
          <OptionButton 
            isSelected={listedBy === 'Dealer'} 
            onClick={() => handleListedByChange('Dealer')}
          >
            Dealer
          </OptionButton>
          <OptionButton 
            isSelected={listedBy === 'Owner'} 
            onClick={() => handleListedByChange('Owner')}
          >
            Owner
          </OptionButton>
        </ButtonGroup>
      </FormField>
      
      <FormField>
        <Label>Super Builtup area sqft<RequiredStar>*</RequiredStar></Label>
        <InputWrapper>
          <NumberInput 
            type="text" 
            value={inputs.superBuiltupArea}
            onChange={(e) => handleInputChange(e, 'superBuiltupArea')}
            onBlur={() => handleInputBlur('superBuiltupArea')}
            hasError={errors.superBuiltupArea}
            placeholder=""
          />
          {inputs.superBuiltupArea && !errors.superBuiltupArea && (
            <CheckCircleIcon>✓</CheckCircleIcon>
          )}
        </InputWrapper>
        {errors.superBuiltupArea && (
          <ValidationMessage>Super Builtup area sqft is mandatory. Please complete the required field.</ValidationMessage>
        )}
      </FormField>
      
      <FormField>
        <Label>Carpet Area sqft<RequiredStar>*</RequiredStar></Label>
        <InputWrapper>
          <NumberInput 
            type="text" 
            value={inputs.carpetArea}
            onChange={(e) => handleInputChange(e, 'carpetArea')}
            onBlur={() => handleInputBlur('carpetArea')}
            hasError={errors.carpetArea}
            placeholder=""
          />
          {inputs.carpetArea && !errors.carpetArea && (
            <CheckCircleIcon>✓</CheckCircleIcon>
          )}
        </InputWrapper>
        {errors.carpetArea && (
          <ValidationMessage>Carpet Area sqft is mandatory. Please complete the required field.</ValidationMessage>
        )}
      </FormField>
      
      <FormField>
        <Label>Maintenance (Monthly)</Label>
        <InputWrapper>
          <NumberInput 
            type="text" 
            value={inputs.maintenance}
            onChange={(e) => handleInputChange(e, 'maintenance')}
            placeholder=""
          />
          {inputs.maintenance && (
            <CheckCircleIcon>✓</CheckCircleIcon>
          )}
        </InputWrapper>
      </FormField>
      
      <FormField>
        <Label>Total Floors</Label>
        <InputWrapper>
          <NumberInput 
            type="text" 
            value={inputs.totalFloors}
            onChange={(e) => handleInputChange(e, 'totalFloors')}
            placeholder=""
          />
          {inputs.totalFloors && (
            <CheckCircleIcon>✓</CheckCircleIcon>
          )}
        </InputWrapper>
      </FormField>
      
      <FormField>
        <Label>Floor No</Label>
        <InputWrapper>
          <NumberInput 
            type="text" 
            value={inputs.floorNo}
            onChange={(e) => handleInputChange(e, 'floorNo')}
            placeholder=""
          />
          {inputs.floorNo && (
            <CheckCircleIcon>✓</CheckCircleIcon>
          )}
        </InputWrapper>
      </FormField>
      
      <FormField>
        <Label>Car Parking</Label>
        <ButtonGroup>
          <OptionButton 
            isSelected={carParking === '0'} 
            onClick={() => handleCarParkingChange('0')}
          >
            0
          </OptionButton>
          <OptionButton 
            isSelected={carParking === '1'} 
            onClick={() => handleCarParkingChange('1')}
          >
            1
          </OptionButton>
          <OptionButton 
            isSelected={carParking === '2'} 
            onClick={() => handleCarParkingChange('2')}
          >
            2
          </OptionButton>
          <OptionButton 
            isSelected={carParking === '3'} 
            onClick={() => handleCarParkingChange('3')}
          >
            3
          </OptionButton>
          <OptionButton 
            isSelected={carParking === '3+'} 
            onClick={() => handleCarParkingChange('3+')}
          >
            3+
          </OptionButton>
        </ButtonGroup>
      </FormField>
      
      <FormField>
        <Label>Facing</Label>
        <SelectWrapper>
          <SelectDropdown 
            onChange={handleSelectChange} 
            value={inputs.facing}
            onBlur={handleSelectBlur}
            hasError={errors.facing}>
            <option value="">Select Facing</option>
            <option value="North">North</option>
            <option value="South">South</option>
            <option value="East">East</option>
            <option value="West">West</option>
            <option value="North-East">North-East</option>
            <option value="North-West">North-West</option>
            <option value="South-East">South-East</option>
            <option value="South-West">South-West</option>
          </SelectDropdown>
          {inputs.facing && !errors.facing && (
            <CheckCircleIcon>✓</CheckCircleIcon>
          )}
        </SelectWrapper>
        {errors.facing && (
          <ValidationMessage>Facing is mandatory. Please complete the required field.</ValidationMessage>
        )}
      </FormField>
      
      <FormField>
        <Label>Project Name</Label>
        <InputWrapper>
          <NumberInput 
            type="text" 
            value={inputs.projectName}
            onChange={(e) => handleInputChange(e, 'projectName')}
            placeholder=""
          />
          {inputs.projectName && (
            <CheckCircleIcon>✓</CheckCircleIcon>
          )}
        </InputWrapper>
        <div style={{ textAlign: 'right', fontSize: '12px', color: '#888' }}>0 / 70</div>
      </FormField>
    </div>
  );
};

export default AttributeSection; 