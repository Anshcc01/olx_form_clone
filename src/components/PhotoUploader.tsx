import React, { useState, useRef, useCallback } from 'react';
import styled from 'styled-components';

// Responsive design breakpoints
const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  laptop: '1024px'
};

interface PhotoUploaderProps {
  onChange: (photos: any[]) => void;
}

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #002f34;
`;

const PhotoGrid = styled.div<{ hasError?: boolean }>`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
  gap: 8px;
  margin-bottom: 8px;
  border: ${props => props.hasError ? '1px solid red' : 'none'};
  padding: ${props => props.hasError ? '8px' : '0'};
  border-radius: 4px;
  
  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
    gap: 6px;
  }
`;

const PhotoUploadBox = styled.div<{ hasError?: boolean }>`
  width: 100%;
  aspect-ratio: 1/1;
  border: 1px solid ${props => props.hasError ? 'red' : '#d8dfe0'};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: white;
`;

const PhotoIcon = styled.div`
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 24px;
    height: 24px;
    color: #002f34;
  }
`;

const UploadText = styled.p`
  font-size: 12px;
  color: #002f34;
  text-align: center;
`;

const PhotoPreview = styled.div<{ isDragging?: boolean }>`
  width: 100%;
  aspect-ratio: 1/1;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid ${props => props.isDragging ? '#23e5db' : '#d8dfe0'};
  box-shadow: ${props => props.isDragging ? '0 0 8px rgba(35, 229, 219, 0.5)' : 'none'};
  cursor: move;
`;

const PhotoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const RequiredText = styled.p`
  font-size: 12px;
  color: red;
  margin-top: 4px;
`;

const HiddenInput = styled.input`
  display: none;
`;

const CoverLabel = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  font-size: 12px;
  text-align: center;
  padding: 4px;
  text-transform: uppercase;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 14px;
`;

const DragInstructions = styled.p`
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
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

const StatusWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
`;

const SuccessText = styled.span`
  color: #008000;
  font-size: 14px;
  margin-left: 5px;
`;

const PhotoUploader: React.FC<PhotoUploaderProps> = ({ onChange }) => {
  const [photos, setPhotos] = useState<any[]>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [error, setError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPhotos = Array.from(files).map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }));
      
      const updatedPhotos = [...photos, ...newPhotos].slice(0, 20);
      setPhotos(updatedPhotos);
      onChange(updatedPhotos);
      setError(false);
    }
  };
  
  const handleBoxClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };
  
  const handleDragOver = useCallback((e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== index) {
      // Reorder the photos array
      const newPhotos = [...photos];
      const draggedPhoto = newPhotos[draggedIndex];
      newPhotos.splice(draggedIndex, 1);
      newPhotos.splice(index, 0, draggedPhoto);
      
      setPhotos(newPhotos);
      onChange(newPhotos);
      setDraggedIndex(index);
    }
  }, [draggedIndex, photos, onChange]);
  
  const handleDragEnd = () => {
    setDraggedIndex(null);
  };
  
  const handleRemovePhoto = (index: number) => {
    const newPhotos = [...photos];
    newPhotos.splice(index, 1);
    setPhotos(newPhotos);
    onChange(newPhotos);
    
    if (newPhotos.length === 0) {
      setError(true);
    }
  };
  
  const checkValidation = () => {
    if (photos.length === 0) {
      setError(true);
      return false;
    }
    return true;
  };
  
  // Create a grid of 20 photo slots (5 rows of 4)
  const renderPhotoGrid = () => {
    const grid = [];
    const maxPhotos = 20;
    
    // First add existing photos
    for (let i = 0; i < photos.length; i++) {
      grid.push(
        <PhotoPreview 
          key={`photo-${i}`} 
          isDragging={draggedIndex === i}
          draggable
          onDragStart={() => handleDragStart(i)}
          onDragOver={(e) => handleDragOver(e, i)}
          onDragEnd={handleDragEnd}
        >
          <PhotoImage src={photos[i].preview} alt={`preview-${i}`} />
          {i === 0 && <CoverLabel>Cover</CoverLabel>}
          <RemoveButton onClick={() => handleRemovePhoto(i)}>×</RemoveButton>
        </PhotoPreview>
      );
    }
    
    // Then add the upload box if we're under the limit
    if (photos.length < maxPhotos) {
      grid.push(
        <PhotoUploadBox 
          key="upload-box" 
          onClick={handleBoxClick}
          hasError={error}
          onBlur={checkValidation}
        >
          <PhotoIcon>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 8H6.01M6 16V8M6 16H5M6 16C6 16.5523 6.44772 17 7 17H13M6 8C6 7.44772 6.44772 7 7 7H13C13.5523 7 14 7.44772 14 8V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 14L15 11.5V16.5L10 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </PhotoIcon>
          <UploadText>Add Photo</UploadText>
        </PhotoUploadBox>
      );
    }
    
    // Fill the rest with empty boxes to maintain grid structure
    for (let i = grid.length; i < maxPhotos; i++) {
      grid.push(
        <PhotoUploadBox key={`empty-${i}`} style={{ cursor: 'default' }} hasError={false}>
          <PhotoIcon>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 8H6.01M6 16V8M6 16H5M6 16C6 16.5523 6.44772 17 7 17H13M6 8C6 7.44772 6.44772 7 7 7H13C13.5523 7 14 7.44772 14 8V10" stroke="#d8dfe0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 14L15 11.5V16.5L10 14Z" stroke="#d8dfe0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </PhotoIcon>
        </PhotoUploadBox>
      );
    }
    
    return grid;
  };
  
  return (
    <div>
      <SectionTitle>UPLOAD UP TO 20 PHOTOS</SectionTitle>
      
      {photos.length > 0 && (
        <DragInstructions>
          Drag to reorder. First image will be the cover image.
        </DragInstructions>
      )}
      
      <PhotoGrid hasError={error}>
        {renderPhotoGrid()}
      </PhotoGrid>
      
      <HiddenInput 
        type="file" 
        accept="image/*" 
        multiple
        ref={fileInputRef}
        onChange={handlePhotoUpload}
      />
      
      {error && (
        <ValidationMessage>This field is mandatory. Please upload at least one photo.</ValidationMessage>
      )}
      
      {photos.length > 0 && !error && (
        <StatusWrapper>
          <SuccessText>
            <CheckCircleIcon style={{ position: 'static', transform: 'none', marginRight: '5px' }}>✓</CheckCircleIcon>
            {photos.length} photo{photos.length > 1 ? 's' : ''} uploaded
          </SuccessText>
        </StatusWrapper>
      )}
    </div>
  );
};

export default PhotoUploader; 