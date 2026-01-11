# Shopping List Application

## Tech Stack

### Core Framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server

### State Management & Data Fetching
- **TanStack Query (React Query)** - Server state management, caching, and data synchronization
- **TanStack Form** - Form state management with validation

### Routing
- **React Router DOM** - Client-side routing for navigation between pages


## Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager
- Backend API running on `http://localhost:3000` (or configure via environment variable)

## Setup & Installation

1. **Clone the repository**
   ```bash
   cd shopping-list-fe
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```bash
   VITE_API_URL=http://localhost:3000
   ```
   
   Or copy from the example:
   ```bash
   cp .env.example .env
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   
   The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/
│   ├── shopping-list/     # Shopping list components
│   │   ├── ItemRow.tsx
│   │   ├── ItemForm.tsx
│   │   ├── AddItemDialog.tsx
│   │   ├── EditItemDialog.tsx
│   │   └── DeleteItemDialog.tsx
│   └── ui/                # Reusable UI components (shadcn/ui)
├── pages/
│   ├── ShoppingList.tsx   # Main list page
│   └── ItemPage.tsx       # Item details page
├── hooks/
│   ├── use-items.ts       # TanStack Query hooks for API
│   └── use-media-query.ts # Responsive design hook
├── lib/
│   └── api.ts             # API client functions
└── App.tsx                # Root component with routing
```

## API Integration

The application expects a REST API with the following endpoints:

- `GET /api/items` - Fetch all items
- `GET /api/items/:id` - Fetch single item
- `POST /api/items` - Create new item
- `PUT /api/items/:id` - Update item
- `DELETE /api/items/:id` - Delete item

Configure the backend URL via the `VITE_API_URL` environment variable.
