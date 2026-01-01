# TanStack Query - Step by Step Learning Guide 📚

**For Campus Project & Viva Preparation**

This guide will help you understand and implement TanStack Query from scratch. Follow each step, understand the concepts, and implement in your own code.

---

## 📖 **Step 0: Understanding the Problem**

### What Problem Does TanStack Query Solve?

**Without TanStack Query (Your Current Code):**
```typescript
// You probably do this:
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  setLoading(true);
  fetch('/api/user')
    .then(res => res.json())
    .then(data => setUser(data))
    .catch(err => setError(err))
    .finally(() => setLoading(false));
}, []);
```

**Problems:**
1. 😓 Lots of boilerplate (useState, useEffect)
2. 🔄 No automatic refetching
3. 💾 No caching (same data fetched multiple times)
4. 🐛 No error retry logic
5. ⏱️ Manual loading state management
6. 🔧 Hard to sync data across components

**With TanStack Query:**
```typescript
const { data: user, isLoading, error } = useQuery({
  queryKey: ['user'],
  queryFn: () => fetch('/api/user').then(res => res.json()),
});
```

That's it! All the problems solved automatically! ✨

---

## 📖 **Step 1: Core Concepts**

### 1.1 What is a Query?

A **query** is a **read operation** (GET request).

```typescript
useQuery({
  queryKey: ['users'],        // Unique identifier
  queryFn: fetchUsers,         // Function that returns data
})
```

**Key Points:**
- Used for **fetching data** (GET)
- Data is **cached** automatically
- Refetches in the background
- Shares data across components

### 1.2 What is a Mutation?

A **mutation** is a **write operation** (POST, PUT, DELETE).

```typescript
useMutation({
  mutationFn: (newUser) => createUser(newUser),
  onSuccess: () => {
    // Invalidate queries to refetch
  },
})
```

**Key Points:**
- Used for **creating/updating/deleting** (POST, PUT, DELETE)
- Not cached
- Can trigger query invalidation

### 1.3 Query Keys

Query keys are like **addresses** for your data.

```typescript
// Simple key
queryKey: ['users']

// Key with parameter
queryKey: ['users', userId]

// Key with filters
queryKey: ['users', { role: 'GUIDE', status: 'active' }]
```

**Rules:**
- Must be an array
- Should be unique for each query
- Used for caching and invalidation

---

## 📖 **Step 2: Basic Setup (You Already Have This!)**

### 2.1 File Structure

```
src/
├── lib/
│   ├── api/
│   │   └── client.ts         ✅ (API fetch wrapper)
│   └── query/
│       └── provider.tsx      ✅ (QueryClient setup)
├── hooks/
│   ├── useAuthQueries.ts     ✅ (Auth-related queries)
│   └── useUserQueries.ts     ✅ (User CRUD queries)
└── app/
    └── layout.tsx            ✅ (Wrapped with QueryProvider)
```

### 2.2 What Each File Does

**`lib/query/provider.tsx`**
- Creates QueryClient with default settings
- Wraps app with QueryClientProvider
- Enables DevTools in development

**`lib/api/client.ts`**
- Enhanced fetch wrapper
- Handles errors, timeouts, retries
- Returns clean data or throws errors

**`hooks/useAuthQueries.ts`**
- Custom hooks for auth operations
- useLogin, useRegister, useLogout, etc.

---

## 📖 **Step 3: Your First Query (Step by Step)**

Let's convert one of your existing data fetches to TanStack Query.

### Example: Fetching User Profile

**Step 3.1: Understand Your Current Code**

Find where you fetch user data currently. It probably looks like:

```typescript
// OLD WAY (without TanStack Query)
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  async function loadUser() {
    try {
      setLoading(true);
      const response = await fetch('/api/users/123');
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  loadUser();
}, []);
```

**Step 3.2: Convert to TanStack Query**

```typescript
// NEW WAY (with TanStack Query)
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';

function UserProfile() {
  const { data: user, isLoading, error } = useQuery({
    queryKey: ['user', '123'],
    queryFn: () => apiClient<User>('users/123'),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{user.firstName}</div>;
}
```

**What Changed?**
1. ❌ No `useState` for data, loading, error
2. ❌ No `useEffect`
3. ✅ One hook: `useQuery`
4. ✅ Automatic caching
5. ✅ Automatic refetching

---

## 📖 **Step 4: Your First Mutation (Step by Step)**

Mutations are for creating, updating, or deleting data.

### Example: Updating User Profile

**Step 4.1: Current Code**

```typescript
// OLD WAY
const [loading, setLoading] = useState(false);

const handleUpdate = async (data) => {
  try {
    setLoading(true);
    const response = await fetch('/api/users/123', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    const updated = await response.json();
    setUser(updated); // Update state manually
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};
```

**Step 4.2: Convert to TanStack Query**

