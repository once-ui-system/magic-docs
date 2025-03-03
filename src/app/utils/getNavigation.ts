import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface NavigationItem {
    slug: string;
    title: string;
    label?: string;
    navTag?: string;
    navLabel?: string;
    navIcon?: string;
    navTagVariant?: "brand" | "accent" | "neutral" | "success" | "info" | "danger" | "gradient";
    children?: NavigationItem[];
}

export default function getNavigation(dirPath = path.join(process.cwd(), 'src/content')): NavigationItem[] {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  return entries.map((entry) => {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      return {
        slug: entry.name,
        title: entry.name,
        children: getNavigation(fullPath),
      };
    } else if (entry.isFile() && entry.name.endsWith('.mdx')) {
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug: path.relative(process.cwd(), fullPath).replace(/\.mdx?$/, ''),
        title: data.title || entry.name.replace(/\.mdx?$/, ''),
        navTag: data.navTag,
        navLabel: data.navLabel,
        navIcon: data.navIcon,
        navTagVariant: data.navTagVariant,
      };
    }
  }).filter(Boolean) as NavigationItem[];
}