# 🚀 Quick Start Guide - Developer Reference

## Installation

```bash
# Install dependencies
npm install

# Start dev server
npm start

# Build for production
npm run build
```

## UI Component Library Quick Reference

### 1. Button
```jsx
import Button from './components/common';

// Primary button
<Button variant="primary" size="lg" icon="📝">
  Click Me
</Button>

// Variants: primary | secondary | success | danger | ghost
// Sizes: sm | md | lg | full
```

### 2. Card
```jsx
// Basic card
<Card hover>
  <div className="p-8">Content</div>
</Card>

// Variants: default | glass | glassDark | gradient
```

### 3. Form Components
```jsx
import { Input, Textarea, Select } from './components/common';

<Input 
  label="Name" 
  placeholder="Enter name"
  required 
  icon="👤"
/>

<Textarea 
  label="Message"
  rows={5}
  required
/>

<Select
  label="Category"
  options={[
    { label: 'Option 1', value: 'opt1' },
    { label: 'Option 2', value: 'opt2' },
  ]}
/>
```

### 4. Status Indicators
```jsx
import { Badge, StatusPill, Chip } from './components/common';

// Badge
<Badge variant="red" icon="📍">
  Urgent
</Badge>

// Status Pill
<StatusPill status="resolved">
  Resolved
</StatusPill>

// Chip
<Chip variant="water" icon="💧">
  Water Issue
</Chip>
```

### 5. Statistics
```jsx
import { StatCard, Panel } from './components/common';

<StatCard
  label="Total Complaints"
  value="312"
  icon="📊"
  change="↑ 24 today"
  changeType="up"
/>

<Panel title="Title" subtitle="Subtitle">
  <div>Content</div>
</Panel>
```

### 6. Navigation
```jsx
import { TabBar, Sidebar } from './components/common';

// Tab Bar (top navigation)
<TabBar 
  activeTab={activeTab}
  onTabChange={setActiveTab}
  tabs={tabsList}
/>

// Sidebar (admin)
<Sidebar
  items={sidebarItems}
  title="Admin"
  activeItem={activeMenu}
  onItemClick={setActiveMenu}
/>
```

## Framer Motion Recipes

### Page Transition
```jsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
>
  Page content
</motion.div>
```

### Staggered List
```jsx
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
  {items.map((item, i) => (
    <motion.div key={i} variants={itemVariants}>
      {item}
    </motion.div>
  ))}
</motion.div>
```

### Hover Effect
```jsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Hover me
</motion.button>
```

### Scroll Reveal
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  viewport={{ once: true }}
>
  Revealed on scroll
</motion.div>
```

## Tailwind Classes Quick Reference

### Colors
```jsx
// Primary colors
className="text-saffron bg-saffron border-saffron-300"

// Status colors
className="text-green bg-red-50 border-yellow-200"

// Dark mode
className="bg-navy text-white hover:bg-navy-light"
```

### Typography
```jsx
className="text-base font-bold font-baloo"  // Baloo
className="text-xs font-mono font-semibold" // Space Mono
className="text-2xl md:text-3xl lg:text-4xl" // Responsive
```

### Spacing
```jsx
className="p-6"      // Padding
className="m-4"      // Margin
className="gap-3"    // Grid gap
className="mt-8"     // Margin top
```

### Flexbox & Grid
```jsx
className="flex gap-4"                    // Horizontal
className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
className="flex items-center justify-between"
```

### Shadows & Effects
```jsx
className="shadow-sm hover:shadow-md"
className="rounded-2xl"
className="border border-gray-200"
className="backdrop-blur-lg"
```

## Creating a New Screen

**Step 1: Create Screen Component**
```jsx
// src/screens/MyScreen.jsx
import { motion } from 'framer-motion';
import { Button, Card, Panel } from '../common';

const MyScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-navy-50 to-white pt-20"
    >
      {/* Your content */}
    </motion.div>
  );
};

export default MyScreen;
```

**Step 2: Export from index.js**
```jsx
// src/screens/index.js
export { default as MyScreen } from './MyScreen';
```

**Step 3: Add to App.jsx**
```jsx
// src/App.jsx
import MyScreen from './screens/MyScreen';

const tabs = [
  // ... existing tabs
  { id: 'myscreen', icon: '✨', label: 'My Screen' },
];

const renderScreen = () => {
  // ... existing cases
  case 'myscreen':
    return <MyScreen />;
};
```

## Customizing Theme

### Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  saffron: {
    50: '#FFF3EB',
    300: '#FF8C38',
    DEFAULT: '#FF6B00',
  },
}
```

### Animations
Add to `tailwind.config.js`:
```javascript
keyframes: {
  myAnim: {
    '0%': { opacity: '0' },
    '100%': { opacity: '1' },
  },
},
animation: {
  myAnim: 'myAnim 0.5s ease-out',
}
```

## Common Patterns

### Form Handling
```jsx
import { useState } from 'react';
import { Input, Button } from '../common';

const MyForm = () => {
  const [data, setData] = useState({ name: '', email: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        value={data.name}
        onChange={(e) => setData({ ...data, name: e.target.value })}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};
```

### Conditional Styling
```jsx
<div className={`
  p-4 rounded-lg
  ${active ? 'bg-saffron text-white' : 'bg-gray-50 text-gray-600'}
  ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}
`}>
  Content
</div>
```

### Data Table
```jsx
<div className="overflow-x-auto">
  <table className="w-full">
    <thead>
      <tr className="border-b border-gray-200">
        <th className="text-left py-3 px-4 font-bold">Header</th>
      </tr>
    </thead>
    <tbody>
      {data.map((row, i) => (
        <tr key={i} className="border-b hover:bg-gray-50">
          <td className="py-3 px-4">{row.name}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
```

## Debugging Tips

### Check Active Animations
```javascript
// In browser console
localStorage.setItem('framer', 'debug');
```

### Inspect Component Props
- Use React DevTools Extension
- Check `$r` in console
- Look at motion div values

### Common Issues
| Issue | Solution |
|-------|----------|
| Animation not working | Check initial state, ensure key changes |
| Style not applying | Check Tailwind purge config, rebuild CSS |
| Component not rendering | Check import path, export statement |
| Performance issue | Reduce animation duration, use CSS over JS |

## Testing

### Manual Testing Checklist
- [ ] Navigation between tabs works smoothly
- [ ] Animations play on load
- [ ] Hover effects work on desktop
- [ ] Touch effects work on mobile
- [ ] Form inputs work & validate
- [ ] Responsive design at all breakpoints
- [ ] Print layout looks good

### Browser DevTools
```javascript
// Throttle network in DevTools for slow connection testing
// Throttle CPU for low-end device simulation
// Use mobile device emulation
```

## Performance Optimization

### Lazy Load Screens
```jsx
import { lazy, Suspense } from 'react';

const MyScreen = lazy(() => import('./screens/MyScreen'));

<Suspense fallback={<Loading />}>
  <MyScreen />
</Suspense>
```

### Memoize Components
```jsx
import { memo } from 'react';

const MyComponent = memo(({ data }) => {
  return <div>{data}</div>;
});

export default MyComponent;
```

## Useful Commands

```bash
# Start dev with production build
npm start -- --prod

# Analyze bundle size
npm run build -- --analyze

# Format code
npm run format

# Lint
npm run lint
```

## Resources

- [React Docs](https://react.dev)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com)
- [MDN Web Docs](https://developer.mozilla.org)

---

**Happy Coding! 🚀**
