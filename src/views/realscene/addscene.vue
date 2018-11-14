<template>
  <div class="container">
    <el-form ref="form" :model="postForm" label-width="100px">
      <el-form-item label="标题:">
        <el-input v-model="postForm.title" placeholder="请输入实景标题..."/>
      </el-form-item>

      <el-form-item label="地址:">
        <el-input v-model="postForm.url" placeholder="请输入实景地址...">
          <template slot="prepend">Http://</template>
        </el-input>
      </el-form-item>
      <el-form-item label="状态:">
        <el-select v-model="postForm.status" width="40">
          <el-option label="正常" value="1"/>
          <el-option label="禁用" value="0"/>
        </el-select>
      </el-form-item>
      <!--添加封面上传-->
      <el-form-item label="封面:"/>
      <div style="margin-bottom: 20px;margin-left: 35px;">
        <Upload v-model="postForm.cover" />
      </div>

      <div style="height: 30px;" />
      <el-form-item>
        <el-button :loading="load" type="primary" @click="onSubmit">{{ add }}</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addScence, getScenceById, updateScence } from '@/api/scence'
import Upload from '@/components/Upload/singleImage3'
export default {
  name: 'Addscene',
  components: { Upload },
  data() {
    return {
      postForm: {
        id: '',
        title: '',
        url: '',
        cover: '',
        status: '1'
      },
      load: false,
      edit: false,
      add: '添加'
    }
  },
  created() {
    if (this.$route.query.id) {
      this.edit = true
      this.add = '修改'
      this.postForm.id = this.$route.query.id
      this.fetchData(this.$route.query.id)
    }
  },
  methods: {
    onSubmit() {
      this.load = true
      if (this.postForm.title === '' || this.postForm.url === '' || this.postForm.cover === '') {
        this.$message({
          message: '请填写所有内容 ！！！',
          type: 'warning'
        })
        this.load = false
      } else {
        if (this.edit) {
          console.log('修改')
          updateScence(this.postForm).then(res => {
            this.$notify({
              title: '成功',
              message: '修改成功 ！！！',
              type: 'success'
            })
            this.load = false
            this.$router.push('/realscene/scenelist')
          }).catch(err => {
            console.log(err)
            this.$message({
              message: '发生异常，修改失败！！！',
              type: 'warning'
            })
            this.load = false
          })
        } else {
          console.log('添加')
          addScence(this.postForm).then(res => {
            this.$notify({
              title: '成功',
              message: '添加成功 ！！！',
              type: 'success'
            })
            this.load = false
            this.$router.push('/realscene/scenelist')
          }).catch(err => {
            console.log(err)
            this.$message({
              message: '发生异常，添加失败！！！',
              type: 'warning'
            })
            this.load = false
          })
        }
      }
    },
    onCancel() {
      this.$message({
        message: '已取消添加 ！！！',
        type: 'info'
      })
      this.$router.push('/realscene/scenelist')
    },
    fetchData(id) {
      getScenceById(id).then(res => {
        console.log(this.postForm.cover)
        this.postForm = res.data.data
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
.container{
  position: relative;
  padding: 40px 45px 20px 50px;
  /*background-color: lavender;*/
}
</style>
