import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/DashboardLayout';
import DashboardPage from './pages/DashboardPage';


// Pages
import LoginPage from './pages/LoginPage';
import PlacementOverview from './pages/PlacementOverview';
import PlacementStatistics from './pages/PlacementStatistics';
import DepartmentsPage from './pages/DepartmentsPage';
import ITDepartmentPage from './pages/departments/ITDepartmentPage';
import Alumni2025 from './pages/departments/it/alumni/Alumni2025';
import Alumni2024 from './pages/departments/it/alumni/Alumni2024';
import AlumniYearPage from './pages/departments/it/alumni/AlumniYearPage';

function App() {
  return (
    <Router basename="/">
      <Routes>
        {/* Login Page */}
        <Route path="/" element={<LoginPage />} />

        {/* Dashboard Routes (Protected) */}
        <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <DashboardLayout>
        <DashboardPage />
      </DashboardLayout>
    </ProtectedRoute>
  }
/>
        <Route
          path="/dashboard"
          element={<ProtectedRoute><DashboardLayout><DashboardPage /></DashboardLayout></ProtectedRoute>}
        />
        <Route
          path="/dashboard/placement-officer"
          element={<ProtectedRoute><DashboardLayout><PlacementOverview /></DashboardLayout></ProtectedRoute>}
        />
        <Route
          path="/dashboard/placement/statistics"
          element={<ProtectedRoute><DashboardLayout><PlacementStatistics /></DashboardLayout></ProtectedRoute>}
        />
        <Route
          path="/dashboard/departments"
          element={<ProtectedRoute><DashboardLayout><DepartmentsPage /></DashboardLayout></ProtectedRoute>}
        />

        {/* Department Routes (Protected) */}
        <Route
          path="/departments/it"
          element={<ProtectedRoute><DashboardLayout><ITDepartmentPage /></DashboardLayout></ProtectedRoute>}
        />
        <Route
          path="/departments/it/alumni/2025"
          element={<ProtectedRoute><DashboardLayout><Alumni2025 /></DashboardLayout></ProtectedRoute>}
        />
        <Route
          path="/departments/it/alumni/2024"
          element={<ProtectedRoute><DashboardLayout><Alumni2024 /></DashboardLayout></ProtectedRoute>}
        />
        <Route
          path="/departments/it/alumni/:year"
          element={<ProtectedRoute><DashboardLayout><AlumniYearPage /></DashboardLayout></ProtectedRoute>}
        />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
