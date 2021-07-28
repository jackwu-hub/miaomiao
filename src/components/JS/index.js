
import Vue from 'vue'
import MessageBox from './MessageBox'

export var messageBox=(function(){ //使用了闭包
    var defaults={ //自定义弹窗内的数据
        title: '',
        content: '',
        cancel: '',
        ok: '',
        handleCancel: null,  //这两个是事件方法
        handleOk: null
    }

    var MyComponent = Vue.extend(MessageBox) //把这个消息框扩展到Vue中,只有这样 在下面才能 new 

    return function(opts){ //配置参数 (这个参数是从MessageBox目录下的index中取到的)
        for(var attr in opts){
            defaults[attr]=opts[attr]
        }
        
        
        var vm=new MyComponent({  //使用构造函数 这就是整个弹窗
            el: document.createElement('div'), //要添加的元素
            data: { //这个弹窗内的数据属性 ，
                title: defaults.title,
                content: defaults.content,
                cancel: defaults.cancel,
                ok: defaults.ok
            },
            methods: {
                handleCancel(){
                    defaults.handleCancel && defaults.handleCancel.call(this)  //这个this把子对象指向父对象，调用父对象的构造函数
                        //这个defaults.handleCancel就是指向定义这个方法 ，一定要用call 调用父对象的构造函数，要不然这个方法体中的东西是没有用的。
                    document.body.removeChild(vm.$el) //当点击取消时要移除这个元素
                },
                handleOk(){
                    defaults.handleOk && defaults.handleOk.call(this)
                    document.body.removeChild(vm.$el) //当点击OK时也要移除这个元素
                }
            },
        })

        document.body.appendChild(vm.$el) //把它添加到body元素下
    }
})()