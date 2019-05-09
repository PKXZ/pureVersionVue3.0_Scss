<template>
  <div>
    我是登录界面
    <button type="button" @click="login">登录</button>
  </div>
</template>

<script>
  export default {
    name: "loginView",
    data(){
        return{

        }
    },
    mounted(){
      const self = this;
      const params = {
        name: '13688071072',
        pwd: '13688071072'
      };
      self.axios({
        method: 'post',
          url: self.api.commonAPi + '/login/access',
          headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        },
        data: params
      })
        .then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
    },
    methods:{
      login(){
        this.$router.push({name:'mainView',path:'/mainView'})
      }
    }
  }
</script>

<style>

</style>
