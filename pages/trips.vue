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
    cost: cost.value
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
      <input type="text" id="name" v-model="name" />
    </div>
    <div>
      <label for="description">Description</label>
      <textarea id="description" v-model="description"></textarea>
    </div>
    <div>
      <label for="start-date">Start Date</label>
      <input id="start-date" type="date" v-model="startDate">
    </div>
    <div>
      <label for="end-date">End Date</label>
      <input id="end-date" type="date" v-model="endDate">
    </div>
    <div>
      <label for="cost">Cost</label>
      <input type="number" id="cost" v-model="cost" />
    </div>

    <button type="submit" :disabled="loading">
      {{ loading ? 'Loading...' : 'Create' }}
    </button>
  </form>

  <ul>
    <li v-for="trip in trips" :key="trip.id">
      {{ trip.name }}
    </li>
  </ul>
</template>
