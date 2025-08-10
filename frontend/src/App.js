import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layout
import DashboardLayout from './components/DashboardLayout';

// Pages
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
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

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout><DashboardPage /></DashboardLayout>} />
        <Route path="/dashboard/placement-officer" element={<DashboardLayout><PlacementOverview /></DashboardLayout>} />
        <Route path="/dashboard/placement/statistics" element={<DashboardLayout><PlacementStatistics /></DashboardLayout>} />
        <Route path="/dashboard/departments" element={<DashboardLayout><DepartmentsPage /></DashboardLayout>} />

        {/* Department Routes */}
        <Route path="/departments/it" element={<DashboardLayout><ITDepartmentPage /></DashboardLayout>} />
        <Route path="/departments/it/alumni/2025" element={<DashboardLayout><Alumni2025 /></DashboardLayout>} />
        <Route path="/departments/it/alumni/2024" element={<DashboardLayout><Alumni2024 /></DashboardLayout>} />
        <Route path="/departments/it/alumni/:year" element={<DashboardLayout><AlumniYearPage /></DashboardLayout>} />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;