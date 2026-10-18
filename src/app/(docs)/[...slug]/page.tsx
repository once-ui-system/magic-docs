import { notFound } from "next/navigation";
import { getPages, getAdjacentPages } from "@/app/utils/utils";
import { formatDate } from "@/app/utils/formatDate";
import { Column, Heading, Icon, Row, Media, Text, Card, HeadingNav, Meta, Schema, Button, Line, SmartLink } from "@once-ui-system/core";
import { baseURL, layout, schema } from "@/resources";
import { repository } from "@/resources/once-ui.config";
import { platformOfSlug } from "@/resources/platforms";
import { currentVersion } from "@/resources/versions";
import { VersionNotice } from "@/product/VersionNotice";
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
    path: `/${doc.slug}`,
    type: "article",
    publishedTime: doc.metadata.updatedAt,
    image: doc.metadata.image || `/api/og/generate?title=${encodeURIComponent(doc.metadata.title)}&description=${encodeURIComponent(doc.metadata.summary)}`,
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
  
  const titleCase = (segment: string) =>
    segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

  // Determine section title - use "Docs" for top-level elements. A platform's
  // folder is that platform's root, so its pages are titled by the platform
  // (or by their section inside it), not by the folder name.
  const slug = routeParams.slug;
  const platform = platformOfSlug(slugPath);
  const sectionTitle = platform.root
    ? slug.length > 2 ? titleCase(slug[1]) : platform.label
    : slug.length === 1 ? "Docs" : titleCase(slug[0]);
  
  return (
    <>
      <Row fillWidth horizontal="center" paddingX="l" s={{ paddingX: "16" }}>
        <Column as="main" maxWidth={layout.content.width} gap="l" paddingBottom="xl">
          <Schema
            as="techArticle"
            title={doc.metadata.title + " – " + schema.name}
            description={doc.metadata.summary}
            baseURL={baseURL}
            path={`/${doc.slug}`}
            datePublished={doc.metadata.updatedAt}
            dateModified={doc.metadata.updatedAt}
            image={doc.metadata.image}
            author={{
              name: schema.name
            }}
          />
          <Column fillWidth gap="8" vertical="center" paddingTop="40">
            <Text variant="label-default-l" onBackground="neutral-medium">{sectionTitle}</Text>
            <Heading variant="display-strong-s">{doc.metadata.title}</Heading>
            <Text variant="body-default-s" onBackground="neutral-weak">
              Last update: {formatDate(doc.metadata.updatedAt)}
            </Text>
            {doc.metadata.github && (
              <Row marginTop="20">
                <Button href={doc.metadata.github.startsWith("http") ? doc.metadata.github : "https://github.com/once-ui-system/core/blob/main/packages/core/src/" + doc.metadata.github} size="s" variant="secondary" prefixIcon="github" weight="default" data-border="rounded">
                  View on GitHub
                </Button>
              </Row>
            )}
            <VersionNotice path={`/${doc.slug}`} />
          </Column>
          {doc.metadata.image && (
            <Media border="neutral-alpha-medium" enlarge src={doc.metadata.image} alt={"Thumbnail of " + doc.metadata.title} aspectRatio="16 / 9" radius="m" sizes="(max-width: 768px) 100vw, 768px" priority />
          )}
          <Column as="article" fillWidth>
            <CustomMDX source={doc.content} />
          </Column>
          
          <Row gap="16" fillWidth horizontal="between" s={{direction: "column"}}>              
              {prevPage ? (
                <Row fillWidth>
                <Row maxWidth={20}>
                <Card
                  fillWidth
                  border="neutral-alpha-medium"
                  vertical="center" gap="4"
                  href={`/${prevPage.slug}`} 
                  radius="l" 
                  paddingX="16"
                >
                  <Icon name="chevronLeft" size="s" onBackground="neutral-weak" />
                  <Column gap="4" vertical="center" paddingX="16" paddingY="12">
                    <Text variant="label-default-s" onBackground="neutral-weak">
                      {prevPage.slug.includes('/') ? 
                        `${prevPage.slug.split('/')[0].split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}` : 
                        'page'}
                    </Text>
                    <Text onBackground="neutral-strong" variant="heading-strong-m" wrap="balance">
                      {prevPage.metadata.title}
                    </Text>
                  </Column>
                </Card>
                </Row>
                </Row>
              ) : <Row/>}
              {nextPage ? (
                <Row fillWidth horizontal="end">
                  <Row maxWidth={20}>
                    <Card
                      fillWidth
                      border="neutral-alpha-medium"
                      horizontal="end" vertical="center" gap="4"
                      href={`/${nextPage.slug}`} 
                      radius="l" 
                      paddingX="16"
                    >
                      <Column horizontal="end" gap="4" vertical="center" paddingX="16" paddingY="12">
                        <Text variant="label-default-s" onBackground="neutral-weak">
                          {nextPage.slug.includes('/') ? 
                            `${nextPage.slug.split('/')[0].split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}` : 
                            'page'}
                        </Text>
                        <Text onBackground="neutral-strong" variant="heading-strong-m" wrap="balance">
                          {nextPage.metadata.title}
                        </Text>
                      </Column>
                      <Icon name="chevronRight" size="s" onBackground="neutral-weak" />
                    </Card>
                  </Row>
                </Row>
              ) : <Row/>}
            </Row>
          <Column fillWidth gap="24" marginTop="40">
            <Line width="40"/>
            <Row fillWidth vertical="center" gap="8" onBackground="neutral-weak" textVariant="label-default-s">
              Edit this page on <SmartLink prefixIcon="github" href={`${repository.url}/blob/${currentVersion.branch}/${repository.contentPath}/${doc.slug}.mdx`}>GitHub</SmartLink>
            </Row>
          </Column>
        </Column>
      </Row>
      <Column gap="16" maxWidth={layout.sideNav.width} s={{hide: true}} fillHeight paddingLeft="24" borderLeft="neutral-alpha-medium">
        <HeadingNav position="sticky" top="80" fitHeight/>
      </Column>
    </>
  );
}