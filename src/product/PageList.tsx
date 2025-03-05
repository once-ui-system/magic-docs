import { getPages } from "@/app/utils/utils";
import { Card, Column, Heading, Icon, Row, SmartImage, Text } from "@/once-ui/components";
import React from "react";

interface props extends Omit<React.ComponentProps<typeof Card>, 'onClick'> {
  range?: [number] | [number, number];
  thumbnail?: boolean;
  path?: string[];
}

function formatSlug(slug: string): React.JSX.Element {
  // Split the slug by '/'
  const parts = slug.split('/');
  
  // Remove the last part as it's not needed (it's the title)
  const pathParts = parts.slice(0, -1);
  
  // If there are no path parts, return an empty fragment
  if (pathParts.length === 0) {
    return <></>;
  }
  
  // Format each part to capitalize first letter of each word
  const formattedParts = pathParts.map(part => 
    part.split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  );
  
  return (
    <Row vertical="center" gap="4">
      {formattedParts.map((part, index) => (
        <React.Fragment key={index}>
          {index > 0 && <Icon name="chevronRight" size="xs" />}
          <Text>{part}</Text>
        </React.Fragment>
      ))}
    </Row>
  );
}

export function PageList({
  range,
  thumbnail = false,
  path = [],
  ...rest
}: props) {
  // Create a base path array starting with src/content
  const basePath = ["src", "content"];
  
  // Combine the base path with any additional path segments
  const fullPath = [...basePath, ...path];
  
  // Get pages from the specified path
  let pages = getPages(fullPath);

  const sortedPages = pages.sort((a, b) => {
    return new Date(b.metadata.updatedAt).getTime() - new Date(a.metadata.updatedAt).getTime();
  });

  const displayedPages = range 
    ? (range.length === 1 
        ? sortedPages.slice(range[0] - 1)
        : sortedPages.slice(range[0] - 1, range[1]))
    : sortedPages;

  return (
    <>
      {displayedPages.length > 0 && displayedPages.map((page) => (
        <Card href={`/docs/${page.slug}`} key={page.slug} radius="l" padding="2" gap="16" {...rest}>
          {page.metadata.image && thumbnail && (
            <SmartImage
              priority
              maxWidth={20}
              sizes="480px"
              border="neutral-alpha-weak"
              cursor="interactive"
              radius="m"
              src={page.metadata.image}
              alt={"Thumbnail of " + page.metadata.title}
              aspectRatio="2 / 1"
            />
          )}
          <Column fillWidth gap="4" vertical="center" paddingX="16" paddingY="12">
            <Text variant="label-default-s" onBackground="neutral-weak">
              {formatSlug(page.slug)}
            </Text>
            <Heading as="h2" variant="heading-strong-l" wrap="balance">
              {page.metadata.title}
            </Heading>
          </Column>
        </Card>
      ))}
    </>
  );
}