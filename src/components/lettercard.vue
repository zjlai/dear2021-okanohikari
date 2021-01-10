<template>
  <div>
    <q-img
      :src="imgSrc()"
      :ratio="1"
      @click="dialog=true"
    >
      <div class="absolute-full text-subtitle2 flex flex-center">
        <span class="ellipsis-3-lines">
          {{details.letter}}
        </span>
      </div>
    </q-img>
    <q-dialog
      v-model="dialog"
      persistent
      maximized
      seamless
      class="q-ma-md q-pa-md"
    >
      <q-card class="bg-white text-black q-pa-md" style="max-width:1280px">
        <q-img
        :src="imgSrc()"
        :contain="!imgSrc().startsWith('https://ipsumimage')"
        style="height: 300px"
      >
        <div class="absolute-full flex flex-center" v-if="imgSrc().startsWith('https://ipsumimage')">
          <q-img src="/Okanohikari_Black_Final.png" contain style="width:300px" />
        </div>
      </q-img>
        <q-card-section>
          <div class="text-h6 text-weight-bold text-deep-orange-4">Dear 2021,</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{details.letter}}
        </q-card-section>

        <q-card-actions align="center">
          <q-btn label="Finish" color="secondary" @click="dialog=false" />
        </q-card-actions>

        <q-toolbar class="bg-transparent text-center" style="height:64px">
          <q-toolbar-title>
            <q-btn flat class="text-weight-bold" label="#丘の光" />
          </q-toolbar-title>
        </q-toolbar>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import { LetterInterface } from '../services/services.types'

export default defineComponent({
  name: 'LetterGrid',
  props: {
    details: {
      type: Object as () => LetterInterface,
      required: true
    }
  },
  setup (props) {
    const dialog = ref(false)

    const imgSrc =  () => {
      if (props.details.avatarImg) {
        return props.details.avatarImg
      }
      return `https://ipsumimage.appspot.com/300,${props.details.avatarBg.substring(1)}?l=`
    }
    return {
      dialog,
      imgSrc
    }
  }
})
</script>
<style lang="sass" scoped>
.lettercard
  min-width: 300px
  min-height: 300px
</style>
