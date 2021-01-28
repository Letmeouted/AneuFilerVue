<!--
 * @Author: Letmeouted
 * @Email: 1002726239@qq.com
 * @FilePath: \AneuFilerVue\src\renderer\pages\Upload.vue
-->
<template>
  <el-row>
    <el-col>
      <div class="view-title">文件处理区-<i class="el-icon-s-order"></i></div>
      <div class="upload">
        <el-upload
          class="upload-demo"
          drag
          action="#"
          accept=".txt,.csv"
          :on-change="handleChange"
          :file-list="fileList"
          :http-request="httpRequest"
          :before-upload="beforeAvatarUpload"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">
            只能上传txt/csv文件(上传文件之前请查看上传文件命名格式要求：不能含有空格，特殊符号，中文)
          </div>
        </el-upload>
      </div>

      <div class="function">
        <el-button
          type="warning"
          icon="el-icon-chat-line-square"
          class="help"
          onclick="window.open('https://github.com/NTLx/AneuFiler')"
          round
          >帮助</el-button
        >
        <el-button
          type="danger"
          icon="el-icon-back"
          class="quit"
          onclick="javascript:window.close()"
          round
          >退出</el-button
        >
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      dropActive: false,
      fileList: []
    }
  },
  created () {
  },
  methods: {
    handleChange (file, fileList) {
      this.fileList = fileList.slice(-1)
    },
    beforeAvatarUpload (file) {
      var filetype = file.name.substring(file.name.lastIndexOf('.') + 1)
      console.log(filetype)
      var extension = filetype === 'txt' || 'csv'
      if (!extension) {
        this.$message.error('上传的文件只能是txt格式或csv格式!')
      }
      return extension
    },
    httpRequest (data) {
      var dataA = JSON.parse(sessionStorage.getItem('format'))
      var dataB = JSON.parse(sessionStorage.getItem('sample'))
      if (dataA === null) {
        dataA = {
          Encoding: 'GBK'
        }
        dataB = {
          switchstatus: '1'
        }
        console.log(dataA)
        console.log(dataB)
        var Encoding = dataA.Encoding
        var switchstatus = dataB.switchstatus
      } else {
        dataA = JSON.parse(sessionStorage.getItem('format'))
        dataB = JSON.parse(sessionStorage.getItem('sample'))
        console.log(dataA)
        console.log(dataB)
        Encoding = dataA.Encoding
        switchstatus = dataB.switchstatus
      }
      var file = data.file
      var path = require('path')
      var exec = require('child_process').execFile
      var fs = require('fs')
      console.log(file.path)
      console.log(file)
      var exefile
      var oldUrl1 = path.join(__dirname, '../../../static/analysis.mac')
      var oldUrl2 = path.join(__dirname, '../../../static/analysis.exe')
      var newUrl1 = path.join(process.cwd(), '/resources/analysis.mac')
      var newUrl2 = path.join(process.cwd(), '/resources/analysis.exe')
      fs.stat(oldUrl1, (err) => {
        if (err) {
          if (file.path) {
            console.log("Request handler 'start' was called.")
            if (process.platform === 'darwin') {
              exefile = newUrl1
            }
            if (process.platform === 'win32') {
              exefile = newUrl2
            }
            exec(
              exefile,
              ['-i', file.path, '-e', Encoding, '-s', switchstatus],
              (error, stdout, stderr) => {
                if (error || stderr) {
                  const notice = '[WARNING] 输入文件 ' + file.path + ' 处理有误'// eslint-disable-line no-unused-vars
                  this.$message({
                    showClose: true,
                    message: notice,
                    type: 'error',
                    center: true,
                    offset: '400'
                  })
                  console.log('error:\n' + error)
                  console.log('stderr:\n' + stderr)
                } else if (stdout) {
                  const notice = '输入文件 ' + file.path +
                    ' 处理完成'
                  this.$message({
                    showClose: true,
                    message: notice,
                    type: 'success',
                    center: true,
                    offset: '400'
                  })
                  console.log('stdout:\n' + stdout)
                }
              }
            )
          }
        } else {
          if (file.path) {
            console.log("Request handler 'start' was called.")
            if (process.platform === 'darwin') {
              exefile = oldUrl1
            }
            if (process.platform === 'win32') {
              exefile = oldUrl2
            }
            exec(
              exefile,
              ['-i', file.path, '-e', Encoding, '-s', switchstatus],
              (error, stdout, stderr) => {
                if (error || stderr) {
                  const notice = '[WARNING] 输入文件 ' + file.path + ' 处理有误'// eslint-disable-line no-unused-vars
                  this.$message({
                    showClose: true,
                    message: notice,
                    type: 'error',
                    center: true,
                    offset: '400'
                  })
                  console.log('error:\n' + error)
                  console.log('stderr:\n' + stderr)
                } else if (stdout) {
                  const notice = '输入文件 ' + file.path + ' 处理完成'
                  this.$message({
                    showClose: true,
                    message: notice,
                    type: 'success',
                    center: true,
                    offset: '400'
                  })
                  console.log('stdout:\n' + stdout)
                }
              }
            )
          }
        }
      })
    }
  }
}
</script>

<style lang="less">
.view-title {
  color: #eee;
  font-size: 20px;
  text-align: center;
  margin: 10px auto;
}

.upload {
  text-align: center;
}
.upload-demo {
  color: #eee;
  .el-upload-dragger {
    text-align: center;
    background-color: #3f3c37 !important;
    i {
      color: #eee;
    }
    .el-upload__text {
      color: #eee !important;
    }
  }
  .el-upload__tip {
    color: #eee !important;
  }
}
.function {
  margin-top: 20px;
  .help {
    position: relative;
    left: 90px;
  }
  .quit {
    position: relative;
    left: 300px;
  }
}
</style>