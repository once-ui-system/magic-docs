"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Button, Flex, Logo, NavIcon, Row, ToggleButton, Kbar, Kbd } from "@/once-ui/components";
import { layout } from "@/app/resources/config";
import { Sidebar } from "./Sidebar";

export const Header = () => {
  const pathname = usePathname() ?? "";
  const [sidebarVisible, setSidebarVisible] = useState(false);

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

  // Close sidebar on navigation
  useEffect(() => {
    setSidebarVisible(false);
  }, [pathname]);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const kbar = [
    {
      id: "home1",
      name: "Home",
      section: "Navigation",
      shortcut: [],
      keywords: "home, hülyeség",
      href: "/",
      icon: "home",
    },
    {
      id: "figma2",
      name: "Figma library",
      section: "Navigation",
      shortcut: [],
      keywords: "figma, design",
      href: "/figma",
      icon: "figma",
    },
    {
      id: "docs3",
      name: "Documentation",
      section: "Navigation",
      shortcut: [],
      keywords: "docs, documentation",
      href: "/docs/installation",
      icon: "document",
    },
    {
      id: "lightTheme4",
      name: "Light",
      section: "Change theme",
      shortcut: [],
      keywords: "light, theme, appearance, mode",
      perform: () => console.log('light'),
      icon: "sun",
    },
    {
      id: "darkTheme5",
      name: "Dark",
      section: "Change theme",
      shortcut: [],
      keywords: "dark, theme, appearance, mode",
      perform: () => console.log('dark'),
      icon: "moon",
    },
    {
      id: "home6",
      name: "Home",
      section: "Navigation",
      shortcut: [],
      keywords: "home, hülyeség",
      href: "/",
      icon: "home",
    },
    {
      id: "figma7",
      name: "Figma library",
      section: "Navigation",
      shortcut: [],
      keywords: "figma, design",
      href: "/figma",
      icon: "figma",
    },
    {
      id: "docs8",
      name: "Documentation",
      section: "Navigation",
      shortcut: [],
      keywords: "docs, documentation",
      href: "/docs/installation",
      icon: "document",
    },
    {
      id: "lightTheme9",
      name: "Light",
      section: "Change theme",
      shortcut: [],
      keywords: "light, theme, appearance, mode",
      perform: () => console.log('light'),
      icon: "sun",
    },
    {
      id: "darkTheme11",
      name: "Dark",
      section: "Change theme",
      shortcut: [],
      keywords: "dark, theme, appearance, mode",
      perform: () => console.log('dark'),
      icon: "moon",
    },
    {
      id: "home12",
      name: "Home",
      section: "Navigation",
      shortcut: [],
      keywords: "home, hülyeség",
      href: "/",
      icon: "home",
    },
    {
      id: "figma13",
      name: "Figma library",
      section: "Navigation",
      shortcut: [],
      keywords: "figma, design",
      href: "/figma",
      icon: "figma",
    },
    {
      id: "docs14",
      name: "Documentation",
      section: "Navigation",
      shortcut: [],
      keywords: "docs, documentation",
      href: "/docs/installation",
      icon: "document",
    },
    {
      id: "lightTheme15",
      name: "Light",
      section: "Change theme",
      shortcut: [],
      keywords: "light, theme, appearance, mode",
      perform: () => console.log('light'),
      icon: "sun",
    },
    {
      id: "darkTheme16",
      name: "Dark",
      section: "Change theme",
      shortcut: [],
      keywords: "dark, theme, appearance, mode",
      perform: () => console.log('dark'),
      icon: "moon",
    },
  ];

  return (
    <>
      <Flex as="header" horizontal="center" position="sticky" top="0" zIndex={9} fillWidth vertical="center" background="surface" borderBottom="neutral-alpha-weak" paddingY="12" paddingX="l">
        <Row maxWidth={layout.header.width} vertical="center" horizontal="space-between" gap="l">
          <Row vertical="center" gap="8">
            <NavIcon show="m" onClick={toggleSidebar}/>
            <Logo icon={false} size="s" href="/"/>
          </Row>
          <Kbar items={kbar} maxWidth={20} radius="full" background="neutral-alpha-weak">
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
