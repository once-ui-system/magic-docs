import React from "react";
import { Text, Column, Row, Card, User, Heading, StatusIndicator } from "@/once-ui/components";
import { baseURL, layout, meta, roadmap, schema, task } from "../resources";
import { Meta, Schema } from "@/once-ui/modules";
import { Schemes } from "@/once-ui/types";

export interface Task {
  title: string;
  description?: string;
  user?: {
    name?: string;
    avatar?: string;
  };
  href?: string;
  type?: keyof typeof task;
}

export async function generateMetadata() {
  return Meta.generate({
    title: meta.roadmap.title,
    description: meta.roadmap.description,
    baseURL: baseURL,
    path: meta.roadmap.path,
    image: meta.roadmap.image
  });
}

const RoadmapTask = ({ task: taskItem }: { task: Task }) => (
  <Column gap="8" fillWidth>
    <Text align="left" onBackground="neutral-strong" variant="body-strong-m">
      {taskItem.title}
    </Text>
    
    {taskItem.description && (
      <Text align="left" variant="body-default-s" onBackground="neutral-weak">
        {taskItem.description}
      </Text>
    )}
    
    {taskItem.user && (
      <Row marginTop="8" fillWidth vertical="center" horizontal="space-between">
        <User
          avatarProps={{ 
            size: "s",
            src: taskItem.user.avatar,
            empty: !taskItem.user.avatar
          }}
        >
          <Row paddingLeft="4" textVariant="label-default-s">
            {taskItem.user.name}
          </Row>
        </User>
        {taskItem.type && (
          <Row vertical="center" gap="8">
            <StatusIndicator 
              color={task[taskItem.type].color as Schemes}
            />
            <Text onBackground="neutral-weak" variant="label-default-s">{task[taskItem.type].label}</Text>
          </Row>
        )}
      </Row>
    )}
  </Column>
);

export default function RoadmapPage() {
  return (
    <Column maxWidth={layout.body.width} gap="24" as="main">
      <Schema
        as="webPage"
        title={meta.roadmap.title}
        description={meta.roadmap.description}
        baseURL={baseURL}
        path={meta.roadmap.path}
        author={{
          name: schema.name
        }}
      />
      <Column fillWidth gap="12" paddingY="l">
        <Heading variant="display-strong-s">
          Roadmap
        </Heading>
        <Text wrap="balance" onBackground="neutral-weak" variant="body-default-xl" marginBottom="20">
          List of features and tasks that are planned for the next release.
        </Text>
      </Column>

      {roadmap.map((product, productIndex) => (
        <Column key={productIndex} gap="24" marginTop={productIndex > 0 ? "48" : "0"}>
          {product.product && (
            <Row gap="16" marginBottom="16" vertical="center">
              <Row minWidth="40" width="40" height="40" padding="8" vertical="center">
                <Row radius="full" fillWidth minHeight="4" solid="brand-medium" data-brand={product.brand as Schemes} data-solid="inverse"/>
              </Row>
              <Heading as="h2" variant="display-default-xs">
                {product.product}
              </Heading>
            </Row>
          )}
          
          <Row gap="4" fillWidth overflowX="auto" paddingBottom="16">
            {product.columns.map((column, columnIndex) => (
              <Column key={columnIndex} padding="4" gap="4" radius="s-4" border="neutral-alpha-weak" background="overlay" fillWidth minWidth={20}>
                <Row fillWidth vertical="center" gap="8" paddingY="8" paddingX="16">
                  <Text variant="label-default-m">
                    {column.title}
                  </Text>
                  <Text variant="label-default-s" onBackground="neutral-weak">
                    {column.tasks.length}
                  </Text>
                </Row>
                
                <Column gap="4" fillWidth>
                  {column.tasks.map((taskItem, taskIndex) => (
                    taskItem.href ? (
                      <Card
                        onBackground="neutral-strong"
                        border="neutral-alpha-weak"
                        fillWidth
                        radius="s"
                        key={taskIndex} 
                        href={taskItem.href}
                        padding="16"
                      >
                        <RoadmapTask task={taskItem} />
                      </Card>
                    ) : (
                      <Column
                        onBackground="neutral-strong"
                        border="neutral-alpha-weak"
                        fillWidth
                        radius="s"
                        key={taskIndex}
                        padding="16"
                        gap="8"
                      >
                        <RoadmapTask task={taskItem} />
                      </Column>
                    )
                  ))}
                </Column>
              </Column>
            ))}
          </Row>
        </Column>
      ))}
    </Column>
  );
}