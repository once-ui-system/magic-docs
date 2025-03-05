import { Row } from "@/once-ui/components";
import { NavigationItem, Sidebar } from "@/product/Sidebar";
import React from "react";

interface Props {
  children: React.ReactNode;
  initialNavigation: NavigationItem[];
}

export default function Layout({ children, initialNavigation }: Props) {
  return (
    <Row fillWidth gap="24" position="relative">
      <Sidebar hide="m" initialNavigation={initialNavigation} />
      {children}
    </Row>
  );
}