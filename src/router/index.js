import { createRouter, createWebHistory } from 'vue-router'
import TasksList from '../views/TasksList.vue'
import LoginPage from '../views/LoginPage.vue'
import UsersList from '../views/UsersList.vue'
import UserCard from "@/components/UserCard.vue";
import TaskCard from "@/components/TaskCard";
import EventTask from "@/components/EventTask";
import ModalEvent from "@/components/ModalEvent";



const routes = [
  {
    path: '/tasks',
    name: 'tasks',
    component: TasksList
  },
  {
    path: '/',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/users',
    name: 'users',
    component: UsersList
  },
  {
    path: '/userCard/:id',
    name: 'userCard',
    component: UserCard,
  },
  {
    path: '/taskCard/:id',
    name: 'taskCard',
    component: TaskCard,

  },
  {
    path: '/Modal',
    name: 'ModalEvent',
    component: ModalEvent,

  },
  {
    path: '/eventTask',
    name: 'eventTask',
    component: EventTask,
  },
  {
      path: '/eventTask/:id',
      name: 'editTask',
      component: EventTask,

  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router
