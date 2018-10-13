<template>
  <input
    type="date"
    @input="$emit('input', $event.target.value)"
  />
</template>
