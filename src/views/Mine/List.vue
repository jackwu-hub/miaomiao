<template>
  <div>
    <ul class="list">
        <li>
            <div>
                <i class="icon iconfont icon-calendar"></i>
                <p>卖座券</p>
            </div>
            <p>></p>
        </li>
        <li>
            <div>
               <i class="icon iconfont icon-email"></i>
               <p>组合红包</p>
            </div>
            <p>></p>
        </li>
        <li>
            <div>
                <i class="icon iconfont icon-trade"></i>
                <p>余额</p>
            </div>
            <p>￥0 ></p>
        </li>
        <li>
            <div>
               <i class="icon iconfont icon-set"></i>
               <p>设置</p>
            </div>
            <p>></p>
        </li>
    </ul>
  </div>
</template>

<style lang="scss" scope>
  .list{
        background-color: #fff;
        li{
            height: 50px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-left: 20px;
            margin-right: 20px;
            border-bottom: 1px solid #F4F4F4;
            p{
                color: #999;
            }
            div{
                display: flex;
                align-items: center;
                i{
                    font-size: 20px;
                }
                .icon-calendar{
                    color:red;
                }
                .icon-email{
                    color:green;
                }
                .icon-trade{
                    color:orange;
                }
                .icon-set{
                    color:greenyellow;
                }
                p{
                    color: #000;
                    margin-left: 16px;
                }
            }
        }
    }
</style>
