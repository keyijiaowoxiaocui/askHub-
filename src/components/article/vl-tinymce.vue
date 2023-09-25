<template>
    <editor v-html="modelValue" v-model="content" tag-name="div" :init="init" placeholder="请输入正文..." />
    {{ modelValue }}
</template>

<script >
import { upload } from "@/api/ArticleApis.js";
import tinymce from "tinymce/tinymce";
import Editor from "@tinymce/tinymce-vue";
//根据需要引入
import "tinymce/themes/silver/theme"; // 引用主题文件
import "tinymce/icons/default"; // 引用图标文件
import "tinymce/plugins/link";
import "tinymce/plugins/code";
import "tinymce/plugins/table"; //插入表格
import "tinymce/plugins/autoresize";
import "tinymce/plugins/charmap"; //特殊字符
import "tinymce/plugins/code"; //查看源码
import "tinymce/plugins/codesample"; //插入代码1
import "tinymce/plugins/directionality"; //
import "tinymce/plugins/fullscreen"; //全屏
import "tinymce/plugins/image"; //图片
import "tinymce/plugins/imagetools"; //图片工具
import "tinymce/plugins/importcss"; //图片工具
import "tinymce/plugins/media"; //媒体插入
import "tinymce/plugins/preview"; //预览
import "tinymce/plugins/quickbars"; //快捷菜单
import "tinymce/plugins/searchreplace"; //查询替换
import "tinymce/plugins/tabfocus"; //
import "tinymce/plugins/textpattern"; //
import "tinymce/plugins/emoticons"; //
// import "tinymce/plugins/numlist";
import { onMounted, ref, watch } from "vue";

