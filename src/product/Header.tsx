"use client";

import { usePathname } from "next/navigation";

import { Button, Flex, Logo, Row, ToggleButton } from "@/once-ui/components";

export const Header = () => {
  const pathname = usePathname() ?? "";

  return (
    <Flex as="header" horizontal="center" position="sticky" top="0" zIndex={9} fillWidth vertical="center" background="surface" borderBottom="neutral-alpha-weak" paddingY="12" paddingX="l">
      <Row maxWidth="xl" vertical="center" gap="l">
        <Logo icon={false} size="s" href="/"/>
        <Row gap="4" fillWidth>
          <ToggleButton label="Home" href="/" selected={pathname === "/"} />
          <ToggleButton
            href="/docs"
            label="Docs"
            selected={pathname.startsWith("/docs")}
          />
        </Row>
        <Row gap="8">
          <Button size="s" variant="secondary">Get started</Button>
          <Button size="s">Sign up</Button>
        </Row>
      </Row>
    </Flex>
  );
};
