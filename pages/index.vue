<template>
  <div class="card">
    <DataView
      :value="games"
      layout="grid"
    >
      <template #grid="slotProps">
        <div class="grid grid-nogutter">
          <div 
            class="sm:col-12 md:col-6 lg:col-4 xl:col-3 p-2"
            v-for="item in slotProps.items"
            :key="item.id"
          >
            <nuxt-link
              :to="`/game/${item.id}`"
              class="p-4 border-1 surface-border surface-card border-round block h-full"
            >
              <div class="flex flex-column align-items-center gap-3 py-5">
                <div
                  class="w-20rem h-20rem bg-cover bg-center"
                  :style="{ backgroundImage: `url(${item.url})` }"
                />
                <div class="text-2xl text-center text-primary font-bold">{{ item.name }}</div>
              </div>
            </nuxt-link>
          </div>
        </div>
      </template>
    </DataView>
  </div>
</template>

<script setup>
import { collection, getDocs } from 'firebase/firestore'
import { ref as storageRef, getDownloadURL } from 'firebase/storage'
import { useFirebaseStorage, useFirestore } from 'vuefire'

definePageMeta({ middleware: ['auth'] })

const games = ref([])

const storage = useFirebaseStorage()
const db = useFirestore()

const getListGames = async () => {
  const gameCollection = await getDocs(collection(db, 'games'))

  gameCollection.forEach(async game => {
    const data = {
      id: game.id,
      url: null,
      ...game.data()
    }
    try {
      data.url = await getDownloadURL(storageRef(storage, data.image))
    } catch (e) {
      // do nothing
    }

    games.value.push(data)
  })
}

onMounted(() => getListGames())
</script>