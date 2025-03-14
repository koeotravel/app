<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const avatar_path = ref('');

const items = [
  [{
    label: 'Profile',
    to: '/profile',
    icon: 'i-heroicons-user',
  },
  {
    label: 'Trips',
    to: '/trips',
    icon: 'i-heroicons-rectangle-stack',
  }],
  [{
    label: 'Logout',
    icon: 'i-heroicons-arrow-left-on-rectangle',
    click: () => signOut
  }]
]


async function signOut() {
  try {
    loading.value = true;
    let { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <nav class="p-4 flex items-center justify-between">
    <div class="w-12">
      <img src="https://www.koeo.co/logo.4e5cc87a.png" alt="">
    </div>
    <ul>
      <UDropdown :items="items">
        <UAvatar :src="src" alt="avatar image" />
      </UDropdown>
    </ul>
  </nav>
</template>

<style scoped>
li {
  list-style: none;
  display: inline-block;
  margin: 0 2rem;
}
</style>
