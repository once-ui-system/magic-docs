import React from "react";

import { Heading, Flex, Text, Column } from "@/once-ui/components";

import { baseURL } from "@/app/resources";
import { home } from "@/app/resources/content";

export async function generateMetadata() {
  const title = home.title;
  const description = home.description;
  const ogImage = `${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `${baseURL}`,
      images: [
        {
          url: ogImage,
          alt: title,
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

export default function Home() {
  return (
    <Column maxWidth="m" gap="xl" horizontal="center">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: home.title,
            description: home.description,
            url: `${baseURL}`,
            image: `${baseURL}/og?title=${encodeURIComponent(home.title)}`,
            publisher: {
              "@type": "Person",
              name: "meta name",
              image: {
                "@type": "ImageObject",
                url: "",
              },
            },
          }),
        }}
      />
      <Column fillWidth paddingY="l" gap="m">
        <Column maxWidth="s" gap="24">
          <Heading wrap="balance" variant="display-strong-m">
            Once UI Documentation
          </Heading>
          <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
            Get started with Once UI in minutes
          </Text>
        </Column>
      </Column>
    </Column>
  );
}
