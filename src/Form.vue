<template>
    <form class="ui-form" v-on:submit="submit">
        <input class="ui-input" type="search" placeholder="Search Flickr for photos..."
               v-bind:disabled="isLoading"
               v-model="query">
        <div class="ui-buttons">
            <button class="ui-button" v-bind:disabled="isLoading" data-flip-key="search">
                {{searchText}}
            </button>
            <button v-if="isLoading" class="ui-button" type="button" v-on:click="onClick">
                Cancel
            </button>
        </div>
    </form>
</template>

<script>
  export default {
    props : ["galleryState", "onSubmit", "onClick"],
    data: function(){
      return {
        query: ""
      }
    },
    computed: {
      isLoading : function() {
        return this.galleryState === "loading"
      },
      searchText : function() {
        return {
          loading: "Searching...",
          error: "Try search again",
          start: "Search"
        }[this.galleryState] || "Search";
      },
    },
    methods: {
      // reminder : do not use fat arrow functions!
      submit: function(ev) {
        return this.onSubmit( ev, {current : { value: this.query}} );
      },
    }
  };

</script>
