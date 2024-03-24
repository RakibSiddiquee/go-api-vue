<template>
    <!-- We must remove all references to this  -->
    <div class="container">
        <div class="row">
            <div class="col">
                <h1 class="mt-3">Book</h1>
            </div>

            <hr>

            <div class="filters text-center">
                <span class="filter me-1" :class="{ active: currentFilter === 0 }" @click="setFilter(0)">ALL</span>
                <span class="filter me-1" :class="{ active: currentFilter === 7 }" @click="setFilter(7)">CLASSIC</span>
                <span class="filter me-1" :class="{ active: currentFilter === 2 }" @click="setFilter(2)">FANTASY</span>
                <span class="filter me-1" :class="{ active: currentFilter === 6 }" @click="setFilter(6)">HORROR</span>
                <span class="filter me-1" :class="{ active: currentFilter === 4 }" @click="setFilter(4)">THRILLER</span>
                <span class="filter me-1" :class="{ active: currentFilter === 1 }" @click="setFilter(1)">SCIENCE FICTION</span>
            </div>

            <hr>

            <div>
                <div class="card-group">
                    <transition-group class="p-3 d-flex flex-wrap" tag="div" appear name="books">

                        <div v-for="book in books" :key="book.id">
                            <div 
                                class="card me-2 ms-1 mb-3"
                                style="width: 10rem;"
                                v-if="book.genre_ids?.includes(currentFilter) || currentFilter === 0">

                                <router-link :to="{name: 'book', params: {slug: book.slug}}">
                                    <img 
                                        :src="`${imgPath}/covers/${book.slug}.jpg`"
                                        class="card-img-top"
                                        :alt="`cover for ${book.title}`" />
                                </router-link>

                                    <div class="card-body text-center">
                                        <h6 class="card-title">
                                            {{ book.title }}
                                        </h6>
                                        <span class="book-author">{{ book.author.author_name }}</span><br>
                                        <small class="text-muted book-genre"
                                            v-for="(g, index) in book.genres" :key="g.id">
                                            <em class="me-1">
                                                {{ g.genre_name }}
                                                <template v-if="index !== book.genres.length-1">,</template>
                                            </em>

                                        </small>
                                        
                                    </div>

                            </div>
                        </div>
                    </transition-group>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {ref, onMounted} from 'vue';

export default {
    name: 'BooksComposition',
    emits: ['error'],
    props: {},

    setup(props, ctx) {
        // set up state for this component
        let ready = ref(false);
        let currentFilter = ref(0);
        const imgPath = ref(process.env.VUE_APP_IMAGE_URL);
        let books = ref({});
        
        // use onMounted lifecycle hook to get books
        onMounted(() => {
            console.log("Using books with composition api")
            fetch(process.env.VUE_APP_API_URL + "/books")
            .then((response) => response.json())
            .then(response => {
                if (response.error) {
                    ctx.emit("error", response.message);
                } else {
                    books.value = response.data.books;
                    ready.value = true;
                }
            })
            .catch(error => {
                ctx.emit("error", error)
            })
        });

        function setFilter(filter) {
            currentFilter.value = filter;
        }

        // Return data and functions
        return {
            ready,
            currentFilter,
            imgPath,
            books,
            setFilter
        }
    },
}
</script>



<style scoped>
.filters {
    height: 2.5em;
}
.filter {
    padding: 6px 6px;
    cursor: pointer;
    border-radius: 6px;
    transition: all 0.35s;
    border: 1px solid silver;
}
.filter.active {
    background: lightgreen;
}
.filter:hover {
    background: lightgray;
}
.book-author, .book-genre {
    font-size: 0.8em;
}

/* Transition styles */
.books-move {
    transition: all 500ms ease-in-out 50ms;
}

.books-enter-active {
    transition: all 500ms ease-in-out;
}

.books-leave-active {
    transition: all 500ms ease-in;
}

.books-enter, .books-leave-to {
    opacity: 0;
}
</style>