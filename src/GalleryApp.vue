<template>
    <div class=".ui-app" v-bind:data-state="gallery">
        <Form v-bind:galleryState="gallery"
              v-bind:onSubmit="onSubmit"
              v-bind:onClick="onCancelClick">
        </Form>>
        <Gallery v-bind:galleryState="gallery"
                 v-bind:items="items"
                 v-bind:onClick="onGalleryClick">
        </Gallery>
        <Photo v-bind:galleryState="gallery"
               v-bind:photo="photo"
               v-bind:onClick="onPhotoClick">
        </Photo>
    </div>
</template>

<script>
  import Form from "./Form";
  import Gallery from "./Gallery";
  import Photo from "./Photo";

  export default {
    props : ["query", "photo", "items", "gallery", "next"],
    components: {
      Form,
      Gallery,
      Photo,
    },
    computed: {
    },
    methods: {
      // reminder : do not use fat arrow functions!
      onSubmit: function(ev, formRef) {
        return this.next(["onSubmit", ev, formRef]);
      },
      onCancelClick: function(ev) {
        return this.next(["onCancelClick"])
      },
      onGalleryClick: function(item) {
        return this.next(["onGalleryClick", item]);
      },
      onPhotoClick: function(ev) {
        return this.next(["onPhotoClick"]);
      },
    }
  };

</script>
