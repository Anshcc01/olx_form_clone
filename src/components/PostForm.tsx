import React, { useState } from 'react';
import styled from 'styled-components';
import AttributeSection from './AttributeSection';
import DescriptionSection from './DescriptionSection';
import PriceSection from './PriceSection';
import PhotoUploader from './PhotoUploader';
import LocationSection from './LocationSection';

// Responsive design breakpoints
const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  laptop: '1024px'
};

const FormContainer = styled.div`
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin-bottom: 20px;
  
  @media (min-width: ${breakpoints.tablet}) {
    padding: 24px;
  }
`;

const FormTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 24px;
  color: #002f34;
  
  @media (min-width: ${breakpoints.tablet}) {
    font-size: 28px;
  }
`;

const FormSection = styled.div`
  margin-bottom: 40px;
  padding-bottom: 40px;
  border-bottom: 1px solid #f2f4f5;
  
  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const SubmitButton = styled.button`
  background-color: #23e5db;
  color: #002f34;
  font-size: 16px;
  font-weight: 700;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  
  @media (min-width: ${breakpoints.tablet}) {
    width: auto;
    min-width: 200px;
  }
  
  &:hover {
    background-color: #1fcfb4;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 16px;
  font-size: 14px;
  background-color: #ffeeee;
  padding: 12px;
  border-radius: 4px;
  border-left: 4px solid red;
`;

interface FormData {
  title: string;
  description: string;
  price: string;
  photos: Array<any>;
  attributes: Record<string, string>;
  location: {
    state: string;
    city: string;
    neighborhood: string;
  };
}

const PostForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    price: '',
    photos: [],
    attributes: {},
    location: {
      state: '',
      city: '',
      neighborhood: ''
    }
  });
  
  const [formError, setFormError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  
  const handleAttributeChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      attributes: {
        ...prev.attributes,
        [name]: value
      }
    }));
  };
  
  const handleTitleChange = (title: string) => {
    setFormData(prev => ({ ...prev, title }));
  };
  
  const handleDescriptionChange = (description: string) => {
    setFormData(prev => ({ ...prev, description }));
  };
  
  const handlePriceChange = (price: string) => {
    setFormData(prev => ({ ...prev, price }));
  };
  
  const handlePhotoChange = (photos: Array<any>) => {
    setFormData(prev => ({ ...prev, photos }));
  };
  
  const handleLocationChange = (location: any) => {
    setFormData(prev => ({ ...prev, location }));
  };
  
  const validateForm = () => {
    if (!formData.title) {
      setFormError('Please add a title for your ad.');
      return false;
    }
    
    if (!formData.description) {
      setFormError('Please add a description for your ad.');
      return false;
    }
    
    if (!formData.price) {
      setFormError('Please set a price for your ad.');
      return false;
    }
    
    if (formData.photos.length === 0) {
      setFormError('Please upload at least one photo.');
      return false;
    }
    
    if (!formData.attributes.propertyType) {
      setFormError('Please select a property type.');
      return false;
    }
    
    if (!formData.attributes.superBuiltupArea) {
      setFormError('Please enter the Super Builtup area sqft.');
      return false;
    }
    
    if (!formData.attributes.carpetArea) {
      setFormError('Please enter the Carpet Area sqft.');
      return false;
    }
    
    if (!formData.location.state || !formData.location.city) {
      setFormError('Please select your location.');
      return false;
    }
    
    setFormError(null);
    return true;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    
    if (validateForm()) {
      console.log('Form data submitted:', formData);
      // Here you would typically send the data to your backend
      alert('Form submitted successfully!');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <FormContainer>
        <FormTitle>POST YOUR AD</FormTitle>
        
        {formError && submitted && <ErrorMessage>{formError}</ErrorMessage>}
        
        <FormSection>
          <AttributeSection onChange={handleAttributeChange} />
        </FormSection>
        
        <FormSection>
          <DescriptionSection 
            onTitleChange={handleTitleChange} 
            onDescriptionChange={handleDescriptionChange} 
          />
        </FormSection>
        
        <FormSection>
          <PriceSection onChange={handlePriceChange} />
        </FormSection>
        
        <FormSection>
          <PhotoUploader onChange={handlePhotoChange} />
        </FormSection>
        
        <FormSection>
          <LocationSection onChange={handleLocationChange} />
        </FormSection>
        
        <SubmitButton type="submit">POST NOW</SubmitButton>
      </FormContainer>
    </form>
  );
};

export default PostForm; 