import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.css';
import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from './components/page/LoginPage.vue';
import HelloWorld from './components/HelloWorld.vue'


const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', component: LoginPage },
      { path: '/HelloWorld', component: HelloWorld },
    ],
  });
    
createApp(App).use(router).mount('#app')
