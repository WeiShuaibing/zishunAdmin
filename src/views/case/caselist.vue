<template>
  <div class="app-container">

    <el-table v-loading="listLoading" :data="caselist" border fit highlight-current-row style="width: 100%">
      <!--<el-table-column align="center" label="ID" width="80">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.id }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center" label="创建时间" width="160px">
        <template slot-scope="scope">
          <span>{{ scope.row.create_time | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>

      <!--<el-table-column width="180px" align="center" label="Date">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->

      <el-table-column align="center" label="标题">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column width="120px" align="center" label="风格">
        <template slot-scope="scope">
          <span>{{ scope.row.style }}</span>
        </template>
      </el-table-column>
      <el-table-column width="120px" align="center" label="户型">
        <template slot-scope="scope">
          <span>{{ scope.row.hourse }}</span>
        </template>
      </el-table-column>
      <el-table-column width="120px" align="center" label="面积">
        <template slot-scope="scope">
          <span>{{ scope.row.area }}</span>
        </template>
      </el-table-column>
      <el-table-column width="120px" align="center" label="设计师">
        <template slot-scope="scope">
          <span>{{ scope.row.designer }}</span>
        </template>
      </el-table-column>
      <el-table-column width="160px" align="center" label="小区">
        <template slot-scope="scope">
          <span>{{ scope.row.village }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="状态" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | typeFilter ">{{ scope.row.status | statusFilter }}</el-tag>
        </template>
      </el-table-column>

      <!--有路由的标题-->
      <!--<el-table-column min-width="300px" label="Title">-->
      <!--<template slot-scope="scope">-->

      <!--<router-link :to="'/case/edit/'+scope.row.id" class="link-type">-->
      <!--<span>{{ scope.row.title }}</span>-->
      <!--</router-link>-->
      <!--</template>-->
      <!--</el-table-column>-->

      <el-table-column align="center" label="Actions" width="240">
        <template slot-scope="scope">
          <el-button type="danger" size="small" icon="el-icon-delete" @click="deleteCase(scope.$index, scope.row)">删除</el-button>
          <!--<router-link :to="'/realscene/scenelist'+scope.row.id">-->
          <el-button type="primary" size="small" icon="el-icon-edit" @click="toEdit(scope.row.id)">编辑</el-button>
          <!--</router-link>-->
        </template>
      </el-table-column>
    </el-table>

    <!--<pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />-->
    <div style="margin-top: 20px;">
      <el-pagination
        :current-page="1"
        :page-size="pageSize"
        :total="totalNum"
        background
        layout="total, prev, pager, next, jumper"
        @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>

<script>
// import { fetchList } from '@/api/article'
import { getCaseList, deleteCaseById } from '@/api/case'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'Caselist',
  components: { Pagination },
  filters: {
    statusFilter(val) {
      return val === '1' ? '正常' : '禁用'
    },
    typeFilter(status) {
      return status === '1' ? 'success' : 'danger'
    }
  },
  data() {
    return {
      caselist: null,
      totalNum: 0,
      pageSize: 10,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      }
    }
  },
  created() {
    this.getList(this.listQuery)
  },
  methods: {
    getList(query) {
      this.listLoading = true
      getCaseList(query).then(res => {
        this.totalNum = parseInt(res.data.other)
        this.caselist = res.data.data
        this.listLoading = false
      }).catch(err => {
        console.log(err)
      })
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList(this.listQuery)
    },
    deleteCase($index, row) {
      // console.log($index)
      var that = this
      console.log(row.id)
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log('删除文章')
        deleteCaseById(row.id).then(res => {
          if (res.data.data.effectRow === 1) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            that.getList(this.listQuery)
          } else {
            this.$message({
              type: 'warning',
              message: '删除失败！！!'
            })
          }
        }).catch(err => {
          console.log(err)
          this.$message({
            type: 'warning',
            message: '删除失败！！!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    toEdit(id) {
      console.log(id)
      this.$router.push('/case/addcase?id=' + id)
    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
