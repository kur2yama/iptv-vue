<template>
<div>
    <Header></Header>
    <div class="ranking-content">
        <div class="user-ranking">
            <div class="userInfo">
                <div class="avatar">
                    <img :src='avatar?avatar:defaultUrl' :onerror="defaultUrl" alt="">
                </div>
                <p>您的投票账号</p>
                <p>{{tpAcconunt}}</p>
                <p>共投出 {{votes}} 票</p>
                <p>目前排在第 {{ranking}} 名</p>
            </div>
        </div>
        <!-- 表格 -->
        <div class="ranking-table">
             <img src="../assets/images/active/top100.png" alt="">
        </div>
        <div class="ranking-box">
            <table class="ranking">
                <tr class="theader">
                    <th>
                        排名
                    </th>
                    <th>
                        账号
                    </th>
                    <th>
                        投票数
                    </th>
                    <th>
                        投票时间
                    </th>
                </tr>
                <tr class="tbody" 
                    v-for="(item,index) in rankList" 
                    :key="item.id"
                >
                    <td>
                        第{{rankList[index].ranking}}名
                    </td>
                    <td>
                        {{rankList[index].temporaryName}}
                    </td>
                    <td>
                        {{rankList[index].votes}}票
                    </td>
                    <td>
                        {{rankList[index].updateTime.slice(5,7)}}月{{rankList[index].updateTime.slice(8,10)}}日 {{rankList[index].updateTime.slice(11)}}
                    </td>
                </tr>
                
            </table>
        </div>
        <div class="tips">
            <p>当票数相同时，以最后的投票时间优先排名，</p>
            <p>活动最终解释权归长江云TV所有。(咨询电话:18717103005)</p>
        </div>
    </div>
</div>
</template>

<script>
import Header from './common/header.vue'
import $list from '../api/index'
export default {
    name: 'ranking',
    components:{
        Header
    },
    data () {
    return {
        tpAcconunt:'',
        defaultUrl:'http://tva3.sinaimg.cn/crop.0.0.184.184.180/005VCAa6jw8f9cdtlq8y9j3054054a9u.jpg',
        avatar:'',
        votes:'0',
        ranking:'0',
        activityId:'d21cc96143964d659dbe6611103d576d',
        rankList:[{}]
        }
    },
    created(){
       this.getInit();
    },
    methods:{
        getInit(){
            this.avatar = localStorage.getItem('avatar')
            $list.c2mList.getUserRanking(this.activityId,this.$route.query.id).then(res=>{
                if(res.code == 200){
                   this.tpAcconunt = res.data.userRank.temporaryName;
                   this.votes = res.data.userRank.votes;
                   this.ranking = res.data.userRank.ranking;
                   this.rankList = res.data.rankList;
                }
                }).catch(error=>{
                    console.log(error);
                })
        }
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.ranking-content{
    width: 100%;
    height: 100vh;
    margin: 0 auto;
    overflow: hidden;
    background:url(../assets/images/active/phBg.png) no-repeat;
    background-size: 100% 100%;
    .user-ranking{
        width: 92%;
        height: 10rem;
        background:url(../assets/images/active/rankingBg.png) no-repeat;
        background-size: cover;
        border-radius: 3px;
        margin: 0 auto;
        margin-top: 5.6rem;
        position: relative;
        .userInfo{
            padding: 1rem;
            color: #f5f5f5;;
            .avatar{
                width: 5rem;
                height: 5rem;
                border-radius: 100%;
                position: absolute;
                top: -25%;
                left:38%;
                img{
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }
            p{
                margin-bottom: .3rem;
                letter-spacing: 1px;

            }
            p:nth-child(2){
                margin-top: 1.5rem;
                text-align: left;
            }
            p:nth-child(4){
                // margin-top: 2rem;
                text-align: right;
            }
            p:nth-child(5){
                text-align: right;
                font-size: 1.2rem;
                font-weight: bold;
                color: #fff;
            }
        }
    }
    .ranking-table{
        width: 92%;
        height: 3rem;
        margin: 0 auto;
        margin-top: 1rem;
        background-blend-mode: normal;
        border-radius: 3px 3px 0 0;
        overflow: hidden;
        img{
            width: 100%;
            height: 100%;
            background-size: contain;
        }
    }
    .ranking-box{
        width: 92%;
        height: 42%;
        margin: 0 auto;
        background: #fff;
        border-radius: 0 0 3px 3px;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        color: #A9A9A9;
        font-size: .8rem;
        -webkit-box-shadow: 0px 2px 2px 2px rgba(0, 0, 0, .1);
        -moz-box-shadow: 0px 2px 2px 2px rgba(0, 0, 0, .1);
        box-shadow:0px 2px 2px 2px rgba(0, 0, 0, .1);
        .ranking{
            width: 100%;
            border-collapse: collapse;
            .theader{
                height: 2rem;
                line-height: 2rem;
                font-weight: bold;
                font-size: 1rem;
                border-bottom: 1px solid #ddd;
                th{
                    text-align: center;
                }
            }
            .tbody{
                width: 100%;
                height: 2rem;
                line-height: 2rem;
                td{
                    text-align: center;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }
        }
    }
    .tips{
        width: 92%;
        margin: 0 auto;
        text-align: center; 
        margin-top: .6rem;
        color:#C6BCBC;
        font-size: .75rem;
    }
}
</style>
