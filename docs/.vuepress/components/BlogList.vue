<template>
<div>
    <div v-for="post in posts">
        <h2>
            <router-link :to="post.path">{{ post.frontmatter.title }}</router-link>
        </h2>

        <p> {{ post.frontmatter.category }} </p>
        <span> {{ post.frontmatter.description }} </span>

    </div>
</div>
</template>

<script>
export default {
  computed: {
    posts() {
      return this.$site.pages
        .filter(
          post => post.path.startsWith("/blog/") && !post.frontmatter.index
        )
        .sort(
          (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
        );
    }
  }
};
</script>
