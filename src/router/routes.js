import HomeView from "../views/HomeView.vue";
import TaskDetailsView from "../views/TaskDetailsView.vue";
import CategoriesView from "../views/CategoriesView.vue";
import SettingsView from "../views/SettingsView.vue";
import LoginView from "../views/LoginView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/task/:id",
    name: "task-details",
    component: TaskDetailsView,
    props: true,
  },
  {
    path: "/categories",
    name: "categories",
    component: CategoriesView,
  },
  {
    path: "/settings",
    name: "settings",
    component: SettingsView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
];

export default routes;
