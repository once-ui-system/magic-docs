import React from "react";
import { Heading, Text, Column, Button } from "@/once-ui/components";
import { Meta, Schema } from "@/once-ui/modules";
import { baseURL } from "@/app/resources";
import { home, schema } from "@/app/resources";
import { PageList } from "@/product/PageList";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL,
    path: "",
  });
}

export default function Home() {
  return (
    <Column maxWidth="m" gap="xl" horizontal="center">
      <Schema
        as="webPage"
        title={home.title}
        description={home.description}
        baseURL={baseURL}
        path=""
        author={{
          name: schema.name
        }}
      />
      <Column fillWidth paddingY="l" gap="m">
        <Column maxWidth="s" gap="12">
          <Heading variant="display-default-s">
            Once UI Documentation
          </Heading>
          <Text wrap="balance" onBackground="neutral-weak" variant="body-default-xl" marginBottom="20">
            Learn how to get up and running with Once UI through tutorials and resources.
          </Text>
          <Button data-border="rounded" size="s" href="/docs" variant="secondary">Quick start</Button>
        </Column>
      </Column>
    </Column>
  );
}
