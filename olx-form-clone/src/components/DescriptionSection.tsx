import React, { useState } from 'react';
import styled from 'styled-components';

// Responsive design breakpoints
const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  laptop: '1024px'
};

interface DescriptionSectionProps {
  onTitleChange: (title: string) => void;
  onDescriptionChange: (description: string) => void;
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

const Input = styled.input<{ hasError?: boolean }>`
  width: 100%;
  padding: 10px 30px 10px 10px;
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

const Textarea = styled.textarea<{ hasError?: boolean }>`
  width: 100%;
  height: 120px;
  padding: 10px;
  border: 1px solid ${props => props.hasError ? 'red' : '#d8dfe0'};
  border-radius: 4px;
  font-size: 14px;
  resize: vertical;
  
  @media (max-width: ${breakpoints.mobile}) {
    height: 100px;
    font-size: 13px;
  }
  
  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? 'red' : '#23e5db'};
  }
`;

const CharCount = styled.div`
  text-align: right;
  font-size: 12px;
  color: #888;
  margin-top: 4px;
`;

const Tip = styled.p`
  font-size: 12px;
  color: #888;
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

const ValidationMessage = styled.p`
  font-size: 12px;
  color: red;
  margin-top: 4px;
`;

const DescriptionSection: React.FC<DescriptionSectionProps> = ({
  onTitleChange,
  onDescriptionChange
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<{
    title?: boolean;
    description?: boolean;
  }>({});
  
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
    onTitleChange(value);
    
    if (value) {
      setErrors({
        ...errors,
        title: false
      });
    }
  };
  
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setDescription(value);
    onDescriptionChange(value);
    
    if (value) {
      setErrors({
        ...errors,
        description: false
      });
    }
  };
  
  const handleTitleBlur = () => {
    if (!title) {
      setErrors({
        ...errors,
        title: true
      });
    }
  };
  
  const handleDescriptionBlur = () => {
    if (!description) {
      setErrors({
        ...errors,
        description: true
      });
    }
  };
  
  return (
    <div>
      <SectionTitle>INCLUDE SOME DETAILS</SectionTitle>
      
      <FormField>
        <Label>Ad title<RequiredStar>*</RequiredStar></Label>
        <InputWrapper>
          <Input 
            type="text" 
            placeholder="Mention the key features of your item (e.g. brand, model, age, type)" 
            value={title}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
            hasError={errors.title}
            maxLength={70}
          />
          {title && !errors.title && (
            <CheckCircleIcon>✓</CheckCircleIcon>
          )}
        </InputWrapper>
        <CharCount>{title.length} / 70</CharCount>
        {errors.title && (
          <ValidationMessage>Title is mandatory. Please complete the required field.</ValidationMessage>
        )}
      </FormField>
      
      <FormField>
        <Label>Description<RequiredStar>*</RequiredStar></Label>
        <Textarea 
          placeholder="Include condition, features and reason for selling" 
          value={description}
          onChange={handleDescriptionChange}
          onBlur={handleDescriptionBlur}
          hasError={errors.description}
          maxLength={4096}
        />
        <CharCount>{description.length} / 4096</CharCount>
        <Tip>Avoid including your phone number, email or website links, they'll be automatically removed.</Tip>
        {errors.description && (
          <ValidationMessage>Description is mandatory. Please complete the required field.</ValidationMessage>
        )}
      </FormField>
    </div>
  );
};

export default DescriptionSection; 