import React from "react";
import { 
  Column, 
  Row, 
  Heading, 
  Text, 
  Button, 
  Grid, 
  Card, 
  SmartImage, 
  Line, 
  StatusIndicator
} from "@/once-ui/components";
import { baseURL, meta, schema, changelog, routes } from "@/app/resources";
import { Meta, Schema } from "@/once-ui/modules";
import { formatDate } from "./utils/formatDate";
import { PageList } from "@/product/PageList";
import { getRoadmap } from "./resources/roadmap";

// Get the latest changelog entry
const latestChangelogEntry = changelog[0];

export async function generateMetadata() {
  return Meta.generate({
    title: meta.home.title,
    description: meta.home.description,
    baseURL: baseURL,
    path: meta.home.path,
    image: meta.home.image
  });
}

// Calculate roadmap progress stats from the data
const calculateRoadmapStats = (roadmapData) => {
  let totalTasks = 0;
  let inProgressTasks = 0;
  let completedTasks = 0;
  
  roadmapData.forEach(product => {
    product.columns.forEach(column => {
      totalTasks += column.tasks.length;
      
      if (column.title === "In Progress") {
        inProgressTasks += column.tasks.length;
      }
      
      if (column.title === "Completed") {
        completedTasks += column.tasks.length;
      }
    });
  });
  
  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  return {
    totalTasks,
    inProgressTasks,
    completedTasks,
    progressPercentage
  };
};

