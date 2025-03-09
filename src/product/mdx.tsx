import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import React, { ReactNode } from "react";
import dynamic from "next/dynamic";

import { 
  Heading, 
  Row, 
  SmartImage, 
  SmartLink, 
  Text,
  InlineCode, 
  Accordion, 
  AccordionGroup 
} from "@/once-ui/components";
import { CodeBlock } from "@/once-ui/modules/code/CodeBlock";
import { TextProps } from "@/once-ui/interfaces";
import { HeadingLink } from "./HeadingLink";
import { SmartImageProps } from "@/once-ui/components/SmartImage";

type TableProps = {
  data: {
    headers: string[];
    rows: string[][];
  };
};

function Table({ data }: TableProps) {
  const headers = data.headers.map((header, index) => (
    <th style={{textAlign: "left", borderBottom: "1px solid var(--neutral-alpha-medium)"}} className="px-16 py-12 font-label font-default font-s" key={index}>
      {header}
    </th>
  ));
  
  const rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td className="px-16 py-12 font-body font-default font-s" key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ));

  return (
    <Row fillWidth radius="m" overflowY="hidden" border="neutral-alpha-medium" overflowX="auto" 
      marginTop="8"
      marginBottom="16">
      <table className="fill-width surface-background" style={{borderSpacing: 0, borderCollapse: "collapse", minWidth: "32rem"}}>
        <thead className="neutral-on-background-strong">
          <tr>{headers}</tr>
        </thead>
        <tbody className="neutral-on-background-medium">
          {rows.length > 0 ? (
            rows
          ) : (
            <tr>
              <td colSpan={headers.length} className="px-24 py-12 font-body font-default font-s">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </Row>
  );
}

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

function createImage({ alt, src, ...props }: SmartImageProps & { src: string }) {
  if (!src) {
    console.error("SmartImage requires a valid 'src' property.");
    return null;
  }

  return (
    <SmartImage
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

function createHeading(as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6") {
  const CustomHeading = ({ children, ...props }: TextProps<typeof as>) => {
    const slug = slugify(children as string);
    return (
      <HeadingLink
        style={{ marginTop: "var(--static-space-24)", marginBottom: "var(--static-space-12)" }}
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
        codeInstances={[
          {
            code: children,
            language,
            label
          }
        ]}
        copyButton={true}
      />
    );
  }
  
  // Fallback for other pre tags or empty code blocks
  return <pre {...props} />;
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
  Heading,
  Text,
  Table,
  CodeBlock,
  InlineCode,
  Accordion,
  AccordionGroup,
  Feedback: dynamic(() => import("@/once-ui/components").then(mod => mod.Feedback)),
  Card: dynamic(() => import("@/once-ui/components").then(mod => mod.Card)),
  PageList: dynamic(() => import("@/product/PageList").then(mod => mod.PageList)),
  Grid: dynamic(() => import("@/once-ui/components").then(mod => mod.Grid)),
  Row: dynamic(() => import("@/once-ui/components").then(mod => mod.Row)),
  Column: dynamic(() => import("@/once-ui/components").then(mod => mod.Column)),
  Icon: dynamic(() => import("@/once-ui/components").then(mod => mod.Icon)),
  SmartImage: dynamic(() => import("@/once-ui/components").then(mod => mod.SmartImage)),
  SmartLink: dynamic(() => import("@/once-ui/components").then(mod => mod.SmartLink)),
};

type CustomMDXProps = MDXRemoteProps & {
  components?: typeof components;
};

export function CustomMDX(props: CustomMDXProps) {
  return (
    <MDXRemote {...props} components={{ ...components, ...(props.components || {}) }} />
  );
}
