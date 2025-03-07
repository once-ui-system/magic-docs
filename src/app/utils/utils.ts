import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Schemes } from "@/once-ui/types";

interface Post {
  slug: string;
  content: string;
  navTag?: string;
  navLabel?: string;
  navIcon?: string;
  navTagVariant?: Schemes;
  metadata: {
    title: string;
    summary?: string;
    updatedAt: string;
    image?: string;
    order?: number; // Add order field for explicit ordering
  };
}

export function getPages(customPath = ["src", "content"]): Post[] {
  const postsDir = path.join(process.cwd(), ...customPath);
  const contentBasePath = path.join(process.cwd(), "src", "content");
  
  // Check if directory exists before trying to read it
  if (!fs.existsSync(postsDir)) {
    console.warn(`Directory does not exist: ${postsDir}`);
    return [];
  }
  
  const files = fs.readdirSync(postsDir);
  const posts: Post[] = [];

  files.forEach((file) => {
    const filePath = path.join(postsDir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      try {
        posts.push(...getPages([...customPath, file]));
      } catch (error) {
        console.warn(`Error reading directory: ${filePath}`, error);
      }
    } else if (file.endsWith('.mdx')) {
      try {
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContents);

        // Create slug without src/content prefix
        const slug = path.relative(contentBasePath, filePath)
          .replace(/\.mdx?$/, '')
          .replace(/\\/g, '/');

        posts.push({
          slug,
          content,
          navTag: data.tag,
          navLabel: data.tagLabel,
          navIcon: data.navIcon,
          navTagVariant: data.navTagVariant,
          metadata: {
            title: data.title || '',
            summary: data.summary,
            updatedAt: data.updatedAt || '',
            image: data.image,
            order: data.order !== undefined ? Number(data.order) : undefined,
          },
        });
      } catch (error) {
        console.warn(`Error reading file: ${filePath}`, error);
      }
    }
  });

  return posts;
}

// Sort types for documentation pages
export type SortType = 'order' | 'alphabetical' | 'date' | 'section';

// Function to sort pages consistently across the application
export function sortPages(pages: Post[], sortType: SortType = 'order'): Post[] {
  if (!pages || pages.length === 0) {
    return [];
  }

  // Create a copy to avoid mutating the original array
  const sortedPages = [...pages];

  switch (sortType) {
    case 'order':
      // First sort by explicit order (if available), then alphabetically by slug as fallback
      return sortedPages.sort((a, b) => {
        // If both have order, sort by order
        if (a.metadata.order !== undefined && b.metadata.order !== undefined) {
          return a.metadata.order - b.metadata.order;
        }
        // If only a has order, a comes first
        if (a.metadata.order !== undefined) {
          return -1;
        }
        // If only b has order, b comes first
        if (b.metadata.order !== undefined) {
          return 1;
        }
        // If neither has order, sort alphabetically by slug
        return a.slug.localeCompare(b.slug);
      });

    case 'alphabetical':
      // Sort alphabetically by title
      return sortedPages.sort((a, b) => 
        a.metadata.title.localeCompare(b.metadata.title)
      );

    case 'date':
      // Sort by update date (newest first)
      return sortedPages.sort((a, b) => 
        new Date(b.metadata.updatedAt).getTime() - new Date(a.metadata.updatedAt).getTime()
      );

    case 'section':
      // Sort by section (directory structure) first, then by order within section
      return sortedPages.sort((a, b) => {
        // Get the section (first part of the slug)
        const aSection = a.slug.split('/')[0];
        const bSection = b.slug.split('/')[0];
        
        // If sections are different, sort by section
        if (aSection !== bSection) {
          return aSection.localeCompare(bSection);
        }
        
        // If in the same section, use order logic
        if (a.metadata.order !== undefined && b.metadata.order !== undefined) {
          return a.metadata.order - b.metadata.order;
        }
        if (a.metadata.order !== undefined) return -1;
        if (b.metadata.order !== undefined) return 1;
        
        // Fallback to alphabetical by title
        return a.metadata.title.localeCompare(b.metadata.title);
      });

    default:
      return sortedPages;
  }
}

// Function to get adjacent pages based on the current slug
export function getAdjacentPages(currentSlug: string, sortType: SortType = 'order') {
  try {
    // Get all pages
    const allPages = getPages();
    
    // Sort pages using the consistent sorting function
    const sortedPages = sortPages(allPages, sortType);
    
    // Find current page index
    const currentIndex = sortedPages.findIndex(page => page.slug === currentSlug);
    
    if (currentIndex === -1) {
      return { prevPage: null, nextPage: null };
    }
    
    // Get previous and next pages
    const prevPage = currentIndex > 0 ? sortedPages[currentIndex - 1] : null;
    const nextPage = currentIndex < sortedPages.length - 1 ? sortedPages[currentIndex + 1] : null;
    
    return { prevPage, nextPage };
  } catch (error) {
    console.error("Error getting adjacent pages:", error);
    return { prevPage: null, nextPage: null };
  }
}