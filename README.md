# Addore - Jewellery Catalogue Website

A production-ready jewellery catalogue website built with React, Ant Design, and Google Sheets integration. This is a catalogue-only website (no checkout) focused on showcasing jewellery products with fast loading and optimized image handling.

## 🚀 Features

- **Product Catalogue**: Browse jewellery products with filtering and search
- **Google Sheets Integration**: Manage products via Google Sheets (no backend required)
- **Google Drive Images**: Automatic conversion of Drive links to optimized image URLs
- **Performance Optimized**: Lazy loading, memoization, and caching for fast loading
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Static Pages**: About, Contact, Privacy Policy, Terms & Conditions, Shipping & Returns

## 🛠 Tech Stack

- **React** 19.2.0 (JavaScript)
- **Ant Design** 6.1.1 - UI component library
- **React Router DOM** 7.11.0 - Routing
- **Axios** 1.13.2 - HTTP client
- **Vite** 7.2.4 - Build tool
- **CSS Modules** - Component styling

## 📋 Prerequisites

- Node.js 18+ and npm
- Google account for Sheets API access
- Google Sheet with product data (see setup below)

## 🔧 Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd addore
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_GOOGLE_SHEETS_API_KEY=your_api_key_here
   VITE_GOOGLE_SHEET_ID=your_sheet_id_here
   ```
   
   See the [Google Sheets Setup](#google-sheets-setup) section below for detailed instructions.

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📊 Google Sheets Setup

### Step 1: Create Your Google Sheet

1. Create a new Google Sheet
2. Set up the following columns in Row 1 (headers):

| Column Name      | Description                | Example                |
|-----------------|----------------------------|------------------------|
| id              | Unique product ID          | 1, 2, 3...            |
| name            | Product name               | "Gold Diamond Ring"    |
| category        | Product category           | Ring, Necklace, Earrings |
| price           | Final selling price        | 299.99                 |
| original_price  | Original price before discount | 399.99            |
| discount_percent| Discount percentage        | 25                     |
| image_url       | Google Drive share link    | https://drive.google.com/... |
| description     | Product description        | "Beautiful gold ring..." |
| featured        | Featured on homepage       | TRUE, FALSE            |

3. Add your product data starting from Row 2

### Step 2: Make Sheet Public (Option 1 - Recommended for Quick Start)

1. Click **Share** button in the top right
2. Click **Change to anyone with the link**
3. Set permission to **Viewer**
4. Copy the link
5. Extract the Sheet ID from the URL:
   ```
   https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
   ```
6. Use this Sheet ID in your `.env` file
7. You can leave `VITE_GOOGLE_SHEETS_API_KEY` empty if using public sheet

### Step 3: Set Up Google Sheets API (Option 2 - For Private Sheets)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google Sheets API**:
   - Navigate to **APIs & Services** > **Library**
   - Search for "Google Sheets API"
   - Click **Enable**
4. Create an API Key:
   - Go to **APIs & Services** > **Credentials**
   - Click **Create Credentials** > **API Key**
   - Copy the API key
   - (Optional) Restrict the API key to Google Sheets API only
5. Add the API key to your `.env` file

### Step 4: Get Your Sheet ID

From your Google Sheet URL:
```
https://docs.google.com/spreadsheets/d/SHEET_ID/edit
```

Copy the `SHEET_ID` part and add it to your `.env` file.

## 🖼 Google Drive Image Setup

1. Upload your product images to Google Drive
2. Right-click on an image > **Get link**
3. Set permission to **Anyone with the link** > **Viewer**
4. Copy the share link
5. Paste it in the `image_url` column of your Google Sheet

The app automatically converts Google Drive share links to direct image URLs for optimal loading.

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── Header/         # Navigation header
│   ├── Footer/         # Site footer
│   ├── ProductCard/    # Product display card
│   ├── ProductModal/   # Product detail modal
│   ├── ImageLoader/    # Optimized image loader
│   └── SkeletonLoader/ # Loading skeletons
├── pages/              # Page components
│   ├── Home/          # Homepage
│   ├── Catalogue/     # Product catalogue
│   └── StaticPages/   # About, Contact, etc.
├── services/          # Data services
│   ├── googleSheetsService.js  # Google Sheets API
│   └── productService.js      # Product data logic
├── hooks/             # Custom React hooks
│   └── useProducts.js # Products data hook
├── utils/             # Utility functions
│   ├── imageUtils.js  # Image URL conversion
│   └── constants.js   # App constants
├── styles/            # Global styles
│   └── global.css     # CSS reset and variables
├── App.jsx            # Main app component
└── main.jsx           # Entry point
```

## 🎨 Performance Optimizations

- **Lazy Loading**: Images load only when visible (Intersection Observer)
- **Code Splitting**: Routes loaded on-demand (React.lazy)
- **Memoization**: ProductCard components memoized to prevent re-renders
- **Caching**: Google Sheets data cached for 5 minutes
- **Skeleton Loaders**: Smooth loading experience with Ant Design skeletons
- **Pagination**: Products displayed in pages (24 per page)

## 🚢 Deployment

### Netlify

1. Push your code to GitHub
2. Import project in Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add environment variables in Netlify dashboard
6. Deploy

### Environment Variables

Make sure to add your environment variables in your deployment platform:
- `VITE_GOOGLE_SHEETS_API_KEY`
- `VITE_GOOGLE_SHEET_ID`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔐 Security Notes

- Never commit your `.env` file (already in `.gitignore`)
- For production, restrict your Google Sheets API key to specific domains
- Consider using environment-specific API keys

## 📄 License

This project is private and proprietary.

## 🤝 Support

For questions or issues, please contact the development team.

---

Built with ❤️
