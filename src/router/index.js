import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import Register from "../views/Register.vue";
import Profile from "../views/Profile.vue";
import EventDetails from "../views/EventDetails.vue";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: "*",
      redirect: "/login"
    },
    {
      path: "/",
      redirect: "/login"
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/home",
      name: "Home",
      component: Home
    },
    {
      path: "/register",
      name: "Register",
      component: Register
    },
    {
      path: "/profile/:userId",
      name: "Profile",
      component: Profile
    },
    {
      path: "/event/:id",
      name: "EventDetails",
      component: EventDetails
    }
  ]
});
