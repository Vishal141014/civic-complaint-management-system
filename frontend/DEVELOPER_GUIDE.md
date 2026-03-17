# Developer Quick Reference

## Project: Smart P-CRM (Role-Based Frontend)

### Quick Commands

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm build

# Run linter
npm run lint
```

---

## Login Test Credentials

Since the app is in demo mode, you can use **any credentials**!

```
Phone: 9876543210
Password: password123
Role: Choose from dropdown

- Citizen (Blue role)
- Department Admin (Orange role)
- Field Worker (Green role)
- Super Admin (Purple role)
```

After login, you'll be at the dashboard for that role.

---

## File Quick Reference

### Must Know Files

| File | Purpose | Edit When |
|------|---------|-----------|
| `App.jsx` | All routes | Adding new pages |
| `AuthContext.jsx` | Login/auth | Connecting to backend |
| `PrivateRoute.jsx` | Route protection | Changing auth logic |
| `Navbar.jsx` | Role nav links | Updating menu items |
| `Login.jsx` | Login form | Styling or form fields |

### Component Files

| Component | Location | Props |
|-----------|----------|-------|
| `StatusBadge` | `/components/` | `status` (string) |
| `RoleBadge` | `/components/` | `role` (string) |
| `PhotoUpload` | `/components/` | `maxFiles`, `onUpload` |
| `PageHeader` | `/components/` | `title`, `subtitle`, `actionButton` |
| `PrivateRoute` | `/components/` | `allowedRoles`, `children` |
| `ComplaintCard` | `/components/` | `complaint`, `onClick` |

### Page Structure

```
pages/
├── Login.jsx ── Role-based redirect
├── Unauthorized.jsx ── Access denied
├── citizen/ ── 4 citizen pages
├── admin/ ── 3 admin pages
├── worker/ ── 3 worker pages
└── superadmin/ ── 2 superadmin pages
```

---

## Common Tasks

### Add a New Citizen Page

1. Create file: `src/pages/citizen/NewPage.jsx`

```jsx
import { motion } from 'framer-motion';
import PageHeader from '../../components/PageHeader';

const NewPage = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <PageHeader title="Page Title" subtitle="Subtitle" />
      {/* Content here */}
    </motion.div>
  );
};

export default NewPage;
```

2. Add route in `App.jsx`:

```jsx
<Route
  path="/citizen/newpage"
  element={
    <PrivateRoute allowedRoles={['citizen']}>
      <NewPage />
    </PrivateRoute>
  }
/>
```

3. Add navbar link in `Navbar.jsx`:

```jsx
case 'citizen':
  return [
    // ... existing
    { label: 'New Page', path: '/citizen/newpage' },
  ];
```

### Change Role Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  blue: '#3B82F6',     // Citizen
  orange: '#FF6B00',   // Admin (also saffron)
  green: '#00A86B',    // Worker
  purple: '#A78BFA',   // SuperAdmin
}
```

### Add Form Validation

```jsx
const [errors, setErrors] = useState({});

const handleSubmit = (e) => {
  e.preventDefault();
  const newErrors = {};
  
  if (!phone) newErrors.phone = 'Phone is required';
  if (!password) newErrors.password = 'Password is required';
  
  setErrors(newErrors);
  if (Object.keys(newErrors).length === 0) {
    // Submit form
  }
};
```

### Show Loading Spinner

```jsx
const [loading, setLoading] = useState(false);

if (loading) {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="w-12 h-12 border-4 border-saffron/20 border-t-saffron rounded-full animate-spin"></div>
    </div>
  );
}
```

### Fetch Data with Auth

```jsx
import { useAuth } from '../../context/AuthContext';

const MyComponent = () => {
  const { token, userId } = useAuth();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/data?user_id=${userId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const result = await response.json();
      setData(result);
    };

    if (userId) fetchData();
  }, [userId, token]);

  return <div>{/* render */}</div>;
};
```

---

## Common Issues & Fixes

### "useAuth must be used within AuthProvider"

**Fix**: Make sure main.jsx has:
```jsx
<AuthProvider>
  <App />
</AuthProvider>
```

### Navbar doesn't show role-specific links

**Check**:
1. User is logged in (`isAuthenticated === true`)
2. Role is set correctly (`role === 'citizen'`, etc.)
3. Links in `getNavLinks()` match your route paths

**Debug**:
```jsx
const { role, isAuthenticated } = useAuth();
console.log('Role:', role, 'Auth:', isAuthenticated);
```

### Photo upload not working

**Check**:
1. FormData usage is correct
2. File size < 5MB
3. Only JPEG/PNG allowed
4. API endpoint expects `multipart/form-data`

### Redirect loops (login → dashboard → login)

**Check**:
1. `PrivateRoute` `allowedRoles` include user's role
2. `hasRole()` logic is correct
3. Role parsing in AuthContext matches your role values

---

## Typography

The app uses two fantastic fonts:

```javascript
// Headings - Bold, friendly
font-syne

// Body - Default
font-system (or whatever you set)

// Code/IDs - Monospace
font-mono
```

---

## Color Reference

### Status Colors
```javascript
submitted:       'bg-blue-500'
assigned:        'bg-yellow-500'
in_progress:     'bg-purple-500'
pending_approval:'bg-orange-500'
resolved:        'bg-green-500'
re_raised:       'bg-red-500'
```

### Role Colors
```javascript
citizen:   'bg-blue-500'
admin:     'bg-orange-600'
worker:    'bg-green-600'
superadmin:'bg-purple-600'
```

### Urgency Indicators
```javascript
high:   '🔴' or 'text-red-600'
medium: '🟡' or 'text-yellow-600'
low:    '🟢' or 'text-green-600'
```

---

## Performance Tips

1. **Lazy load pages** with React.lazy()
2. **Memoize components** to avoid re-renders
3. **Use useCallback** for functions in dependencies
4. **Optimize images** before upload
5. **Debounce search/filter inputs**

---

## Browser DevTools

### Debug Auth

```javascript
// In Console:
const auth = JSON.parse(localStorage.getItem('auth'));
console.log(auth);
```

### Check Network Requests

Network tab → Click request → Headers → Look for `Authorization`

### Simulate Offline

DevTools → Network → Throttle to "Offline" → Test error handling

---

## Git Workflow

```bash
git add .
git commit -m "feat: add citizen re-raise page"
git push origin main
```

### Commit Message Format
- `feat:` New feature
- `fix:` Bug fix
- `style:` CSS/styling
- `refactor:` Code reorganization
- `docs:` Documentation

---

## Resources

- **React Router**: https://reactrouter.com/
- **Framer Motion**: https://www.framer.com/motion/
- **Tailwind CSS**: https://tailwindcss.com/
- **Icons**: Use emoji or FontAwesome

---

## Next Person Notes

Hey! If you're taking over this project:

1. **Read** `ROLE_BASED_ARCHITECTURE.md` first
2. **Start** with `AuthContext.jsx` to understand auth
3. **Check** a citizen page like `MyComplaints.jsx`
4. **Connect** to backend using `BACKEND_INTEGRATION_GUIDE.md`
5. **Ask** in issues if confused

Good luck! 🚀

---

**Last Updated**: March 2024
**Version**: 1.0
**Status**: Production Ready
