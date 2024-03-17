<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <h1 class="mt-3">Add/Edit Book</h1>

                <hr>

                <form-tag @bookEditEvent="submitHandler" name="bookForm" event="bookEditEvent">
                    <div v-if="book.slug !== ''" class="mb-3">
                        <img 
                            :src="`${imgPath}/covers/${book.slug}.jpg`" 
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
                        type="number"
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

                    <div class="mb-3">
                        <label for="genres" class="form-label">Genres</label>
                        <select 
                            ref="genres" 
                            id="genres" 
                            class="form-select"
                            required 
                            size="7" 
                            v-model="book.genre_ids" 
                            multiple>
                            <option 
                                v-for="genre in genres" 
                                :value="genre.value" 
                                :key="genre.value"
                            >
                                {{ genre.text }}
                            </option>
                        </select>
                    </div>

                    <hr>

                    <div class="float-start">
                        <input type="submit" class="btn btn-primary me-2" value="Save">
                        <router-link :to="{name: 'booksAdmin'}" class="btn btn-outline-secondary">Cancel</router-link>
                    </div>
                    <div class="float-end">
                        <a v-if="book.id > 0" class="btn btn-danger" 
                            href="javascript:void(0);" @click="confirmDelete(book.id)">
                            Delete                            
                        </a>
                    </div>
                    <div class="clearfix"></div>
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
import notie from 'notie';

export default {
  components: { FormTag, TextInput, SelectInput },
    beforeMount(){
        Security.requireToken();

        // get book for edit if id > 0
        if (this.$route.params.id > 0) {
            // Edit a book
            fetch(process.env.VUE_APP_API_URL + "/admin/books/" + this.$route.params.id, Security.requestOptions(""))
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    this.$emit('error', data.message)
                } else {
                    this.book = data.data;
                    this.book.publication_year = data.data.publication_year.toString()
                    let genreArray = [];
                    for(let i=0; i < this.book.genres.length; i++) {
                        genreArray.push(this.book.genres[i].id);
                    }
                    this.book.genre_ids = genreArray;
                }
            })
        }

        // get list of authors for dropdown
        fetch(process.env.VUE_APP_API_URL+"/admin/authors/all", Security.requestOptions(""))
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                this.$emit('error', data.message);
            } else {
                this.authors = data.data;
            }
        })
    },

    data(){
        return {
            book: {
                id: 0,
                title: "",
                author_id: 0,
                publication_year: null,
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
            // get a reference to the input using ref
            const file = this.$refs.coverInput.files[0];

            // encode the file using the FileReader API
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result
                    .replace("data:", "")
                    .replace(/^.+,/, "");
                this.book.cover = base64String;
                // alert(base64String)
            }
            reader.readAsDataURL(file);
        },

        submitHandler() {
            const payload = {
                id: this.book.id,
                title: this.book.title,
                author_id: parseInt(this.book.author_id, 10),
                publication_year: parseInt(this.book.publication_year, 10),
                description: this.book.description,
                cover: this.book.cover,
                slug: this.book.slug,
                genre_ids: this.book.genre_ids
            }

            fetch(`${process.env.VUE_APP_API_URL}/admin/books/save`, Security.requestOptions(payload))
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    this.$emit('error', data.message);
                } else {
                    this.$emit('success', 'Changes saved');
                    this.$router.push({name: 'booksAdmin'});
                }
            })
            .catch(error => {
                this.$emit('error', error)
            })
        },

        confirmDelete(id) {
            notie.confirm({
                text: "Are you sure you want to delete this book?",
                submitText: "Delete",
                submitCallback: () => {
                    let payload = {
                        id: id,
                    }

                    fetch (process.env.VUE_APP_API_URL+"/admin/books/delete", Security.requestOptions(payload))
                    .then(response => response.json())
                    .then(data => {
                        if (data.error) {
                            this.$emit('error', data.message);
                        } else {
                            this.$emit('success', "Book deleted");
                            this.$router.push({name: 'booksAdmin'});
                        }
                    })
                }
            })
        }
    }
}
</script>

<style scoped>
.book-cover {
    max-width: 10em;
}
</style>