export default async function Home() {
  // Fetch roadmap data server-side
  let roadmapStats = {
    totalTasks: 0,
    inProgressTasks: 0,
    completedTasks: 0,
    progressPercentage: 0
  };

  try {
    const data = await getRoadmap();
    roadmapStats = calculateRoadmapStats(data);
  } catch (error) {
    console.error('Error fetching roadmap data:', error);
  }

  return (
    <Column maxWidth={56} gap="xl">
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
    
      {/* Hero Section */}
      <Column fillWidth gap="l" paddingTop="l">
        <Row fillWidth gap="l">
          <Column maxWidth="xs" gap="12">
            <Heading variant="display-strong-s">
              Magic Docs
            </Heading>
            <Text wrap="balance" onBackground="neutral-weak" variant="body-default-xl" marginBottom="20">
              Build amazing product documentations without writing a single line of code
            </Text>
            <Button data-border="rounded" size="s" href="/docs/get-started" variant="secondary" arrowIcon id="get-started">Quick start</Button>
          </Column>
        </Row>
      </Column>

      <Column fillWidth>
      <Column fillWidth gap="4">
        <Text 
          variant="display-default-s" 
          onBackground="neutral-strong"
        >
          Template
        </Text>
        <Text
          variant="label-default-s" 
          onBackground="neutral-weak"
          marginTop="8"
        >
          Deploy your docs in minutes
        </Text>
      </Column>
      <PageList depth={1} thumbnail={true} marginTop="24" minHeight={14}/>
        <Heading as="h2" variant="display-default-xs" marginTop="48">
          Components
        </Heading>
        <Grid fillWidth columns="2" mobileColumns="1" gap="8" marginTop="24">
          <PageList path={["components"]} description={false}/>
        </Grid>
      </Column>
      
      {/* Latest Update Section */}
      {routes['/changelog'] && (
      <Column 
        maxWidth={56}
        gap="20" 
        padding="32"
        background="overlay"
        radius="l"
        border="neutral-alpha-weak"
      >
        <Row fillWidth horizontal="space-between" mobileDirection="column" gap="20">
          <Column gap="8" fillWidth>
            <Heading as="h2" variant="display-default-xs">
              Latest Update
            </Heading>
            <Text variant="label-default-s" onBackground="neutral-weak">
              {formatDate(latestChangelogEntry.date)}
            </Text>
          </Column>
          <Button variant="secondary" href="/changelog" size="s" suffixIcon="chevronRight">
            View Changelog
          </Button>
        </Row>
        
        <Line background="neutral-alpha-weak" />
        
        <Row fillWidth gap="20" position="relative" mobileDirection="column">
          <Column fillWidth gap="12">
            {latestChangelogEntry.image && (
              <SmartImage
                priority
                sizes="(max-width: 768px) 100vw, 768px"
                radius="l"
                src={latestChangelogEntry.image} 
                alt={`Illustration for ${latestChangelogEntry.title}`}
                border="neutral-alpha-weak"
                aspectRatio="16 / 9"
              />
            )}
            <Column fillWidth gap="8" paddingX="16" paddingTop="8">
              <Heading as="h3">
                {latestChangelogEntry.title}
              </Heading>

              {latestChangelogEntry.description && (
                <Text variant="body-default-m" onBackground="neutral-weak">
                  {latestChangelogEntry.description}
                </Text>
              )}
            </Column>
          </Column>
        </Row>
      </Column>
      )}
      
      {/* Roadmap Progress Section */}
      {routes['/roadmap'] && (
      <Column 
        maxWidth={56}
        gap="20" 
        padding="32"
        background="overlay"
        radius="l"
        border="neutral-alpha-weak"
      >
        <Row fillWidth horizontal="space-between" mobileDirection="column" gap="20">
          <Column gap="8" fillWidth>
            <Heading as="h2" variant="display-default-xs">
              Q2 2025 Roadmap
            </Heading>
            <Text variant="label-default-s" onBackground="neutral-weak">
              Progress and task status
            </Text>
          </Column>
          <Button variant="secondary" href="/roadmap" size="s" suffixIcon="chevronRight">
            View Roadmap
          </Button>
        </Row>
        
        <Line background="neutral-alpha-weak" />
        
        <Row fillWidth gap="20" position="relative" mobileDirection="column">
          <Row fillWidth gap="12">
            {/* Overall Progress */}
            <Column fillWidth gap="8" paddingTop="8">
              <Column fillWidth gap="20">
                <Column fillWidth horizontal="center" gap="4">
                  <Text 
                    variant="display-strong-l" 
                    onBackground="neutral-strong"
                  >
                    {roadmapStats.progressPercentage}%
                  </Text>
                  <Text 
                    align="center"
                    variant="label-default-s" 
                    onBackground="neutral-weak"
                    marginTop="8"
                  >
                    Overall progress
                  </Text>
                </Column>
                
                <Row
                  height="8"
                  fillWidth
                  overflow="hidden"
                  radius="full"
                  background="neutral-alpha-weak"
                  border="neutral-alpha-weak"
                >
                  <Row
                    fillHeight
                    radius="full"
                    transition="micro-medium"
                    solid="brand-strong"
                    style={{ 
                    width: `${roadmapStats.progressPercentage}%`,
                  }} />
                </Row>
              </Column>
              
              {/* Task Status */}
              <Grid fillWidth columns="3" mobileColumns="1" gap="8" marginTop="24">
                {/* Planned Tasks */}
                <Column 
                  padding="l" 
                  horizontal="center"
                  radius="m" 
                  border="neutral-alpha-weak" 
                  background="overlay"
                  gap="s"
                >
                  <Text 
                    variant="display-default-m" 
                    onBackground="neutral-strong"
                  >
                    {roadmapStats.totalTasks - roadmapStats.completedTasks - roadmapStats.inProgressTasks}
                  </Text>
                  <Row vertical="center" gap="8">
                    <StatusIndicator color="blue" />
                    <Text 
                      variant="label-default-s" 
                      onBackground="neutral-weak"
                    >
                      Planned
                    </Text>
                  </Row>
                </Column>
                
                {/* In Progress Tasks */}
                <Column 
                  padding="l" 
                  horizontal="center"
                  radius="m" 
                  border="neutral-alpha-weak" 
                  background="overlay"
                  gap="s"
                >
                  <Text 
                    variant="display-default-m" 
                    onBackground="neutral-strong"
                  >
                    {roadmapStats.inProgressTasks}
                  </Text>
                  <Row vertical="center" gap="8">
                    <StatusIndicator color="yellow" />
                    <Text 
                      variant="label-default-s" 
                      onBackground="neutral-weak"
                    >
                      In progress
                    </Text>
                  </Row>
                </Column>

                {/* Completed Tasks */}
                <Column 
                  padding="l" 
                  horizontal="center"
                  radius="m" 
                  border="neutral-alpha-weak" 
                  background="overlay"
                  gap="s"
                >
                  <Text 
                    variant="display-default-m" 
                    onBackground="neutral-strong"
                  >
                    {roadmapStats.completedTasks}
                  </Text>
                  <Row vertical="center" gap="8">
                    <StatusIndicator color="green" />
                    <Text 
                      variant="label-default-s" 
                      onBackground="neutral-weak"
                    >
                      Completed
                    </Text>
                  </Row>
                </Column>
              </Grid>
            </Column>
          </Row>
        </Row>
      </Column>
      )}
    </Column>
  );
}
