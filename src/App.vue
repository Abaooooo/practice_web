<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  font-weight: normal;
  box-sizing: border-box;
  outline: none;
}
html,
body {
  width: 100%;
}
a {
  text-decoration: none;
}
li {
  list-style: none;
}
button,
a {
  cursor: pointer;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 1920px;
}
</style>
