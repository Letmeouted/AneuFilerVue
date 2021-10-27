<!--
 * @Author: Letmeouted
 * @Email: 1002726239@qq.com
 * @FilePath: \AneuFilerVue\src\renderer\pages\Setting.vue
-->
<template>
  <div>
    <div class="view-title">
      AneuFiler设置区 - <i class="el-icon-document"></i>
    </div>
    <div class="setting">
      <el-switch
        style="display: block"
        v-model="value"
        active-color="#13ce66"
        inactive-color="#ff4949"
        active-text="按样本输出"
        @change="ChangeStatus($event)"
        active-value="1"
        inactive-value="0"
      >
      </el-switch>
      <div class="form">
        <span class="select">选择输出格式</span>
        <el-radio-group v-model="radio" @change="handleRadioChange">
          <el-radio label="UTF-8" class="UTF8" @change="ChangeUTF8"
            >UTF-8</el-radio
          >
          <el-radio label="GBK" class="GBK" @change="ChangeGBK">GBK</el-radio>
        </el-radio-group>
      </div>
      <!-- <div class="form">
        <span class="select">外观</span>
         <el-select v-model="value" placeholder="请选择">
            <el-option  :value="item.value" v-for="item in options" :key="item.value" :label="item.label"></el-option>
          </el-select>
          <el-switch
          style="display：block"
          v-model="value1"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-text="深色"
          @change="Changeappearance($event)"
          active-value="1"
          inactive-value="0">
          </el-switch>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: '1',
      radio: ''
      // options: [{
      //   value: '默认',
      //   label: '自动'
      // }, {
      //   value: '选项1',
      //   label: '🌞浅色'
      // }, {
      //   value: '选项2',
      //   label: '🌚深色'
      // }
      // ]
      // value1: '1'
    }
  },
  created () {
    this.radio = 'GBK'
    this.handleRadioChange(this.radio)
    var radioData = {
      'Encoding': this.radio
    }
    sessionStorage.setItem('format', JSON.stringify(radioData))
    var switchData = {
      'switchstatus': this.value
    }
    sessionStorage.setItem('sample', JSON.stringify(switchData))
  },
  mounted () {
  },
  methods: {
    handleRadioChange (value) {
      console.log('改变后的值为' + value)
      const radioData = {
        'Encoding': value
      }
      console.log(radioData)
      sessionStorage.setItem('format', JSON.stringify(radioData))
    },
    ChangeUTF8 () {
      this.$message({
        showClose: true,
        message: '输出文件将以 UTF-8 格式编码',
        type: 'success',
        center: true,
        offset: '400'
      })
    },
    ChangeGBK () {
      this.$message({
        showClose: true,
        message: '输出文件将以 GBK 格式编码',
        type: 'success',
        center: true,
        offset: '400'
      })
    },
    ChangeStatus ($event) {
      var switchstatus = $event
      console.log(switchstatus)
      const switchData = {
        'switchstatus': switchstatus
      }
      console.log(switchData)
      sessionStorage.setItem('sample', JSON.stringify(switchData))
      if ($event === '1') {
        this.$message({
          showClose: true,
          message: '输出将会按照样本拆分',
          type: 'success',
          center: true,
          offset: '400'
        })
      } else {
        this.$message({
          showClose: true,
          message: '每个输入文件将只输出一个结果文件',
          type: 'success',
          center: true,
          offset: '400'
        })
      }
    },
    Changeappearance ($event) {
      var dark = $event
      console.log('模拟测试 ' + dark)
      if ($event === '1') {
        this.$message({
          showClose: true,
          message: '外观颜色为深色',
          type: 'success',
          center: true,
          offset: '400'
        })
      } else {
        this.$message({
          showClose: true,
          message: '外观颜色为浅色',
          type: 'success',
          center: true,
          offset: '400'
        })
      }
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
.setting {
  text-align: center;
  margin-top: 50px;
  vertical-align: middle;
  .el-switch__label {
    color: #eee;
  }
  .form {
    margin-top: 20px;
    .select {
      display: block;
      color: #eee;
      font-size: 15px;
      margin-bottom: 20px;
    }
    .UTF8 {
      color: #eee;
    }
    .GBK {
      color: #eee;
    }
  }
}
</style>