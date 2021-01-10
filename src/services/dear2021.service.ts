/* eslint-disable */
import { ref, computed } from '@vue/composition-api'
import { LetterInterface, LetterUploadInterface } from './services.types'
import { uid } from 'quasar'
import firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/storage'
import 'firebase/firestore'
import 'firebase/auth'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCX2Xqx2AlM0t0KwNQI2zjq_kNVv1aageg",
  authDomain: "dear2021-291cc.firebaseapp.com",
  projectId: "dear2021-291cc",
  storageBucket: "dear2021-291cc.appspot.com",
  messagingSenderId: "458236896934",
  appId: "1:458236896934:web:5c13e3168e01dc39c9b667",
  measurementId: "G-FGVNM13DY0"
}

const Firebase = firebase.initializeApp(firebaseConfig)
const Storage = Firebase.storage().ref()
const Db = Firebase.firestore()

const letters = ref<LetterInterface[]>([])

const dear2021Service = () => {

  const getLetters = async () => {
    await Firebase.auth().signInAnonymously()
    letters.value = []
    Db.collection('letters').get().then((snapshot) => {
      snapshot.forEach((doc) => {
        letters.value.push(doc.data() as LetterInterface)
      })
    })
  }
  const newLetter = async (letter: LetterUploadInterface) => {
    await Firebase.auth().signInAnonymously()
    let imgSrc = ''
    if (letter.avatarImg) {
      const uploadTask = await Storage.child(`${uid()}-${letter.avatarImg.name}`).put(letter.avatarImg)
      imgSrc = await uploadTask.ref.getDownloadURL()
    }

    await Db.collection('letters').add({
      letter: letter.letter,
      avatarImg: imgSrc,
      avatarBg: letter.avatarBg,
      timestamp: letter.timestamp
    })

    letters.value.push({
      letter: letter.letter,
      avatarImg: imgSrc,
      avatarBg: letter.avatarBg,
      timestamp: letter.timestamp
    })
  }
  return {
    getLetters,
    newLetter,
    letters: computed(() => letters.value)
  }
}

export {
  dear2021Service
}