"use client";

import React from "react";
import { Column, SmartLink, Row, Line, Text, Icon, Heading } from "@/once-ui/components";
import { HeadingLink } from "@/product";

// Define types for our changelog data
type ChangelogItem = {
  text: string;
  link?: string;
  type: 'add' | 'update' | 'fix' | 'remove';
};

type ChangelogEntry = {
  date: string;
  displayDate: string;
  title: string;
  items: ChangelogItem[];
};

type UpcomingItem = {
  text: string;
};

type InProgressItem = {
  text: string;
};

// Changelog data
const upcomingItems: UpcomingItem[] = [
  { text: "Page: Team" },
  { text: "Module: Data visualization" },
  { text: "Module: Comment system" },
  { text: "Block: Call to action" },
  { text: "Block: Social media post" },
  { text: "Block: Notification center" },
  { text: "Block: Message feed" },
];

const inprogressItems: InProgressItem[] = [
  { text: "Template: Magic Store" },
];

const changelogEntries: ChangelogEntry[] = [
  {
    date: "2025-03-09",
    displayDate: "Mar 9",
    title: "New Template",
    items: [
      { text: "New template: Magic Docs", link: "/templates/magic-docs", type: "add" }
    ]
  },
  {
    date: "2025-02-27",
    displayDate: "Feb 27",
    title: "New Template",
    items: [
      { text: "New template: Magic Bio", link: "/templates/magic-bio", type: "add" }
    ]
  },
  {
    date: "2025-02-25",
    displayDate: "Feb 25",
    title: "New Careers Page",
    items: [
      { text: "New page: Careers", link: "/pro/careers", type: "add" }
    ]
  },
  {
    date: "2025-02-24",
    displayDate: "Feb 24",
    title: "Authentication & Plans Updates",
    items: [
      { text: "Reworked block: Authentication", link: "/pro/authentication", type: "update" },
      { text: "Reworked block: Plans", link: "/pro/plans", type: "update" },
      { text: "New page: Contact", link: "/pro/contact", type: "add" },
      { text: "New block: Features", link: "/pro/features", type: "add" }
    ]
  },
  {
    date: "2025-02-22",
    displayDate: "Feb 22",
    title: "Features Block",
    items: [
      { text: "New block: Features", link: "/pro/features", type: "add" }
    ]
  },
  {
    date: "2025-02-20",
    displayDate: "Feb 20",
    title: "About Page",
    items: [
      { text: "New page: About", link: "/pro/about", type: "add" }
    ]
  },
  {
    date: "2025-02-19",
    displayDate: "Feb 19",
    title: "Newsletter Block",
    items: [
      { text: "New block: Newsletter", link: "/pro/newsletter", type: "add" }
    ]
  },
  {
    date: "2025-02-18",
    displayDate: "Feb 18",
    title: "Cookie Banner",
    items: [
      { text: "New block: Cookie banner", link: "/pro/cookie", type: "add" }
    ]
  },
  {
    date: "2025-02-17",
    displayDate: "Feb 17",
    title: "FAQ Block",
    items: [
      { text: "New block: FAQ", link: "/pro/faq", type: "add" }
    ]
  },
  {
    date: "2025-02-16",
    displayDate: "Feb 16",
    title: "Testimonial & Background",
    items: [
      { text: "New block: Testimonial", link: "/pro/testimonial", type: "add" },
      { text: "New misc element: Gradient", link: "/pro/background", type: "add" }
    ]
  },
  {
    date: "2025-02-13",
    displayDate: "Feb 13",
    title: "Blog & Profile Pages",
    items: [
      { text: "New page: Blog post", link: "/pro/blog", type: "add" },
      { text: "New page: Profile page", link: "/pro/profile", type: "add" },
      { text: "New block: Testimonial", link: "/pro/testimonial", type: "add" }
    ]
  }
];

const Changelog: React.FC = () => {
  return (
      <Column
        fillWidth
        textVariant="body-default-m"
        onBackground="neutral-medium"
        as="section"
        gap="8">
        <Column fillWidth gap="12" paddingY="l">
          <Heading variant="display-strong-s">
            Changelog
          </Heading>
          <Text wrap="balance" onBackground="neutral-weak" variant="body-default-xl" marginBottom="20">
            See what's new
          </Text>
        </Column>

        {changelogEntries.map((entry, entryIndex) => (
          <Row key={entry.date} fillWidth gap="20" vertical="start">
            <Column minWidth="80" fillHeight gap="8" horizontal="center">
              <Row 
                fillWidth
                minHeight="32" 
                radius="full" 
                background="neutral-alpha-weak" 
                center
                textVariant="label-strong-s"
                onBackground="neutral-strong"
              >
                {entry.displayDate}
              </Row>
              {entryIndex < changelogEntries.length - 1 && (
                <Line vert background="neutral-alpha-medium"/>
              )}
            </Column>
            <Column fillWidth gap="12" paddingBottom="40">
              <HeadingLink id={entry.date} as="h2">
                {entry.title}
              </HeadingLink>
              {entry.items.map((item, itemIndex) => (
                <Row key={itemIndex} fillWidth gap="12" vertical="center">
                  <Text variant="body-default-m" onBackground="neutral-medium">
                    {item.link && (
                      <SmartLink href={item.link}>{item.text}</SmartLink>
                    )}
                  </Text>
                </Row>
              ))}
            </Column>
          </Row>
        ))}
      </Column>
  );
};

export default Changelog;