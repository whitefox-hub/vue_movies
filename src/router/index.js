import { createWebHistory, createRouter } from 'vue-router';

/* Components */
const movies = () => import('/src/components/Movies.vue');
const create_update = () => import('/src/components/CreateUpdate.vue');


const routes = [
    {
        path: "",
        component: movies
    },
    {
        name: "movies",
        path: "/movies",
        component: movies
    },
    {
        name: "create_update",
        path: "/movie/:movie",
        component: create_update
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
