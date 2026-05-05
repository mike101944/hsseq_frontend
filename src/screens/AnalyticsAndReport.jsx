import React, { useState } from "react";
import { FaChartLine, FaUsers, FaFileDownload } from 'react-icons/fa';

import { MultiSelect } from 'primereact/multiselect';
import { FloatLabel } from 'primereact/floatlabel';

import Chart from "react-apexcharts";






export function AnalyticsAndReport() {
  return (
    // <AnalyticsPage/>
    <StatisticalAnalysisDashboard/>
  )
}




function AnalyticsPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('last30Days');
  const data = {
    totalSales: "$500,000",
    activeUsers: "2,500",
    newTransactions: "150",
    salesGrowth: [
      { month: 'Jan', sales: 40000 },
      { month: 'Feb', sales: 50000 },
      { month: 'Mar', sales: 60000 },
      { month: 'Apr', sales: 70000 },
    ],
    topProducts: [
      { product: 'Cloud Computing Guide', sales: "$50,000" },
      { product: 'IaaS Solutions', sales: "$40,000" },
      { product: 'PaaS Overview', sales: "$30,000" },
    ],
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto p-6">
        {/* Page Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-semibold text-gray-800">Analytics and Reports</h1>
          <p className="text-gray-500 mt-2">Track your progress and explore detailed reports.</p>
        </header>

        {/* Overview Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Total Sales */}
          <div className="bg-white shadow-lg rounded-lg p-6 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-medium text-gray-600">Total Sales</h3>
              <p className="text-3xl font-semibold text-gray-900">{data.totalSales}</p>
            </div>
            <FaChartLine className="text-green-500 text-5xl" />
          </div>

          {/* Active Users */}
          <div className="bg-white shadow-lg rounded-lg p-6 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-medium text-gray-600">Active Users</h3>
              <p className="text-3xl font-semibold text-gray-900">{data.activeUsers}</p>
            </div>
            <FaUsers className="text-blue-500 text-5xl" />
          </div>

          {/* New Transactions */}
          <div className="bg-white shadow-lg rounded-lg p-6 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-medium text-gray-600">New Transactions</h3>
              <p className="text-3xl font-semibold text-gray-900">{data.newTransactions}</p>
            </div>
            <FaFileDownload className="text-yellow-500 text-5xl" />
          </div>
        </div>

        {/* Sales Growth Chart */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-10">
          <h3 className="text-2xl font-medium text-gray-800 mb-4">Sales Growth Over Time</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left text-gray-600">Month</th>
                  <th className="py-2 px-4 border-b text-left text-gray-600">Sales</th>
                </tr>
              </thead>
              <tbody>
                {data.salesGrowth.map((item) => (
                  <tr key={item.month} className="border-b">
                    <td className="py-2 px-4 text-gray-800">{item.month}</td>
                    <td className="py-2 px-4 text-gray-900">{item.sales}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-10">
          <h3 className="text-2xl font-medium text-gray-800 mb-4">Top Selling Products</h3>
          <ul>
            {data.topProducts.map((product, index) => (
              <li key={index} className="flex justify-between py-3 border-b">
                <span className="text-lg text-gray-700">{product.product}</span>
                <span className="text-lg text-gray-900">{product.sales}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Filters */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-10 flex justify-between items-center">
          <div className="text-gray-600">
            <h4 className="text-xl font-medium">Time Period</h4>
            <p className="text-sm">Select a timeframe to view detailed reports</p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => setSelectedTimeframe('last30Days')}
              className={`px-4 py-2 rounded-lg text-sm ${selectedTimeframe === 'last30Days' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              Last 30 Days
            </button>
            <button
              onClick={() => setSelectedTimeframe('last6Months')}
              className={`px-4 py-2 rounded-lg text-sm ${selectedTimeframe === 'last6Months' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              Last 6 Months
            </button>
            <button
              onClick={() => setSelectedTimeframe('lastYear')}
              className={`px-4 py-2 rounded-lg text-sm ${selectedTimeframe === 'lastYear' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              Last Year
            </button>
          </div>
        </div>

        {/* Download Report */}
        <div className="text-center">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200">
            Download Full Report
          </button>
        </div>
      </div>
    </div>
  );
}





const StatisticalAnalysisDashboard = () => {
  const [filters, setFilters] = useState({
    dateRange: "month",
    department: "all",
    location: "all",
    incidentType: [],
  });

  const handleFilterChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFilters((prev) => ({
        ...prev,
        incidentType: value
          ? [...prev.incidentType, value]
          : prev.incidentType.filter((item) => item !== value),
      }));
    } else {
      setFilters((prev) => ({ ...prev, [name]: value }));
    }
  };

  const chartOptions = {
    chart: { type: "line" },
    xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
  };
  const chartSeries = [{ name: "Incidents", data: [30, 40, 45, 50, 49, 60] }];



  const [selectedCities, setSelectedCities] = useState([]);
  const cities = [
      { name: 'Accident', code: 'NY' },
      { name: 'Near miss', code: 'RM' },
      { name: 'property damage', code: 'LDN' },
      { name: 'environmental incidence', code: 'IST' },
      { name: 'fire or explosion', code: 'PRS' },
      { name: 'unsafe condition', code: 'PRS' },
      { name: 'Health related inidence', code: 'PRS' },
      { name: 'Other', code: 'PRS' }
  ];
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">HSSEQ Performance Dashboard</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-green-100 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Total Incidents Reported</h3>
          <p className="text-2xl font-bold">120</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Compliance Rate</h3>
          <p className="text-2xl font-bold">85%</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Training Completion Rate</h3>
          <p className="text-2xl font-bold">90%</p>
        </div>
        <div className="bg-red-100 p-4 rounded-lg shadow items-center justify-center flex flex-col">
          <h3 className="text-lg font-semibold">Report History</h3>
          <p className="text-2xl font-bold">108 </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Incident Trends</h2>
          <Chart options={chartOptions} series={chartSeries} type="line" height={350} />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Incidents by Category</h2>
          <Chart
            options={{ chart: { type: "bar" }, xaxis: { categories: ["Safety", "Environment", "Quality"] } }}
            series={[{ name: "Count", data: [40, 30, 50] }]}
            type="bar"
            height={350}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Customizable Filters</h2>
        <div className="flex flex-wrap gap-4">
          <select
            name="dateRange"
            value={filters.dateRange}
            onChange={handleFilterChange}
            className="border border-gray-300 p-2 rounded"
          >
            <option value="month">Last Month</option>
            <option value="year">Last Year</option>
          </select>
          <select
            name="department"
            value={filters.department}
            onChange={handleFilterChange}
            className="border border-gray-300 p-2 rounded"
          >
            <option value="all">All Departments</option>
            <option value="hr">HR</option>
            <option value="operations">Operations</option>
          </select>


          {/* <label>
            <input
              type="checkbox"
              name="incidentType"
              value="safety"
              checked={filters.incidentType.includes("safety")}
              onChange={handleFilterChange}
            />
            Safety
          </label>
          <label>
            <input
              type="checkbox"
              name="incidentType"
              value="environment"
              checked={filters.incidentType.includes("environment")}
              onChange={handleFilterChange}
            />
            Environment
          </label> */}
          <div className="card flex justify-content-center">
            <FloatLabel className="w-[250px] flex md:w-20rem bg-white px-1">
                <MultiSelect 
                // content=""
                value={selectedCities} onChange={(e) => setSelectedCities(e.value)} options={cities} optionLabel="name" maxSelectedLabels={3} className="w-full bg-white" />
                <label htmlFor="ms-cities">Type of incidence</label>
            </FloatLabel>
        </div>


        </div>
      </div>

      {/* Export Options */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Export Options</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
          Export to PDF
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded mr-2">
          Export to Excel
        </button>
        <button className="bg-purple-500 text-white px-4 py-2 rounded">
          Export to CSV
        </button>
      </div>

      {/* Predictive Analytics */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Predictive Analytics</h2>
        <p>
          Predicted increase in safety incidents in Department X due to low training completion rate.
        </p>
      </div>
    </div>
  );
};





export function FloatLabelDemo() {
    const [selectedCities, setSelectedCities] = useState(null);
    const cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

    return (
        <div className="card flex justify-content-center">
            <FloatLabel className="w-full md:w-20rem">
                <MultiSelect value={selectedCities} onChange={(e) => setSelectedCities(e.value)} options={cities} optionLabel="name" maxSelectedLabels={3} className="w-full" />
                <label htmlFor="ms-cities">MultiSelect</label>
            </FloatLabel>
        </div>
    );
}
  