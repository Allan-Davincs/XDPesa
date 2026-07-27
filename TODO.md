# TODO: Connect Frontend to Backend API

## Step 1: Backend - Add loans-by-user endpoint
- [x] Add `GET /api/loan/user/{userId}` in `LoanController.java`
- [x] Add `findByCustomerId` in `LoanRepository.java`

## Step 2: Backend - Add all users endpoint  
- [x] Add `GET /api/auth/users` in `AuthController.java`

## Step 3: Frontend - Update types/index.ts
- [x] Align `LoanApplication` and `RequestItem` types with backend models
- [x] Add API response types

## Step 4: Frontend - Update storage.ts to call backend API
- [x] Convert `registerUser` to call backend `/api/auth/register`
- [x] Convert `loginUser` to call backend `/api/auth/login`
- [x] Convert `loadRequests` to call `GET /api/loan/all`
- [x] Add `loadRequestsByUser` to call `GET /api/loan/user/{id}`
- [x] Convert `createRequest` to call `POST /api/loan/apply`
- [x] Convert `updateRequestStatus` to call `PUT /api/loan/update/{id}?status=`
- [x] Convert `loadUsers` to call `GET /api/auth/users`

## Step 5: Frontend - Fix App.tsx
- [x] Proper async handling for register, login
- [x] Fetch requests from API on mount instead of localStorage

## Step 6: Frontend - Update page components
- [x] Update `RegisterPage.tsx` to use async
- [x] Update `LoginPage.tsx` to use async
- [x] Update `AdminRequestsPage.tsx` to use async
- [x] Update `RequestFundsPage.tsx` to properly call API
- [ ] Update `DashboardPage.tsx` to use API data
- [ ] Update `AdminDashboardPage.tsx` to use API data
- [ ] Update `MyRequestsPage.tsx` to use API data

## Step 7: Test
- [ ] Restart backend server
- [ ] Restart frontend server
- [ ] Test full flow: register → login → create loan → admin approve

