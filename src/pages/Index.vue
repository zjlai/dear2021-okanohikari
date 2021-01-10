<template>
  <q-page class="row justify-evenly bg-mobile">
    <div class="col" style="max-width: 900px;">
      <q-toolbar class="bg-transparent text-center">
        <q-toolbar-title>
          <q-btn flat class="text-weight-bold" label="Advent Calendar" @click="advent" />
          <q-btn flat class="text-weight-bold" label="Blessing Sky" @click="blessingsky" />
        </q-toolbar-title>
      </q-toolbar>
      <section class="col landing text-center q-pb-md q-pa-md">
        <q-img src="/Okanohikari_Black_Final.png" width="288px"  class="q-mt-xl mobile-hide self-center" @click="advent" />
        <q-img src="/Okanohikari_Black_Final.png" width="128px"  class="q-mt-md mobile-only self-center" @click="advent" />
        <h2>Dear 2021</h2>
        <p>Dear 2021 is a place where we share what we have learnt in 2020 and our hopes for 2021. It is a meeting place of stories and we invite you to be a part of this experience.
        Your story might encourage another person who is on a similar journey as you.
        </p>
        <div class="column">
         <q-btn label="Send a Letter" filled color="pink-4" class="self-center" to="/writealetter" />
         <q-btn label="Read more about Christmas" filled color="deep-orange-3" text-color="black" class="self-center q-mt-md" @click="story" />
        </div>
        <q-space class="q-my-xl" />
        <div class="q-my-lg">
          <q-btn round color="pink-4" icon="expand_more" @click="seeGrid" />
        </div>
      </section>
      <div class="" ref="lettersEle">
        <h5 class="text-bold text-center"> Letters to 2021</h5>
        <letter-grid />
      </div>
      <div class="column q-my-md">
        <q-btn label="Send a Letter" filled color="pink-4" class="self-center" to="/writealetter" />
      </div>
      <!-- <div class="col q-my-md">
        <h6> Follow us </h6>
        <div class="line-it-button" data-lang="en" data-type="like" data-url="https://social-plugins.line.me/en/how_to_install" data-share="true" data-lineid="@okanohikari.jp" style="display: none;"></div>
      </div> -->
      <q-toolbar class="bg-transparent text-center" style="height:64px">
        <q-toolbar-title>
          <q-btn flat class="text-weight-bold" label="#丘の光" @click="advent" />
        </q-toolbar-title>
      </q-toolbar>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from '@vue/composition-api'
import LetterGrid from '../components/lettergrid.vue'
import { dear2021Service } from '../services/dear2021.service'
import { scroll } from 'quasar'
const { getScrollTarget, setScrollPosition } = scroll

export default defineComponent({
  name: 'MainPage',
  components: { LetterGrid },
  setup () {
    const { getLetters } = dear2021Service()

    onMounted(async() => {
      await getLetters()
    })
    const lettersEle = ref<Element | null>(null)

    const scrollToElement = (el: HTMLElement) => {
      const target = getScrollTarget(el)
      const offset = el.offsetTop
      const duration = 300
      setScrollPosition(target, offset, duration)
    }

    const seeGrid = () => {
      const ele = lettersEle.value as HTMLElement
      scrollToElement(ele)
    }

    const advent = () => {
      location.replace('https://okanohikari.com')
    }

    const story = () => {
      location.replace('https://okanohikari.com/?page_id=924')
    }

    const blessingsky = () => {
      location.replace('https://blessingsky.okanohikari.com')
    }
    return {
      seeGrid,
      lettersEle,
      advent,
      story,
      blessingsky
    }
  }
});
</script>
<style lang="sass">
.bg-mobile
  background-image: url('/Mobile.png')

.landing
  height: calc(100vh)
</style>