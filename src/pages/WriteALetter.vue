<template>
  <q-page class="row justify-evenly bg-mobile">
    <div class="col q-px-md" style="max-width:1280px">
      <h5 class="text-orange text-bold q-my-md">Write A Letter</h5>
      <h4 class="text-black text-bold q-my-xs">Dear 2021,</h4>
      <q-input 
        v-model="letter.letter"
        filled
        type="textarea"
        class="rounded-borders"
        autofocus
        clearable
        :input-style="{ height: '70vh' }"
        rows="10"
      />
      <div class="row justify-between q-my-md">
        <q-btn flat color="pink-4" label="Back" class="q-mr-md" to="/" />
        <q-btn filled color="pink-4" label="Send Letter" class="" @click="validateText" />
      </div>
      <q-toolbar class="bg-transparent text-center" style="height:64px">
        <q-toolbar-title>
          <q-btn flat class="text-weight-bold" label="#丘の光" @click="advent" />
        </q-toolbar-title>
      </q-toolbar>
      <q-dialog v-model="cover" persistent>
        <q-card>
          <q-card-section>
            <q-file filled v-model="letter.avatarImg" class="q-mt-md" label="Or Upload a Photo" v-if = "!letter.avatarBg">
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>
            <div class="q-my-md text-center" v-if="!letter.avatarBg && !letter.avatarImg"> OR </div>
            <q-input
              filled
              v-model="letter.avatarBg"
              class="q-mt-md"
              label="Pick a post colour"
              v-if = "!letter.avatarImg"
            >
              <template v-slot:append>
                <q-icon name="colorize" class="cursor-pointer">
                  <q-popup-proxy transition-show="scale" transition-hide="scale">
                    <q-color v-model="letter.avatarBg" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Back" color="pink-4" @click="clear" />
            <q-btn flat label="Send" color="pink-4" @click="sendLetter" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from '@vue/composition-api'
import { dear2021Service } from '../services/dear2021.service'
import { LetterUploadInterface } from '../services/services.types'

export default defineComponent({
  name: 'MainPage',
  setup (_, ctx) {
    const { newLetter } = dear2021Service()
    const letter = reactive<LetterUploadInterface>({
      letter: '',
      avatarBg: '',
      avatarImg: null,
      timestamp: new Date()
    })

    const cover = ref(false)
    const sendLetter = async () => {
      await newLetter(letter)
      letter.letter =  '',
      letter.avatarBg = '',
      letter.avatarImg = null,
      letter.timestamp = new Date()
      cover.value = false
      await ctx.root.$router.push({ path: '/' })
    }

    const validateText = () => {
      if (letter.letter.trim()) {
        cover.value = true
      }
    }

    const clear = () => {
      letter.avatarBg = ''
      letter.avatarImg = null
      cover.value = false
    }

    const advent = () => {
      location.replace('https://okanohikari.com')
    }
    return {
      letter,
      cover,
      sendLetter,
      validateText,
      clear,
      advent
    }
  }
})
</script>