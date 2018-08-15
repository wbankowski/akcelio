<template>
<div class="bloglist">
<div v-for="post in posts" :key="post.title">
  <h1><router-link :to="post.path"> {{ post.frontmatter.title }} </router-link></h1>
  <p class="title"> {{ post.frontmatter.category }} </p>
  <hr>
</div>
</div>
</template>

<script>
export default {
  computed: {
    posts() {
      return this.$site.pages
        .filter(
          post =>
            post.path.startsWith("/blog/") &&
            !post.frontmatter.index &&
            post.frontmatter.draft === false
        )
        .sort(
          (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
        );
    }
  }
};
</script>

<style scoped>
h1 {
  font-size: 1.2em;
}
p {
  font-size: 0.8em;
}
router-link:hover {
  text-decoration: none;
}
</style>

