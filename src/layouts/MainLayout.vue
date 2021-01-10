<template>
  <q-layout view="hhh lpR fff" class="bg-main">

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'MainLayout',
  setup() {
    return {}
  }
});
</script>
