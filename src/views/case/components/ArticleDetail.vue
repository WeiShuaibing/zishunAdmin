<!--suppress ALL -->
<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" class="form-container">

      <sticky :class-name="'sub-navbar '+postForm.status">
        <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">发布
        </el-button>
      </sticky>

      <div class="createPost-main-container">
        <el-form-item label="标题:"><span style="color: red">*</span><el-input v-model="postForm.title"/></el-form-item>
        <el-form-item label="风格:"><span style="color: red">*</span>
          <el-select v-model="postForm.style" placeholder="选择风格...">
            <el-option label="现代简约" value="现代简约"/>
            <el-option label="简美风格" value="简美风格"/>
            <el-option label="简欧" value="简欧"/>
            <el-option label="北欧风格" value="北欧风格"/>
            <el-option label="欧式古典" value="欧式古典"/>
            <el-option label="地中海风格" value="地中海风格"/>
            <el-option label="新中式" value="新中式"/>
            <el-option label="新古典" value="新古典"/>
            <el-option label="雅致主义" value="雅致主义"/>
            <el-option label="美式乡村" value="美式乡村"/>
            <el-option label="现代前卫" value="现代前卫"/>
            <el-option label="其他" value="其他"/>
          </el-select>
          <span class="huxing">户型：</span><span style="color: red">*</span>
          <el-select v-model="postForm.hourse" placeholder="选择户型...">
            <el-option label="别墅" value="别墅"/>
            <el-option label="跃层" value="跃层"/>
            <el-option label="普通住宅" value="普通住宅"/>
            <el-option label="工装" value="工装"/>
            <el-option label="二居室" value="二居室"/>
            <el-option label="三居室" value="三居室"/>
            <el-option label="四居室" value="四居室"/>
            <el-option label="Loft" value="Loft"/>
            <el-option label="复式" value="复式"/>
          </el-select>
          <span class="huxing">面积：</span>
          <span style="color: red">*</span>
          <el-select v-model="postForm.area" placeholder="选择面积...">
            <el-option label="80-100平米" value="80-100平米"/>
            <el-option label="100-140平米" value="100-140平米"/>
            <el-option label="140-200平米" value="140-200平米"/>
            <el-option label="200-320平米" value="200-320平米"/>
            <el-option label="320-500平米" value="320-500平米"/>
            <el-option label="500-1000平米" value="500-1000平米"/>
            <el-option label="1000以上平米" value="1000以上平米"/>
          </el-select>
          <span class="huxing">状态：</span>
          <el-select v-model="postForm.status" width="40">
            <el-option label="正常" value="1"/>
            <el-option label="禁用" value="0"/>
          </el-select>
        </el-form-item>

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="小区名称：">
              <el-input v-model="postForm.village" size="medium" placeholder="请输入小区名称..."/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="设计师：">
              <el-input v-model="postForm.designer" size="medium" placeholder="请输入设计师..."/>
            </el-form-item>
          </el-col>

        </el-row>
        <el-form-item label="详情:" />
        <div class="editor-container">
          <Tinymce ref="editor" :height="400" v-model="postForm.content" />
        </div>
        <el-form-item label="封面:"><span style="color: red">*</span></el-form-item>

        <div style="margin-bottom: 20px;">
          <Upload v-model="postForm.cover" />
        </div>
      </div>
    </el-form>

  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import Upload from '@/components/Upload/singleImage3'
import MDinput from '@/components/MDinput'
import Sticky from '@/components/Sticky' // 粘性header组件
// import { validateURL } from '@/utils/validate'
import Warning from './Warning'
import { CommentDropdown, PlatformDropdown, SourceUrlDropdown } from './Dropdown'
import { addCase, getCaseById, updateCase } from '@/api/case'

export default {
  name: 'ArticleDetail',
  components: { Tinymce, MDinput, Upload, Sticky, Warning, CommentDropdown, PlatformDropdown, SourceUrlDropdown },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // postForm: Object.assign({}, defaultForm),
      postForm: {
        id: '',
        title: '',
        style: '',
        hourse: '',
        area: '',
        village: '',
        designer: '',
        content: '',
        cover: '',
        status: '1'
      },
      loading: false,
      userListOptions: [],
      tempRoute: {},
      edit: false
    }
  },
  computed: {
  },
  created() {
    console.log(this.$route.query.id)
    if (this.$route.query.id) {
      this.edit = true
      this.postForm.id = this.$route.query.id
      this.fetchData(this.$route.query.id)
    }
  },
  methods: {
    fetchData(id) {
      getCaseById(id).then(res => {
        console.log(this.postForm.cover)
        // 将内容转码
        res.data.data.content = this.htmlDecodeByRegExp(res.data.data.content)
        this.postForm = res.data.data
      }).catch(err => {
        console.log(err)
      })
    },
    submitForm() {
      this.loading = true
      if (this.postForm.title === '' || this.postForm.style === '' ||
      this.postForm.area === '' || this.postForm.hourse === '' || this.postForm.cover === '') {
        this.$message({
          message: '带 * 号的为必填内容哦 ！！！',
          type: 'warning'
        })
        this.loading = false
      } else {
        if (this.edit) {
          updateCase(this.postForm).then(res => {
            if (res.data.code === 200) {
              this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success'
              })
              this.loading = false
              this.$router.push('/case/caselist')
            } else {
              this.$notify({
                title: '失败',
                message: '更新失败 ！！！',
                type: 'error',
                duration: 0
              })
              this.loading = false
            }
            console.log(res)
          }).catch(err => {
            console.log(err)
            this.loading = false
          })

          console.log('更新文章信息！=================！')
        } else {
          console.log('添加case')
          addCase(this.postForm).then(res => {
            if (res.data.code === 200) {
              this.$notify({
                title: '成功',
                message: '添加成功',
                type: 'success'
              })
              this.$router.push('/case/caselist')
              this.loading = false
            } else {
              this.$notify({
                title: '失败',
                message: '添加失败 ！！！',
                type: 'error',
                duration: 0
              })
              this.loading = false
            }
            console.log(res)
          }).catch(err => {
            console.log(err)
            this.loading = false
          })
        }
      }
    },
    htmlDecodeByRegExp(str) {
      var s = ''
      if (str.length === 0) return ''
      s = str.replace(/&amp;/g, '&')
      s = s.replace(/&lt;/g, '<')
      s = s.replace(/&gt;/g, '>')
      s = s.replace(/&nbsp;/g, ' ')
      s = s.replace(/&#39;/g, "\\'")
      s = s.replace(/&quot;/g, '"')
      return s
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.createPost-container {
  position: relative;
  .createPost-main-container {
    padding: 40px 45px 20px 50px;
    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;
      .postInfo-container-item {
        float: left;
      }
    }
    .editor-container {
      min-height: 500px;
      margin: 0 0 30px;
      .editor-upload-btn-container {
        text-align: right;
        margin-right: 10px;
        .editor-upload-btn {
          display: inline-block;
        }
      }
    }
  }
  .word-counter {
    width: 40px;
    position: absolute;
    right: -10px;
    top: 0px;
  }
}
.huxing{
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  font-size: 14px;
  padding-left: 50px;
  color: #606266;
  line-height: 40px;
  font-weight: 700;
}
.line{
  text-align: center;
}
</style>
