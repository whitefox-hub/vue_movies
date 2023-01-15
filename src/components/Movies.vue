<template>
    <div class="block-content">
        <div class="table-responsive">
            <div class="table-title">
                <div class="row">
                    <div class="col-sm-6">
                        <h2>List of Movies</h2>
                    </div>
                    <div class="col-sm-6 d-flex flex-row-reverse">
                        <router-link :to="{name:'create_update', params:{movie:'create'}}" class="btn btn-success"><span>Add New Movie</span></router-link>
                    </div>
                </div>
            </div>

            <table class="table table-striped table-vcenter">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th class="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(movie, index) in movies" :key="movie.id">
                        <td>{{ index+1  }}</td>
                        <td>{{ movie.title }}</td>
                        <td>{{ movie.description }}</td>
                        <td>
                            <span v-if="movie.status==1" class="badge bg-secondary">Pending</span>
                            <span v-else-if="movie.status==2" class="badge bg-primary">In Progress</span>
                            <span v-else-if="movie.status==3" class="badge bg-success">Completed</span>
                        </td>
                        <td class="text-center">
                            <div class="btn-group">
                                <router-link :to="{name:'create_update', params:{movie:movie.id}}" class="btn btn-sm btn-warning" style="width: 60px;">
                                    Edit
                                </router-link>
                                <button type="button" class="btn btn-sm btn-danger" style="width: 60px;" @click="delete_movie(movie)">
                                    Delete
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, inject } from 'vue';
import axios from 'axios'

const movies = ref(null);

const swal = inject('$swal');

onMounted(() => {
    getMovies();
});

const getMovies= async () => {
    swal.showLoading();
    await axios.get('https://nodejs-mysql-restapi-production-b742.up.railway.app/api/movies').then(response=>{
        movies.value=response.data;
    }).catch((error)=>{
        swal.fire({icon: 'error', title: 'Oops...',text: 'Something went wrong!'});
    }).finally(()=>{
        setTimeout(function(){ swal.close() }, 2000);
    });
}

const delete_movie = (movie) => {
    swal.fire({
        title: "Confirma la Eliminación",
        html:'<p align="justify">' + 'Esta acción eliminará la película' +' "<b>'+ movie.title +'</b>" '+ 'y no podrá recuperarse' + '</p>',
        showCancelButton: true,
        confirmButtonColor: '#f44336',
        confirmButtonText: 'Si, eliminar',
        cancelButtonText: 'Cancelar',
        showCloseButton: true
    }).then(async(result) => {
        if(result.value) {
            await axios.delete('https://nodejs-mysql-restapi-production-b742.up.railway.app/api/movie/'+movie.id).then(response=>{
                swal.fire({icon: 'success', title: 'Completed'}).then(() => movies.value = movies.value.filter(function( obj ) { return obj.id !== movie.id; }));
            }).catch((error)=>{
                swal.fire({icon: 'error', title: 'Oops...',text: 'Something went wrong!'});
            });
        }
    });
};
</script>
