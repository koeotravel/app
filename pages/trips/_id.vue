<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const loading = ref(false)
const trip = ref({})

const fetchTrip = async () => {
  const { data, error } = await supabase
    .from('trips')
    .select(this.$route.params.id)
    .eq('created_by', user.value.id)
  if (error) throw error
  trip.value = data
}

fetchTrip()
</script>


<template>
  <header>
    <h1>{{ trip.name }}</h1>
  </header>
</template>
