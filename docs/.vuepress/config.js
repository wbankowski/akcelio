const { join, basename } = require("path");
const glob = require("glob");
const { readFileSync } = require("fs");
const fm = require("front-matter");

const generateSideBar = directory => {
  const structure = {};
  // Set the blog directory path to read from
  const directoryPath = join(__dirname, "..", directory);
  // Make an array of files from the blog directory and ignore README.md
  glob
    .sync("**/*.md", {
      cwd: directoryPath,
      ignore: "README.md",
      absolute: true
    })
    .map(filename => {
      // Read content of the file and then front matter header attributes (title, category)
      const frontmatter = fm(readFileSync(filename, "utf8")).attributes;
      // Create blog directory path of each file
      const rel = join(directory, basename(filename));
      // Assign front matter attributes (title & category) to array of variables
      const [title, category, draft] = Object.values(frontmatter);
      // Add the blog directory path and return array of it
      return [rel, title, category, draft];
    })
    .filter(p => p[3] === false) /*?*/
    .forEach(([rel, title, category]) => {
      structure[category] = {
        ...structure[category],
        [title]: rel
      };
    });
  const categories = Object.keys(structure).sort();
  const sidebar = [
    ...categories.map(cat => {
      const names = Object.values(structure[cat]).sort();
      return {
        title: cat,
        collapsable: true,
        children: Array.from(names)
      };
    })
  ];
  return sidebar;
};

module.exports = {
  title: "Akcel.io",
  description: "MEVN (MongoDB, Express.js, Vue.js, Node.js)",
  ga: "UA-28060063-4",
  head: [
    [
      "link",
      {
        rel: "icon",
        href: `/favicon.png`
      }
    ]
  ],
  themeConfig: {
    //lastUpdated: "Ostatnia aktualizacja",
    repo: "wbankowski/akcelio",
    repoLabel: "GitHub",
    nav: [{ text: "Blog", link: "/blog/" }],
    sidebar: {
      "/blog/": ["", ...generateSideBar("/blog")]
    },
    sidebarDepth: 0
  },
  markdown: {
    config: md => md.use(require("markdown-it-deflist")),
    lineNumbers: false
  }
};
