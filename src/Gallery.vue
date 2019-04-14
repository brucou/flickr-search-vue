<template>
    <section class="ui-items" v-bind:data-state="galleryState">
        <template v-if="isError">
          <span class="ui-error">
            Uh oh, search failed.
          </span>
        </template>
        <template v-else>
            <img v-for="(item, index) in items" v-bind:src="item.media.m" class="ui-item"
                 v-bind:style="{ '--i': index }"
                 v-bind:key="item.link" v-on:click="click(item)" />
        </template>
    </section>
</template>

<script>
  export default {
    props : ["galleryState", "items", "onClick"],
    computed: {
      isError : function() {
        return this.galleryState === "error"
      },
    },
    methods: {
      // reminder : do not use fat arrow functions!
      click: function(item) {
        return this.onClick(item);
      },
    }
  };
</script>
