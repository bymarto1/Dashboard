import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import dashboardService from '../services/dashboard';
import { useAuth } from '../hooks/useAuth';

const PerformanceChart = () => {
  const [rawData, setRawData] = useState({ collections: [] });
  const auth = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const data = await dashboardService.getPerformance(auth.token);
      setRawData(data);
    };
    fetchData();
  }, []);

  const data = rawData.collections.map((dataset) => {
    const sortedPerformance = dataset.performance.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    
    return {
      x: sortedPerformance.map((d) => d.timestamp),
      y: sortedPerformance.map(
        (d) => (d.total_requests ? (d.successful_requests / d.total_requests) * 100 : 0)
      ),
      mode: 'lines+markers',
      type: 'scatter',
      line: { shape: 'linear' },
      name: dataset.collection.replace('-', ' ').toUpperCase(),
    };
  });
  console.log(data)
  return (
    <Plot
      data={data}
      layout={{
        width: 800,
        height: 600,
        title: 'Performance Chart',
        xaxis: {
          title: 'Time',
          type: 'date',
          tickformat: '%H:%M', // Format x-axis tick labels as hours and minutes
        },
        yaxis: {
          title: 'Success %',
          range: [0, 100],
        },
        showlegend: true, // Enable the legend
      }}
    />
  );
};

export default PerformanceChart;
