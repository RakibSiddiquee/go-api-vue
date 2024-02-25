<template>
    <div class="form-check">
        <input class="form-check-input" :required="required" type="checkbox" :value="value" :name="name" :id="name" :checked="checked">
        <label class="form-check-label" :for="name">
            {{ label }}
        </label>
    </div>
</template>

<script>
export default {
    name: "CheckInput",
    props: ["label", "name", "value", "required", "checked"],
}
</script>