<template>
  <main>
    <ul
      v-for="(trip, index) in trips"
      :key="trip.id"
    >
      <li>
        <div>
          <h3 v-if="trip.name">
            {{ trip.name }}
          </h3>
          <VAvatarStack :users="trip.party" />
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
