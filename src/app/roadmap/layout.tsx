import { Row } from "@/once-ui/components";
import { Sidebar } from "@/product/Sidebar";
import React from "react";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Row fillWidth gap="24" position="relative">
      <Sidebar hide="m" />
      {children}
    </Row>
  );
}