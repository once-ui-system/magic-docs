import { notFound } from "next/navigation";
import { getPages, getAdjacentPages } from "@/app/utils/utils";
import { formatDate } from "@/app/utils/formatDate";
import { Column, Heading, Icon, Row, SmartImage, Text, Card } from "@/once-ui/components";
import { Meta, Schema } from "@/once-ui/modules";
import { baseURL, layout, schema } from "@/app/resources";
import { HeadingNav } from "@/product/HeadingNav";
import { CustomMDX } from "@/product/mdx";
import { Metadata } from "next";
import React from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const routeParams = await params;
  const slugPath = routeParams.slug ? routeParams.slug.join('/') : '';

  const docs = await getPages();
  const doc = docs.find((doc) => doc.slug === slugPath);

  if (!doc) return {};

  return Meta.generate({
    title: doc.metadata.title + " – " + schema.name,
    description: doc.metadata.summary,
    baseURL,
    path: `/docs/${doc.slug}`,
    type: "article",
    publishedTime: doc.metadata.updatedAt,
    image: doc.metadata.image,
  });
}

export default async function Docs({
  params,
 }: { params: Promise<{ slug: string[] }> }) {
  const routeParams = await params;
  const slugPath = routeParams.slug.join('/');

  let doc = getPages().find((doc) => doc.slug === slugPath);

  if (!doc) {
    notFound();
  }
  
  const { prevPage, nextPage } = getAdjacentPages(slugPath, 'section');
  
  // Determine section title - use "Docs" for top-level elements
  const sectionTitle = routeParams.slug.length === 1 && !routeParams.slug[0].includes('/') 
    ? "Docs"
    : routeParams.slug[0]
      ?.split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  
  return (
    <>
      <Row fillWidth horizontal="center">
        <Column as="main" maxWidth={layout.content.width} gap="l" paddingBottom="xl">
          <Schema
            as="techArticle"
            title={doc.metadata.title + " – " + schema.name}
            description={doc.metadata.summary}
            baseURL={baseURL}
            path={`/docs/${doc.slug}`}
            datePublished={doc.metadata.updatedAt}
            dateModified={doc.metadata.updatedAt}
            image={doc.metadata.image}
            author={{
              name: schema.name
            }}
          />
          <Column fillWidth gap="8" vertical="center">
            <Text variant="label-default-l" onBackground="neutral-medium">{sectionTitle}</Text>
            <Heading variant="display-strong-s">{doc.metadata.title}</Heading>
            <Text variant="body-default-s" onBackground="neutral-weak">
              Last update: {formatDate(doc.metadata.updatedAt)}
            </Text>
          </Column>
          {doc.metadata.image && (
            <SmartImage enlarge src={doc.metadata.image} alt={"Thumbnail of " + doc.metadata.title} aspectRatio="2 / 1" radius="m" sizes="(max-width: 768px) 100vw, 768px" priority />
          )}
          <Column as="article" fillWidth>
            <CustomMDX source={doc.content} />
          </Column>
          
          <Row gap="16" fillWidth horizontal="space-between" wrap>              
              {prevPage ? (
                <Row maxWidth={20}>
                <Card
                  fillWidth
                  border="neutral-alpha-medium"
                  vertical="center" gap="4"
                  href={`/docs/${prevPage.slug}`} 
                  radius="l" 
                  paddingX="16"
                >
                  <Icon name="chevronLeft" size="s" onBackground="neutral-weak" />
                  <Column gap="4" vertical="center" paddingX="16" paddingY="12">
                    <Text variant="label-default-s" onBackground="neutral-weak">Previous</Text>
                    <Text onBackground="neutral-strong" variant="heading-strong-m" wrap="balance">
                      {prevPage.metadata.title}
                    </Text>
                  </Column>
                </Card>
                </Row>
              ) : <Row/>}
              {nextPage ? (
                <Row maxWidth={20}>
                  <Card
                    fillWidth
                    border="neutral-alpha-medium"
                    horizontal="end" vertical="center" gap="4"
                    href={`/docs/${nextPage.slug}`} 
                    radius="l" 
                    paddingX="16"
                  >
                    <Column horizontal="end" gap="4" vertical="center" paddingX="16" paddingY="12">
                      <Text variant="label-default-s" onBackground="neutral-weak">Next</Text>
                      <Text onBackground="neutral-strong" variant="heading-strong-m" wrap="balance">
                        {nextPage.metadata.title}
                      </Text>
                    </Column>
                    <Icon name="chevronRight" size="s" onBackground="neutral-weak" />
                  </Card>
                </Row>
              ) : <Row/>}
          </Row>
        </Column>
      </Row>
      <Column gap="16" maxWidth={layout.sideNav.width} hide="s" position="sticky" top="80" fitHeight>
        <Row gap="12" paddingLeft="2" vertical="center" onBackground="neutral-medium" textVariant="label-default-s">
          <Icon name="document" size="xs"/>
          On this page
        </Row>
        <HeadingNav/>
      </Column>
    </>
  );
}