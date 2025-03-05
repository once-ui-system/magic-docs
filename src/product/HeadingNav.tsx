"use client";

import React, { forwardRef, useEffect, useState, useRef } from "react";
import { Column, Flex, Row, SmartLink, Text } from "@/once-ui/components";
import { generateHeadingLinks } from "@/app/utils/generateHeadingLinks";

interface props extends React.ComponentProps<typeof Flex> { }

export const HeadingNav = forwardRef<HTMLDivElement, props>(
  ({
    className,
    style,
    ...rest
  }, ref) => {
    const [activeHeadingId, setActiveHeadingId] = useState<string | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const indicatorRef = useRef<HTMLDivElement>(null);
    const headings = generateHeadingLinks();

    useEffect(() => {
      if (headings.length === 0) return;

      setActiveHeadingId(headings[0]?.id || null);

      const headingElements = headings.map(heading =>
        document.getElementById(heading.id)
      ).filter(Boolean) as HTMLElement[];

      const observer = new IntersectionObserver(
        (entries) => {
          const visibleEntries = entries.filter(entry => entry.isIntersecting);

          if (visibleEntries.length > 0) {
            const visibleIds = visibleEntries.map(entry => entry.target.id);
            const firstVisibleHeadingId = visibleIds[0];

            const index = headings.findIndex(h => h.id === firstVisibleHeadingId);

            if (index !== -1) {
              setActiveHeadingId(firstVisibleHeadingId);
              setActiveIndex(index);

              if (indicatorRef.current) {
                indicatorRef.current.style.top = `calc(${index} * var(--static-space-32))`;
              }
            }
          } else if (entries.length > 0) {
            let closestHeading = null;
            let closestDistance = Infinity;

            entries.forEach(entry => {
              const rect = entry.boundingClientRect;
              const distance = Math.abs(rect.top);

              if (distance < closestDistance) {
                closestDistance = distance;
                closestHeading = entry.target.id as any;
              }
            });

            if (closestHeading) {
              const index = headings.findIndex(h => h.id === closestHeading);
              if (index !== -1) {
                setActiveHeadingId(closestHeading);
                setActiveIndex(index);

                if (indicatorRef.current) {
                  indicatorRef.current.style.top = `calc(${index} * var(--static-space-32))`;
                }
              }
            }
          }
        },
        {
          rootMargin: "-80px 0px -70% 0px",
          threshold: 0.1
        }
      );

      headingElements.forEach(element => {
        if (element) observer.observe(element);
      });

      return () => {
        headingElements.forEach(element => {
          if (element) observer.unobserve(element);
        });
      };
    }, [headings]);

    return (
      <Row paddingLeft="8" gap="12" className={className} style={style} ref={ref} {...rest}>
        <Row width="2" background="neutral-alpha-medium" radius="full" overflow="hidden" position="relative">
          <Row
            ref={indicatorRef}
            height="32"
            paddingY="4"
            fillWidth
            position="absolute"
            style={{
              top: `calc(${activeIndex} * var(--static-space-32))`,
              transition: "top 0.3s ease"
            }}
          >
            <Row fillWidth solid="brand-strong" radius="full" />
          </Row>
        </Row>
        <Column fillWidth>
          {headings.map((heading, index) => {
            const indent = heading.level - 2;
            const isActive = heading.id === activeHeadingId;

            return (
              <Flex
                key={heading.id}
                fillWidth
                height="32"
                paddingX="4"
              >
                <SmartLink
                  fillWidth
                  href={"#" + heading.id}
                  onClick={(e) => {
                    e.preventDefault();
                    const target = document.getElementById(heading.id);
                    if (target) {
                      const targetPosition =
                        target.getBoundingClientRect().top + window.scrollY;
                      window.scrollTo({
                        top: targetPosition,
                        behavior: "smooth",
                      });

                      setActiveHeadingId(heading.id);
                      setActiveIndex(index);

                      if (indicatorRef.current) {
                        indicatorRef.current.style.top = `calc(${index} * var(--static-space-32))`;
                      }
                    }
                  }}
                  style={{
                    paddingLeft: `calc(${indent} * var(--static-space-8))`,
                    color: isActive ? "var(--neutral-on-background-strong)" : "var(--neutral-on-background-weak)"
                  }}
                >
                  <Text variant={isActive ? "body-strong-s" : "body-default-s"} style={{overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>{heading.text}</Text>
                </SmartLink>
              </Flex>
            );
          })}
        </Column>
      </Row>
    );
  },
);

HeadingNav.displayName = "HeadingNav";