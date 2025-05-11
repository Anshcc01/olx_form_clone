import React, { useState } from 'react';
import styled from 'styled-components';

interface UserSectionProps {
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

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 4px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #d8dfe0;
  font-size: 14px;
  outline: none;
  
  &:focus {
    border-color: #23e5db;
  }
`;

const PhoneInputContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CountryCode = styled.div`
  padding: 12px;
  background-color: #f2f4f5;
  border: 1px solid #d8dfe0;
  border-right: none;
  border-radius: 4px 0 0 4px;
  color: #002f34;
  font-size: 14px;
`;

const PhoneInput = styled.input`
  flex: 1;
  padding: 12px;
  border-radius: 0 4px 4px 0;
  border: 1px solid #d8dfe0;
  font-size: 14px;
  outline: none;
  
  &:focus {
    border-color: #23e5db;
  }
`;

const CharacterCount = styled.div`
  text-align: right;
  font-size: 12px;
  color: #888;
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

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const ProfileImage = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #333;
  margin-right: 16px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  
  svg {
    width: 24px;
    height: 24px;
  }
`;

const VerificationText = styled.p`
  font-size: 14px;
  margin-top: 20px;
  margin-bottom: 8px;
  color: #002f34;
`;

const UserSection: React.FC<UserSectionProps> = ({ onChange }) => {
  const [name, setName] = useState('forex011');
  const [phone, setPhone] = useState('');
  const maxNameChars = 30;
  
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    onChange('name', value);
  };
  
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setPhone(value);
    onChange('phone', value);
  };
  
  return (
    <div>
      <SectionTitle>REVIEW YOUR DETAILS</SectionTitle>
      
      <ProfileSection>
        <ProfileImage>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z" stroke="white" strokeWidth="2"/>
            <path d="M15 10C15 11.6569 13.6569 13 12 13C10.3431 13 9 11.6569 9 10C9 8.34315 10.3431 7 12 7C13.6569 7 15 8.34315 15 10Z" stroke="white" strokeWidth="2"/>
            <path d="M17.8707 18.0001C16.7994 16.5342 14.5671 15.5 12.0001 15.5C9.43304 15.5 7.20067 16.5342 6.12939 18.0001" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </ProfileImage>
        
        <div>
          <Label>Name</Label>
          <InputWrapper>
            <Input 
              type="text" 
              value={name}
              onChange={handleNameChange}
              maxLength={maxNameChars}
            />
          </InputWrapper>
          <CharacterCount>{name.length} / {maxNameChars}</CharacterCount>
        </div>
      </ProfileSection>
      
      <VerificationText>
        Let's verify your account
      </VerificationText>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>
        We will send you a confirmation code by sms on the next step.
      </p>
      
      <FormField>
        <Label>Mobile Phone Number<RequiredStar>*</RequiredStar></Label>
        <PhoneInputContainer>
          <CountryCode>+91</CountryCode>
          <PhoneInput 
            type="text" 
            value={phone}
            onChange={handlePhoneChange}
            placeholder=""
          />
        </PhoneInputContainer>
      </FormField>
    </div>
  );
};

export default UserSection; 