export default {
    props: ["modelValue"],
    components: {
        editor: Editor,
    },
    emits: { "update:modelValue": null },
    // props: {
    //     modelValue: String,
    // },
    setup(props, context) {
        const init = {
            language_url: "/tinymce/langs/zh_CN.js", // 中文语言包路径
            language: "zh_CN",
            skin_url: "/tinymce/skins/ui/oxide", // skin路径
            content_css: "/tinymce/skins/ui/oxide/content.css", //以css文件方式自定义可编辑区域的css样式，css文件需自己创建并引入
            menubar: false, // 隐藏菜单栏
            autoresize_bottom_margin: 50,
            // max_height: 500,
            // min_height: 350,
            skin: 'oxide-dark',
            //   height: 320,
            toolbar_mode: "none",
            plugins:
                "textpattern  tabfocus  searchreplace  quickbars preview   media  importcss imagetools image  fullscreen emoticons  directionality codesample code charmap link code table  autoresize link", // 插件需要import进来
            toolbar:
                "formats  fontsizeselect fontselect media image  aligncenter alignleft alignright alignjustify underline quicklink h2 h3 blockquote numlist bullist table forecolor backcolor bold italic  strikethrough  charmap link codesample code ",//工具栏展示的
            content_style: "p {margin: 5px 0; font-size: 14px} body { color: #fff; } iframe { border: 1px solid #fff; }",
            fontsize_formats: "12px 14px 16px 18px 24px 36px 48px 56px 72px",
            font_formats:
                "微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;",
            branding: false,
            elementpath: false,
            resize: false, // 禁止改变大小
            statusbar: false, // 隐藏底部状态栏
            // paste_data_images: true, // 允许粘贴图像
            content_style: '#515767', // 设置默认文字颜色
            file_picker_types: "file image media",

            //文件上传
            file_picker_callback: function (callback, value, meta) {
                //文件分类
                var filetype =
                    ".pdf, .txt, .zip, .rar, .7z, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .mp3, .mp4";
                //为不同插件指定文件类型
                switch (meta.filetype) {
                    case "image":
                        filetype = ".jpg, .jpeg, .png, .gif";
                        break;
                    case "media":
                        filetype = ".mp3, .mp4";
                        break;
                    case "file":
                    default:
                }
                //模拟出一个input用于添加本地文件
                var input = document.createElement("input");
                input.setAttribute("type", "file");
                input.setAttribute("accept", filetype);
                input.click();
                input.onchange = function (v) {
                    console.log('v', v)
                    var file = v.target.files[0];
                    var formData = new FormData();
                    formData.append("image", file, file.name);
                    upload(formData).then((res) => {
                        callback(res.data.data, { title: file.name });
                        console.log(res.data.data);
                    });
                };
            },

            //   图片上传
            images_upload_handler: async (blobInfo, success) => {
                //改写,通过自己的upload接口，返回的图片时正常的url格式
                const blob = blobInfo.blob();
                const filename = blobInfo.filename();
                var form = new FormData();

                form.append("image", blob, filename);
                console.log('form', form);
                upload(form).then((res) => {
                    success(res.data.data);
                    console.log(res.data.data);
                });
            },
            codesample_languages: [
                { text: 'HTML/XML', value: 'markup' },
                { text: 'JavaScript', value: 'javascript' },
                { text: 'CSS', value: 'css' },
                { text: 'PHP', value: 'php' },
                { text: 'Ruby', value: 'ruby' },
                { text: 'Python', value: 'python' },
                { text: 'Java', value: 'java' },
                { text: 'C', value: 'c' },
                { text: 'C#', value: 'csharp' },
                { text: 'C++', value: 'cpp' }
            ],
            codesample_content_css: '/static/prism.css',
        };

        const content = ref('');

        onMounted(() => {
            // console.log('props.modelValue', props.modelValue);
            // content.value = props.modelValue;
        });
        watch(
            () => content.value,
            () => {
                console.log('变化了');
                imgsize(content.value);
                revert_data(content.value);
            }
        );
        watch(
            () => props.modelValue,
            () => {
                content.value = props.modelValue;
            }
        );

        // 匹配所有img图片，把所有宽度大于750px的图片等比缩小到750px
        const imgsize = function (img) {
            // 使用正则表达式匹配<img>标签
            const regex = /<img[^>]*\b(?:width|height)\s*=\s*["']?(\d{4,}|[1-9][0-4]\d{2,})["']?\s*[^>]*>/g;
            const matchedImages = img.match(regex);
            console.log('matchedImages', matchedImages);
            if (matchedImages) {
                for (const imgTag of matchedImages) {
                    // 匹配width和height属性的值
                    const widthMatch = imgTag.match(/\bwidth\s*=\s*["']?(\d+)/);
                    const heightMatch = imgTag.match(/\bheight\s*=\s*["']?(\d+)/);

                    if (widthMatch && heightMatch) {
                        const width = parseInt(widthMatch[1]);
                        const height = parseInt(heightMatch[1]);

                        if (width > 850) {
                            // 计算等比缩小后的新高度，保持宽度等于750px
                            const aspectRatio = width / height;
                            const newWidth = 850;
                            const newHeight = Math.round(850 / aspectRatio);

                            // 修改width和height属性的值，确保宽度为750px
                            const updatedImgTag = imgTag.replace(`width="${width}"`, `width="${newWidth}"`).replace(`height="${height}"`, `height="${newHeight}"`);

                            // 替换原始的<img>标签
                            content.value = content.value.replace(imgTag, updatedImgTag);
                        }
                    }
                }
            }
        }

        const revert_data = (content) => {
            //实现数据的双向绑定
            context.emit("update:modelValue", content);
        };

        tinymce.init; // 初始化
        return {
            init,
            revert_data,
            content,
        };
    },
};
</script>

<style lang="scss">
$background-color:#fff;
$smallFont:#515767;
$title:#000000;
$blue1:#1171ee;
$blue2:#007FFF;
.tox-tinymce {
    border: none !important;
    overflow: visible !important;
}

.tit {
    overflow: visible !important;
}


.tox .tox-tbtn {
    // color: #fff !important;
}

.tox .tox-tbtn:hover {
    // background-color: #2a2a29;
    // color: #2a2a29;
}


.tox .tox-tbtn svg {
    // fill: #fff !important;
}

.tox-editor-container {
    overflow: visible !important;
}

.tox-toolbar {
    width: 1000px !important;
    // background-color: #070501 !important;
    // color: #fff;
    // border: 1px solid #585e58 !important;
}

.tox-editor-header {
    position: absolute !important;
    top: -109px;
}

.tox-tbtn--bespoke {
    width: 132px !important;
}

.tox-edit-area__iframe {
    // color: #f2f2f2 !important;
    // background-color: #070501 !important;
}

.mce-content-body * {
    // color: #f2f2f2 !important;
}

#tiny-vue_67117139321692416649147_ifr {
    // border: 1px solid #585e58 !important;
}

.tox-sidebar-wrap {
    height: 70vh !important;
    overflow: hidden !important;
}

.tox-pop {
    display: none !important;
}

/* .tox-dialog .tox-dialog__content-js .tox-dialog__body .tox-dialog__body-content .tox-form .tox-form__group:nth-child(3){
    display: none;
} */
/* .tox-dialog .tox-dialog__content-js .tox-dialog__body .tox-dialog__body-content .tox-form .tox-form__group:nth-child(2){
    display: none;
} */
</style>