# ZerionTV - IPTV Subscription Platform

## Overview

ZerionTV is a modern IPTV subscription platform that offers multiple subscription plans (monthly, quarterly, and annual) for streaming services. The application features a React-based frontend with a clean, modern UI built using shadcn/ui components, and an Express.js backend that handles subscription management and PIX payment integration for Brazilian users. The platform includes a floating WhatsApp button for customer support and displays subscription plans with pricing information.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Library**: shadcn/ui components built on top of Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens and CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation via @hookform/resolvers

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API endpoints for subscription and plan management
- **Request Logging**: Custom middleware for API request/response logging
- **Error Handling**: Centralized error handling middleware
- **Development**: Hot reload with tsx for development server

### Data Storage Solutions
- **Database**: PostgreSQL configured via Drizzle ORM
- **Schema Management**: Drizzle Kit for database migrations and schema management
- **Connection**: Neon Database serverless PostgreSQL driver
- **Fallback Storage**: In-memory storage implementation for development/testing
- **Session Storage**: PostgreSQL session store using connect-pg-simple

### Authentication and Authorization
- **Session Management**: Express sessions with PostgreSQL store
- **User Schema**: Basic username/password authentication system
- **Storage Interface**: Abstracted storage layer supporting both database and in-memory implementations

### Payment Integration
- **Payment Method**: PIX payment system for Brazilian market
- **Configuration**: Environment-based PIX key and WhatsApp number configuration
- **Subscription Tracking**: Database storage of subscription records with plan types and pricing

### Development and Build Tools
- **Development Server**: Vite development server with HMR
- **Build Process**: Vite for frontend, esbuild for backend bundling
- **Type Checking**: TypeScript with strict mode enabled
- **Code Quality**: ESLint configuration through Vite
- **Replit Integration**: Custom plugins for development banner and cartographer

### UI/UX Design Patterns
- **Design System**: Consistent component library with variant-based styling
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Accessibility**: Radix UI primitives ensure ARIA compliance
- **Theme Support**: CSS custom properties for light/dark mode support
- **Loading States**: Skeleton components and loading indicators
- **Toast Notifications**: Global toast system for user feedback

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL connection for Neon Database
- **drizzle-orm**: Type-safe ORM for PostgreSQL database interactions
- **@tanstack/react-query**: Server state management and caching
- **express**: Web application framework for Node.js backend
- **connect-pg-simple**: PostgreSQL session store for Express sessions

### UI Component Libraries
- **@radix-ui/***: Comprehensive collection of accessible, unstyled UI primitives
- **shadcn/ui**: Pre-built component library based on Radix UI
- **lucide-react**: Icon library for consistent iconography
- **tailwindcss**: Utility-first CSS framework for styling

### Development Tools
- **vite**: Fast build tool and development server
- **typescript**: Static type checking for JavaScript
- **drizzle-kit**: Database migration and introspection toolkit
- **esbuild**: Fast JavaScript bundler for production builds
- **tsx**: TypeScript execution environment for Node.js

### Validation and Forms
- **zod**: TypeScript-first schema validation library
- **react-hook-form**: Performant forms library with validation
- **@hookform/resolvers**: Resolvers for popular validation libraries

### Utility Libraries
- **clsx**: Utility for constructing className strings conditionally
- **tailwind-merge**: Utility for merging Tailwind CSS classes
- **class-variance-authority**: Library for creating variant-based component APIs
- **date-fns**: Modern JavaScript date utility library

### Communication Integration
- **WhatsApp Integration**: Direct messaging integration for customer support
- **PIX Payment System**: Brazilian instant payment method integration