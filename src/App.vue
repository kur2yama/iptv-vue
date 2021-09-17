<template>
      <router-view></router-view>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
html,body{ width: 100%; height: 100%; overflow: hidden;}
body{margin:0;}
 /* *{
-webkit-touch-callout:none; 
-webkit-user-select:none; 
-khtml-user-select:none; 
-moz-user-select:none; 
-ms-user-select:none; 
user-select:none;
} */
*:not(input,textarea) { 

-webkit-touch-callout: none; 

-webkit-user-select: none; 

}
</style>
