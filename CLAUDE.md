# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Communication Guidelines

**言語設定**: ユーザーとのコミュニケーションは**日本語**で行うこと。このプロジェクトは日本の家庭教師マッチングサービスであり、ユーザーは日本語話者です。

## Project Overview

**家庭教師つなぐ (Katekyotsunagu)** - A tutoring matching service with dual-direction matching capabilities. Parents can find tutors for their children, and tutors can find students to teach. The platform uses an approval-flow system where administrators mediate all connections.

## Key Architecture Concepts

### Dual-Direction Matching System
The platform supports two distinct matching flows:
1. **Traditional**: Parents search for teachers and send teaching requests
2. **Reverse**: Teachers search for students and apply to teach them

This is implemented through separate data models:
- `ParentProfile` + `MatchRequest` (traditional flow)
- `StudentProfile` + `JobPosting` + `TeacherApplication` (reverse flow)

### Static Export Configuration
The project is configured for static site generation (`output: 'export'`) to enable deployment on traditional web hosting like Xserver. This means:
- No server-side rendering at runtime
- All dynamic routes must implement `generateStaticParams()`
- Sample data is used instead of live database queries for static builds
- Database functionality is preserved for future dynamic deployment

### CSS Architecture
Uses **custom CSS utility classes** instead of Tailwind CSS due to compilation issues. The approach mimics Tailwind's utility-first methodology but with manually defined classes in `globals.css`:
- CSS variables for consistent theming (`--primary-hsl: 162 63% 41%`)
- Utility classes for layout, typography, colors, spacing
- Component-specific styles when needed

## Development Commands

### Database Operations
```bash
npm run db:push          # Push schema changes to database
npm run db:studio        # Open Prisma Studio for data management
npm run db:seed          # Seed database with sample data
```

### Development & Build
```bash
npm run dev              # Start development server
npm run build            # Build static site for deployment
npm run start            # Start production server (for testing)
npm run lint             # Run ESLint
```

### Static Deployment
```bash
npm run build            # Generates static files in /dist folder
# Upload /dist contents to web server
```

## Data Layer Architecture

### Database Models (Prisma)
- **User**: Base user authentication (Clerk integration)
- **ParentProfile**: Parent information for traditional matching
- **TeacherProfile**: Teacher information and credentials
- **StudentProfile**: Student listings for reverse matching (independent entities with SEO slugs)
- **JobPosting**: Student job postings for tutors to apply to
- **TeacherApplication**: Tutor applications to student job postings
- **MatchRequest**: Traditional parent-to-teacher requests with approval flow
- **Payment**: Stripe integration for success fees
- **AuditLog**: System operation tracking

### Sample Data System
Located in `src/lib/sample-data.ts`:
- Provides realistic sample data for static builds
- Maintains type compatibility with Prisma models
- Includes helper functions for filtering by prefecture, subject, etc.
- Used when `output: 'export'` is enabled in Next.js config

## URL Structure & Routing

### Core Pages
- `/` - Homepage with hero section and service overview
- `/teachers/` - Teacher listings with filtering
- `/students/` - Student listings (reverse matching)
- `/admin/` - Administrative dashboard for approval workflows

### Dynamic Routing Patterns
- `/teachers/[id]/` - Individual teacher profiles
- `/students/[slug]/` - Individual student profiles (SEO-optimized slugs)
- `/students/[slug]/apply/` - Teacher application forms
- `/students/location/[prefecture]/` - Prefecture-filtered student listings
- `/students/subject/[subject]/` - Subject-filtered student listings

All dynamic routes implement `generateStaticParams()` for static export compatibility.

## Component Architecture

### Page Structure
Each page follows a consistent structure:
- Navigation component at top
- Breadcrumb navigation where applicable
- Main content area with sidebar layout
- Responsive grid system using CSS Grid

### Data Flow Patterns
1. **Static Pages**: Import sample data directly from `src/lib/sample-data.ts`
2. **Dynamic Pages**: Use helper functions to filter sample data by parameters
3. **Form Pages**: Include comprehensive form validation and user experience flows

## Authentication & Security
- Clerk authentication system (currently disabled for static builds)
- Role-based access control (PARENT, TEACHER, ADMIN)
- Audit logging for all system operations
- Encrypted contact information storage

## Business Logic

### Fee Structure
- **Students/Parents**: Free registration, success fee on match (¥8,000-¥15,000)
- **Teachers**: Free registration, 50% of first hour rate on match
- **Administrative**: Approval workflow for all matches ensures quality

### Geographic & Subject Filtering
- 47 prefectures supported with dedicated static pages
- 26+ subjects with individual listing pages
- SEO-optimized URLs for all geographic and subject combinations

## Styling Guidelines

### Design System
- Primary color: `hsl(162, 63%, 41%)` (professional green for education)
- Typography: System fonts with consistent sizing scale
- Spacing: 8px grid system
- Responsive breakpoints: sm (640px), md (768px), lg (1024px)

### Component Patterns
- Cards with hover effects for listings
- Consistent button styling with primary/secondary variants
- Form elements with focus states and validation styling
- Responsive navigation with mobile-friendly patterns

## Development Notes

### Static Export Considerations
- Avoid `useSearchParams()` in static pages (causes build errors)
- Use sample data instead of database queries for static generation
- All images must have `unoptimized: true` in Next.js config
- API routes will not work in static export mode

### Code Quality
- TypeScript strict mode enabled
- ESLint configuration with Next.js rules
- Prisma for type-safe database operations
- Consistent error handling and user feedback patterns