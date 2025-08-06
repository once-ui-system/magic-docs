import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import React, { ReactNode } from "react";

import { 
  Heading, 
  Row,
  Column,
  Table,
  Media, 
  SmartLink, 
  Text,
  InlineCode, 
  Accordion, 
  AccordionGroup ,
  CodeBlock,
  TextProps,
  HeadingLink,
  MediaProps,
  Card,
  Grid,
  Feedback,
  Button,
  Icon,
  List,
  ListItem,
  Line,
} from "@once-ui-system/core";
import { PageList } from "./PageList";

const onceUIComponents = {
  Table,
  Heading,
  Text,
  Row,
  Media,
  SmartLink,
  InlineCode,
  Accordion,
  AccordionGroup,
  CodeBlock,
  Grid,
  HeadingLink,
  Feedback,
  Button,
  Icon,
  Card,
  Column,
};

type CustomLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
};

function CustomLink({ href, children, ...props }: CustomLinkProps) {
  if (href.startsWith("/")) {
    return (
      <SmartLink href={href} {...props}>
        {children}
      </SmartLink>
    );
  }

  if (href.startsWith("#")) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

function createImage({ alt, src, ...props }: MediaProps & { src: string }) {
  if (!src) {
    console.error("Media requires a valid 'src' property.");
    return null;
  }

  return (
    <Media
      marginTop="8"
      marginBottom="16"
      enlarge
      radius="m"
      aspectRatio="16 / 9"
      sizes="(max-width: 960px) 100vw, 960px"
      alt={alt}
      src={src}
      {...props}
    />
  );
}

function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

function createList({ children }: { children: ReactNode }) {
  return (
    <List>
      {children}
    </List>
  );
}

function createListItem({ children }: { children: ReactNode }) {
  return (
    <ListItem
      marginTop="4"
      marginBottom="8"
    >
      {children}
    </ListItem>
  );
}

function createHeading(as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6") {
  // Use HeadingLinkProps to ensure type compatibility
  const CustomHeading = ({ children, ...props }: Omit<React.ComponentProps<typeof HeadingLink>, 'as' | 'id'>) => {
    const slug = slugify(children as string);
    return (
      <HeadingLink
        marginTop="24"
        marginBottom="12"
        as={as}
        id={slug}
        {...props}
      >
        {children}
      </HeadingLink>
    );
  };

  CustomHeading.displayName = `${as}`;

  return CustomHeading;
}

function createParagraph({ children }: TextProps) {
  return (
    <Text
      style={{ lineHeight: "175%" }}
      variant="body-default-m"
      onBackground="neutral-medium"
      marginTop="8"
      marginBottom="12"
    >
      {children}
    </Text>
  );
}

function createInlineCode({ children }: { children: ReactNode }) {
  return <InlineCode>{children}</InlineCode>;
}

function createCodeBlock(props: any) {
  // For pre tags that contain code blocks
  if (props.children && props.children.props && props.children.props.className) {
    const { className, children } = props.children.props;
    
    // Extract language from className (format: language-xxx)
    const language = className.replace('language-', '');
    const label = language.charAt(0).toUpperCase() + language.slice(1);
    
    return (
      <CodeBlock
        marginTop="8"
        marginBottom="16"
        codes={[
          {
            code: children,
            language,
            label
          }
        ]}
        copyButton
      />
    );
  }
  
  // Fallback for other pre tags or empty code blocks
  return <pre {...props} />;
}

function createHR() {
  return <Line />;
}

const components = {
  p: createParagraph as any,
  h1: createHeading("h1") as any,
  h2: createHeading("h2") as any,
  h3: createHeading("h3") as any,
  h4: createHeading("h4") as any,
  h5: createHeading("h5") as any,
  h6: createHeading("h6") as any,
  img: createImage as any,
  a: CustomLink as any,
  code: createInlineCode as any,
  pre: createCodeBlock as any,
  ul: createList as any,
  ol: createList as any,
  li: createListItem as any,
  hr: createHR as any,
  PageList,
  ...onceUIComponents,
};

type CustomMDXProps = MDXRemoteProps & {
  components?: typeof components;
};

export function CustomMDX(props: CustomMDXProps) {
  // Add a try-catch block to handle any errors during MDX rendering
  try {
    return (
      <MDXRemote {...props} components={{ ...components, ...(props.components || {}) }} />
    );
  } catch (error) {
    console.error('Error rendering MDX content:', error);
    
    // Return a fallback UI when an error occurs
    return (
      <Column gap="16" padding="24" border="accent-medium" radius="m">
        <Text variant="heading-strong-m" onBackground="accent-strong">
          Error rendering content
        </Text>
        <Text variant="body-default-m" onBackground="accent-medium">
          There was an error rendering this content. Please try refreshing the page.
        </Text>
      </Column>
    );
  }
}
