import { Column, Heading } from "@/once-ui/components";
import { PageList } from "@/product/PageList";
import { baseURL } from "@/app/resources";
import { blog } from "@/app/resources/content";

export async function generateMetadata() {
  const title = blog.title;
  const description = blog.description;
  const ogImage = `${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `${baseURL}/blog`,
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

export default function Blog() {
  return (
    <Column maxWidth="s">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            headline: blog.title,
            description: blog.description,
            url: `${baseURL}/blog`,
            image: `${baseURL}/og?title=${encodeURIComponent(blog.title)}`,
            author: {
              "@type": "Person",
              name: "Name",
              image: {
                "@type": "ImageObject",
                url: "Url",
              },
            },
          }),
        }}
      />
      <Heading marginBottom="l" variant="display-strong-s">
        Get started with Once UI
      </Heading>
      <Column fillWidth flex={1}>
        <Column fillWidth gap="16">
          <PageList range={[1, 3]} thumbnail />
        </Column>
        <PageList range={[4]} path={["magic-portfolio"]} />
      </Column>
    </Column>
  );
}