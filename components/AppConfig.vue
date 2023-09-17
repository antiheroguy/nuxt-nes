<template>
  <button
    class="layout-config-button p-link"
    type="button"
    @click="toggleVisible()"
  >
    <i class="pi pi-cog"></i>
  </button>
  <Sidebar
    v-model:visible="visible"
    position="right"
    :transitionOptions="'.3s cubic-bezier(0, 0, 0.2, 1)'"
    class="layout-config-sidebar w-20rem"
  >
    <h3>Size</h3>
    <div class="flex align-items-center">
      <Button
        icon="pi pi-minus"
        type="button"
        @click="resize(-1)"
        class="p-button-text p-button-rounded w-2rem h-2rem mr-2"
        :disabled="size === scales[0]"
      ></Button>
      <div class="flex gap-2 align-items-center">
        <i
          class="pi pi-circle-fill text-300"
          v-for="s in scales"
          :key="s"
          :class="{ 'text-primary-500': s === size }"
        ></i>
      </div>
      <Button
        icon="pi pi-plus"
        type="button"
        pButton
        @click="resize(1)"
        class="p-button-text p-button-rounded w-2rem h-2rem ml-2"
        :disabled="size === scales[scales.length - 1]"
      ></Button>
    </div>
    <Divider />
    <h3>Volume</h3>
    <Slider
      v-model="volume"
      class="w-14rem"
    />
    <Divider />
    <h3>Speed</h3>
    <Slider
      v-model="speed"
      :min="5"
      :max="20"
      class="w-14rem"
    />
    <Divider />
    <h3>Keypad</h3>
    <p>Press keyboard to set</p>
    <table>
      <tr>
        <th class="text-sm">Key</th>
        <th class="text-sm">Pad 1</th>
        <th class="text-sm">Pad 2</th>
      </tr>
      <tr
        v-for="mapKey, key of pad1"
        :key="key"
      >
        <td class="text-sm text-center">{{ key }}</td>
        <td>
          <InputText
            @keypress.prevent="mapPad1($event, key)"
            readonly
            :value="pad1[key]"
            size="small"
            class="w-full keymap"
          />
        </td>
        <td>
          <InputText
            @keypress.prevent="mapPad2($event, key)"
            readonly
            :value="pad2[key]"
            size="small"
            class="w-full keymap"
          />
        </td>
      </tr>
    </table>
  </Sidebar>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useConfigStore } from '@/stores/config'

defineProps({
  simple: {
    type: Boolean,
    default: false
  }
})

const MAX_SCALE = 5
const step = 0.5
const scales = []
for (let i = 1; i <= MAX_SCALE; i += step) {
  scales.push(i)
}

const visible = ref(false)

const configStore = useConfigStore()
const { volume, speed, pad1, pad2, size } = storeToRefs(configStore)

const mapPad1 = ({ code }, key) => {
  pad1.value[key] = code
}

const mapPad2 = ({ code }, key) => {
  pad2.value[key] = code
}

const toggleVisible = () => {
  visible.value = !visible.value
}

const resize = value => {
  const index = scales.findIndex(item => item === size.value)
  const newIndex = index + value
  if (index !== -1 && scales[newIndex]) {
    size.value = scales[newIndex]
  }
}
</script>