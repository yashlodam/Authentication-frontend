# Authentication Frontend

A modern, responsive React application for user authentication and authorization with OAuth2 support. Built with industry-standard tools and best practices for secure, scalable frontend development.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Configuration](#configuration)
- [Project Architecture](#project-architecture)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **User Authentication**: Secure login and registration system
- **OAuth2 Integration**: Support for third-party OAuth2 providers
- **State Management**: Centralized state management using Zustand
- **Protected Routes**: Route guards for authenticated and unauthenticated users
- **Responsive UI**: Mobile-friendly design with animated components
- **Toast Notifications**: User feedback system for actions and errors
- **TypeScript Support**: Full type safety across the application
- **API Integration**: Axios-based HTTP client for backend communication

## 🛠️ Tech Stack

| Technology | Purpose | Version |
|-----------|---------|---------|
| **React** | UI Framework | - |
| **Vite** | Build Tool & Dev Server | ^8.0.12 |
| **TypeScript** | Type Safety | ~6.0.2 |
| **React Router DOM** | Client-side Routing | ^7.15.0 |
| **Zustand** | State Management | ^5.0.13 |
| **Axios** | HTTP Client | ^1.16.1 |
| **Lucide React** | Icon Library | ^1.16.0 |

## 📁 Project Structure

```
Authentication-frontend/
├── public/                    # Static assets
├── src/
│   ├── assets/               # Images and media files
│   ├── auth/
│   │   └── store.jsx         # Zustand store for auth state
│   ├── components/           # Reusable React components
│   │   ├── AnimatedBackground.jsx
│   │   ├── Icons.jsx
│   │   ├── OAuth2Buttons.jsx
│   │   ├── RouteGuards.jsx
│   │   └── Toast.jsx
│   ├── config/
│   │   └── ApiClient.js      # Axios configuration
│   ├── pages/                # Page components
│   │   ├── AuthPage.jsx
│   │   ├── Dashboard.jsx
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── OAuthCallback.jsx
│   │   ├── OAuthError.jsx
│   │   ├── OAuthSucess.jsx
│   │   ├── RegisterPage.jsx
│   │   └── UserHome.jsx
│   ├── services/
│   │   └── AuthService.js    # Authentication business logic
│   ├── App.jsx               # Root app component
│   ├── index.css             # Global styles
│   └── main.jsx              # Application entry point
├── index.html                # HTML template
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
└── vite.config.js            # Vite configuration
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** (v9 or higher) or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Authentication-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=http://localhost:3000
   VITE_OAUTH_CLIENT_ID=your_oauth_client_id
   VITE_OAUTH_REDIRECT_URI=http://localhost:5173/oauth/callback
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

## 📜 Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| **Development** | `npm run dev` | Start Vite dev server with hot module reload |
| **Build** | `npm run build` | Create optimized production build |
| **Preview** | `npm run preview` | Preview production build locally |

## ⚙️ Configuration

### API Client Configuration

The API client is configured in [`src/config/ApiClient.js`](src/config/ApiClient.js) using Axios. Customize:
- Base URL via `VITE_API_BASE_URL` environment variable
- Default headers and authentication tokens
- Interceptors for request/response handling

### Environment Variables

Create `.env.local`, `.env.development`, and `.env.production` files as needed:

```env
VITE_API_BASE_URL=your_api_base_url
VITE_OAUTH_CLIENT_ID=your_oauth_client_id
VITE_OAUTH_REDIRECT_URI=your_redirect_uri
VITE_APP_NAME=Authentication Frontend
```

## 🏗️ Project Architecture

### State Management
Authentication state is managed using **Zustand** in `src/auth/store.jsx`:
- User information
- Authentication tokens
- Login/logout operations

### Routing
Client-side routing powered by **React Router DOM**:
- Protected routes for authenticated users
- Public routes for authentication pages
- OAuth2 callback handling

### Components
- **RouteGuards.jsx**: Protects routes based on authentication status
- **OAuth2Buttons.jsx**: Third-party provider login buttons
- **Toast.jsx**: Notification system for user feedback
- **AnimatedBackground.jsx**: UI enhancement component

### Services
- **AuthService.js**: Handles authentication API calls and logic
- **ApiClient.js**: Configured Axios instance for API communication

## 📝 Development Guidelines

### Code Structure
- Keep components focused and single-responsibility
- Use hooks for component logic
- Leverage Zustand for global state
- Use TypeScript for type safety where applicable

### Naming Conventions
- Components: PascalCase (e.g., `LoginPage.jsx`)
- Utilities/Services: camelCase (e.g., `authService.js`)
- Stores: camelCase with "store" suffix (e.g., `store.jsx`)

### Component Patterns
```jsx
// Use functional components with hooks
export default function MyComponent() {
  // Component logic
  return (
    // JSX
  );
}
```

## 🔐 Security Considerations

- **HTTPS Only**: Ensure HTTPS in production for OAuth2
- **Token Storage**: Store tokens securely (consider httpOnly cookies)
- **CORS**: Configure CORS properly on backend
- **Environment Variables**: Never commit sensitive credentials
- **Input Validation**: Validate all user inputs before submission

## 📦 Building for Production

```bash
npm run build
```

Output files are generated in the `dist/` directory. Deploy these static files to your hosting platform (Vercel, Netlify, AWS S3, etc.).

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m 'Add your feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See LICENSE file for details.

## 📞 Support

For issues, questions, or suggestions, please open an issue on the repository or contact the development team.

---

**Last Updated**: May 2026
