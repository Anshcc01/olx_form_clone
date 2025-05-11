# OLX Form Clone

A React TypeScript implementation of the OLX Post Ad form. This project replicates the look and feel of the form found at https://www.olx.in/en-in/post/attributes.

## Features

- Category selection with a grid of options
- Dynamic attribute fields based on selected category
- Title and description input with character count
- Price section with currency symbol and negotiable option
- Photo uploader with preview and removal options
- Location autocomplete with suggestions
- Responsive design matching the OLX UI/UX

## Project Setup

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository:
```
git clone <repository-url>
```

2. Navigate to the project directory:
```
cd olx-form-clone
```

3. Install dependencies:
```
npm install
```
or
```
yarn install
```

4. Start the development server:
```
npm run dev
```
or
```
yarn dev
```

5. Open your browser and visit `http://localhost:5173`

## Project Structure

- `src/components/` - Contains all the form components
  - `PostForm.tsx` - Main form container component
  - `CategorySelector.tsx` - Grid of category options
  - `AttributeSection.tsx` - Dynamic fields based on category
  - `DescriptionSection.tsx` - Title and description inputs
  - `PriceSection.tsx` - Price input with currency symbol
  - `PhotoUploader.tsx` - Photo upload and preview functionality
  - `LocationSection.tsx` - Location search with autocomplete

## Notes

This is a frontend-only implementation focused on the UI/UX of the OLX form. In a real-world scenario, you would integrate this with backend APIs for:

- Saving form data
- Uploading and storing images
- Address/location verification
- User authentication

## License

MIT 
