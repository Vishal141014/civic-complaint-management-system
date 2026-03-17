# 📐 React UI Architecture & Component Hierarchy

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     App.jsx (Root)                          │
│              Tab Navigation + Screen Routing                │
└──────────────────────┬──────────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
    ┌───▼───┐  ┌──────▼──────┐  ┌───▼────────────┐
    │ TabBar │  │ AnimateExit │  │ Rendered      │
    │        │  │ (Page Trans)│  │ Screen        │
    └────────┘  └─────────────┘  └───┬───────────┘
                                      │
                ┌─────────────────────┼─────────────────────┐
                │                     │                     │
           ┌────▼────┐         ┌──────▼──────┐      ┌──────▼──────┐
           │ Landing │         │  Citizen    │      │   Admin     │
           │ Page    │         │ Dashboard   │      │ Dashboard   │
           │(Hero +  │         │  (Form +    │      │ (Sidebar +  │
           │Features)│         │   Tracking) │      │  Table)     │
           └─────────┘         └─────────────┘      └─────────────┘
                
                ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
                │   Worker     │  │  Super Admin │  │ Comparison   │
                │  Dashboard   │  │  Dashboard   │  │   Screen     │
                │  (Mobile UX) │  │  (Analytics)│  │ (Before/After)│
                └──────────────┘  └──────────────┘  └──────────────┘
```

## 🧩 Component Hierarchy

```
Common Components
│
├── Button.jsx
│   └── Animated CTA, variants (primary, secondary, success, danger, ghost)
│       + Sizes: sm, md, lg, full
│       + Icons support
│       + Disabled state
│
├── Card.jsx
│   └── Container component
│       + Variants: default, glass, glassDark, gradient
│       + Hover effects
│       + Stagger delay
│
├── Badge.jsx (group export)
│   ├── Badge - Colored badges with icons
│   ├── StatusPill - Status indicators (pending, assigned, etc)
│   └── Chip - Category chips (water, road, electricity, health)
│
├── FormInputs.jsx (group export)
│   ├── Input - Text input with label, validation, icon
│   ├── Textarea - Multi-line input with states
│   └── Select - Dropdown with options array
│
├── Layout.jsx (group export)
│   ├── StatCard - Statistics display with animation
│   ├── GlassCard - Glassmorphism container
│   └── Panel - Card with header, subtitle, action
│
├── TabBar.jsx
│   └── Sticky navigation bar
│       + Tab items with icons
│       + Active state styling
│       + Scroll support
│
└── Sidebar.jsx (group export)
    ├── Sidebar - Main container with dark background
    ├── SidebarItem - Individual menu items with badge
    └── SidebarSection - Section header (MAIN, REPORTS, etc)


Screen Components (Full Page)
│
├── LandingPage.jsx
│   ├── Hero Section
│   │   ├── Gradient background + grid pattern
│   │   ├── Animated glowing orbs
│   │   ├── Text content (animated)
│   │   ├── CTA buttons
│   │   └── Statistics
│   │
│   ├── Live Complaints Card (Glassmorphism)
│   │   ├── Header with badge
│   │   ├── Complaint list
│   │   └── Stats footer
│   │
│   └── Features Section
│       ├── 3-column grid of feature cards
│       └── Icons + descriptions
│
├── CitizenDashboard.jsx
│   ├── Page Header
│   ├── Complaint Form (Panel)
│   │   ├── Name + Phone (2-column grid)
│   │   ├── Ward + Category (2-column grid)
│   │   ├── Description (Textarea)
│   │   ├── Photo Upload
│   │   └── Submit Button
│   │
│   └── Complaint Tracking (Panel)
│       ├── Header with active count
│       └── Complaint list items
│
├── AdminDashboard.jsx
│   ├── Flex layout with Sidebar
│   ├── Main content area
│   ├── Top bar with notifications
│   ├── Stats grid (4 columns)
│   │   └── StatCard × 4
│   │
│   └── Complaints Panel
│       ├── Header with filters
│       └── Responsive table
│
├── WorkerDashboard.jsx
│   └── Mobile Frame Container
│       ├── Status bar (navy)
│       ├── Greeting section
│       ├── Stats grid (3-column)
│       ├── Tasks section
│       │   └── Task card × 3
│       │       ├── Urgency border (red/yellow/green)
│       │       ├── Title + location
│       │       └── Action buttons
│       │
│       └── Footer
│
├── SuperAdminDashboard.jsx
│   ├── Flex layout with Sidebar
│   ├── Stats grid (4 columns)
│   ├── Department cards (2-column grid)
│   │   ├── Department-wise bar chart
│   │   └── Sentiment analysis chart
│   │
│   └── Hotspot Map Panel
│       ├── Map placeholder with grid
│       ├── Pulsing hotspot markers (3)
│       └── Legend (4 items)
│
└── ComparisonScreen.jsx
    ├── Page header
    ├── Complaint detail bar
    ├── Comparison Panel
    │   ├── Before section
    │   │   └── Photo placeholder + metadata
    │   │
    │   ├── After section
    │   │   └── Photo placeholder + metadata
    │   │
    │   └── Action buttons (Reject/Approve)
    │
    └── Re-raise Form Panel
        ├── Issue text area
        ├── Photo upload
        └── Submit button
