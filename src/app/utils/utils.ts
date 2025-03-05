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
  };
}

export function getPages(customPath = ["src", "content"]): Post[] {
  const postsDir = path.join(process.cwd(), ...customPath);
  const contentBasePath = path.join(process.cwd(), "src", "content");
  const files = fs.readdirSync(postsDir);
  const posts: Post[] = [];

  files.forEach((file) => {
    const filePath = path.join(postsDir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      posts.push(...getPages([...customPath, file]));
    } else if (file.endsWith('.mdx')) {
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
        },
      });
    }
  });

  return posts;
}