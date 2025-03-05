"use client";

import { usePathname } from "next/navigation";

import { Button, Flex, Logo, NavIcon, Row, ToggleButton } from "@/once-ui/components";
import { layout } from "@/app/resources/config";

export const Header = () => {
  const pathname = usePathname() ?? "";

  return (
    <Flex as="header" horizontal="center" position="sticky" top="0" zIndex={9} fillWidth vertical="center" background="surface" borderBottom="neutral-alpha-weak" paddingY="12" paddingX="l">
      <Row maxWidth={layout.header.width} vertical="center" horizontal="space-between" gap="l">
        <Row vertical="center" gap="8">
          <NavIcon show="m"/>
          <Logo icon={false} size="s" href="/"/>
        </Row>
        <Row gap="4" fillWidth data-border="rounded" hide="s">
          <ToggleButton label="Start" href="/" selected={pathname === "/"} />
          <ToggleButton label="Docs" href="/docs" selected={pathname.startsWith("/docs")} />
          <ToggleButton
            href="/discord"
            label="Discord"
            selected={false}
          />
        </Row>
        <Row gap="8">
          <Button href=" " size="s" variant="secondary">Get started</Button>
          <Button href=" " size="s">Sign up</Button>
        </Row>
      </Row>
    </Flex>
  );
};
