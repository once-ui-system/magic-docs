"use client";

import React, { useEffect, useState } from "react";
import { ToggleButton } from '@/once-ui/components/ToggleButton';
import { Column, Row, Tag } from "@/once-ui/components";
import { usePathname } from 'next/navigation';

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

const toTitleCase = (str: string) => {
  return str
    .replace(/-/g, ' ')
    .replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
};

const sortNavigationItems = (items: NavigationItem[]): NavigationItem[] => {
    return items.sort((a, b) => {
      const aDepth = a.slug.split('/').length;
      const bDepth = b.slug.split('/').length;
  
      const aIsCategory = !!a.children;
      const bIsCategory = !!b.children;
  
      const aIsUncategorized = aDepth === 1;
      const bIsUncategorized = bDepth === 1;
  
      // Prioritize uncategorized pages (no `/`)
      if (aIsUncategorized && !bIsUncategorized) return -1;
      if (!aIsUncategorized && bIsUncategorized) return 1;
  
      // Ensure categories come after uncategorized pages
      if (!aIsCategory && bIsCategory) return -1;
      if (aIsCategory && !bIsCategory) return 1;
  
      // Sort alphabetically within their group
      return a.title.localeCompare(b.title);
    });
  };
  

export const Sidebar = ({ initialNavigation }: { initialNavigation: NavigationItem[] }) => {
  const [navigation, setNavigation] = useState<NavigationItem[]>(initialNavigation || []);
  const pathname = usePathname();

  useEffect(() => {
    fetch("/api/navigation")
      .then((res) => res.json())
      .then((data) => setNavigation(data))
      .catch((err) => console.error("Navigation fetch failed", err));
  }, []);
  
  const renderNavigation = (items: NavigationItem[], depth = 0) => {
    const sortedItems = sortNavigationItems(items);
  
    return (
      <>
        {sortedItems.map((item) => {
          const correctedSlug = item.slug.replace(/^src\\content\\/, '').replace(/\\/g, '/');
  
          return (
            <React.Fragment key={item.slug}>
              {item.children ? (
                <Column fillWidth marginTop={depth !== 0 ? "12" : "32"} gap="2" style={{paddingLeft: `calc(${depth} * var(--static-space-8))`, marginLeft: `calc(${depth} * var(--static-space-16))`}}
                    borderLeft={depth > 0 ? "neutral-alpha-medium" : undefined}>
                  <Row textVariant="label-strong-s" onBackground="brand-medium" marginBottom="12" marginTop="4" paddingLeft="16">
                    {toTitleCase(item.title)}
                  </Row>
                  {renderNavigation(item.children, depth + 1)}
                </Column>
              ) : (
                <ToggleButton
                  fillWidth
                  size={depth === 0 ? "l" : undefined}
                  justifyContent="flex-start"
                  prefixIcon={item.navIcon}
                  selected={pathname.startsWith(`/docs/${correctedSlug}`)}
                  href={`/docs/${correctedSlug}`}
                >
                    <Row vertical="center" gap="8">
                        {item.navTag && (
                            <Tag variant={item.navTagVariant} size="s">
                                {item.navTag}
                            </Tag>
                        )}
                        {item.label || item.title}
                    </Row>
                </ToggleButton>
              )}
            </React.Fragment>
          );
        })}
      </>
    );
  };
  

  return (
    <Column maxWidth={12} position="sticky" top="80" fitHeight gap="2" as="nav">
      {renderNavigation(navigation)}
    </Column>
  );
};