```typescript
// NEW WAY
import { useMutation, useQueryClient } from '@tanstack/react-query';

function EditProfile() {
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: (data) => apiClient('users/123', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    onSuccess: (updatedUser) => {
      // Update cache automatically!
      queryClient.setQueryData(['user', '123'], updatedUser);
      toast.success('Updated!');
    },
  });

  const handleUpdate = (data) => {
    updateMutation.mutate(data);
  };

  return (
    <button 
      onClick={() => handleUpdate(formData)}
      disabled={updateMutation.isPending}
    >
      {updateMutation.isPending ? 'Saving...' : 'Save'}
    </button>
  );
}
```

**What Changed?**
1. `useMutation` instead of manual fetch
2. `onSuccess` updates cache automatically
3. `isPending` instead of manual loading state
4. Cache stays in sync!

---

## 📖 **Step 5: Understanding Cache Invalidation**

### The Problem

When you create/update/delete data, other queries might have old data.

**Example:**
```
1. You fetch user list → Shows 5 users
2. You add a new user → Now 6 users exist
3. User list still shows 5 users ❌ (cached data)
```

### The Solution: Invalidate Queries

```typescript
const createUserMutation = useMutation({
  mutationFn: (newUser) => apiClient('users', {
    method: 'POST',
    body: JSON.stringify(newUser),
  }),
  onSuccess: () => {
    // Tell TanStack Query to refetch user list
    queryClient.invalidateQueries({ queryKey: ['users'] });
  },
});
```

Now when you create a user:
1. Mutation completes
2. `invalidateQueries` marks 'users' as stale
3. TanStack Query automatically refetches user list
4. UI updates with new data! ✅

---

## 📖 **Step 6: Practical Exercise - Do This Yourself!**

### Exercise 1: Convert Your Signin Form

**Current Code Location:** `src/components/SigninForm.tsx`

**Task:** Replace the direct API call with TanStack Query

**Steps:**
1. Import `useLogin` from `@/hooks/useAuthQueries`
2. Replace `const { login } = useAuth()` with `const loginMutation = useLogin()`
3. Update `handleSubmit` to use `loginMutation.mutate()`
4. Use `loginMutation.isPending` for loading state
5. Use `loginMutation.error` for error handling

**Hints:**
```typescript
// Import
import { useLogin } from '@/hooks/useAuthQueries';

// Use the hook
const loginMutation = useLogin();

// In handleSubmit
try {
  await loginMutation.mutateAsync(formData);
  // Success - redirected automatically
} catch (error) {
  setError(error.message);
}
```

---

### Exercise 2: Convert Your Profile Update

**Current Code Location:** `src/components/profile/edit/PersonalInfoForm.tsx`

**Task:** Replace direct API call with TanStack Query mutation

**Steps:**
1. Import `useUpdateUser` from `@/hooks/useUserQueries`
2. Get current user from `useAuth()`
3. Call `updateMutation.mutateAsync()` in `handleSave`
4. Use `updateMutation.isPending` for button disabled state
5. Update AuthContext with returned user

**Hints:**
```typescript
import { useUpdateUser } from '@/hooks/useUserQueries';
import { useAuth } from '@/context/AuthContext';

const updateMutation = useUpdateUser();
const { user, updateUser: updateAuthUser } = useAuth();

// In handleSave
const updatedUser = await updateMutation.mutateAsync({
  userId: user.id,
  userData: updateData,
});

// Update auth context
updateAuthUser(updatedUser);
```

---

## 📖 **Step 7: Understanding Query Keys Pattern**

### Why Hierarchical Keys?

```typescript
// Bad ❌
queryKey: ['user123']
queryKey: ['userByName']
queryKey: ['allUsers']

// Good ✅
queryKey: ['users']                    // All user queries
queryKey: ['users', 'detail', '123']   // Specific user
queryKey: ['users', 'list']            // User list
```

### Benefits

**Easy Invalidation:**
```typescript
// Invalidate ALL user-related queries
queryClient.invalidateQueries({ queryKey: ['users'] });

// Invalidate only user lists
queryClient.invalidateQueries({ queryKey: ['users', 'list'] });

// Invalidate specific user
queryClient.invalidateQueries({ queryKey: ['users', 'detail', '123'] });
```

### Your Pattern (Already Implemented!)

```typescript
// In useAuthQueries.ts
export const authKeys = {
  all: ['auth'],
  currentUser: () => [...authKeys.all, 'current-user'],
  checkUsername: (username) => [...authKeys.all, 'check-username', username],
};

// Usage
queryKey: authKeys.currentUser()  // ['auth', 'current-user']
```

---

## 📖 **Step 8: DevTools - Your Best Friend**

### How to Use

1. Run your app: `pnpm dev`
2. Look for floating TanStack Query icon (bottom-left)
3. Click it to open DevTools

### What You Can See

- **Queries tab:** All active queries
- **Query key:** What's cached
- **Status:** fresh, stale, fetching
- **Data:** Current cached data
- **Actions:** Refetch, invalidate manually

### For Your Viva

DevTools will help you explain:
- "This query is cached for 60 seconds"
- "When I click this button, it invalidates the cache"
- "You can see the mutation in flight here"

---

