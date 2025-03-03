import {
  Button,
  Column,
  Icon,
  Logo,
  Row,
  SmartLink,
} from "@/once-ui/components";

export const Footer = () => {
  return (
    <Column gap="40" fillWidth paddingY="xl" paddingX="l" horizontal="center" position="relative">
      <Row gap="12" textVariant="label-default-m" maxWidth="m" vertical="center">
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
      <Row maxWidth="m" horizontal="space-between" gap="40" wrap paddingX="2">
        <Column gap="12" textVariant="label-default-m">
          <Row paddingX="4" marginBottom="8">
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
          <Row paddingX="4" marginBottom="8">
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
          <Row paddingX="4" marginBottom="8">
            Social
          </Row>
          <Button href=" " prefixIcon="github" label="GitHub" size="s" variant="secondary" />
          <Button href=" " prefixIcon="linkedin" label="LinkedIn" size="s" variant="secondary" />
          <Button href=" " prefixIcon="threads" label="Threads" size="s" variant="secondary" />
        </Column>
      </Row>
    </Column>
  );
};
