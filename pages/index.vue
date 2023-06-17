<script setup>
const supabase = useSupabaseClient();

const loading = ref(true);
const username = ref('');
loading.value = true;
const user = useSupabaseUser();

let { data } = await supabase
  .from('profiles')
  .select(`username`)
  .eq('id', user.value.id)
  .single();

if (data) {
  username.value = data.username;
}

loading.value = false;
</script>


<template>
  <div>
    Hey {{ username }}
  </div>
</template>
