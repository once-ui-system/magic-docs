import { layout, social } from "@/resources/once-ui.config";
import {
  Button,
  Column,
  Icon,
  Logo,
  Row,
  SmartLink,
  ThemeSwitcher,
} from "@once-ui-system/core";

export const Footer = () => {
  return (
    <Column gap="40" fillWidth paddingY="xl" paddingX="l" horizontal="center" position="relative">
      <Row gap="12" textVariant="label-default-m" maxWidth={layout.footer.width} vertical="center">
        <Logo dark href="/" icon="/trademark/icon-dark.svg" size="m" />
        <Logo light href="/" icon="/trademark/icon-light.svg" size="m" />
        {/* Usage of this template requires attribution. Please don't remove the link to Once UI unless you have Once UI Pro subscription. */}
        <Button
          data-border="rounded"
          size="s"
          weight="default"
          variant="tertiary"
          href="https://once-ui.com/products/magic-docs"
        >
          <Row gap="12" vertical="center">
            Launch docs with Once UI
            <Icon size="xs" name="arrowUpRight" onBackground="brand-medium" />
          </Row>
        </Button>
      </Row>
      <Row maxWidth={layout.footer.width} horizontal="between" gap="40" wrap paddingX="2">
        <Column gap="12" textVariant="label-default-m">
          <Row paddingX="2" marginBottom="8">
            Products
          </Row>
          <Row>
            <SmartLink href="https://once-ui.com/products/once-ui-core">Once UI</SmartLink>
          </Row>
          <Row>
            <SmartLink href="https://once-ui.com/products/magic-portfolio">Magic Portfolio</SmartLink>
          </Row>
          <Row>
            <SmartLink href="https://once-ui.com/products/magic-store">Magic Store</SmartLink>
          </Row>
          <Row>
            <SmartLink href="https://once-ui.com/products/magic-docs">Magic Docs</SmartLink>
          </Row>
          <Row>
            <SmartLink href="https://once-ui.com/products/magic-bio">Magic Bio</SmartLink>
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
