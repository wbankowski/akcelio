module.exports = {
  title: "Akcel.io",
  description: "MEVN stack development",
  themeConfig: {
    nav: [
      { text: "COUNTER", link: "/counter/" },
      { text: "GUIDE", link: "/guide/" }
    ],
    sidebar: [
      {
        title: "Counter",
        collapsable: false,
        children: ["/counter/counter-app"]
      },
      {
        title: "API Guide",
        collapsable: false,
        children: ["/guide/guide", "/guide/api"]
      }
    ]
  }
};
