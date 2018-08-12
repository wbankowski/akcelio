<template>
  <v-flex row>
    <div v-for="post in posts" :key="post.title">
      <v-card class="my-3" hover>
        <v-card-media
          class="black--text"
          height="170px"
          :src="post.imgUrl"
          >
          <v-container fill-height fluid>
            <v-layout>
              <v-flex xs12 align-end d-flex>
                <span class="headline"><router-link :to="post.path"> {{ post.frontmatter.title }} </router-link></span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-media>
        <v-card-text>
          {{ post.frontmatter.description }}
        </v-card-text>
        <v-card-actions>
          <v-btn icon class="red--text">
            <v-icon medium>fa-reddit</v-icon>
          </v-btn>
          <v-btn icon class="light-blue--text">
            <v-icon medium>fa-twitter</v-icon>
          </v-btn>
          <v-btn icon class="blue--text text--darken-4">
            <v-icon medium>fa-facebook</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn flat class="blue--text"><router-link :to="post.path">Read More</router-link></v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </v-flex>
</template>

<script>
import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

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
