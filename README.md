<div style="margin-bottom: 20px">
<img src="./public/mytourbuddy-bg.svg" alt="tourbuddylogo" height="100">
</div>

# MyTourBuddy - Frontend

**Your Personal Tour Buddy 🦧**

MyTourBuddy is a comprehensive travel platform designed to connect tourists with local guides for personalized, immersive travel experiences. Built as a campus project, this app empowers users to discover packages, book tours, leave reviews, and interact with an AI-powered buddy for travel recommendations. Whether you're a tourist seeking adventure or a guide sharing your expertise, MyTourBuddy makes travel planning seamless and fun.

## Features

- **User Authentication & Roles**: Sign-in/sign-up with role selection (Tourist, Guide, Admin) and context-based auth management.
- **Onboarding Flow**: Step-by-step user setup with personal info, travel details, and profile preview.
- **Profile Management**: View and edit profiles, including completion tracking and role-specific info (e.g., guide details).
- **Tour Packages**: Browse, view details, and book travel packages.
- **Experiences**: Discover and manage travel experiences with cards and details.
- **Booking System**: Forms for booking tours (guide/tourist views), status tracking, and management.
- **AI Buddy**: Personalized travel recommendations via Buddy AI integration.
- **Reviews & Ratings**: Leave and view reviews for guides and experiences.
- **Ticketing/Support System**: Create and manage support tickets.
- **Admin Dashboard**: Manage users, packages, bookings, tickets, settings, and platform oversight.
- **Dashboard for Users**: Personalized views for bookings, experiences, packages, reviews, settings, and support.
- **Responsive Design**: Mobile-friendly UI with components like navbar, sidebar, and forms.
- **Additional Pages**: About, contact, privacy policy, terms of service.

## Tech Stack

| Category   | Technologies                                                       |
| ---------- | ------------------------------------------------------------------ |
| Frontend   | Next.js 16, TypeScript, Tailwind CSS v4, shadcn/ui, TanStack Query |
| Backend    | Spring Boot, MongoDB                                               |
| Tools      | ESLint, PostCSS, Commitlint, pnpm                                  |
| Deployment | Vercel                                                             |

## Prerequisites

Before running the project, ensure you have the following installed:

- Node.js (v18 or higher)
- pnpm (for package management)
- Java 17+ (for Spring Boot backend)
- MongoDB (local or cloud instance like MongoDB Atlas)

## Installation & Setup

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/MyTourBuddy/mytourbuddy-frontend.git
   cd mytourbuddy-frontend
   ```

2. **Install Dependencies**:

   ```bash
   pnpm install
   ```

3. **Environment Configuration**:
   - Create a `.env.local` file.
   - Add the following variables:
     ```
     NEXT_PUBLIC_BACKEND_URL=http://localhost:8080/api/v1
     NEXT_PUBLIC_IMGBB_API_KEY=your-imgbb-api-key
     ```

4. **Run the Frontend**:

   ```bash
   pnpm dev
   ```

   The app runs at `http://localhost:3000`.

5. **Backend Setup**: Clone and run the Spring Boot backend separately.

## Usage

1. **Sign Up/Login**: Choose your role (Tourist/Guide) and complete onboarding.
2. **Explore Packages**: Browse available tour packages on the homepage.
3. **Book Experiences**: Use the booking form to reserve tours.
4. **AI Buddy**: Get recommendations in the dashboard.
5. **Admin Features**: Manage the platform via the admin panel.

## Project Structure

```
src/
├── app/                 # Next.js app router pages (routes like dashboard, admin, packages)
├── components/          # Reusable UI components (e.g., Navbar, PackageCard, forms)
├── config/              # API and app configurations
├── context/             # React contexts (e.g., AuthContext)
├── data/                # Constants and data files
├── hooks/               # Custom React hooks for queries (e.g., useAuthQueries)
├── lib/                 # Utilities, API clients, and query setup
├── schemas/             # Validation schemas (Zod)
└── utils/               # Helper functions and utilities
```

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## Contact

- **Sasmitha** - [dev.sasmitha@gmail.com](mailto:dev.sasmitha@gmail.com)
- **Project Repository**: [GitHub](https://github.com/MyTourBuddy/mytourbuddy-frontend)
