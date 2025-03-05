import { notFound } from "next/navigation";
import { CustomMDX } from "@/product/mdx";
import { getPages } from "@/app/utils/utils";
import { Column, Heading, Icon, Row, SmartImage, Text } from "@/once-ui/components";
import { baseURL } from "@/app/resources";
import { formatDate } from "@/app/utils/formatDate";
import { HeadingNav } from "@/product/HeadingNav";
import { Metadata } from "next";
import { layout } from "@/app/resources/config";
import { PageList } from "@/product/PageList";

interface DocsParams {
  params: {
    slug: string[];
  };
}

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

export default function Docs({ params }: DocsParams) {
  const slugPath = params.slug.join('/');
  let doc = getPages().find((doc) => doc.slug === slugPath);

  if (!doc) {
    notFound();
  }

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
          <PageList />
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