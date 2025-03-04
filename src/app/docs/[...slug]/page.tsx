import { notFound } from "next/navigation";
import { CustomMDX } from "@/product/mdx";
import { getPages } from "@/app/utils/utils";
import { Button, Column, Heading, Row, Text } from "@/once-ui/components";
import { baseURL } from "@/app/resources";
import { formatDate } from "@/app/utils/formatDate";
import { HeadingNav } from "@/product/HeadingNav";
import { Metadata } from "next";

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
    publishedAt: publishedTime,
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
        <Column as="main" maxWidth="xs" gap="l">
          <script
            type="application/ld+json"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                headline: doc.metadata.title,
                datePublished: doc.metadata.publishedAt,
                dateModified: doc.metadata.publishedAt,
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
          <Heading variant="display-strong-s">{doc.metadata.title}</Heading>
          <Row gap="12" vertical="center">
            <Text variant="body-default-s" onBackground="neutral-weak">
              {formatDate(doc.metadata.publishedAt)}
            </Text>
          </Row>
          <Column as="article" fillWidth>
            <CustomMDX source={doc.content} />
          </Column>
        </Column>
      </Row>
      <HeadingNav position="sticky" top="80" fitHeight/>
    </>
  );
} 