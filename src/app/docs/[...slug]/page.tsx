import { notFound } from "next/navigation";
import { CustomMDX } from "@/product/mdx";
import { getPages, getAdjacentPages } from "@/app/utils/utils";
import { Column, Heading, Icon, Row, SmartImage, Text } from "@/once-ui/components";
import { baseURL } from "@/app/resources";
import { formatDate } from "@/app/utils/formatDate";
import { HeadingNav } from "@/product/HeadingNav";
import { Card } from "@/once-ui/components";
import { Metadata } from "next";
import React from "react";
import { layout } from "@/app/resources/config";

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

  let {
    title,
    updatedAt: publishedTime,
    summary: description,
    image,
  } = doc.metadata;
  let ogImage = image ? `${baseURL}${image}` : `${baseURL}/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${baseURL}/docs/${doc.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Docs({
  params,
 }: { params: Promise<{ slug: string[] }> }) {
  const slugParams = await params;
  const slugPath = slugParams.slug.join('/');

  let doc = getPages().find((doc) => doc.slug === slugPath);

  if (!doc) {
    notFound();
  }
  
  // Get adjacent pages using the centralized function
  const { prevPage, nextPage } = getAdjacentPages(slugPath, 'section');
  
  return (
    <>
      <Row fillWidth horizontal="center">
        <Column as="main" maxWidth={layout.content.width} gap="l" paddingBottom="xl">
          <script
            type="application/ld+json"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                headline: doc.metadata.title,
                datePublished: doc.metadata.updatedAt,
                dateModified: doc.metadata.updatedAt,
                description: doc.metadata.summary,
                image: doc.metadata.image
                  ? `${baseURL}${doc.metadata.image}`
                  : `${baseURL}/og?title=${doc.metadata.title}`,
                url: `${baseURL}/blog/${doc.slug}`,
                author: {
                  "@type": "Person",
                  name: "Name",
                },
              }),
            }}
          />
          <Column fillWidth gap="8" vertical="center">
            <Heading variant="display-strong-s">{doc.metadata.title}</Heading>
            <Text variant="body-default-s" onBackground="neutral-weak">
              Last update: {formatDate(doc.metadata.updatedAt)}
            </Text>
          </Column>
          {doc.metadata.image && (
            <SmartImage src={doc.metadata.image} alt={"Thumbnail of " + doc.metadata.title} aspectRatio="2 / 1" radius="m" sizes="(max-width: 768px) 100vw, 768px" priority />
          )}
          <Column as="article" fillWidth>
            <CustomMDX source={doc.content} />
          </Column>
          
          <Row gap="16" fillWidth horizontal="space-between" wrap>
              {prevPage && (
                <Row maxWidth={20}>
                <Card
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
              )}
              {nextPage && (
                <Row maxWidth={20}>
                  <Card
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
              )}
          </Row>
        </Column>
      </Row>
      <Column gap="16" maxWidth={12} hide="s" position="sticky" top="80" fitHeight>
        <Row gap="12" paddingLeft="2" vertical="center" onBackground="neutral-medium" textVariant="label-default-s">
          <Icon name="document" size="xs"/>
          On this page
        </Row>
        <HeadingNav/>
      </Column>
    </>
  );
}