<template>
  <NesVue
    v-if="url"
    :url="url"
    :turbo="speed"
    :gain="volume"
    :width="width"
    :height="height"
    :p1="pad1"
    :p2="pad2"
    ref="nes"
    @fps="updateFPS"
    @success="markGameAsStarted"
  />
  <div class="flex justify-content-center">
    <Button
      rounded
      outlined
      class="m-4"
      @click="reset()"
      icon="pi pi-replay"
      title="Reset"
      :disabled="!isStarted"
    />
    <Button
      rounded
      outlined
      class="m-4"
      @click="stop()"
      icon="pi pi-stop"
      title="Stop"
      :disabled="!isStarted"
    />
    <Button
      rounded
      outlined
      class="m-4"
      @click="pauseOrResume()"
      :icon="isPaused ? 'pi pi-play' : 'pi pi-pause'"
      :title="isPaused ? 'Resume' : 'Pause'"
      :disabled="!isStarted"
    />
    <Button
      rounded
      outlined
      class="m-4"
      @click="save()"
      icon="pi pi-save"
      title="Save"
      :disabled="!isStarted"
    />
    <Button
      rounded
      outlined
      class="m-4"
      @click="load()"
      icon="pi pi-folder-open"
      title="Load"
      :disabled="!isStarted"
    />
    <Button
      rounded
      outlined
      class="m-4"
      @click="screenshot()"
      icon="pi pi-image"
      title="Screeshot"
      :disabled="!isStarted"
    />
  </div>
  <h1 class="text-center">{{ name }}</h1>
  <h5 class="text-center">{{ fps ? `FPS: ${fps}` : '' }}</h5>
</template>

<script setup>
import { collection, doc, getDoc } from 'firebase/firestore'
import { ref as storageRef, getDownloadURL } from 'firebase/storage'
import { NesVue } from 'nes-vue'
import { storeToRefs } from 'pinia'
import { useFirebaseStorage, useFirestore } from 'vuefire'
import { useConfigStore } from '@/stores/config'

definePageMeta({ middleware: ['auth'] })

const name = ref('')
const url = ref('')
const nes = ref()
const fps = ref(0)
const isStarted = ref(false)
const isPaused = ref(false)

const route = useRoute()
const db = useFirestore()
const storage = useFirebaseStorage()
const configStore = useConfigStore()
const { volume, width, height, speed, pad1, pad2 } = storeToRefs(configStore)

const initNES = async () => {
  try {
    const game = await getDoc(doc(collection(db, 'games'), route.params.id))
    url.value = await getDownloadURL(storageRef(storage, game.data().path))
    name.value = game.data().name
  } catch (e) {
    showError({ statusCode: 400, statusMessage: 'Something went wrong' })
  }
}

const updateFPS = frame => {
  fps.value = parseInt(frame)
}

const markGameAsStarted = () => {
  isStarted.value = true
  isPaused.value = false
}

const reset = () => {
  try {
    nes.value.reset()
    isStarted.value = true
    isPaused.value = false
    fps.value = 0
  } catch (e) {
    // do nothing
  }
}
const stop = () => {
  try {
    nes.value.stop()
    isStarted.value = false
    isPaused.value = false
    fps.value = 0
  } catch (e) {
    // do nothing
  }
}
const pauseOrResume = () => {
  try {
    isPaused.value
      ? nes.value.play()
      : nes.value.pause()
    isPaused.value = !isPaused.value
  } catch (e) {
    // do nothing
  }
}

const save = () => {
  try {
    nes.value.save(name.value)
  } catch (e) {
    // do nothing
  }
}

const load = () => {
  try {
    nes.value.load(name.value)
  } catch (e) {
    // do nothing
  }
}

const screenshot = () => {
  try {
    nes.value.screenshot(true)
  } catch (e) {
    // do nothing
  }
}

onMounted(() => {
  window.addEventListener('keydown', function(e) {
    if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].indexOf(e.code) !== -1) {
      e.preventDefault()
      if (document.activeElement.classList.contains('keymap')) {
        document.activeElement.dispatchEvent(new KeyboardEvent('keypress', { code: e.code }))
      }
    }
  })
  initNES()
})
</script>