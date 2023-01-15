<template>
<div class="block block-rounded">
  <div class="block-header block-header-default">
    <h3 class="block-title" v-if="movie_id=='create'">Create New Movie</h3>
    <h3 class="block-title" v-else>Edit Movie</h3>
  </div>
  <div class="block-content">
    <div class="row">
      <div class="col-lg-4">
        <p class="text-muted" v-if="movie_id=='create'">
          Please, complete the required fields.
        </p>
        <p class="text-muted" v-else>
          Movie information can be modified in this view.
        </p>
      </div>
      <div class="col-lg-8 col-xl-5">
        <form class="" @submit.prevent="submitForm">
          <div class="form-floating mb-4">
              <input type="text" class="form-control" v-model.trim="movie.title" placeholder="Title" autofocus required>
              <label class="form-label" for="title">Title</label>
          </div>
          <div class="form-floating mb-4">
              <input type="text" class="form-control" v-model.trim="movie.description" placeholder="Description" required>
              <label class="form-label" for="description">Description</label>
          </div>
          <div class="form-floating mb-4">
            <select class="form-control" v-model="movie.status">
              <option value="1">Pending</option>
              <option value="2">In progress</option>
              <option value="3">Completed</option>
            </select>
            <label class="form-label" for="status">Status</label>
          </div>
          <div class="mb-4 text-center">
              <button type="submit" class="btn btn-lg btn-success" :disabled="movie.processing">
                  <i class="fa fa-plus mr-10"></i>{{movie_id=='create' ? 'Create Movie':'Update Movie'}}
              </button>
          </div>

          <div class="mb-4 text-center">
              <router-link :to="{name:'movies'}" style="padding-left:20px">
                  Go Back to: Movie List
              </router-link>
          </div>
      </form>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue'
import { useRoute, useRouter } from "vue-router";
import axios from 'axios'

const route =useRoute();
const router = useRouter();

const swal = inject('$swal');

const processing= ref(false);
const movie=ref({id:null, title:'', description:'', status:1});
const movie_id = ref(route.params.movie);

const createUpdate = async() => {
  if(movie_id.value=='create'){
    await axios.post('https://nodejs-mysql-restapi-production-b742.up.railway.app/api/movie', movie).then(response=>{
      swal.fire({icon: 'success', title: 'Completed'}).then(() => router.push({ path: '/movies' }));
    }).catch((error)=>{
      swal.fire({icon: 'error', title: 'Oops...',text: 'Something went wrong!'});
    });
  }else{
    await axios.patch('https://nodejs-mysql-restapi-production-b742.up.railway.app/api/movie/'+movie_id.value, movie).then(response=>{
      swal.fire({icon: 'success', title: 'Completed'}).then(() => router.push({ path: '/movies' }));
    }).catch((error)=>{
      swal.fire({icon: 'error', title: 'Oops...',text: 'Something went wrong!'});
    });
  }
};

const submitForm = async() => {
    createUpdate();
};

onMounted(async() => {
  if (movie_id.value != 'create') {
    await axios.get('https://nodejs-mysql-restapi-production-b742.up.railway.app/api/movie/'+movie_id.value).then(response=>{
      movie.value=response.data;
    }).catch((error)=>{
      swal.fire({icon: 'error', title: 'Oops...',text: 'Something went wrong!'});
    });
  }
});
</script>
