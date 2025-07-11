# EmailNow - Email Automation Platform

## Overview

EmailNow is a full-stack email automation platform built with modern web technologies. It allows users to send individual emails or bulk emails to HR professionals and recruiters. The application features a sleek, modern UI with aurora-themed styling and provides both individual and bulk email sending capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a monorepo structure with clear separation between client-side React frontend and server-side Express backend, sharing common schemas and types.

### Architecture Pattern
- **Monorepo Structure**: Single repository containing client, server, and shared code
- **Full-Stack TypeScript**: End-to-end TypeScript for type safety
- **Modern Build Tools**: Vite for frontend bundling, esbuild for backend compilation
- **Database-First Design**: PostgreSQL with Drizzle ORM for type-safe database operations

## Key Components

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom aurora-themed design system
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Email Service**: Nodemailer for SMTP email sending
- **Session Management**: Connect-pg-simple for PostgreSQL session storage
- **API Design**: RESTful API with JSON responses

### Database Schema
- **hr_contacts**: Stores HR professional contact information (name, email, company, position, industry)
- **email_logs**: Tracks email sending history and status (recipient, subject, message, type, status, timestamp)

## Data Flow

1. **Email Composition**: User creates email content through the frontend form
2. **Validation**: Client-side validation using Zod schemas
3. **API Request**: Form data sent to Express backend via REST API
4. **Database Storage**: Email log created in PostgreSQL database
5. **Email Sending**: Nodemailer processes email through SMTP
6. **Status Updates**: Email status tracked and updated in database
7. **Real-time Feedback**: Progress updates shown to user via React Query

### Individual Email Flow
- User fills out single recipient form
- Email sent immediately via Nodemailer
- Success/failure feedback provided instantly

### Bulk Email Flow
- User selects quantity of contacts to email
- HR contacts fetched from database
- Emails sent with delay between each to prevent spam
- Progress modal shows real-time sending status

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection
- **drizzle-orm**: Type-safe database ORM
- **nodemailer**: Email sending service
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Headless UI components
- **tailwindcss**: Utility-first CSS framework

### Development Dependencies
- **vite**: Frontend build tool
- **esbuild**: Backend bundler
- **tsx**: TypeScript execution for development
- **drizzle-kit**: Database migrations and schema management

## Deployment Strategy

### Development Environment
- **Frontend**: Vite dev server with HMR
- **Backend**: tsx for direct TypeScript execution
- **Database**: Local PostgreSQL or cloud database via DATABASE_URL

### Production Build
- **Frontend**: Vite builds static assets to `dist/public`
- **Backend**: esbuild bundles server code to `dist/index.js`
- **Database**: Drizzle migrations applied via `drizzle-kit push`

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`: Email service configuration
- `NODE_ENV`: Environment mode (development/production)

### Key Features
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Real-time Progress**: Live updates during bulk email sending
- **Error Handling**: Comprehensive error handling with user feedback
- **Type Safety**: Full TypeScript coverage across the stack
- **Modern UI**: Aurora-themed design with glass morphism effects
- **Email Tracking**: Complete audit trail of all email activities

The application is designed to be easily deployable to platforms like Replit, Vercel, or any Node.js hosting service, with minimal configuration required beyond environment variables.