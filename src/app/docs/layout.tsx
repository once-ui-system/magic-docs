import { Row } from "@/once-ui/components";
import { Sidebar } from "@/product/Sidebar";

interface Props {
  children: React.ReactNode;
  initialNavigation: any;
}

export default function Layout({ children, initialNavigation }: Props) {
  return (
    <Row fillWidth gap="24" position="relative">
      <Sidebar initialNavigation={initialNavigation} />
      {children}
    </Row>
  );
}