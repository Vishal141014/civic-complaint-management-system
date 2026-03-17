# Modern React UI - Civic Complaint Management System (P-CRM)

## 🎨 Overview

This is a complete modern React implementation of the Civic Complaint Management System UI, built with **glassmorphism design**, **smooth animations**, and **fully responsive layouts**. It showcases 6 complete screens with reusable components and clean architecture.

## ✨ Key Features

### 1. **Glassmorphism Design**
- Backdrop blur effects with semi-transparent backgrounds
- Smooth gradients and subtle shadows
- Modern, minimal aesthetic throughout
- Animated glowing orbs and accent elements

### 2. **Advanced Animations**
- Page transitions using Framer Motion
- Staggered animations for list items
- Hover effects on buttons and cards
- Loading animations for progress bars
- Pulse animations for status indicators
- Smooth scroll-triggered reveals

### 3. **Responsive Layout**
- Mobile-first design approach
- Tailwind CSS for utility-based styling
- Breakpoint support (sm, md, lg)
- Adaptive grid systems
- Touch-friendly components

### 4. **Component Library**
- Reusable button variants (primary, secondary, success, danger, ghost)
- Custom form inputs with validation styling
- Status pills and badges
- Statistics cards with animations
- Panels and cards with hover effects
- Sidebar navigation
- Tab bar for screen navigation

## 📦 Tech Stack

- **React 19** - UI framework
- **Framer Motion** - Animations and transitions
- **Tailwind CSS** - Utility-first styling
- **PostCSS** - CSS processing
- **Custom CSS** - Glassmorphism effects

## 🗂️ Project Structure

```
src/
├── components/
│   └── common/
│       ├── Button.jsx              # Button variants
│       ├── Card.jsx                # Card containers
│       ├── Badge.jsx               # Status badges & chips
│       ├── FormInputs.jsx          # Input, Textarea, Select
│       ├── Layout.jsx              # StatCard, GlassCard, Panel
│       ├── TabBar.jsx              # Navigation tabs
│       ├── Sidebar.jsx             # Admin sidebar
│       └── index.js                # Export all components
├── screens/
│       ├── LandingPage.jsx         # Hero with glassmorphism
│       ├── CitizenDashboard.jsx    # Complaint form & tracking
│       ├── AdminDashboard.jsx      # Dept admin panel
│       ├── WorkerDashboard.jsx     # Mobile field worker app
│       ├── SuperAdminDashboard.jsx # City-wide analytics
│       └── ComparisonScreen.jsx    # Photo review interface
├── styles/
│       └── globals.css             # Global styles & utilities
├── App.jsx                         # Main app with routing
├── index.css                       # CSS entry point
└── index.js                        # React entry point
```

## 🎯 Screens Overview

### 1️⃣ **Landing Page**
- Hero section with glassmorphism cards
- Live complaints mock-up
- Feature cards grid
- Statistics display
- Call-to-action section
- Animated glowing backgrounds

**Key Components:**
- Animated hero content with staggered animations
- Glass card with live complaint data
- Feature cards with hover animations
- Stats with manual counting animations

### 2️⃣ **Citizen Dashboard**
- Complaint submission form
- Auto-categorization prompt
- Photo upload section
- Tracking table for submitted complaints
- Real-time status updates

**Key Components:**
- Multi-field form with validation styling
- Textarea with character hints
- Photo upload with preview
- Complaint tracking list
- Status pills with notification dots

### 3️⃣ **Department Admin Dashboard**
- Sidebar navigation
- Dashboard statistics grid
- Complaints table with filtering
- Department-specific data
- Action buttons for assignment

**Key Components:**
- Animated sidebar menu
- StatCard grid with delays
- Data table with hover states
- Filter chips
- Icon buttons with badges

### 4️⃣ **Field Worker Dashboard**
- Mobile-first design (framed phone mockup)
- Worker greeting section
- Task statistics
- Task cards by urgency level
- Quick action buttons
- Work tracking

**Key Components:**
- Mobile frame container
- Status-based task cards
- Action buttons (View, Upload)
- Urgent/In-Progress/Done states
- Notification badge

### 5️⃣ **Super Admin Dashboard**
- City-wide overview
- Multi-department statistics
- Department comparison bars
- Sentiment analysis charts
- AI hotspot map
- Legend and alerts

**Key Components:**
- Large StatCard grid
- Animated bar charts
- Heat map with pulsing hotspots
- Alert boxes
- Color-coded urgency levels

### 6️⃣ **Before/After Review Screen**
- Complaint details bar
- Photo comparison grid
- Worker notes section
- Approve/Reject buttons
- Citizen re-raise form

**Key Components:**
- Details header with dividers
- Side-by-side photo comparison
- Notes display area
- Action buttons
- Form section for re-raising

## 🧩 Reusable Components

### Button
```jsx
<Button 
  variant="primary|secondary|success|danger|ghost"
  size="sm|md|lg|full"
  icon="emoji"
  disabled={false}
>
  Click me
</Button>
```

### Card
```jsx
<Card 
  variant="default|glass|glassDark|gradient"
  hover={true}
  delay={0}
>
  Content
</Card>
```

