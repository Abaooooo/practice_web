import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    component: () => import(/* webpackChunkName: "index" */ "../views"),
    children: [
      {
        path: "/home",
        name: "Home",
        component: () =>
          import(/* webpackChunkName: "home" */ "../components/home"),
      },
      {
        path: "/newpro",
        name: "Newpro",
        component: () =>
          import(/* webpackChunkName: "newpro" */ "../components/newpro"),
      },
      {
        path: "/message",
        name: "Message",
        component: () =>
          import(/* webpackChunkName: "message" */ "../components/message"),
      },
      {
        path: "/about",
        name: "About",
        component: () =>
          import(/* webpackChunkName: "about" */ "../components/about"),
      },
      {
        path: "/connect",
        name: "Connect",
        component: () =>
          import(/* webpackChunkName: "connect" */ "../components/connect"),
      },
      {
        path: "/login",
        name: "Login",
        component: () =>
          import(/* webpackChunkName: "login" */ "../components/login"),
      },
      {
        path: "/regist",
        name: "Regist",
        component: () =>
          import(/* webpackChunkName: "regist" */ "../components/regist"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
