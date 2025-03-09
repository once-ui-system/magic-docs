import { layout, social } from "@/app/resources/config";
import {
  Button,
  Column,
  Icon,
  Logo,
  Row,
  SmartLink,
  ThemeSwitcher,
} from "@/once-ui/components";

export const Footer = () => {
  return (
    <Column gap="40" fillWidth paddingY="xl" paddingX="l" horizontal="center" position="relative">
      <Row gap="12" textVariant="label-default-m" maxWidth={layout.footer.width} vertical="center">
        <Logo href="/" wordmark={false} size="m" />
        <Button
          data-border="rounded"
          size="s"
          weight="default"
          variant="tertiary"
          href="https://once-ui.com/templates"
        >
          <Row gap="12" vertical="center">
            Launch your app now
            <Icon size="xs" name="arrowUpRight" onBackground="brand-medium" />
          </Row>
        </Button>
      </Row>
      <Row maxWidth={layout.footer.width} horizontal="space-between" gap="40" wrap paddingX="2">
        <Column gap="12" textVariant="label-default-m">
          <Row paddingX="2" marginBottom="8">
            Solutions
          </Row>
          <Row>
            <SmartLink href=" ">Products</SmartLink>
          </Row>
          <Row>
            <SmartLink href=" ">Use cases</SmartLink>
          </Row>
          <Row>
            <SmartLink href=" ">Customers</SmartLink>
          </Row>
        </Column>
        <Column gap="12" textVariant="label-default-m">
          <Row paddingX="2" marginBottom="8">
            Resources
          </Row>
          <Row>
            <SmartLink href=" ">About us</SmartLink>
          </Row>
          <Row>
            <SmartLink href=" ">Terms of Use</SmartLink>
          </Row>
          <Row>
            <SmartLink href=" ">Privacy Policy</SmartLink>
          </Row>
        </Column>
        <Column data-border="rounded" gap="12" textVariant="label-default-m">
          <Row paddingX="2" marginBottom="8">
            Social
          </Row>
          {social.map((link, index) => (
            <Button key={index} href={link.link} weight="default" prefixIcon={link.icon} label={link.name} size="s" variant="secondary" />
          ))}
        </Column>
      </Row>
      <Row maxWidth={layout.footer.width}>
        <ThemeSwitcher />
      </Row>
    </Column>
  );
};
