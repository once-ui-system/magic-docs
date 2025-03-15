import React from "react";
import { Heading, Text, Column, Button, Row, Grid } from "@/once-ui/components";
import { Meta, Schema } from "@/once-ui/modules";
import { baseURL, layout } from "@/app/resources";
import { meta, schema } from "@/app/resources";
import { PageList } from "@/product/PageList";

export async function generateMetadata() {
  return Meta.generate({
    title: meta.home.title,
    description: meta.home.description,
    baseURL: baseURL,
    path: meta.home.path,
    image: meta.home.image
  });
}

export default function Home() {
  return (
    <Column maxWidth={layout.content.width} gap="xl" horizontal="center">
      <Schema
        as="webPage"
        title={meta.home.title}
        description={meta.home.description}
        baseURL={baseURL}
        path={meta.home.path}
        author={{
          name: schema.name
        }}
      />
      <Column fillWidth paddingY="l" gap="m">
        <Column maxWidth="s" gap="l">
          <Row fillWidth gap="l">
            <Column fillWidth gap="12">
              <Heading variant="display-strong-s">
                Magic Docs
              </Heading>
              <Text wrap="balance" onBackground="neutral-weak" variant="body-default-xl" marginBottom="20">
                Set up your simple, responsive product documentation with Magic Docs without hassle.
              </Text>
              <Button data-border="rounded" size="s" href="/docs/get-started" variant="secondary" arrowIcon id="get-started">Quick start</Button>
            </Column>
          </Row>
        </Column>
        <PageList depth={1} thumbnail={true} marginTop="40" minHeight={14}/>
        <Heading as="h2" variant="display-default-xs" marginTop="24">
          Components
        </Heading>
        <Grid fillWidth columns="2" mobileColumns="1" gap="8">
          <PageList path={["components"]} description={false}/>
        </Grid>
      </Column>
    </Column>
  );
}
