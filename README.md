# ASWE - Resume Web Site

A modern, responsive portfolio website built with Next.js 14, featuring a complete admin panel and API-driven content management with automatic fallback to default data.

## 🌟 Features

### 🎨 Frontend
- **Modern Design**: Neomorphism, claymorphism, and glassmorphism effects
- **Responsive**: Works perfectly on all devices
- **Performance**: Optimized loading and smooth animations
- **Accessibility**: WCAG compliant with proper ARIA labels

### 🔧 Backend Integration
- **API-First**: Connects to external REST APIs
- **Fallback System**: Uses default data when APIs are unavailable
- **Error Handling**: Graceful degradation with user-friendly messages
- **Real-time Updates**: Dynamic content management

### 📱 Sections
- **Hero**: Professional introduction with social links
- **About**: Personal information and journey
- **Experience**: Professional work history
- **Education**: Academic background
- **Skills**: Technical proficiencies with progress bars
- **Projects**: Portfolio showcase with detailed modals
- **Posts**: Blog posts and tutorials
- **Articles**: In-depth technical content
- **Contact**: Contact form with message handling

### 🛠️ Admin Panel
- **Authentication**: Secure login system
- **Content Management**: Full CRUD operations for all sections
- **Dashboard**: Analytics and quick actions
- **User-Friendly**: Intuitive interface for content updates

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd oshna-portfolio
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Configure environment variables**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   
   Update `.env.local` with your API configuration:
   \`\`\`env
   NEXT_PUBLIC_API_BASE_URL=https://your-backend-api.com/api
   \`\`\`

4. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔗 API Integration

### Backend Requirements

Your backend should provide the following REST endpoints:

#### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout  
- `GET /api/auth/check` - Check authentication status

#### Content Management
- `GET /api/about` - Get about information
- `PUT /api/about` - Update about information
- `GET /api/experience` - Get work experience
- `POST /api/experience` - Create new experience
- `PUT /api/experience` - Update experience
- `DELETE /api/experience` - Delete experience
- `GET /api/education` - Get education history
- `POST /api/education` - Create new education
- `PUT /api/education` - Update education
- `DELETE /api/education` - Delete education
- `GET /api/skills` - Get skills data
- `POST /api/skills` - Create skill category
- `PUT /api/skills` - Update skill category
- `DELETE /api/skills` - Delete skill category
- `GET /api/projects` - Get projects
- `POST /api/projects` - Create new project
- `PUT /api/projects` - Update project
- `DELETE /api/projects` - Delete project
- `GET /api/posts` - Get blog posts
- `GET /api/posts/:id` - Get specific post
- `POST /api/posts` - Create new post
- `PUT /api/posts` - Update post
- `DELETE /api/posts` - Delete post
- `GET /api/articles` - Get articles
- `GET /api/articles/:id` - Get specific article
- `POST /api/articles` - Create new article
- `PUT /api/articles` - Update article
- `DELETE /api/articles` - Delete article
- `GET /api/messages` - Get contact messages
- `POST /api/messages` - Create new message
- `PUT /api/messages` - Update message
- `DELETE /api/messages` - Delete message

### Fallback System

If your APIs are unavailable or return no data, the system automatically falls back to comprehensive default data, ensuring your portfolio is always functional and displays professional content.

## 🎯 Demo Mode

Without API configuration, the system runs in demo mode with:
- **Default Content**: Professional sample data for all sections
- **Admin Access**: Login with `admin` / `admin123`
- **Full Functionality**: All features work with simulated data
- **No Errors**: Graceful handling of missing APIs

## 🔐 Admin Panel

Access the admin panel at `/admin/login`

**Demo Credentials:**
- Username: `admin`
- Password: `admin123`

### Admin Features
- **Dashboard**: Overview of content and analytics
- **Content Management**: Edit all portfolio sections
- **Message Management**: Handle contact form submissions
- **Real-time Updates**: Changes reflect immediately on the frontend

## 🎨 Customization

### Styling
- **Colors**: Modify `app/globals.css` for color schemes
- **Components**: Update component styles in respective files
- **Themes**: Built-in light/dark theme support

### Content
- **Default Data**: Modify `lib/default-data.ts` for fallback content
- **API Endpoints**: Update `lib/api.ts` for custom API integration
- **Sections**: Add/remove sections by updating components and navigation

## 📦 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
1. Build the project: `npm run build`
2. Deploy the `out` folder to your hosting provider
3. Configure environment variables on your platform

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **State Management**: React hooks with custom API layer
- **Authentication**: JWT-based with localStorage
- **Deployment**: Vercel-optimized

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact: [your-email@example.com]

---

**Built with ❤️ using Next.js and modern web technologies**
