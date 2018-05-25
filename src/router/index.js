import Vue from 'vue';
import Router from 'vue-router';
import sweepControl from '@/components/sweepControl';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'sweepControl',
      component: sweepControl,
    },
  ],
});
