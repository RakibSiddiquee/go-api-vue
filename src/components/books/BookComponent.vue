<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <h1 class="mt-3">Book</h1>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                book: {},
                imgPath: process.env.VUE_APP_IMAGE_URL,
            }
        },
        created() {
            fetch(process.env.VUE_APP_API_URL + "/books" + this.$route.params.slug)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    this.$emit('error', data.message);
                } else {
                    this.book = data.data;
                }
            })
        }
    }
</script>