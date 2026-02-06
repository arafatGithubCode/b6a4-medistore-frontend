# 💊 MediStore - Online Pharmacy Platform

A modern, full-featured online pharmacy e-commerce platform built with Next.js 16, TypeScript, and Tailwind CSS. MediStore enables customers to browse and purchase medicines online with secure authentication, cart management, order tracking, and multi-role dashboard support for sellers and administrators.

## ✨ Features

### 🛍️ Customer Features

- **Browse & Search Medicines** - Explore a wide range of medicines with advanced filtering
- **Shopping Cart** - Add/remove items, update quantities, and manage cart seamlessly
- **Secure Checkout** - Complete orders with a streamlined checkout process
- **Order Tracking** - View order history and track delivery status
- **Review System** - Leave reviews and ratings for purchased medicines
- **User Profile** - Manage account information and view order history
- **Dark Mode Support** - Toggle between light and dark themes

### 👨‍💼 Seller Features

- **Medicine Management** - Add, update, and delete medicine listings
- **Inventory Control** - Manage stock levels and medicine status
- **Order Management** - View and process customer orders
- **Dashboard Analytics** - Monitor sales and performance metrics

### 👨‍💻 Admin Features

- **User Management** - Manage customers and sellers
- **Category Management** - Create and organize medicine categories
- **Order Oversight** - Monitor all platform orders
- **System Administration** - Full platform control and configuration

## 🚀 Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components:** [Radix UI](https://www.radix-ui.com/)
- **Authentication:** [Better Auth](https://www.better-auth.com/)
- **Forms:** [TanStack Form](https://tanstack.com/form)
- **Validation:** [Zod](https://zod.dev/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Notifications:** [Sonner](https://sonner.emilkowal.ski/)
- **Theme:** [next-themes](https://github.com/pacocoursey/next-themes)
- **Package Manager:** [pnpm](https://pnpm.io/)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 20.x or higher
- **pnpm** 8.x or higher (or npm/yarn)
- **Git**

## 🛠️ Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/medistore-frontend.git
cd medistore-frontend
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
# API Configuration
NEXT_PUBLIC_API_URL=your_backend_api_url

# Authentication
NEXT_PUBLIC_AUTH_URL=your_auth_url
BETTER_AUTH_SECRET=your_secret_key

# Other configurations...
```

4. **Run the development server**

```bash
pnpm dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📜 Available Scripts

| Command      | Description                                       |
| ------------ | ------------------------------------------------- |
| `pnpm dev`   | Start development server on http://localhost:3000 |
| `pnpm build` | Build the production application                  |
| `pnpm start` | Start the production server                       |
| `pnpm lint`  | Run ESLint for code quality checks                |

## 📁 Project Structure

```
medistore-frontend/
├── public/              # Static assets
├── src/
│   ├── actions/        # Server actions for data mutations
│   │   ├── auth.ts
│   │   ├── cart.ts
│   │   ├── medicine.ts
│   │   └── order.ts
│   ├── app/            # Next.js App Router pages
│   │   ├── (common-layout)/    # Public pages (home, shop, cart)
│   │   ├── (dashboard-layout)/ # Protected dashboard pages
│   │   ├── error.tsx           # Global error page
│   │   ├── loading.tsx         # Global loading page
│   │   └── not-found.tsx       # 404 page
│   ├── components/     # React components
│   │   ├── common/    # Reusable components
│   │   ├── layout/    # Layout components (navbar, footer)
│   │   ├── module/    # Feature-specific components
│   │   └── ui/        # Base UI components (buttons, inputs)
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility libraries
│   ├── providers/     # Context providers
│   ├── routes/        # Route configurations
│   ├── services/      # API service layer
│   ├── types/         # TypeScript type definitions
│   └── validations/   # Zod schemas for form validation
├── .env.local         # Environment variables (not in git)
├── next.config.ts     # Next.js configuration
├── tailwind.config.ts # Tailwind CSS configuration
└── tsconfig.json      # TypeScript configuration
```

## 🎨 Key Components

### Landing Page

- **Hero Section** - Eye-catching gradient hero with call-to-action buttons
- **Featured Medicines** - Grid display of available medicines
- **Footer** - Comprehensive footer with links and newsletter subscription

### Authentication

- Sign up and sign in with validation
- Secure session management with Better Auth
- Role-based access control (Customer, Seller, Admin)

### Shopping Experience

- Medicine cards with images, pricing, and stock status
- Add to cart functionality with quantity management
- Real-time cart updates and checkout flow
- Order confirmation and tracking

### Dashboard

- Parallel routes for role-specific dashboards
- Sidebar navigation with role-based menu items
- Admin and seller management interfaces
- Order management and analytics

## 🎯 Features Deep Dive

### Authentication System

- Server-side authentication using Better Auth
- Protected routes with middleware
- Role-based authorization (CUSTOMER, SELLER, ADMIN)
- Session management and persistence

### Medicine Management

- Full CRUD operations for medicines
- Image upload support
- Stock management
- Status tracking (Available, Out of Stock, Discontinued)
- Dosage form and strength specifications

### Cart & Checkout

- Persistent cart state
- Real-time price calculations
- Quantity adjustments
- Checkout validation
- Order placement with confirmation

### Review System

- Post-purchase review capability
- Rating system (1-5 stars)
- Review moderation
- Display reviews on medicine pages

### Search & Filter

- Medicine search functionality
- Category-based filtering
- Price range filtering
- Stock availability filtering

## 🌐 Environment Variables

| Variable               | Description                | Required |
| ---------------------- | -------------------------- | -------- |
| `NEXT_PUBLIC_API_URL`  | Backend API base URL       | Yes      |
| `NEXT_PUBLIC_AUTH_URL` | Authentication service URL | Yes      |
| `BETTER_AUTH_SECRET`   | Secret key for Better Auth | Yes      |

## 🔒 Security Features

- Server-side authentication and authorization
- Protected API routes
- CSRF protection
- Input validation with Zod schemas
- Secure password handling
- Role-based access control

## 📱 Responsive Design

MediStore is fully responsive and optimized for:

- 📱 Mobile devices (320px and up)
- 📱 Tablets (768px and up)
- 💻 Desktops (1024px and up)
- 🖥️ Large screens (1280px and up)

## 🎨 Theme Support

Built-in dark mode support using `next-themes`:

- System preference detection
- Manual theme toggle
- Persistent theme selection
- Smooth theme transitions

## 🚧 Error Handling

- Custom error pages with retry functionality
- Loading states with animated spinners
- 404 page with navigation options
- Form validation with user-friendly error messages
- Toast notifications for user feedback

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Vercel](https://vercel.com/) for hosting and deployment
- [Radix UI](https://www.radix-ui.com/) for accessible component primitives
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [shadcn/ui](https://ui.shadcn.com/) for component inspiration

## 📞 Support

For support, email support@medistore.com or open an issue in the repository.

## 🔗 Links

- **Live Demo:** [https://medistore-demo.vercel.app](https://medistore-demo.vercel.app)
- **Backend Repository:** [https://github.com/yourusername/medistore-backend](https://github.com/yourusername/medistore-backend)
- **Documentation:** [https://docs.medistore.com](https://docs.medistore.com)

---

Made with ❤️ using Next.js and TypeScript