### Input/Textarea/Select
```jsx
<Input
  label="Label"
  placeholder="Text"
  required={true}
  error="Error message"
  icon="emoji"
/>
```

### StatCard
```jsx
<StatCard
  label="Metric"
  value="123"
  icon="emoji"
  change="↑ 10%"
  changeType="up|down"
  delay={0}
/>
```

### Badge/StatusPill/Chip
```jsx
<Badge variant="red|yellow|green|blue" icon="emoji">
  Content
</Badge>

<StatusPill status="pending|assigned|inProgress|resolved" />

<Chip variant="water|road|electricity|health" icon="emoji">
  Category
</Chip>
```

### Panel
```jsx
<Panel
  title="Title"
  subtitle="Subtitle"
  headerAction={<button />}
>
  Content
</Panel>
```

### Sidebar
```jsx
<Sidebar
  items={sidebarItems}
  title="Brand"
  subtitle="Subtitle"
  activeItem={activeId}
  onItemClick={handler}
/>
```

## 🎨 Styling System

### Color Palette
```javascript
colors: {
  saffron: '#FF6B00',
  green: { light: '#00C882', DEFAULT: '#00875A' },
  navy: { DEFAULT: '#0D1B2A', light: '#1A2F45', dark: '#243B55' },
  red: '#DC2626',
  yellow: '#D97706',
  blue: '#2563EB',
  purple: '#7C3AED',
}
```

### Utility Classes
- `.glass` - Basic glassmorphism
- `.glass-card` - Full glass effect
- `.glass-hover` - Hover glass effect
- `.glow-saffron`, `.glow-green` - Colored glows
- `.animated-gradient` - Animated backgrounds
- `.grid-pattern` - Grid background pattern
- `.text-gradient` - Gradient text
- `.blur-sm|md|lg` - Backdrop blur

## 🎬 Animation Patterns

### Stagger Children
```javascript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};
```

### Fade-in on Scroll
```javascript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  viewport={{ once: true }}
/>
```

### Hover Scale
```javascript
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
/>
```

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
# or
yarn install
```

### 2. Run Development Server
```bash
npm start
# or
yarn start
```

The app will open at `http://localhost:3000` with hot reload enabled.

### 3. Build for Production
```bash
npm run build
# or
yarn build
```

## 📱 Responsive Breakpoints

- **Mobile**: Default (< 640px)
- **Tablet**: `md:` (640px - 1024px)
- **Desktop**: `lg:` (1024px+)

Example:
```jsx
<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4" />
```

## 🔧 Customization

### Update Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  saffron: {
    50: '#FFF3EB',
    300: '#FF8C38',
    DEFAULT: '#FF6B00',
  },
  // ... more colors
}
```

### Add New Component
1. Create in `src/components/common/YourComponent.jsx`
2. Export from `src/components/common/index.js`
3. Import and use in screens

### Update Animations
Edit `tailwind.config.js` keyframes section:
```javascript
keyframes: {
  yourAnim: {
    '0%': { /* start */ },
    '100%': { /* end */ },
  },
}
```

## 📊 Component Usage Examples

### Creating a Screen
```javascript
import { motion } from 'framer-motion';
import { Button, Card, Panel, StatCard } from '../common';

const MyScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-navy-50 to-white"
    >
      {/* Content */}
    </motion.div>
  );
};

export default MyScreen;
```

### Using Motion Variants
```javascript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

<motion.div variants={containerVariants} initial="hidden" animate="visible">
  <motion.div variants={itemVariants}>Item 1</motion.div>
  <motion.div variants={itemVariants}>Item 2</motion.div>
</motion.div>
```

## 🎯 Best Practices

1. **Component Organization**
   - Keep components small and focused
   - Use composition over inheritance
   - Extract reusable logic to custom hooks

2. **Performance**
   - Use `motion.div` for animated elements
   - Optimize re-renders with proper memoization
   - Lazy load screens if needed

3. **Accessibility**
   - Use semantic HTML
   - Add proper labels to form inputs
   - Test with keyboard navigation

4. **Responsiveness**
   - Design mobile-first
   - Test on real devices
   - Use Tailwind breakpoints consistently

## 📝 Development Tips

1. **Debugging Animations**
   - Use React DevTools to inspect props
   - Reduce animation duration in dev
   - Check Framer Motion docs for API

2. **Common Patterns**
   - Always wrap screens with `motion.div`
   - Use `AnimatePresence` for page transitions
   - Create variant objects for consistent animations

3. **Tailwind Tips**
   - Use `@apply` in CSS for custom utilities
   - Group hover states: `group-hover:bg-opacity-75`
   - Use arbitrary values: `w-[123px]`

## 🤝 Contributing

To add a new screen or component:
1. Follow the existing folder structure
2. Use TypeScript-style JSDoc comments
3. Include Framer Motion animations
4. Test on mobile and desktop
5. Update this README

## 📄 License

This project is part of the Smart P-CRM system.

---

**Built with ❤️ using React, Tailwind CSS, and Framer Motion**