```

## 🔄 Data Flow & State Management

```
┌──────────────────────────────────────────┐
│         User Interaction (Click)         │
└──────────────┬──────────────────────────┘
               │
        ┌──────▼───────┐
        │  Component   │
        │  State Hook  │ (useState)
        │  (useState)  │
        └──────┬───────┘
               │
        ┌──────▼──────────────────┐
        │  Re-render Component     │
        │  + Child Components      │
        └──────┬───────────────────┘
               │
        ┌──────▼──────────────────┐
        │ Framer Motion Animation │
        │ (whileHover, etc)      │
        └──────┬───────────────────┘
               │
        ┌──────▼──────────────────┐
        │  Updated UI             │
        │  on Screen              │
        └──────────────────────────┘
```

## 🎨 Styling Architecture

```
Global Styles (globals.css)
├── Tailwind base, components, utilities
├── Custom animations (@keyframes)
│   ├── pulse (status indicators)
│   ├── fadeInUp (load animation)
│   ├── slideInDown (tab bar)
│   └── Custom keyframes
│
├── Utility classes
│   ├── .glass (basic glassmorphism)
│   ├── .glass-card (full effect)
│   ├── .text-gradient (gradient text)
│   ├── .blur-* (backdrop blur)
│   └── .badge-* (status colors)
│
└── Component-specific styles
    └── Button, Input, etc inline styles


Tailwind Config (tailwind.config.js)
├── Extended colors
│   ├── saffron (primary)
│   ├── green (success)
│   ├── navy (dark)
│   └── status (red, yellow, blue, purple)
│
├── Extended fonts
│   ├── baloo (UI font)
│   └── mono (accents)
│
├── Backdrop blur utilities
├── Animation definitions
└── Component variants


Individual Components (JSX)
├── Inline className strings
│   └── Tailwind classes + CSS
│
├── Conditional styling
│   └── className={`base ${condition && 'conditional'}`}
│
└── CSS-in-JS (Framer Motion)
    └── Motion div props (initial, animate, etc)
```

## 🎬 Animation Strategy

```
Page Level
│
├── Initial Animation (on mount)
│   └── Page fade in from transparent
│
├── Exit Animation (on unmount)
│   └── Page fade out
│
└── Scroll Reveal
    └── Items animate in as they enter viewport


Component Level (Staggered)
│
├── Container
│   └── hidden → visible (stagger: 0.1s)
│
├── Children (Staggered)
│   ├── Item 1: opacity 0→1, y: 20→0 (delay: 0s)
│   ├── Item 2: opacity 0→1, y: 20→0 (delay: 0.1s)
│   ├── Item 3: opacity 0→1, y: 20→0 (delay: 0.2s)
│   └── Item N: ...
│
└── Timing: 500ms per animation


