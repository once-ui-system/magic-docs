import { Row } from "@/once-ui/components";
import { Sidebar } from "@/product/Sidebar";
import React, { memo } from "react";

const DocsLayout = memo(({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Row fillWidth gap="24" position="relative">
      <Sidebar hide="m" />
      {children}
    </Row>
  );
});

DocsLayout.displayName = 'RoadmapLayout';

export default DocsLayout;