<template>
  <v-container class="max-w-lg mx-auto">
    <h1 class="text-center mb-6">Contact Us</h1>

    <v-form v-model="valid" ref="form">
      <v-text-field
        v-model="formData.name"
        label="Your Name"
        :rules="[rules.required]"
        outlined
        clearable
      />
      <v-text-field
        v-model="formData.email"
        label="Your Email"
        type="email"
        :rules="[rules.required, rules.email]"
        outlined
        clearable
      />
      <v-textarea
        v-model="formData.message"
        label="Message"
        :rules="[rules.required]"
        outlined
        clearable
        auto-grow
      />

      <v-btn class="mt-4" color="primary" :disabled="!valid" @click="submit">
        Send
      </v-btn>
    </v-form>

    <v-snackbar v-model="snackbar" color="green-darken-2">
      Message sent successfully! 🎉
    </v-snackbar>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";

const valid = ref(false);
const form = ref();

const formData = ref({
  name: "",
  email: "",
  message: "",
});

const snackbar = ref(false);

const rules = {
  required: (value: string) => !!value || "Required.",
  email: (value: string) => /.+@.+\..+/.test(value) || "Invalid email.",
};

function submit() {
  if (form.value?.validate()) {
    console.log("Form submitted:", formData.value);
    snackbar.value = true;
    // reset
    formData.value = { name: "", email: "", message: "" };
    form.value?.resetValidation();
  }
}
</script>
