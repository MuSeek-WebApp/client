import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import Register from "../views/Register.vue";
import Profile from "../views/Profile.vue";
import EventDetails from "../views/EventDetails.vue";
import EditEvent from "../views/EditEvent.vue";
import Landing from "../views/Landing.vue";

Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  routes: [
    {
      path: "*",
      redirect: "/"
    },
    {
      path: "/",
      name: "Landing",
      component: Landing
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
    },
    {
      path: "/event/edit/:id",
      name: "EditEvent",
      component: EditEvent
    }
  ]
});
