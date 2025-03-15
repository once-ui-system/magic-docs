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
  bug: { label: "Bug", color: "red" },
  feature: { label: "Feature", color: "green" },
  improvement: { label: "Improvement", color: "blue" },
  documentation: { label: "Docs", color: "magenta" },
  performance: { label: "Performance", color: "orange" },
  security: { label: "Security", color: "indigo" }
};

const changelog = [
  {
    date: "2025-03-15",
    title: "New Templates",
    description: "We've added several new templates and components to make your development experience even better.",
    image: "/og?title=New+Templates",
    sections: [
      {
        title: "New Templates",
        description: "Explore our latest templates for faster development",
        bullets: [
          "Magic Docs - Documentation template",
          "Magic Bio - Personal profile template"
        ]
      },
      {
        title: "Component Updates",
        description: "We've improved several components for better performance and usability",
        bullets: [
          "Authentication Block - Improved security and UX",
          "Plans Block - New pricing options and layouts"
        ]
      },
      {
        title: "Bug Fixes",
        bullets: [
          "Fixed responsive issues on mobile devices",
          "Resolved theme switching inconsistencies"
        ]
      }
    ]
  },
  {
    date: "2025-02-27",
    title: "New Pages and Blocks",
    sections: [
      {
        title: "New Pages",
        bullets: [
          "Careers Page - Job listings and company culture",
          "Contact Page - Contact form and information"
        ]
      },
      {
        title: "New Blocks",
        bullets: [
          "Features Block - Showcase your product features",
          "Newsletter Block - Email subscription form",
          "Cookie Banner - GDPR compliant cookie consent",
          "FAQ Block - Frequently asked questions"
        ]
      }
    ]
  },
  {
    date: "2025-02-13",
    title: "Blog and Profile Pages",
    description: "Introducing new page templates for blogs and user profiles",
    image: "/images/cover.jpg",
    sections: [
      {
        title: "Content Pages",
        bullets: [
          "Blog Post - Rich content blog template",
          "Profile Page - User profile template"
        ],
        link: "https://example.com"
      },
      {
        title: "Supporting Blocks",
        bullets: [
          "Testimonial Block - Customer reviews",
          "Gradient Background - Customizable backgrounds"
        ]
      }
    ]
  }
];

export { roadmap, task, changelog };