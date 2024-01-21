# Next Auth v5 - Advanced Guide (2024)

This repository serves as an advanced guide for implementing Next Auth v5 in 2024. It showcases various features and functionalities to help you build robust authentication solutions for your Next.js applications.

## Key Features

- 🔐 Next-auth v5 (Auth.js)
- 🚀 Next.js 14 with server actions
- 🔑 Credentials Provider
- 🌐 OAuth Provider (Social login with Google & GitHub)
- 🔒 Forgot password functionality
- ✉️ Email verification
- 📝 Register component
- 🤔 Forgot password component
- ✅ Verification component
- ⚠️ Error component
- 🔘 Login button
- 🚪 Logout button
- 👥 User roles (Admin & User)
- 🔓 Login component (Opens in redirect or modal)
- 🚧 Role Gate
- 🔍 Exploring next.js middleware
- 📈 Extending & Exploring next-auth session

## Todo Functions

- 📱 Two-factor verification
- 🔄 Exploring next-auth callbacks
- 👤 useCurrentUser hook
- 🛂 useRole hook
- 🧑 currentUser utility
- 👮 currentRole utility
- 🖥️ Example with server component
- 💻 Example with client component
- 👑 Render content for admins using RoleGate component
- 🛡️ Protect API Routes for admins only
- 🔐 Protect Server Actions for admins only
- 📧 Change email with new verification in Settings page
- 🔑 Change password with old password confirmation in Settings page
- 🔔 Enable/disable two-factor auth in Settings page
- 🔄 Change user role in Settings page (for development purposes only)

## 🚀 Getting Started

### Prerequisites

- Node.js installed
- Yarn or npm package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/next-auth-advanced-guide.git

# Navigate to the project directory
cd next-auth-advanced-guide

# Install dependencies
yarn install

# Run the development server
yarn dev

```
### Setup .env file

```js
DATABASE_URL=
DIRECT_URL=

AUTH_SECRET=

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

RESEND_API_KEY=

NEXT_PUBLIC_APP_URL=
```

### Setup Prisma
```shell
npx prisma generate
npx prisma db push
```

## Usage

Visit http://localhost:3000 in your browser to explore the advanced features and functionalities provided in this guide.
