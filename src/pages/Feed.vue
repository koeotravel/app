<template>
  <main>
    <ul>
      <li>
        <div>
          <h3 v-if="trip.name">
            {{ trip.name }}
          </h3>
        </div>

        <div>
          <RouterLink :to="{ name: 'trip', params: { id: trip.id } }">
            <BaseButton>Edit Trip</BaseButton>
          </RouterLink>

          <BaseButton :on-click="handleArchiveTrip(index, trip.archived)">
            Archive
          </BaseButton>
        </div>
      </li>
    </ul>
  </main>
</template>
