import "@/once-ui/styles/index.scss";
import "@/once-ui/tokens/index.scss";

import classNames from "classnames";

import { Footer, Header } from "@/product";
import { baseURL, effects, style } from "@/app/resources";

import { Inter } from "next/font/google";
import { Source_Code_Pro } from "next/font/google";

import { Background, Column, Flex, ToastProvider, ThemeProvider } from "@/once-ui/components";
import { layout } from "./resources/config";
import { meta } from "@/app/resources";

const themeScript = `
  (function() {
    function getInitialTheme() {
      try {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
          if (savedTheme === 'system') {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
          }
          return savedTheme;
        }
      } catch (e) {
        // Fallback
      }
      return 'dark';
    }
    
    document.documentElement.setAttribute('data-theme', getInitialTheme());
  })();
`;

export async function generateMetadata() {
  return {
    metadataBase: new URL(`${baseURL}`),
    title: meta.home.title,
    description: meta.home.description,
    openGraph: {
      title: meta.home.title,
      description: meta.home.description,
      url: baseURL,
      siteName: meta.home.title,
      locale: "en_US",
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

const primary = Inter({
  variable: "--font-primary",
  subsets: ["latin"],
  display: "swap",
});

type FontConfig = {
  variable: string;
};

/**
 * Replace with code for secondary and tertiary fonts
 * from https://once-ui.com/customize
 */
const secondary: FontConfig | undefined = undefined;
const tertiary: FontConfig | undefined = undefined;

const code = Source_Code_Pro({
  variable: "--font-code",
  subsets: ["latin"],
  display: "swap",
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  // Set default theme to dark to match client-side
  return (
    <>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <ThemeProvider defaultTheme="dark">
        <ToastProvider>
          <Flex
            as="html"
            lang="en"
            background="page"
            data-neutral={style.neutral}
            data-brand={style.brand}
            data-accent={style.accent}
            data-solid={style.solid}
            data-solid-style={style.solidStyle}
            data-theme={style.theme}
            data-border={style.border}
            data-surface={style.surface}
            data-transition={style.transition}
            className={classNames(
              primary.variable,
              secondary ? secondary.variable : "",
              tertiary ? tertiary.variable : "",
              code.variable,
            )}
          >
          <Column style={{ minHeight: "100vh" }} as="body" fillWidth margin="0" padding="0">
              <Background
                position="fixed"
                mask={{
                  cursor: effects.mask.cursor,
                  x: effects.mask.x,
                  y: effects.mask.y,
                  radius: effects.mask.radius,
                }}
                gradient={{
                  display: effects.gradient.display,
                  x: effects.gradient.x,
                  y: effects.gradient.y,
                  width: effects.gradient.width,
                  height: effects.gradient.height,
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
                position="relative"
                fillWidth
                padding="l"
                horizontal="center"
                flex={1}
              >
                <Flex horizontal="center" maxWidth={layout.body.width} minHeight="0">
                  {children}
                </Flex>
              </Flex>
              <Footer />
            </Column>
          </Flex>
        </ToastProvider>
      </ThemeProvider>
    </>
  );
}
