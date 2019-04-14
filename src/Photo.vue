<template>
    <section v-if="isPhotoVisible" class="ui-photo-detail" v-on:click="click">
        <img v-bind:src="photo.media.m" class="ui-photo" />
    </section>
</template>

<script>
  export default {
    props : ["galleryState", "photo", "onClick"],
    computed: {
      isPhotoVisible : function() {
        return this.galleryState === "photo"
      },
    },
    methods: {
      // reminder : do not use fat arrow functions!
      click: function(ev) {
        return this.onClick(ev);
      },
    }
  };
</script>
