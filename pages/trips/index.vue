<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const loading = ref(false)
const name = ref('')
const description = ref('')
const startDate = ref('')
const endDate = ref('')
const cost = ref('')
const trips = ref([])

const fetchTrips = async () => {
  const { data, error } = await supabase
    .from('trips')
    .select('*')
    .eq('created_by', user.value.id)
  if (error) throw error
  trips.value = data
}

fetchTrips()

const createTrip = async () => {
  const payload = {
    created_by: user.value.id,
    name: name.value,
    description: description.value,
    start_date: startDate.value,
    end_date: endDate.value,
    cost: cost.valuefd
  }

  try {
    loading.value = true
    const { data, error } = await supabase
      .from('trips')
      .insert([payload])
    if (error) throw error
    alert(`Success! Your trip has been created: ${data}`)
    fetchTrips()
  } catch (error) {
    alert(error.error_description || error.message)
  } finally {
    loading.value = false
  }
}
</script>


<template>
  <header>
    <h1>Trips</h1>
  </header>

  <form class="form-widget" @submit.prevent="createTrip">
    <div>
      <label for="name">Name</label>
      <UInput type="text" id="name" v-model="name" />
    </div>
    <div>
      <label for="description">Description</label>
      <UTextarea id="description" v-model="description"></UTextarea>
    </div>
    <div>
      <label for="start-date">Start Date</label>
      <UInput id="start-date" type="date" v-model="startDate" />
    </div>
    <div>
      <label for="end-date">End Date</label>
      <UInput id="end-date" type="date" v-model="endDate" />
    </div>
    <div>
      <label for="cost">Cost</label>
      <UInput type="number" id="cost" v-model="cost" />
    </div>

    <UButton type="submit" :disabled="loading">
      {{ loading ? 'Loading...' : 'Create' }}
    </UButton>
  </form>

  <ul>
    <UCard as="li" v-for="trip in trips" :key="trip.id">
      <template #header>
        <h2>{{ trip.name }}</h2>
      </template>

      {{ trip.description }}

      <template #footer>
        <nuxt-link :to="`/trips/${trip.id}`">
          View Details
          <UIcon name=" i-heroicons-arrow-right" />
        </nuxt-link>
      </template>
    </UCard>
  </ul>
</template>
