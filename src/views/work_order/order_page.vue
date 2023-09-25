<template>
  <div class="main-order">
    <div class="main-header">
      <h1>提交工单</h1>
    </div>
    <div class="main-content">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="邮箱地址" prop="email">
          <el-input v-model="ruleForm.email" />
        </el-form-item>
        <el-form-item label="工单标题" prop="title">
          <el-input v-model="ruleForm.title" />
        </el-form-item>
        <el-form-item label="工单类型" prop="classification">
          <el-select
            v-model="ruleForm.classification"
            placeholder="请选择工单类型"
          >
            <el-option label="程序bug" value="程序bug" />
            <el-option label="功能建议" value="功能建议" />
          </el-select>
        </el-form-item>
        <el-form-item label="问题描述" prop="content">
          <el-input v-model="ruleForm.content" type="textarea" />
        </el-form-item>
        <el-upload
          v-model:file-list="fileList"
          class="upload-demo"
          action="#"
          list-type="picture"
          :http-request="uploadFile"
          :before-upload="beforeUpload"
          :on-error="handleError"
        >
          <el-button class="upload_click" type="primary">点击上传</el-button>
          <template #tip>
            <div class="el-upload__tip">jpg/png 文件小于3MB</div>
          </template>
        </el-upload>
        <el-form-item style="margin: 20px 0px">
          <el-button
            class="order_click"
            type="primary"
            @click="submitForm(ruleFormRef)"
            >提交</el-button
          >
          <el-button class="goback_btn" @click="resetForm(ruleFormRef)"
            >返回</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { uploadImages, sendWorkOrder } from "@/api/workorder";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
import { getToken } from "@/utils/setToken";
import { ex } from "@/api/UserApis";
import { compressPic, restrictionPic } from "@/utils/compressPic";

// 表单数据：用户名、用户邮件、工单标题、工单分类、工单内容、上传附件、用户ID
const ruleForm = reactive({
  name: "",
  email: "",
  title: "",
  classification: "",
  content: "",
  annex: [],
  userId: "",
});
const ruleFormRef = ref(null);
const rules = {
  name: [
    { required: true, message: "请输入用户姓名（必填）", trigger: "blur" },
  ],
  email: [
    { required: true, message: "请输入邮箱地址（必填）", trigger: "blur" },
    {
      type: "email",
      message: "Please input correct email address",
      trigger: ["blur", "change"],
    },
  ],
  title: [
    { required: true, message: "请输入工单标题（必填）", trigger: "blur" },
  ],
  classification: [
    {
      required: true,
      message: "请选择工单类型",
      trigger: "change",
    },
  ],
  content: [{ message: "请填写问题详情", trigger: "blur" }],
};
// 上传图片数组
let fileList = reactive([]);
// 实例化useRouter：VueRouter的一个对象（全局）
const router = useRouter();
// 实例化useRoute：一个跳转的路由对象（局部）
const route = useRoute();
// 获取路由传参
ruleForm.userId = route.query.userId;
// 上传图片之前的限制
const beforeUpload = function (file) {
  console.log(file);
  return restrictionPic(file);
};
//上传本地图片到服务器返回图片链接
const uploadFile = function (image) {
  console.log(image);
  // 通过表单格式化图片信息为二进制流
  const form = new FormData();
  compressPic(image.file, 0.92).then(function (res) {
    console.log(res);
    form.append("image", res.file);
  });
  // 调用接口上传图片
  uploadImages(form)
    .then((res) => {
      console.log(res);
      if (res.data.code == 0) {
        ElMessage({
          showClose: true,
          message: "图片上传成功！",
          type: "success",
        });
        // 将返回的链接地址重新赋给数组的url
        fileList.forEach((item, index) => {
          if (item.uid === image.file.uid) {
            fileList[index].url = res.data.data;
          }
        });
      } else {
        handleError("图片上传失败，请检查当前网络！");
        removeImage(image.file.uid);
      }
    })
    .catch((res) => {
      handleError("图片上传失败，请检查当前网络！");
      removeImage(image.file.uid);
    });
};
// 上传失败时，移除上传的图片
const removeImage = function (uid) {
  fileList.forEach((item, index) => {
    if (item.uid === uid) {
      fileList.splice(index, 1);
    }
  });
  console.log(fileList);
};
// 统一错误处理
function handleError(message) {
  ElMessage({
    showClose: true,
    message: message,
    type: "error",
  });
}

// 提交工单
const submitForm = function (ruleFormRef) {
  // 后端接口要求传递的数据为annex:['图片链接1','图片链接2']
  fileList.forEach((item, index) => {
    ruleForm.annex.push(item.url);
  });
  // 通过rule表单规则判断用户填写数据是否符合要求
  if (!ruleFormRef) return;
  ruleFormRef.validate((valid, fields) => {
    if (valid) {
      sendWorkOrder(ruleForm)
        .then((res) => {
          console.log(res);
          if (res.data.code == 0) {
            ElMessage({
              showClose: true,
              message: "工单提交成功！",
              type: "success",
            });
          } else {
            handleError("工单提交失败！");
          }
        })
        .catch((res) => {
          handleError("工单提交失败！");
        });
    } else {
      console.log("error submit!", fields);
    }
  });
};
// 点击路由返回
const resetForm = function () {
  router.go(-1);
};
</script>

<style scoped>
/* @import "./work_order.css"; */
.main-order {
  width: 100%;
  max-width: 1028px;
  margin: 60px auto 0;
}
.main-header {
  margin-bottom: 20px;
}
.main-header h1 {
  text-align: center;
  color: #000;
}
.main-content {
  /* background-color: #070501; */
  margin: 24px 20px;
  width: 90%;
  height: calc(100% - 48px);
  overflow: auto;
  padding: 60px 50px 40px;
  border: 1px solid #d0d0d0;
  box-shadow: 0px 0px 5px 0px #c7c7c7;
  color: #000;
}
.el-form-item {
  margin-bottom: 35px;
  font-size: 16px;
}
.elbtn {
  display: flex;
  justify-content: space-around;
}
.el-form-item__label {
  color: #000;
}
.el-form-item .el-form-item__content .el-textarea__inner {
  height: 100px !important;
  resize: none !important;
  color: #000;
}
.el-form-item .el-form-item__content {
  margin-left: 0px !important;
}
.order_click,
.upload_click {
  /* background-color: #070501 !important; */
  border: 1px solid #409eff !important;
}

.goback_btn {
  border-color: #000;
  color: #000;
  /* background-color: #2a2a29; */
  margin-left: 25px;
}
.goback_btn:hover {
  border-color: #409eff;
  /* background-color: #2a2a29; */
  color: #409eff;
}
.el-input .is-focus {
  box-shadow: 0 0 0 1px #409eff inset !important;
}
.el-select .el-input.is-focus .el-input__wrapper {
  box-shadow: 0 0 0 1px #409eff inset !important;
}
.el-select .el-input__wrapper.is-focus {
  box-shadow: 0 0 0 1px #409eff inset !important;
}
.el-textarea__inner:focus {
  box-shadow: 0 0 0 1px #409eff inset !important;
}
.el-select-dropdown__item.selected {
  color: #409eff !important;
}
.el-textarea__inner {
  /* background-color: #070501 !important; */
}
</style>