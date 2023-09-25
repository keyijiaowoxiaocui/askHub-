import { ElMessage } from "element-plus";

// 上传图片大小及格式限制
export function restrictionPic(file) {
  // 定义上传图片大小需小于3MB
  const isLt2M = file.size / 1024 / 1024 < 3;
  if (!isLt2M) {
    ElMessage.error("上传头像图片大小不能超过 3MB!");
    return isLt2M;
  }
  // 定义上传图片格式，
  const types = ["image/jpg", "image/png", "image/jpeg"];
  const isType = types.includes(file.type);
  if (!isType) {
    ElMessage.error("上传头像图片格式不正确！");
    return isType;
  }
}

// 压缩图片函数，接收一个文件和压缩质量参数 
export function compressPic(file, quality) {
  var qualitys = 0.52

  // 根据文件大小设置不同的默认压缩质量
  if (parseInt((file.size / 1024).toFixed(2)) < 1024) {
    qualitys = 0.85
  }
  if (5 * 1024 < parseInt((file.size / 1024).toFixed(2))) {
    qualitys = 0.92
  }
  if (quality) qualitys = quality

  // 如果上传的是多个文件，递归处理每个文件
  if (file[0]) {
    return Promise.all(Array.from(file).map(e => this.compressPic(e, qualitys)))
  } else {
    return new Promise((resolve) => {
      // 如果图片大小小于300KB，直接返回原始图片数据
      if ((file.size / 1024).toFixed(2) < 300) {
        resolve({
          file: file
        })
      } else {
        // 创建FileReader对象，异步读取存储在客户端上的文件内容
        const reader = new FileReader()
        // 读取操作完成时触发该事件，使用格式（必须将接收到的数据从onload发送到其他函数）：reader.onload = e => {}
        reader.onload = ({
          target: {
            result: src
          }
        }) => {
          //创建img元素
          const image = new Image()
          // 图片加载完成后异步执行，当image的src发生改变，浏览器就会跑去加载这个src里的资源，这个操作是异步的。
          image.onload = async () => {
            // 创建一个新的画布元素和上下文，用于绘制压缩后的图片
            const canvas = document.createElement('canvas')
            const context = canvas.getContext('2d')
            // 计算目标图片的宽度和高度，以适应最大宽度和高度的要求
            var targetWidth = image.width
            var targetHeight = image.height
            var maxWidth = 800
            var maxHeight = 800
            // 缩放图片尺寸以适应最大宽度和高度
            if (targetWidth > maxWidth || targetHeight > maxHeight) {
              const scaleFactor = Math.min(maxWidth / targetWidth, maxHeight / targetHeight);
              targetWidth *= scaleFactor;
              targetHeight *= scaleFactor;
            }
            // 设置画布的尺寸
            canvas.width = targetWidth
            canvas.height = targetHeight
            // 清空画布并在画布上绘制压缩后的图片
            context.clearRect(0, 0, targetWidth, targetHeight)
            context.drawImage(image, 0, 0, targetWidth, targetHeight)
            // 将压缩后的图片数据转换为 data URI。可以使用 type 参数其类型，默认为 PNG 格式。qualitys越小，文件体积越小
            const canvasURL = canvas.toDataURL(file.type, qualitys)
            // 解码 data URI，获取图片的二进制数据。atob：是ascii to binary，用于将ascii码解析成binary数据，即Base64的解码过程。
            const buffer = atob(canvasURL.split(',')[1])
            let length = buffer.length
            //创建一个 Uint8Array 类型的向量，用于存储图片的二进制数据
            const bufferArray = new Uint8Array(new ArrayBuffer(length))
            while (length--) {
              bufferArray[length] = buffer.charCodeAt(length)
            }
            // 创建一个压缩后的文件对象
            const miniFile = new File([bufferArray], file.name, {
              type: file.type
            })

            // 解析压缩后的文件对象
            resolve({
              file: miniFile,
              origin: file,
              beforeSrc: src,
              afterSrc: canvasURL,
              beforeKB: Number((file.size / 1024).toFixed(2)),
              afterKB: Number((miniFile.size / 1024).toFixed(2))
            })
          }
          // 设置图片的 src，触发图片加载
          image.src = src
        }
        // 读取文件内容，并在读取完成后触发 onload 事件
        reader.readAsDataURL(file)
      }
    })
  }
}

