<template>
  <div>
    <div v-for="post in posts" :key="post.title">
      <span><router-link :to="post.path"> {{ post.frontmatter.title }} </router-link></span>
      <p> {{ post.frontmatter.category }} </p>
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