Interactive Level (Instant Feedback)
│
├── Hover
│   ├── Scale: 1.00 → 1.05
│   └── Shadow: sm → md
│
├── Tap/Click
│   └── Scale: 1.05 → 0.95
│
├── Focus
│   └── Ring: 2px ring-saffron/30
│
└── Disabled
    └── Opacity: 1 → 0.5
```

## 🔌 Integration Points

### Backend Integration
```
Component ▶ useEffect/API Call ▶ Axios/Fetch ▶ Backend API
   │                                               │
   └════════════ setState(data) ◀════════════════┘
   
Component ▲ useCallback ▶ Form Submit ▶ API POST ▶ Backend
   │                                              │
   └═════════════════ Response ◀════════════════┘
```

### State Management (Future)
```
Redux/Context Setup (for future)
├── Store
│   ├── Complaints (slice)
│   ├── User (slice)
│   └── UI (slice)
│
├── Actions
│   ├── Create complaint
│   ├── Fetch complaints
│   ├── Update status
│   └── etc.
│
└── Components subscribe → auto re-render on state change
```

## 📊 Component Complexity Matrix

| Component | Complexity | Reusability | Animation |
|-----------|-----------|------------|-----------|
| Button | ⭐ Low | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| Card | ⭐ Low | ⭐⭐⭐⭐⭐ | ⭐⭐ |
| Input | ⭐⭐ Low-Med | ⭐⭐⭐⭐ | ⭐ |
| Badge/Pill | ⭐ Low | ⭐⭐⭐⭐ | ⭐ |
| StatCard | ⭐⭐ Low-Med | ⭐⭐⭐ | ⭐⭐⭐ |
| TabBar | ⭐⭐⭐ Medium | ⭐⭐ | ⭐⭐⭐ |
| Sidebar | ⭐⭐⭐ Medium | ⭐⭐ | ⭐⭐⭐ |
| LandingPage | ⭐⭐⭐⭐⭐ High | ⭐ | ⭐⭐⭐⭐⭐ |
| Dashboard | ⭐⭐⭐⭐ High | ⭐ | ⭐⭐⭐ |

## 🔐 Component Props Pattern

```jsx
// Common patterns used across components

// 1. Variant pattern
<Button variant="primary" />
<Card variant="glass" />

// 2. Size pattern
<Button size="sm" />
<Button size="lg" />

// 3. State pattern
<Input required error={errorMsg} />
<Button disabled={loading} />

// 4. Content pattern
<Button icon="📝">Text</Button>
<Card hover>Content</Card>

// 5. Handler pattern
<TabBar onTabChange={handler} />
<Button onClick={handler} />
```

## 🚀 Performance Optimization Points

```
Rendering Optimization
├── Memoization (React.memo)
├── Key props in lists
├── Conditional rendering
└── Lazy loading screens

Animation Optimization
├── GPU acceleration (transform: translate)
├── Will-change CSS property
├── Reduced motion support
└── Debounced scroll handlers

Bundle Optimization
├── Tree shaking unused Tailwind
├── Framer Motion features tree-shaking
├── CSS purging for unused classes
└── Image optimization (future)
```

## 📱 Responsive Breakpoints

```
Mobile-First Approach
│
├── Base (xs) - 0px
│   └── Single column layouts
│
├── Tablet (md) - 640px
│   └── 2 columns, expanded spacing
│
└── Desktop (lg) - 1024px
    └── 3-4 columns, full features

Tailwind Prefix: md:, lg:, xl:

Usage:
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
```

---

## 📝 Key Takeaways

1. **Component-Driven**: 8 reusable components cover most needs
2. **Modular Screens**: 6 independent screen components
3. **Modern Stack**: React 19 + Tailwind + Framer Motion
4. **Performance**: Optimized animations, lazy loading ready
5. **Extensible**: Easy to add new screens/components
6. **Production-Ready**: Error handling, accessibility, responsiveness

---

**Last Updated**: March 17, 2026
**Status**: Complete & Documented ✅
