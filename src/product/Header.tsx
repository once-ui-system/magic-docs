"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Button, Flex, Logo, NavIcon, Row, ToggleButton, Kbar, Kbd } from "@/once-ui/components";
import { layout } from "@/app/resources/config";
import { Sidebar, NavigationItem } from "./Sidebar";

export function Header() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setSidebarVisible(false);
  }, [pathname]);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  // State to store navigation items from API
  const [navigationItems, setNavigationItems] = useState<NavigationItem[]>([]);
  
  // Fetch navigation data
  useEffect(() => {
    fetch("/api/navigation")
      .then((res) => res.json())
      .then((data) => {
        setNavigationItems(data);
      })
      .catch((err) => console.error("Navigation fetch failed", err));
  }, []);

  // Function to convert navigation items to Kbar items recursively
  const convertToKbarItems = (items: NavigationItem[]) => {
    const kbarItems: any[] = [];
    
    items.forEach((item) => {
      if (item.children) {
        // This is a section/category
        // Add children items with this section name
        const childItems = convertToKbarItems(item.children);
        childItems.forEach(child => {
          child.section = item.title;
        });
        kbarItems.push(...childItems);
      } else {
        // This is a page item
        const correctedSlug = item.slug.replace(/^src\\content\\/, '').replace(/\\/g, '/');
        
        // Generate default keywords if none provided
        const defaultKeywords = `${item.title.toLowerCase()}, docs, documentation`;
        const keywords = item.keywords || defaultKeywords;
        
        kbarItems.push({
          id: correctedSlug,
          name: item.label || item.title,
          section: "Documentation",
          shortcut: [],
          keywords: keywords,
          href: `/docs/${correctedSlug}`,
          icon: item.navIcon || "document",
        });
      }
    });
    
    return kbarItems;
  };

  // Generate Kbar items from navigation
  const docsItems = convertToKbarItems(navigationItems);
  
  // Add static items
  const kbar = [
    {
      id: "home",
      name: "Home",
      section: "Navigation",
      shortcut: [],
      keywords: "home, landing page",
      href: "/",
      icon: "home",
    },
    ...docsItems,
  ];

  useEffect(() => {
    if (sidebarVisible) {
      // Save current scroll position
      const scrollY = window.scrollY;
      // Add styles to prevent scrolling but maintain position
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      // Restore scroll position when sidebar is closed
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      }
    }
    
    return () => {
      // Cleanup function to ensure body scroll is restored
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [sidebarVisible]);

  return (
    <>
      <Flex as="header" horizontal="center" position="sticky" top="0" zIndex={9} fillWidth vertical="center" background="surface" borderBottom="neutral-alpha-weak" paddingY="12" paddingX="l">
        <Row maxWidth={layout.header.width} vertical="center" horizontal="space-between" gap="l">
          <Row vertical="center" gap="8">
            <NavIcon show="m" onClick={toggleSidebar}/>
            <Logo icon={false} size="s" href="/"/>
          </Row>
          <Kbar hide="m" items={kbar} maxWidth={16} radius="full" background="neutral-alpha-weak">
            <Button data-border="rounded" size="s" variant="tertiary" fillWidth weight="default">
              <Row vertical="center" gap="16">
                <Row background="neutral-alpha-medium" paddingX="8" paddingY="4" radius="full" data-scaling="90" textVariant="body-default-xs" onBackground="neutral-medium">Cmd k</Row>
                Search docs...
              </Row>
            </Button>
          </Kbar>
          <Row gap="8">
            <Row hide="s">
              <Button size="s" variant="secondary">
                Get started
              </Button>
            </Row>
            <Button href=" " size="s">
              Sign up
            </Button>
          </Row>
        </Row>
      </Flex>

      {sidebarVisible && (
        <Sidebar 
          maxWidth={100}
          style={{height: "calc(100vh - var(--static-space-64))"}} 
          padding="8" 
          background="page" 
          position="absolute" 
          left="0" 
          top="64"
          zIndex={9}
        />
      )}
    </>
  );
};
