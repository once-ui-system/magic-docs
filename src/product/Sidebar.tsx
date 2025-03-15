"use client";

import React, { useEffect, useState } from "react";
import { ToggleButton } from '@/once-ui/components/ToggleButton';
import { Accordion, Column, Flex, Icon, Row, Tag, Text } from "@/once-ui/components";
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.scss';
import { layout } from "@/app/resources/config";
import { routes } from "@/app/resources";
import { Schemes } from "@/once-ui/types";

export interface NavigationItem extends Omit<React.ComponentProps<typeof Flex>, "title" | "label" | "children">{
  slug: string;
  title: string;
  label?: string;
  order?: number;
  children?: NavigationItem[];
  schemes?: Schemes;
  keywords?: string;
  navIcon?: string;
  navTag?: string;
  navLabel?: string;
  navTagVariant?: Schemes;
}

interface SidebarProps extends Omit<React.ComponentProps<typeof Flex>, "children"> {
  initialNavigation?: NavigationItem[];
  hide?: "s" | "m" | "l";
  show?: "s" | "m" | "l";
}

const toTitleCase = (str: string) => {
  return str
    .replace(/-/g, ' ')
    .replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
};

export const Sidebar: React.FC<SidebarProps> = ({ initialNavigation, ...rest }) => {
  const [navigation, setNavigation] = useState<NavigationItem[]>(initialNavigation || []);
  const pathname = usePathname();

  useEffect(() => {
    fetch("/api/navigation")
      .then((res) => res.json())
      .then((data) => {
        setNavigation(data);
      })
      .catch((err) => console.error("Navigation fetch failed", err));
  }, []);
  
  const renderNavigation = (items: NavigationItem[], depth = 0) => {
    return (
      <>
        {items.map((item) => {
          const correctedSlug = item.slug;
  
          return (
            <React.Fragment key={item.slug}>
              {item.children ? (
                <Row
                  fillWidth 
                  style={{paddingLeft: `calc(${depth} * var(--static-space-8))`}}>
                  <Column
                    fillWidth
                    marginTop="2">
                    {layout.sidebar.collapsible ? (
                    <Accordion
                      gap="2"
                      icon="chevronRight"
                      iconRotation={90}
                      size="s"
                      radius="s"
                      paddingX={undefined}
                      paddingBottom={undefined}
                      paddingLeft="4"
                      paddingTop="4"
                      title={
                        <Row textVariant="label-strong-s" onBackground="brand-strong">
                          {toTitleCase(item.title)}
                        </Row>
                      }>
                        {renderNavigation(item.children, depth + 1)}
                    </Accordion>
                    ) : (
                      <Column
                        gap="2"
                        paddingLeft="4"
                        paddingTop="4">
                          <Row 
                            paddingY="12" paddingLeft="8" textVariant="label-strong-s" onBackground="brand-strong">
                            {toTitleCase(item.title)}
                          </Row>
                          {renderNavigation(item.children, depth + 1)}
                      </Column>
                    )}
                  </Column>
                </Row>
              ) : (
                <ToggleButton
                  fillWidth
                  justifyContent="space-between"
                  selected={pathname.startsWith(`/docs/${correctedSlug}`)}
                  className={depth === 0 ? styles.navigation : undefined}
                  href={`/docs/${correctedSlug}`}>
                  <Row fillWidth horizontal="space-between" vertical="center">
                      <Row
                        overflow="hidden"
                        gap="8"
                        onBackground={pathname.startsWith(`/docs/${correctedSlug}`) ? "neutral-strong" : "neutral-weak"}
                        textVariant={pathname.startsWith(`/docs/${correctedSlug}`) ? "label-strong-s" : "label-default-s"}
                        style={{ textOverflow: "ellipsis", whiteSpace: "nowrap"}}>
                          {item.navIcon && <Icon size="xs" name={item.navIcon}/>}
                          {item.label || item.title}
                      </Row>
                      {item.navTag && (
                        <Tag data-theme="dark" data-brand={item.navTagVariant} style={{marginRight: "-0.5rem", transform: "scale(0.8)", transformOrigin: "right center"}} variant="brand" size="s">
                            {item.navTag}
                        </Tag>
                      )}
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
    <Column maxWidth={layout.sidebar.width} position="sticky" top="64" fitHeight gap="2" as="nav" overflowY="auto" paddingRight="8" style={{maxHeight: "calc(100vh - var(--static-space-80))"}} {...rest}>
        {renderNavigation(navigation)}
        {(routes['/roadmap'] || routes['/changelog']) && (
          <Column gap="2" marginTop="32" paddingLeft="4">
            <Row textVariant="label-strong-s" onBackground="brand-strong" paddingLeft="8" paddingY="12">
              Resources
            </Row>
            {routes['/roadmap'] && (
              <ToggleButton
                fillWidth
                justifyContent="space-between"
                selected={pathname === '/roadmap'}
                className={styles.navigation}
                href="/roadmap">
                <Row 
                  gap="8"
                  onBackground={pathname === '/roadmap' ? "neutral-strong" : "neutral-weak"}
                  textVariant={pathname === '/roadmap' ? "label-strong-s" : "label-default-s"}>
                  <Icon size="xs" name="roadmap"/>
                  Roadmap
                </Row>
              </ToggleButton>
            )}
            
            {routes['/changelog'] && (
              <ToggleButton
                fillWidth
                justifyContent="space-between"
                selected={pathname === '/changelog'}
                className={styles.navigation}
                href="/changelog">
                <Row 
                  gap="8"
                  onBackground={pathname === '/changelog' ? "neutral-strong" : "neutral-weak"}
                  textVariant={pathname === '/changelog' ? "label-strong-s" : "label-default-s"}>
                  <Icon size="xs" name="changelog"/>
                  Changelog
                </Row>
              </ToggleButton>
            )}
          </Column>
        )}
    </Column>
  );
};