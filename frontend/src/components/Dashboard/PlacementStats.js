import { getPlacementStatistics } from '../../api/placementApi';
import React, { useState, useEffect } from 'react';

const PlacementStats = () => {
  const [placementData, setPlacementData] = useState({
    departments: [
      { id: 'IT', name: 'Information Technology' },
      { id: 'CS', name: 'Computer Science' },
      { id: 'ECE', name: 'Electronics and Communication' },
      { id: 'MECH', name: 'Mechanical Engineering' },
      { id: 'EEE', name: 'Electrical and Electronics' }
    ],
    statistics: {}
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const stats = await getPlacementStatistics();
        
        const transformedStats = stats.data || stats;
        
        setPlacementData(prev => ({
          ...prev,
          statistics: transformedStats
        }));
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message || 'Failed to fetch placement statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatSalary = (salary) => {
    if (!salary) return 'N/A';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(salary);
  };

  if (loading) return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>Loading placement data...</p>
    </div>
  );

  if (error) return (
    <div className="error-message">
      <p>⚠️ {error}</p>
      <button onClick={() => window.location.reload()}>Retry</button>
    </div>
  );

  return (
    <div className="placement-stats-container">
      <h2 className="stats-header">Placement Statistics</h2>
      
      <div className="stats-grid">
        {placementData.departments.map(dept => {
          const deptStats = placementData.statistics[dept.id] || {};
          return (
            <div key={dept.id} className="stats-card">
              <h3 className="dept-name">{dept.name}</h3>
              
              <div className="stat-item">
                <span className="stat-label">Placements:</span>
                <span className="stat-value">{deptStats.placed || 0}</span>
              </div>
              
              <div className="stat-item">
                <span className="stat-label">Offers:</span>
                <span className="stat-value">{deptStats.offers || 0}</span>
              </div>
              
              <div className="stat-item">
                <span className="stat-label">Avg Salary:</span>
                <span className="stat-value">{formatSalary(deptStats.avgSalary)}</span>
              </div>
              
              {deptStats.topCompanies && (
                <div className="stat-item">
                  <span className="stat-label">Top Companies:</span>
                  <span className="stat-value">{deptStats.topCompanies.join(', ')}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlacementStats;
