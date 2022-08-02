$(function () {
    var layer = layui.layer
    var $image = $('#image')
    const options = {
        aspectRatio: 1,
        preview: '.img-preview'
    }
    $image.cropper(options)

    $('#file').on('change', function (e) {
        var fileList = e.target.files
        console.log(fileList);
        if (fileList.length === 0) {
            return layer.msg('请选择照片！')
        }
        var file = e.target.files[0]
        var newImgURL = URL.createObjectURL(file)
        $image.cropper('destroy').attr('src', newImgURL).cropper(options)
    })
    $('#btnChooseImage').click(function(){
        $('#file').click()
    })
    $('#btnUpload').on('click', function () {
        var dataURL = $image.cropper('getCroppedCanvas', {
            width: 100,
            height: 100
        }).toDataURL('image/png')
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更换头像失败！')
                }
                layer.msg('更换头像成功！')
                window.parent.getUserInfo()
            }
        })
    })
})