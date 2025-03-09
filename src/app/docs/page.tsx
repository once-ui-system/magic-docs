import { Column, Heading } from "@/once-ui/components";
import { Meta, Schema } from "@/once-ui/modules";
import { PageList } from "@/product/PageList";
import { baseURL, layout } from "@/app/resources";
import { docs, schema } from "@/app/resources";

export async function generateMetadata() {
  return Meta.generate({
    title: docs.title,
    description: docs.description,
    baseURL,
    path: "/docs",
  });
}

export default function Blog() {
  return (
    <Column maxWidth={layout.content.width}>
      <Schema
        as="website"
        title={docs.title}
        description={docs.description}
        baseURL={baseURL}
        path="/docs"
        author={{
          name: schema.name
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