## 📖 **Step 9: Common Patterns in Your Project**

### Pattern 1: Conditional Fetching

```typescript
// Only fetch if user is logged in
const { data } = useQuery({
  queryKey: ['dashboard'],
  queryFn: fetchDashboard,
  enabled: isAuthenticated, // ← Only run if true
});
```

### Pattern 2: Dependent Queries

```typescript
// Fetch user first, then their bookings
const { data: user } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => fetchUser(userId),
});

const { data: bookings } = useQuery({
  queryKey: ['bookings', user?.id],
  queryFn: () => fetchBookings(user.id),
  enabled: !!user, // ← Wait for user first
});
```

### Pattern 3: Optimistic Updates

```typescript
const updateMutation = useMutation({
  mutationFn: updateUser,
  onMutate: async (newData) => {
    // Cancel outgoing queries
    await queryClient.cancelQueries({ queryKey: ['user'] });
    
    // Save old data
    const previous = queryClient.getQueryData(['user']);
    
    // Optimistically update
    queryClient.setQueryData(['user'], newData);
    
    return { previous };
  },
  onError: (err, newData, context) => {
    // Rollback on error
    queryClient.setQueryData(['user'], context.previous);
  },
});
```

---

## 📖 **Step 10: Explaining in Your Viva**

### Key Points to Mention

**1. Why TanStack Query?**
> "In a tourist guide management system, we need to manage complex data like guides, bookings, packages, and reviews. TanStack Query provides automatic caching, background refetching, and state synchronization, which reduces boilerplate code by 70% and improves user experience."

**2. Caching Strategy**
> "We cache data for 60 seconds (staleTime). This means if a user navigates between pages, we don't refetch data unnecessarily, improving performance. But we also refetch on reconnect to ensure data stays fresh."

**3. Mutation & Cache Invalidation**
> "When a guide updates their profile, we use a mutation. On success, we invalidate related queries, so the profile list automatically refetches and shows updated data. This maintains data consistency across the application."

**4. Error Handling**
> "We have custom error classes (ApiError, NetworkError, TimeoutError) that provide specific error messages. TanStack Query automatically retries failed requests 3 times with exponential backoff before showing an error to the user."

**5. Production Ready**
> "Our setup includes timeout handling (30s), automatic retries, DevTools for debugging, and proper TypeScript types. This follows industry best practices for production applications."

---

## 📖 **Step 11: Next Steps for You**

### Do These in Order:

**Week 1: Basic Understanding**
- [ ] Read this guide completely
- [ ] Watch: "TanStack Query in 100 Seconds" (YouTube)
- [ ] Practice: Convert SigninForm (Exercise 1)
- [ ] Practice: Convert PersonalInfoForm (Exercise 2)

**Week 2: Create Your Own Hooks**
- [ ] Create `useExperienceQueries.ts` (following same pattern)
- [ ] Create `usePackageQueries.ts`
- [ ] Create `useBookingQueries.ts`

**Week 3: Advanced Features**
- [ ] Implement infinite scrolling for package list
- [ ] Add optimistic updates for bookings
- [ ] Set up SSR data prefetching

**Week 4: Testing & Documentation**
- [ ] Test all features
- [ ] Document your implementation
- [ ] Prepare viva presentation

---

## 📖 **Step 12: Quick Reference Cheat Sheet**

### Basic Query
```typescript
const { data, isLoading, error } = useQuery({
  queryKey: ['key'],
  queryFn: fetchFunction,
});
```

### Basic Mutation
```typescript
const mutation = useMutation({
  mutationFn: updateFunction,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['key'] });
  },
});

mutation.mutate(data);
```

### Invalidate Cache
```typescript
queryClient.invalidateQueries({ queryKey: ['key'] });
```

### Update Cache Directly
```typescript
queryClient.setQueryData(['key'], newData);
```

### Get Cache Data
```typescript
const data = queryClient.getQueryData(['key']);
```

---

## 📚 **Additional Resources**

1. **Official Docs:** https://tanstack.com/query/latest
2. **Video Tutorial:** Search "TanStack Query Tutorial" on YouTube
3. **Examples:** https://tanstack.com/query/latest/docs/react/examples/react/simple
4. **Your Code:** Look at `src/hooks/useAuthQueries.ts` as reference

---

## 🎯 **Summary**

**Core Concepts:**
1. Queries = Read (GET)
2. Mutations = Write (POST/PUT/DELETE)
3. QueryKeys = Cache addresses
4. Invalidation = Refetch when data changes

**Benefits:**
1. Automatic caching
2. Background refetching
3. Less boilerplate code
4. Better UX
5. Easier to maintain

**Your Job:**
1. Understand the pattern
2. Convert existing code
3. Create new hooks for experiences/packages/bookings
4. Explain confidently in viva! 💪

---

Good luck with your campus project! 🚀

**Questions? Check the examples in your code:**
- `src/hooks/useAuthQueries.ts`
- `src/hooks/useUserQueries.ts`
- `src/lib/api/client.ts`
