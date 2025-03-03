"use client";

import React, { forwardRef } from "react";
import { Column, Flex, SmartLink, Text } from "@/once-ui/components";
import { generateHeadingLinks } from "@/app/utils/generateHeadingLinks";

interface props extends React.ComponentProps<typeof Flex> { }

const HeadingNav = forwardRef<HTMLDivElement, props>(
    (
      {
        children,
        style,
        className,
        ...rest
      },
      ref,
    ) => {
  const headings = generateHeadingLinks();

  return (
    <Column gap="8" maxWidth={12} className={className} style={style} ref={ref} {...rest}>
      {headings.map((heading) => {
        const indent = heading.level - 2;
        return (
          <Flex key={heading.id} fillWidth paddingY="2" paddingX="4">
            <SmartLink
              href={"#" + heading.id}
              onClick={(e) => {
                e.preventDefault();
                const target = document.getElementById(heading.id);
                if (target) {
                  const offset = 120;
                  const targetPosition =
                    target.getBoundingClientRect().top + window.scrollY - offset;
                  window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth",
                  });
                }
              }}
              style={{ paddingLeft: `calc(${indent} * var(--static-space-8))` }}
            >
              <Text variant="body-default-s">{heading.text}</Text>
            </SmartLink>
          </Flex>
        );
      })}
    </Column>
  );
},
);

export { HeadingNav };