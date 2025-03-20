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
            Products
          </Row>
          <Row>
            <SmartLink href="https://once-ui.com">Once UI</SmartLink>
          </Row>
          <Row>
            <SmartLink href="https://magic-portfolio.com">Magic Portfolio</SmartLink>
          </Row>
        </Column>
        <Column gap="12" textVariant="label-default-m">
          <Row paddingX="2" marginBottom="8">
            Resources
          </Row>
          <Row>
            <SmartLink href="https://dopler.app">About us</SmartLink>
          </Row>
          <Row>
            <SmartLink href="https://dopler.app/terms">Terms of Use</SmartLink>
          </Row>
          <Row>
            <SmartLink href="https://dopler.app/privacy">Privacy Policy</SmartLink>
          </Row>
          <Row>
            <SmartLink href="https://dopler.app/license">License Agreement</SmartLink>
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
