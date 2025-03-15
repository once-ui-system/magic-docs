const baseURL = "https://docs.once-ui.com";

const routes = {
  '/changelog':  true,
  '/roadmap':    true,
}

const style = {
  theme: "dark", // dark | light
  neutral: "gray", // sand | gray | slate
  brand: "blue", // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan
  accent: "blue", // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan
  solid: "contrast", // color | contrast
  solidStyle: "flat", // flat | plastic
  border: "playful", // rounded | playful | conservative
  surface: "translucent", // filled | translucent
  transition: "all", // all | micro | macro
};

const layout = {
  // units are set in REM
  header: {
    width: 90, // max-width of the content inside the header
  },
  body: {
    width: 90, // max-width of the body
  },
  sidebar: {
    width: 16, // width of the sidebar
    collapsible: false, // accordion or static render
  },
  content: {
    width: 44, // width of the main content block
  },
  sideNav: {
    width: 14, // width of the sideNav on document pages
  },
  footer: {
    width: 44, // width of the content inside the footer
  },
};

const effects = {
  mask: {
    cursor: false,
    x: 50,
    y: 0,
    radius: 100,
  },
  gradient: {
    display: false,
    x: 50,
    y: 0,
    width: 100,
    height: 100,
    tilt: 0,
    colorStart: "brand-background-strong",
    colorEnd: "static-transparent",
    opacity: 50,
  },
  dots: {
    display: true,
    size: 2,
    color: "brand-on-background-weak",
    opacity: 20,
  },
  lines: {
    display: false,
    color: "neutral-alpha-weak",
    opacity: 100,
  },
  grid: {
    display: false,
    color: "neutral-alpha-weak",
    opacity: 100,
  },
};

const social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/once-ui-system",
  }
];

const schema = {
  logo: "",
  type: "Organization",
  name: "Magic Docs",
  description: "Magic Docs is a simple and beautiful documentation template built with Once UI.",
  email: "",
  locale: "en_US"
};

const meta = {
  home: {
    title: `Docs – ${schema.name}`,
    description: schema.description,
    path: "/",
    image: "/og?title=Docs"
  },
  roadmap: {
    title: `Roadmap – ${schema.name}`,
    description: schema.description,
    path: "/roadmap",
    image: "/og?title=Roadmap"
  },
  changelog: {
    title: `Changelog – ${schema.name}`,
    description: schema.description,
    path: "/changelog",
    image: "/og?title=Changelog"
  }
};

export { effects, style, layout, baseURL, social, schema, meta, routes };
