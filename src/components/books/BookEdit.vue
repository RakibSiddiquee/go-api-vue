<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <h1 class="mt-3">Add/Edit Book</h1>

                <hr>

                <form-tag @bookEditEvent="submitHandler" name="bookForm" :event="bookEditEvent">
                    <div v-if="book.slug != ''" class="mb-3">
                        <img 
                            :src="`${book.imgPath}/covers/${book.slug}.jpg`" 
                            class="img-fluid img-thumbnail book-cover" 
                            alt="Cover" 
                        />
                    </div>
                    <div class="mb-3">
                        <label for="formFile" class="form-label">Cover Image</label>
                        <input 
                            v-if="book.id === 0"
                            ref="coverInput"
                            class="form-control"
                            type="file"
                            id="formFile"
                            required
                            accept="image/jpeg"
                            @change="loadCoverImage"
                        />
                        <input 
                            v-else
                            ref="coverInput"
                            class="form-control"
                            type="file"
                            id="formFile"
                            accept="image/jpeg"
                            @change="loadCoverImage"
                        />
                    </div>
                    <text-input 
                        v-model="book.title"
                        type="text"
                        required="true"
                        label="Title"
                        :value="book.title"
                        name="title"
                    >
                    </text-input>
                    <select-input 
                        name="author-id" 
                        v-model="book.author_id"
                        :items="authors"
                        required="required"
                        label="Author"
                    >
                    </select-input>
                    <text-input 
                        v-model="book.publication_year"
                        type="text"
                        required="true"
                        label="Publication Year"
                        :value="book.publication_year"
                        name="publication-year"
                    >
                    </text-input>

                    <div class="mb-3">
                        <label for="description" class="form-label">Description</label>
                        <textarea v-model="book.description" id="description" rows="4" class="form-control" required></textarea>
                    </div>
                </form-tag>
            </div>
        </div>
    </div>
</template>

<script>
import FormTag from '@/components/forms/FormTag.vue';
import SelectInput from '@/components/forms/SelectInput.vue';
import TextInput from '@/components/forms/TextInput.vue';
import Security from '@/components/modules/security';

export default {
  components: { FormTag, TextInput, SelectInput },
    beforeMount(){
        Security.requireToken();
    },

    data(){
        return {
            book: {
                id: 0,
                title: "",
                author_id: 0,
                publication_year: 0,
                description: "",
                cover: "",
                slug: "",
                genres: [],
                genre_ids: [],
            },
            authors: [],
            imgPath: process.env.VUE_APP_IMAGE_URL,
            genres: [
                {value: 1, text: "Science Fiction"},
                {value: 2, text: "Fantasy"},
                {value: 3, text: "Romance"},
                {value: 4, text: "Thriller"},
                {value: 5, text: "Mystery"},
                {value: 6, text: "Horror"},
                {value: 7, text: "Classic"},
            ]
        }
    },

    methods: {
        loadCoverImage() {

        },

        submitHandler() {

        },
    }
}
</script>