<template>
  <div>
    <VPlan
      v-if="Object.keys(details.flight).length === 0"
      left-title-top="Departure Time:"
      :left-subtitle-top="details.start"
      left-title-bottom="Price:"
      :left-subtitle-bottom="details.price"
      :details="details"
    />

    <!-- Departure Card -->
    <VPlan
      v-if="Object.keys(details.flight).length !== 0"
      left-title-top="Departure Time:"
      :left-subtitle-top="details.start"
      left-title-bottom="Price:"
      :left-subtitle-bottom="details.price"
      :details="details"
    >
      <div
        slot="planImagePanel"
        class="h-100 pa2 flex flex-row items-end bg-brand bg-flight-depart"
      >
        <span class="br-100 w3 h3 o-80 flex items-center justify-center bg-white">
          <div
            :style="{'background':'url(https://images.kiwi.com/airlines/32/'+details.flight.route[0].airline+'.png) center'}"
            class="w2 h2 ma3"
          />
        </span>
        <span class="pl2 pb3 w-100 tl mt3 truncate">
          <h6
            class="ma0 f7 white truncate mb1"
            :title="details.flight.route[0].flyFromAirport.name"
          >
            {{ details.flight.route[0].flyFromAirport.name }} ({{ details.flight.route[0].flyFromAirport.iata }})
          </h6>
          <span class="white flex items-center mb3">
            <ExternalLinkIcon class="dib w1 h1 f7 ma0 normal pr1" />
            <span class="dib">
              <a
                href="#"
                target="_blank"
                class="f7 ma0 normal db link dim black pointer underline"
              >
                View Website
              </a>
            </span>
          </span>
          <h6
            class="ma0 f7 white truncate mb1"
            :title="details.flight.route[0].flyFromAirline.name"
          >
            {{ details.flight.route[0].flyFromAirline.name }} ({{ details.flight.route[0].flyFromAirline.id }})
          </h6>
          <span class="white flex items-center mb3">
            <ExternalLinkIcon class="dib w1 h1 f7 ma0 normal pr1" />
            <span class="dib">
              <a
                href="#"
                target="_blank"
                class="f7 ma0 normal db link dim black pointer underline"
              >
                View Website
              </a>
            </span>
          </span>
          <h4 class="ma0 f4 white normal">
            {{ details.flight.route[0].airline }}-{{ details.flight.route[0].flight_no }}
          </h4>
        </span>
      </div>
      <template slot="planDescription">
        {{ details.flight.route[0].flyFrom }};
        {{ details.flight.route[0].latFrom }},
        {{ details.flight.route[0].lngFrom }}
      </template>
    </VPlan>

    <!-- If Connecting Flight Card -->
    <!-- TODO: UPDATE FEATHER ICONS PACKAGE FOR NEW GIT-COMMIT ICON -->
    <VPlan
      v-for="(layover, index) in details.flight.route"
      v-if="Object.keys(details.flight).length !== 0"
      v-show="Object.keys(details.flight.route).length > 1 && index > 0"
      :key="layover.id"
      left-title-top="(Layover) Arrival Time:"
      :left-subtitle-top="layover.aTimePrev | humanUnixTime"
      left-title-bottom="(Layover) Departure Time:"
      :left-subtitle-bottom="layover.dTime | humanUnixTime"
      :layover="layover"
      :details="details"
    >
      <div
        slot="planImagePanel"
        class="flex items-end flex-row justify-start pa2"
      >
        <div class="flex flex-column">
          <span class="br-100 w3 h3 o-80 mb3 flex items-center justify-center bg-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-git-commit brand w2 h2 ma3 rotate-90"
            >
              <circle
                cx="12"
                cy="12"
                r="4"
              /><line
                x1="1.05"
                y1="12"
                x2="7"
                y2="12"
              /><line
                x1="17.01"
                y1="12"
                x2="22.96"
                y2="12"
              />
            </svg>
          </span>
          <span class="br-100 w3 h3 o-80 flex items-center justify-center bg-white">
            <div
              :style="{'background':'url(https://images.kiwi.com/airlines/32/'+layover.airline+'.png) center'}"
              class="w2 h2 ma3"
            />
          </span>
        </div>
        <span class="pl2 pb3 w-100 tl mt3 truncate">
          <h6
            class="ma0 f7 white truncate mb1"
            :title="layover.flyFromAirport.name"
          >
            {{ layover.flyFromAirport.name }} ({{ layover.flyFromAirport.iata }})
          </h6>
          <span class="white flex items-center mb3">
            <ExternalLinkIcon class="dib w1 h1 f7 ma0 normal pr1" />
            <span class="dib">
              <a
                href="#"
                target="_blank"
                class="f7 ma0 normal db link dim black pointer underline"
              >
                View Website
              </a>
            </span>
          </span>
          <h6
            class="ma0 f7 white truncate mb1"
            :title="layover.flyFromAirline.name"
          >
            {{ layover.flyFromAirline.name }} ({{ layover.flyFromAirline.id }})
          </h6>
          <span class="white flex items-center mb3">
            <ExternalLinkIcon class="dib w1 h1 f7 ma0 normal pr1" />
            <span class="dib">
              <a
                href="#"
                target="_blank"
                class="f7 ma0 normal db link dim black pointer underline"
              >
                View Website
              </a>
            </span>
          </span>
          <h4 class="ma0 f4 white normal ">
            {{ layover.airline }}-{{ layover.flight_no }}
          </h4>
        </span>
      </div>
      <template slot="planDescription">
        {{ layover.flyFrom }};
        {{ layover.latFrom }},
        {{ layover.lngFrom }}
      </template>
    </VPlan>

    <!-- Arrival Card-->
    <VPlan
      v-if="Object.keys(details.flight).length !== 0"
      left-title-top="Arrival Time:"
      :left-subtitle-top="details.end"
      :details="details"
    >
      <div
        slot="planImagePanel"
        class="bg-flight-arrive pa2 w-100 h-100-l flex items-end justify-start"
      >
        <span class="br-100 w3 h3 o-80 flex items-center justify-center bg-white">
          <MapPinIcon class="brand w2 h2 ma3" />
        </span>
        <span class="pl2 w-100 tl truncate">
          <h6
            class="ma0 f7 white truncate mb1"
            :title="details.flight.route[Object.keys(details.flight.route).length-1].flyToAirport.name"
          >
            {{ details.flight.route[Object.keys(details.flight.route).length-1].flyToAirport.name }} ({{ details.flight.route[Object.keys(details.flight.route).length-1].flyToAirport.iata }})
          </h6>
          <span class="white flex items-center mb3">
            <ExternalLinkIcon class="dib w1 h1 f7 ma0 normal pr1" />
            <span class="dib">
              <a
                href="#"
                target="_blank"
                class="f7 ma0 normal db link dim black pointer underline"
              >
                View Website
              </a>
            </span>
          </span>
        </span>
      </div>
      <template slot="planDescription">
        {{ details.flight.route[Object.keys(details.flight.route).length-1].flyTo }};
        {{ details.flight.route[Object.keys(details.flight.route).length-1].latTo }},
        {{ details.flight.route[Object.keys(details.flight.route).length-1].lngTo }}
      </template>
    </VPlan>
  </div>
</template>

<script>
import { ExternalLinkIcon, MapPinIcon } from 'vue-feather-icons';
import Main from './main';

export default {
  components: {
    ExternalLinkIcon,
    MapPinIcon,
    'v-plan': Main,
  },
  props: {
    details: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
