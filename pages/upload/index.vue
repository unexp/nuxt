<template>
  <div class="file-upload">
<!--     <div class="drag">
      <el-upload
        class="upload-demo"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        :auto-upload="false"
        :on-change="handleChange"
        :on-remove="handleRemove"
        :list-type="listType"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>

      <el-button v-if="imageUrl" style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
    </div> -->

    <div class="header">Upload Files</div>

    <div class="flex">
      <div class="preview">
        <div class="tips">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </div>
        <img v-if="imageUrl" :src="imageUrl" class="preview" alt="upload image">
      </div>

      <div class="upload">
        <el-upload
          class="upload-demo"
          ref="upload"
          action="https://cryptic-meadow-88279.herokuapp.com/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-change="handleChange"
          :on-success="handleSuccess"
          :on-error="handleError"

          :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>

        <div class="meta">
          <!-- <pre><code>{{ imageMeta }}</code></pre> -->
          <p contenteditable="true">https://cryptic-meadow-88279.herokuapp.com/image/83be2852256f4b5bfa833b8233eaf7bf.jpg</p>
          <br>
          <p contenteditable="true">83be2852256f4b5bfa833b8233eaf7bf.jpg</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    layout: 'upload',
    data() {
      return {
        imageUrl: '',
        listType: 'picture',
        imageMeta: {
          "file": {
            "fieldname":"file",
            "originalname":"33352764_59_n.jpg",
            "encoding":"7bit",
            "mimetype":"image/jpeg",
            "id":"5bb96ecabfc9500016593b60",
            "filename":"2aaddcf9b607ccf601aba7bc539b1e4d.jpg",
            "metadata":null,
            "bucketName":"uploads",
            "chunkSize":261120,
            "size":70733,
            "md5":"290051d60d951334a82ab201c5484974",
            "uploadDate":"2018-10-07T02:26:18.497Z",
            "contentType":"image/jpeg"
          }
        },
        fileList: [
          // {
          //   name: 'food.jpeg',
          //   url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          // },
          // {
          //   name: 'food2.jpeg',
          //   url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          // }
        ]
      };
    },
    methods: {
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log('Handle Preview')
        this.imageUrl = URL.createObjectURL(file.raw);
        console.log(this.imageUrl)
        console.log(file);
      },
      handleChange(file) {
        console.log('File changed')
        this.imageUrl = URL.createObjectURL(file.raw);
        console.log(file)
      },
      handleSuccess(res) {
        console.log('File upload success')
        console.log('res: ', res)
      },
      handleError(err) {
        console.log('File upload error')
        console.log('err: ', err)
      },
      handleRemove(file) {
        console.log('File remove')
        console.log(file)
        this.imageUrl = ''
      }
    }
  }
</script>

<style>
html,
body {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  color: rgba(0, 0, 0, 0.54);
  fill: rgba(0, 0, 0, 0.54);
}

body {
  position: relative;
}

.file-upload {
  box-sizing: border-box;
  padding: 20px;
  overflow: hidden;
  width: 960px;
  min-height: 580px;
  max-height: 700px;
  /* border: 1px solid red; */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.file-upload .header {
  font-size: 26px;
  /* color: rgba(0, 0, 0, 0.54) !important;
  fill: rgba(0, 0, 0, 0.54) !important; */
  padding-bottom: 20px;
}

.file-upload .flex {
  display: flex;
}

.file-upload .upload .meta {
  margin-top: 30px;
}

.file-upload .upload {
  padding: 0 20px;
  width: 460px;
}

.preview {
  width: 360px;
  min-height: 480px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  width: 480px;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}


.preview .el-icon-upload {
  font-size: 67px;
  color: #c0c4cc;
  margin: 40px 0 16px;
  line-height: 50px;
}

.preview image {
  display: block;
  height: 100%;
}

.el-upload-list__item {
  color: red;
}
</style>
