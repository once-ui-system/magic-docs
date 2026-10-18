import '@once-ui-system/core/css/styles.css';
import '@once-ui-system/core/css/tokens.css';

import classNames from "classnames";

import { Footer, Header, Sidebar } from "@/product";
import { baseURL } from "@/resources";

import { Background, Column, Flex, Meta, Row, ThemeInit } from "@once-ui-system/core";
import { dataStyle, effects, fonts, layout, schema, style } from "../resources/once-ui.config";
import { meta } from "@/resources";
import { RouteGuard } from "@/product/RouteGuard";
import { Providers } from '@/product/Providers';
import { currentVersion } from "@/resources/versions";

export async function generateMetadata() {
  const baseMetadata = Meta.generate({
    title: meta.home.title,
    description: meta.home.description,
    baseURL: baseURL,
    path: meta.home.path,
    image: meta.home.image
  });

  return {
    ...baseMetadata,
    metadataBase: new URL(`${baseURL}`),
    openGraph: {
      ...baseMetadata.openGraph,
      siteName: meta.home.title,
      locale: schema.locale,
    },
    // Only the stable version is indexed, so search results land on the docs
    // for the release people install by default.
    robots: {
      index: currentVersion.status === "stable",
      follow: true,
      googleBot: {
        index: currentVersion.status === "stable",
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <Flex
        as="html"
        lang="en"
        suppressHydrationWarning
        className={classNames(
          fonts.heading.variable,
          fonts.body.variable,
          fonts.label.variable,
          fonts.code.variable,
        )}
      >
        <head>
          <ThemeInit config={style} dataStyle={dataStyle} />
        </head>
        <Providers>
        <Column background="page" as="body" fillWidth margin="0" padding="0" style={{ minHeight: "100vh" }}>
        <Background
          position="fixed"
          mask={{
            cursor: effects.mask.cursor,
            x: `${effects.mask.x}%`,
            y: `${effects.mask.y}%`,
              radius: `${effects.mask.radius}vh`,
            }}
            gradient={{
              display: effects.gradient.display,
              x: `${effects.gradient.x}%`,
              y: `${effects.gradient.y}%`,
              width: `${effects.gradient.width}%`,
              height: `${effects.gradient.height}%`,
              tilt: effects.gradient.tilt,
              colorStart: effects.gradient.colorStart,
              colorEnd: effects.gradient.colorEnd,
              opacity: effects.gradient.opacity as
                | 0
                | 10
                | 20
                | 30
                | 40
                | 50
                | 60
                | 70
                | 80
                | 90
                | 100,
            }}
            dots={{
              display: effects.dots.display,
              color: effects.dots.color,
              size: effects.dots.size as any,
              opacity: effects.dots.opacity as any,
            }}
            grid={{
              display: effects.grid.display,
              color: effects.grid.color,
              width: effects.grid.width as any,
              height: effects.grid.height as any,
              opacity: effects.grid.opacity as any,
            }}
            lines={{
              display: effects.lines.display,
              opacity: effects.lines.opacity as any,
            }}
          />
          <Header />
          <Flex
            fillWidth
            horizontal="center"
            flex={1}
          >
            <Flex horizontal="center" maxWidth={`${layout.body.width}rem`} minHeight="0">
              <RouteGuard>
                <Row fillWidth gap="24">
                  <Sidebar style={{minHeight: '100vh'}} m={{hide: true}} borderRight="neutral-alpha-medium" />
                  <Row fillWidth horizontal="center">
                    {children}
                  </Row>
                </Row>
              </RouteGuard>
            </Flex>
          </Flex>
          <Footer />
        </Column>
        </Providers>
      </Flex>
    </>
  );
}
