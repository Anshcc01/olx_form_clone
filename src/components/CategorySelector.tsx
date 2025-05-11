import React, { useState } from 'react';
import styled from 'styled-components';

interface CategorySelectorProps {
  onChange: (category: string) => void;
}

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 16px;
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  gap: 16px;
  margin-top: 16px;
`;

const CategoryCard = styled.div<{ isSelected: boolean }>`
  padding: 16px;
  border-radius: 4px;
  border: 1px solid ${props => props.isSelected ? 'var(--accent-color)' : 'var(--border-color)'};
  background-color: ${props => props.isSelected ? 'rgba(35, 229, 219, 0.1)' : 'var(--bg-white)'};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: var(--accent-color);
  }
`;

const CategoryIcon = styled.div`
  width: 48px;
  height: 48px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 32px;
    height: 32px;
    color: var(--primary-color);
  }
`;

const CategoryName = styled.p`
  font-size: 14px;
  font-weight: 500;
`;

// Mock data for category cards
const categoryOptions = [
  { id: 'mobiles', name: 'Mobiles' },
  { id: 'electronics', name: 'Electronics & Appliances' },
  { id: 'cars', name: 'Cars' },
  { id: 'bikes', name: 'Motorcycles' },
  { id: 'furniture', name: 'Furniture' },
  { id: 'fashion', name: 'Fashion' },
  { id: 'real_estate', name: 'Real Estate' },
  { id: 'services', name: 'Services' },
  { id: 'jobs', name: 'Jobs' },
  { id: 'pets', name: 'Pets' },
  { id: 'education', name: 'Books, Sports & Hobbies' },
  { id: 'commercial', name: 'Commercial Vehicles & Spares' }
];

const CategorySelector: React.FC<CategorySelectorProps> = ({ onChange }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    onChange(categoryId);
  };

  return (
    <div>
      <SectionTitle>CHOOSE A CATEGORY</SectionTitle>
      <p>Select the category that best fits your ad</p>
      
      <CategoriesGrid>
        {categoryOptions.map((category) => (
          <CategoryCard 
            key={category.id} 
            isSelected={selectedCategory === category.id}
            onClick={() => handleCategorySelect(category.id)}
          >
            <CategoryIcon>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="24" rx="12" fill="currentColor" fillOpacity="0.1" />
                <path d="M12 6V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M6 12H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </CategoryIcon>
            <CategoryName>{category.name}</CategoryName>
          </CategoryCard>
        ))}
      </CategoriesGrid>
    </div>
  );
};

export default CategorySelector; 