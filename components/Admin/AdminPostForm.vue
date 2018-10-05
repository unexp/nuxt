<template>
  <!-- 因为 new post page 和 edit post page 都用到这个form 所以把它抽成组件 -->
  <form @submit.prevent="onSave">
    <AppControlInput v-model="editedPost.author">Author Name</AppControlInput>
    <AppControlInput v-model="editedPost.title">Title</AppControlInput>
    <AppControlInput v-model="editedPost.thumbnail">Thumbnail Link</AppControlInput>
    <AppControlInput
              control-type="textarea"
              v-model="editedPost.content">Content</AppControlInput>
    <AppControlInput
    control-type="textarea"
    v-model="editedPost.previewText">previewText</AppControlInput>

    <AppButton type="submit">Save</AppButton>
    <AppButton
              type="button"
              style="margin-left: 10px"
              btn-style="cancel"
              @click="onCancel">Cancel</AppButton>
  </form>
</template>

<script>
import AppControlInput from '@/components/UI/AppControlInput'
import AppButton from '@/components/UI/AppButton'

export default {
  data() {
    return {
      // check post has passed from parent, or set default
      editedPost: this.post ? { ...this.post } : {
        author: '',
        title: '',
        thumbnail: '',
        previewText: ''
      }
    }
  },

  props: {
    post: {
      type: Object,
      require: false
    }
  },

  methods: {
    onSave() {
      // Save the post
      // console.log(this.editedPost)

      this.$emit('submit', this.editedPost)
    },

    onCancel() {
      // Navigate back
      this.$router.push('/admin')
    }
  },

  components: {
    AppControlInput,
    AppButton
  }
}
</script>
