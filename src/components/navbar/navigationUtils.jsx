// navigationUtils.js
export const routeTitles = {
    '/': 'Dashboard',
    '/training/list': 'Training Programs',
    '/training/create': 'Schedule Training',
    '/training/reports': 'Training Reports',
    '/incidents/list': 'All Incidents',
    '/incidents/create': 'Report Incident',
    '/incidents/analysis': 'Incident Analysis',
    '/monitoring/dashboard': 'Monitoring Dashboard',
    '/monitoring/alerts': 'Alerts & Notifications',
    '/monitoring/reports': 'Monitoring Reports',
    '/audits': 'Audits Management',
    '/compliance': 'Compliance Management',
    '/inspections': 'Inspections Management',
    '/risk': 'Risk Management',
    '/reports': 'Report Management',
  };
  
  // Function to get readable title based on pathname
  export const getPageTitle = (path) => {
    return routeTitles[path] || 'HSSEQ System';
  };
  
  // Function to build breadcrumb from pathname
  export const getBreadcrumb = (path) => {
    if (path === '/') return 'Overview';
  
    const parts = path.split('/').filter(Boolean);
    return parts
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' / ');
  };
  