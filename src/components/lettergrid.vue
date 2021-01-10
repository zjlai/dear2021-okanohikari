<template>
  <div class="row">
    <q-intersection
      class="col-xs-6 col-md-4"
      transition="flip-right"
      once
      v-for="n in numLetters"
      :key="`sm-${n}`"
    >
      <letter-card :details="letters[n-1]" :key="`letters-${n}`" />
    </q-intersection>
    <div class="column full-width">
      <q-btn label="Load More" flat color="black" class="self-center" @click="loadMore" v-if="letters.length !== numLetters" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watchEffect, ref } from '@vue/composition-api'
import { dear2021Service } from '../services/dear2021.service'
import LetterCard from './lettercard.vue'

export default defineComponent({
  name: 'LetterGrid',
  components: { LetterCard },
  setup () {
    const { letters } = dear2021Service()

    let numLetters = ref(6)

    watchEffect(() => {
      if (numLetters.value === 0) {
        numLetters.value = Math.min(6, letters.value.length)
      } else {
        numLetters.value = Math.min(numLetters.value, letters.value.length)
      }
    })

    const loadMore = () => {
      numLetters.value = Math.min(numLetters.value + 6, letters.value.length)
    }


    return {
      numLetters,
      letters,
      loadMore
    }
  }
})
</script>
