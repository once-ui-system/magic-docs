import { baseURL } from "./config";

// If set to true, make sure to set LINEAR_API_KEY in .env & baseURL in config.js
const useLinear = false; // Set to false to use static data 
// Linear roadmap data resets every hour (delete line 211 for fresh data)
export const useLinearPublicLabels = false; // When true, only linear tasks with the public label will be shown

// Static data
const roadmap = [
  {
    product: "Magic Docs Core",
    brand: "indigo",
    columns: [
      {
        title: "Planned",
        tasks: [
          {
            title: "Improve search functionality",
            description: "Enhance the search algorithm to provide more relevant results",
            user: {
              name: "Alex Johnson",
              avatar: "https://i.pravatar.cc/150?img=1"
            },
            type: "improvement"
          },
          {
            title: "Add dark mode support",
            description: "Implement a comprehensive dark mode theme across the application",
            user: {
              name: "Sam Taylor"
            },
            type: "feature"
          },
          {
            title: "Mobile responsiveness",
            description: "Ensure all components work well on mobile devices",
            href: "/tasks/mobile-responsiveness",
            type: "improvement"
          }
        ]
      },
      {
        title: "In Progress",
        tasks: [
          {
            title: "API documentation",
            description: "Create comprehensive documentation for all API endpoints",
            user: {
              name: "Jamie Smith",
              avatar: "https://i.pravatar.cc/150?img=2"
            },
            href: "/tasks/api-docs",
            type: "documentation"
          },
          {
            title: "Performance optimization",
            description: "Improve loading times and reduce bundle size",
            user: {
              name: "Riley Chen"
            },
            type: "performance"
          }
        ]
      },
      {
        title: "Completed",
        tasks: [
          {
            title: "User authentication",
            description: "Implement secure login and registration system",
            user: {
              name: "Jordan Lee",
              avatar: "https://i.pravatar.cc/150?img=3"
            },
            type: "security"
          },
          {
            title: "Component library",
            description: "Create reusable UI components for faster development",
            user: {
              name: "Casey Wilson"
            },
            type: "feature"
          },
          {
            title: "Automated testing",
            description: "Set up CI/CD pipeline with automated tests",
            user: {
              name: "Taylor Morgan",
              avatar: "https://i.pravatar.cc/150?img=4"
            },
            type: "improvement"
          }
        ]
      }
    ]
  },
  {
    product: "Magic Docs Extensions",
    brand: "cyan",
    columns: [
      {
        title: "Planned",
        tasks: [
          {
            title: "Analytics Integration",
            description: "Add support for popular analytics platforms",
            user: {
              name: "Morgan Smith",
              avatar: "https://i.pravatar.cc/150?img=5"
            },
            type: "feature"
          },
          {
            title: "Localization Support",
            description: "Add multi-language support for documentation",
            user: {
              name: "Robin Patel"
            },
            type: "feature"
          }
        ]
      },
      {
        title: "In Progress",
        tasks: [
          {
            title: "Custom Themes",
            description: "Allow users to create and apply custom themes",
            user: {
              name: "Quinn Jones",
              avatar: "https://i.pravatar.cc/150?img=6"
            },
            type: "improvement"
          }
        ]
      },
      {
        title: "Completed",
        tasks: [
          {
            title: "Code Syntax Highlighting",
            description: "Support for syntax highlighting in code blocks",
            user: {
              name: "Avery Williams",
              avatar: "https://i.pravatar.cc/150?img=7"
            },
            type: "feature"
          },
          {
            title: "Image Optimization",
            description: "Automatic optimization of images in documentation",
            user: {
              name: "Jordan Rivera"
            },
            type: "performance"
          }
        ]
      }
    ]
  }
];

const task = {
  bug: {
    label: "Bug", 
    color: "red" 
  },
  feature: { 
    label: "Feature", 
    color: "green" 
  },
  improvement: { 
    label: "Improvement", 
    color: "blue" 
  },
  documentation: { 
    label: "Docs", 
    color: "magenta" 
  },
  performance: { 
    label: "Performance", 
    color: "orange" 
  },
  security: { 
    label: "Security", 
    color: "indigo" 
  }
};

// Function to fetch roadmap data from Linear API endpoint
const fetchLinearRoadmap = async () => {
  try {
    console.log('Fetching Linear roadmap data...');
    
    let baseUrl = '';
    if (typeof window !== 'undefined') {
    // Client-side: Use the current origin
    baseUrl = window.location.origin;
  } else {
    // Server-side: Use baseURL in production, otherwise default to the current localhost
    const defaultLocalhost = `http://localhost:${process.env.PORT || 3000}`;
    baseUrl = process.env.NODE_ENV === 'production' ? baseURL : defaultLocalhost;
  }
    
    const apiUrl = `${baseUrl}/api/linear`;
    console.log(`Using Linear API URL: ${apiUrl}`);
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    // If the API call fails, log it and return null
    if (!response.ok) {
      const errorText = await response.text().catch(() => 'No error details available');
      console.error(`Linear API endpoint error (${response.status}):`, errorText);
      return null;
    }
    
    const result = await response.json();
    
    if (result.error || !result.data) {
      console.error('Linear API error:', result.error || 'No data returned');
      return null;
    }
    
    if (Array.isArray(result.data) && result.data.length > 0) {
      console.log(`Successfully loaded roadmap data from Linear with ${result.data.length} team(s)`);
      return result.data;
    } else {
      console.log('Linear API returned empty roadmap data');
      return null;
    }
  } catch (error) {
    console.error('Error fetching data from Linear API:', error);
    return null;
  }
};

// Function to get roadmap data - either from Linear or fallback to static data
const getRoadmap = async () => {
  // Try to get data from Linear first
  if (!useLinear) {
    return roadmap;
  }
  const linearData = await fetchLinearRoadmap();
  if (linearData) {
    return linearData;
  }
  
  console.log('Using static roadmap data as fallback');
  // Fallback to static data if Linear integration is not configured or fails
  return roadmap;
};

export { roadmap, task, getRoadmap };