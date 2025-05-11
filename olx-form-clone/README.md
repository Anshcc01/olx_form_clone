# OLX Form Clone

A responsive React TypeScript application that replicates a real estate listing form with validation.

## Features

- Complete real estate form with field validation
- Responsive design for all device sizes
- Interactive form elements (dropdowns, button groups)
- Image upload and reordering with cover image functionality
- Location selection with state, city, and neighborhood dropdowns
- Form validation with error messages and visual indicators

## Deployment on Vercel

This project is configured for easy deployment on Vercel.

### Manual Deployment

1. Install the Vercel CLI:
   ```
   npm install -g vercel
   ```

2. Login to Vercel:
   ```
   vercel login
   ```

3. Deploy the project:
   ```
   vercel
   ```

### Automatic Deployment via GitHub

1. Push the code to your GitHub repository.
2. Import the project on Vercel dashboard: [https://vercel.com/new](https://vercel.com/new)
3. Connect your GitHub repository
4. Configure the project:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Click "Deploy" and Vercel will automatically build and deploy your application.

## Development

1. Install dependencies:
   ```
   npm install
   ```

2. Start development server:
   ```
   npm run dev
   ```

3. Build for production:
   ```
   npm run build
   ```

## Technologies Used

- React 18
- TypeScript
- Styled Components
- Vite

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