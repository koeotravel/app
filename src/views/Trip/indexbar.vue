<!--<template>-->
  <!--<div>-->
    <!--<main class="mw8 w-100 center tc pt4 ph3-l ph2">-->
      <!--<v-header />-->
      <!--&lt;!&ndash; ADD TO ITINERARY &ndash;&gt;-->
      <!--<section class="mt5 pv2 ph4-l ph3-m w-100">-->
        <!--<form @submit.prevent="handleAddPlan">-->
          <!--<header class="w-100 bb bw1 b&#45;&#45;shadow-brand tl flex items-center mb3 pb2">-->
            <!--<h3 class="f4 normal tl ma0">Add Plan to Itinerary</h3>-->
            <!--<span class="flex-auto"></span>-->
            <!--<span class="flex ml2 btn-group">-->
              <!--<input type="radio" id="transportation" value="transportation" v-model="newPlan.type" />-->
              <!--<label class="f6-l w4-l tc ba b&#45;&#45;solid b&#45;&#45;brand bw1 pointer pv2 ph3-ns ph2 br&#45;&#45;left br2 brand bg-white flex items-center justify-center" for="transportation">-->
                <!--<navigation-icon class="w1-l h1-l mr1-l"></navigation-icon>-->
                <!--<span class="dn flex-l">Transportation</span>-->
              <!--</label>-->
              <!--<input type="radio" id="lodging" value="lodging" v-model="newPlan.type" />-->
              <!--<label class="f6-l w4-l tc bt bb b&#45;&#45;brand bw1 pointer pv2 ph3-ns ph2 brand bg-white flex items-center justify-center" for="lodging">-->
                <!--<home-icon class="w1-l h1-l mr1-l"></home-icon>-->
                 <!--<span class="dn flex-l">Lodging</span>-->
              <!--</label>-->
              <!--<input type="radio" id="event" value="event" v-model="newPlan.type" />-->
              <!--<label class="f6-l w4-l tc ba b&#45;&#45;solid b&#45;&#45;brand bw1 pointer pv2 ph3-ns ph2 br&#45;&#45;right br2 brand bg-white flex items-center justify-center" for="event">-->
                <!--<sun-icon class="w1-l h1-l mr1-l"></sun-icon>-->
                <!--<span class="dn flex-l">Event</span>-->
              <!--</label>-->
            <!--</span>-->
          <!--</header>-->
        <!--</form>-->

          <!--&lt;!&ndash; START EVENT FOURSQUARE SEARCH &ndash;&gt;-->
        <!--<div class="flex flex-column bb b&#45;&#45;shadow-brand mb3" v-show="newPlan.type === 'event'">-->
          <!--<fourSquare></fourSquare>-->
        <!--</div>-->
        <!--&lt;!&ndash; END EVENT FOURSQUARE SEARCH &ndash;&gt;-->

        <!--&lt;!&ndash; START TRANSPORTATION SKYPICKER SEARCH &ndash;&gt;-->
        <!--<div class="flex flex-column bb b&#45;&#45;shadow-brand mb3" v-show="newPlan.type === 'transportation'">-->
          <!--<section class="flex flex-column flex-row-ns w-100">-->
            <!--<span class="br3 mb3 flex-auto ba b&#45;&#45;shadow-brand b&#45;&#45;solid w-100 flex flex-row mr3-ns">-->
              <!--<input-->
                <!--type="search"-->
                <!--class="bn pa3 bg-transparent input-reset w-100"-->
                <!--:placeholder='autoComplete.depart'-->
                <!--@blur="handleAutocomplete('departReset', autoComplete.depart)"-->
                <!--v-model="newPlan.searchDepart"-->
                <!--@click="handleAutocomplete('depart', newPlan.searchDepart)"-->
                <!--@change="displayAirportMatches('depart', newPlan.searchDepart); handleListMatches('departAirports', newPlan.searchDepart)"-->
                <!--@keyup="displayAirportMatches('depart', newPlan.searchDepart); handleListMatches('departAirports', newPlan.searchDepart)"-->
                <!--list="departAirports"-->
              <!--&gt;-->
              <!--<datalist id="departAirports">-->
                <!--<option-->
                  <!--:data-value="departAirport.airportId"-->
                  <!--:value="departAirport.airportCombo"-->
                  <!--v-for="departAirport in planDepartAirport"-->
                  <!--:key="departAirport.airportId"-->
                <!--/>-->
              <!--</datalist>-->
              <!--<button class="button-reset bg-transparent bn flex items-center justify-center ph3 pointer" v-if="autoComplete.depart === newPlan.searchDepart" @click="handleClearInput('depart'); handleListMatches('departAirport', newPlan.searchAirline)">-->
                <!--<x-icon class="h1 w1"></x-icon>-->
              <!--</button>-->
            <!--</span>-->
            <!--<span class="br3 mb3 flex-auto ba b&#45;&#45;shadow-brand b&#45;&#45;solid w-100 flex flex-row">-->
              <!--<input-->
                <!--type="search"-->
                <!--class="bn pa3 bg-transparent input-reset w-100"-->
                <!--:placeholder='autoComplete.arrive'-->
                <!--@blur="handleAutocomplete('arriveReset', autoComplete.arrive)"-->
                <!--v-model="newPlan.searchArrive"-->
                <!--@click="handleAutocomplete('arrive', newPlan.searchArrive)"-->
                <!--@change="displayAirportMatches('arrive', newPlan.searchArrive); handleListMatches('arriveAirports', newPlan.searchArrive)"-->
                <!--@keyup="displayAirportMatches('arrive', newPlan.searchArrive); handleListMatches('arriveAirports', newPlan.searchArrive)"-->
                <!--list="arriveAirports"-->
              <!--&gt;-->
              <!--<datalist id="arriveAirports">-->
                <!--<option :data-value="arriveAirport.airportId" :key="arriveAirport.airportId" :value="arriveAirport.airportCombo" v-for="arriveAirport in planArriveAirport" />-->
              <!--</datalist>-->
              <!--<button class="button-reset bg-transparent bn flex items-center justify-center ph3 pointer" v-if="autoComplete.arrive === newPlan.searchArrive" @click="handleClearInput('arrive'); handleListMatches('arriveAirports', newPlan.searchAirline)">-->
                <!--<x-icon class="h1 w1"></x-icon>-->
              <!--</button>-->
            <!--</span>-->
          <!--</section>-->
          <!--<section class="flex flex-column flex-row-ns w-100" v-if="planFlightSearch.depart && planFlightSearch.arrive">-->
            <!--<span class="br3 mb3 flex-auto ba b&#45;&#45;shadow-brand b&#45;&#45;solid w-100 flex flex-row mr3-ns">-->
              <!--<input-->
                <!--type="search"-->
                <!--class="bn pa3 bg-transparent input-reset w-100"-->
                <!--:placeholder='autoComplete.airline'-->
                <!--@blur="handleAutocomplete('airlineReset', autoComplete.airline)"-->
                <!--v-model="newPlan.searchAirline"-->
                <!--@click="handleAutocomplete('airline', newPlan.searchAirline)"-->
                <!--@change="displayAirlineMatches(newPlan.searchAirline); handleListMatches('airlines', newPlan.searchAirline)"-->
                <!--@keyup="displayAirlineMatches(newPlan.searchAirline); handleListMatches('airlines', newPlan.searchAirline)"-->
                <!--list="airlines"-->
              <!--&gt;-->
              <!--<datalist id="airlines">-->
                <!--<option-->
                  <!--v-for="airline in planAirline"-->
                  <!--:key="airline.airlineId"-->
                  <!--:data-value="airline.airlineId"-->
                  <!--:value="airline.airlineCombo"-->
                <!--/>-->
              <!--</datalist>-->
              <!--<button class="button-reset bg-transparent bn flex items-center justify-center ph3 pointer" v-if="autoComplete.airline === newPlan.searchAirline" @click="handleClearInput('airline'); handleListMatches('airlines', newPlan.searchAirline)">-->
                <!--<x-icon class="h1 w1"></x-icon>-->
              <!--</button>-->
            <!--</span>-->
            <!--<span class="br3 mb3 flex-auto ba b&#45;&#45;shadow-brand b&#45;&#45;solid w-100 flex flex-row">-->
              <!--<input-->
                <!--type="text"-->
                <!--class="bn pa3 bg-transparent input-reset w-100"-->
                <!--v-model="newPlan.searchTime"-->
                <!--placeholder="👀  Only show times after..."-->
                <!--onfocus="this.type='time'"-->
                <!--onblur="if(this.value===''){this.type='text'}"-->
                <!--@blur="handleListMatches"-->
              <!--&gt;-->
            <!--</span>-->
          <!--</section>-->
          <!--<div class='flex flex-auto w-100 items-center pb3 pt0' v-if="planFlightSearch.depart && planFlightSearch.arrive">-->
            <!--<span class="w4-ns w-100 tl pr3-ns">-->
              <!--<h5 class="pl3 f6 f5-ns ma0 nowrap black-50">-->
                <!--Search Results:-->
              <!--</h5>-->
            <!--</span>-->
            <!--<h5 class="f7 f6-ns ma0" v-if="planFlights[planFlights.length-1].data.length === 0">-->
              <!--💩 No flights found.-->
            <!--</h5>-->
            <!--<span class="flex-auto flex flex-row pl3">-->
              <!--<div class="nowrap overflow-x-auto">-->
                <!--<button-->
                  <!--type="button"-->
                  <!--class="dib mr2 br2 ba b&#45;&#45;solid bw1 pointer pa2 b&#45;&#45;brand tl v-mid"-->
                  <!--v-if="checkFlight(flight)"-->
                  <!--v-for="flight in planFlights[planFlights.length-1].data"-->
                  <!--:key="flight.id"-->
                  <!--@click="handlePlanFlight(flight)"-->
                <!--&gt;-->
                  <!--<span class="flex items-center">-->
                    <!--<div class="w2 h2 cover mr2" :style="{'background':'url(https://images.kiwi.com/airlines/128/'+route.airline+'.png) center'}" v-for="route in flight.route" :key="route.airline"></div>-->
                    <!--<span>-->
                      <!--<h5 class="f6 normal brand ma0"><template v-for="(route, index) in flight.route"><template v-if='indexbar !== 0'> → </template>{{ route.airline }}-{{ route.flight_no }}</template></h5>-->
                      <!--<h6 class="f7 bold black-50 ma0">{{ flight.dTime | humanUnixTime }} &ndash; <template v-if="flight.route.length > 1"><template v-if="indexbar !== 0" v-for="(route, index) in flight.route">{{ route.flyFrom }} &ndash; </template></template>{{ flight.aTime | humanUnixTime }}</h6>-->
                    <!--</span>-->
                  <!--</span>-->
                <!--</button>-->
              <!--</div>-->
            <!--</span>-->
          <!--</div>-->
        <!--</div>-->
        <!--&lt;!&ndash; START TRANSPORTATION SKYPICKER SEARCH &ndash;&gt;-->

        <!--<form @submit.prevent="handleAddPlan">-->
          <!--<div class="flex flex-column flex-row-l">-->
            <!--<aside class="w-25-l w-100 pr3 flex flex-row-m flex-column items-center-m pb3-m">-->
              <!--<div class="flex flex-column w-100 w-50-m mr3">-->
                <!--&lt;!&ndash; START DATE &ndash;&gt;-->
                <!--<select class="pa3 br3 mb3 mb0-m mv3-l mr3 input-reset ba w-100" v-model="newPlan.date" @change="startDateChange(); handleListMatches()">-->
                  <!--<option :value='day.date' v-for="day in days" :key="day.id">{{ day.date | humanTripDate }}</option>-->
                <!--</select>-->
                <!--&lt;!&ndash; SEARCH RESULT TOGGLE &ndash;&gt;-->
                <!--<button type="button" class='br2 f6 bw1 b&#45;&#45;brand bg-white brand pointer pa3 mt3-m mb3 mb0-m w-100' v-if="venue.name && newPlan.type === 'event'" @click="handleToggleVenue"><span class="flex items-center"><span class="f5 truncate w-100 tl">{{ venue.name }}</span><x-icon class="ml2 h1 w1"></x-icon></span></button>-->
                <!--<button type="button" class='br2 f6 bw1 b&#45;&#45;brand bg-white brand pointer pa3 mt3-m mb3 mb0-m w-100' v-if="newPlan.transportationFlight.route && newPlan.type === 'transportation'" @click="handleToggleFlight"><span class="flex items-center"><span class="f5 truncate w-100 tl"><template v-for="(route, index) in newPlan.transportationFlight.route"><template v-if="indexbar !== '0'"> → </template>{{ route.airline }}-{{ route.flight_no }}</template></span><x-icon class="ml2 h1 w1"></x-icon></span></button>-->
                <!--&lt;!&ndash; END DATE &ndash;&gt;-->
                <!--<select class="pa3 br3 mb3 mt3-m mb0-m input-reset ba w-100" v-model="newPlan.end_date" v-show="newPlan.type === 'lodging'">-->
                  <!--<option :value='day.date' v-show="day.date >= newPlan.date" v-for="day in days" :key="day.id">{{ day.date | humanTripDate }}</option>-->
                <!--</select>-->
              <!--</div>-->
              <!--&lt;!&ndash; IMAGE &ndash;&gt;-->
              <!--<div-->
                <!--class="card-brand overflow-hidden mb3 mb0-ns w-100 w-50-m h5-l h4"-->
                <!--:class="{-->
                  <!--'flex items-center justify-center flex-row flex-column-l': !newPlan.img || newPlan.type == 'transportation' || newPlan.type == 'lodging',-->
                <!--}">-->
                <!--<div v-if="!newPlan.img && newPlan.type === 'event'" class="relative w3 h3 w4-l h4-l m3 bw1 b&#45;&#45;dashed top-empty-img o-50 flex items-center justify-center flex-row flex-column-l b&#45;&#45;brand btop&#45;&#45;event">-->
                  <!--<span class="w-100 h-100 br2 o-80 flex items-center justify-center bottom-empty-img bbottom&#45;&#45;event">-->
                    <!--<sun-icon v-show="newPlan.type === 'event'" class="brand w2 h2 w3-l h3-l"></sun-icon>-->
                  <!--</span>-->
                <!--</div>-->
                <!--<div-->
                  <!--v-if="newPlan.type !== 'event'"-->
                  <!--class="relative w3 h3 w4-l h4-l m3 bw1 b&#45;&#45;dashed top-empty-img o-50 flex items-center justify-center flex-row flex-column-l"-->
                  <!--:class="{-->
                    <!--'b&#45;&#45;light-blue btop&#45;&#45;transportation': newPlan.type === 'transportation',-->
                    <!--'b&#45;&#45;yellow btop&#45;&#45;lodging': newPlan.type === 'lodging',-->
                  <!--}">-->
                  <!--<span-->
                    <!--class="w-100 h-100 br2 o-80 flex items-center justify-center bottom-empty-img"-->
                    <!--:class="{-->
                      <!--'bbottom&#45;&#45;transportation': newPlan.type === 'transportation',-->
                      <!--'bbottom&#45;&#45;lodging': newPlan.type === 'lodging',-->
                    <!--}">-->
                    <!--<navigation-icon v-show="newPlan.type === 'transportation'" class="light-blue w2 h2 w3-l h3-l"></navigation-icon>-->
                    <!--<home-icon v-show="newPlan.type === 'lodging'" class="yellow w2 h2 w3-l h3-l"></home-icon>-->
                  <!--</span>-->
                <!--</div>-->
                <!--<div v-if="newPlan.img && newPlan.type === 'event'" :style="{'background':'url('+newPlan.img+') center'}" class="h5-l h4 cover flex flex-column">-->
                  <!--<div class="flex flex-row justify-end" v-if="newPlan.url">-->
                    <!--<span class="bg-black-50 pv1 ph2 white br2 h-100 flex items-center">-->
                      <!--<external-link-icon class="dib w1 h1 f7 ma0 normal pr1"></external-link-icon>-->
                      <!--<span class="dib">-->
                        <!--<a :href="newPlan.url" target="_blank" class="f7 ma0 normal db link dim brand pointer">View Website</a>-->
                      <!--</span>-->
                    <!--</span>-->
                  <!--</div>-->
                  <!--<div class="flex flex-auto pa2 justify-start items-end">-->
                    <!--<button type="button" class="br2 f6 ba b&#45;&#45;solid bw1 pointer pa2 brand b&#45;&#45;brand o-80 mr2" @click="handleToggleVenueImg('left')">-->
                      <!--<chevron-left-icon></chevron-left-icon>-->
                    <!--</button>-->
                    <!--<button type="button" class="br2 f6 ba b&#45;&#45;solid bw1 pointer pa2 brand b&#45;&#45;brand o-80" @click="handleToggleVenueImg('right')">-->
                      <!--<chevron-right-icon></chevron-right-icon>-->
                    <!--</button>-->
                  <!--</div>-->
                <!--</div>-->
              <!--</div>-->
            <!--</aside>-->
            <!--<section class="card-brand pa3-ns pa2 w-100 w-75-l">-->
              <!--&lt;!&ndash; PLAN NAME &ndash;&gt;-->
              <!--<div class="flex flex-auto w-100 pb3 flex-row-ns flex-column">-->
                <!--<label class="f6 f5-ns pa3-ns pb1 br3 br&#45;&#45;left-ns w4-ns w-100 bl-ns bt-ns bb-ns b&#45;&#45;light-gray tl">-->
                  <!--{{newPlan.type}}-->
                <!--</label>-->
                <!--<v-input v-model="newPlan.transportationName" v-show="newPlan.type === 'transportation'" placeholder="🛃  Add the transportation name here..." class="pa3 br3 ba flex-auto flex flex-row b&#45;&#45;light-gray br&#45;&#45;right-ns">Transportation</v-input>-->
                <!--<v-input v-model="newPlan.lodgingName" v-show="newPlan.type === 'lodging'" placeholder="🏨  Add the lodging name here..." class="pa3 br3 ba flex-auto flex flex-row b&#45;&#45;light-gray br&#45;&#45;right-ns">Lodging Name</v-input>-->
                <!--<v-input v-model="newPlan.eventName" v-show="newPlan.type === 'event'" placeholder="🎭  Add the event name here..." class="pa3 br3 ba flex-auto flex flex-row b&#45;&#45;light-gray br&#45;&#45;right-ns">Event Name</v-input>-->
              <!--</div>-->
              <!--&lt;!&ndash; PLAN LOCATION &ndash;&gt;-->
              <!--<div class="flex flex-auto w-100 pb3 flex-row-ns flex-column">-->
                <!--<label class="f6 f5-ns pa3-ns pb1 br3 br&#45;&#45;left-ns w4-ns w-100 bl-ns bt-ns bb-ns b&#45;&#45;light-gray tl">-->
                  <!--Plan-->
                <!--</label>-->
                <!--<v-input v-model="newPlan.transportationLocation" v-show="newPlan.type === 'transportation'" :disabled="disableInput.transportationLocation" placeholder="📍  Add the address here..." class="pa3 br3 ba flex-auto flex flex-row b&#45;&#45;light-gray br&#45;&#45;right-ns">Address</v-input>-->
                <!--<v-input v-model="newPlan.lodgingLocation" v-show="newPlan.type === 'lodging'" placeholder="📍  Add the address here..." class="pa3 br3 ba flex-auto flex flex-row b&#45;&#45;light-gray br&#45;&#45;right-ns">Address</v-input>-->
                <!--<v-input v-model="newPlan.eventLocation" v-show="newPlan.type === 'event'" :disabled="disableInput.eventLocation" placeholder="📍  Add the address here..." class="pa3 br3 ba flex-auto flex flex-row b&#45;&#45;light-gray br&#45;&#45;right-ns">Address</v-input>-->
              <!--</div>-->
              <!--&lt;!&ndash; PLAN TIMES &ndash;&gt;-->
              <!--<div class='flex flex-auto w-100 pb3 flex-row-ns flex-column'>-->
                <!--<label class="f6 f5-ns pa3-ns pb1 br3 br&#45;&#45;left-ns w4-ns w-100 bl-ns bt-ns bb-ns b&#45;&#45;light-gray tl">-->
                  <!--Times-->
                <!--</label>-->
                <!--<span class="pa3 br3 ba flex-auto flex flex-row b&#45;&#45;light-gray br&#45;&#45;right-ns">-->
                  <!--&lt;!&ndash; TRANSPORTATION START &ndash;&gt;-->
                  <!--<input-->
                    <!--type="text"-->
                    <!--class="input-reset bg-transparent bn h1 w-100"-->
                    <!--v-model="newPlan.transportationStartTime"-->
                    <!--v-if="newPlan.type === 'transportation'"-->
                    <!--placeholder="🕓  Check-in time..."-->
                    <!--onfocus="this.type='time'"-->
                    <!--onblur="if(this.value===''){this.type='text'}"-->
                    <!--:disabled="disableInput.transportationStartTime"-->
                  <!--&gt;-->
                  <!--&lt;!&ndash; LODGING START &ndash;&gt;-->
                  <!--<input-->
                    <!--type="text"-->
                    <!--class="input-reset bg-transparent bn h1 w-100"-->
                    <!--v-model="newPlan.lodgingStartTime"-->
                    <!--v-if="newPlan.type === 'lodging'"-->
                    <!--placeholder="🕓  Check-in time..."-->
                    <!--onfocus="this.type='time'"-->
                    <!--onblur="if(this.value===''){this.type='text'}"-->
                  <!--&gt;-->
                  <!--&lt;!&ndash; EVENT START &ndash;&gt;-->
                  <!--<input-->
                    <!--type="text"-->
                    <!--class="input-reset bg-transparent bn h1 w-100"-->
                    <!--v-model="newPlan.eventTime"-->
                    <!--v-if="newPlan.type === 'event'"-->
                    <!--placeholder="🕓  Check-in time..."-->
                    <!--onfocus="this.type='time'"-->
                    <!--onblur="if(this.value===''){this.type='text'}"-->
                  <!--&gt;-->
                  <!--&lt;!&ndash; TRANSPORTATION END &ndash;&gt;-->
                  <!--<input-->
                    <!--type="text"-->
                    <!--class="input-reset bg-transparent bn h1 w-100"-->
                    <!--v-model="newPlan.transportationEndTime"-->
                    <!--v-if="newPlan.type === 'transportation'"-->
                    <!--placeholder="Check-out time..."-->
                    <!--onfocus="(this.type='time')"-->
                    <!--onblur="if(this.value===''){this.type='text'}"-->
                    <!--:min="minTime"-->
                    <!--:disabled="disableInput.transportationEndTime"-->
                  <!--&gt;-->
                  <!--&lt;!&ndash; LODGING END &ndash;&gt;-->
                  <!--<input-->
                    <!--type="text"-->
                    <!--class="input-reset bg-transparent bn h1 w-100"-->
                    <!--v-model="newPlan.lodgingEndTime"-->
                    <!--v-if="newPlan.type === 'lodging'"-->
                    <!--placeholder="Check-out time..."-->
                    <!--onfocus="(this.type='time')"-->
                    <!--onblur="if(this.value===''){this.type='text'}"-->
                    <!--:min="minTime"-->
                  <!--&gt;-->
                <!--</span>-->
              <!--</div>-->
              <!--&lt;!&ndash; PLAN PRICE &ndash;&gt;-->
              <!--<div class="flex flex-auto w-100 pb3 flex-row-ns flex-column">-->
                <!--<label class="f6 f5-ns pa3-ns pb1 br3 br&#45;&#45;left-ns w4-ns w-100 bl-ns bt-ns bb-ns b&#45;&#45;light-gray tl">-->
                  <!--Price-->
                <!--</label>-->
                <!--<v-input v-model="newPlan.transportationPrice" v-show="newPlan.type === 'transportation'" placeholder="🤑  Add the price here..." class="pa3 br3 ba flex-auto flex flex-row b&#45;&#45;light-gray br&#45;&#45;right-ns">Price</v-input>-->
                <!--<v-input v-model="newPlan.lodgingPrice" v-show="newPlan.type === 'lodging'" placeholder="🤑  Add the price here..." class="pa3 br3 ba flex-auto flex flex-row b&#45;&#45;light-gray br&#45;&#45;right-ns">Price</v-input>-->
                <!--<v-input v-model="newPlan.eventPrice" v-show="newPlan.type === 'event'" placeholder="🤑  Add the price here..." class="pa3 br3 ba flex-auto flex flex-row b&#45;&#45;light-gray br&#45;&#45;right-ns">Price</v-input>-->
              <!--</div>-->
              <!--&lt;!&ndash; PLAN NOTES &ndash;&gt;-->
              <!--<div class='flex flex-auto w-100 pb3 flex-row-ns flex-column'>-->
                <!--<label class="f6 f5-ns pa3-ns pb1 br3 br&#45;&#45;left-ns w4-ns w-100 bl-ns bt-ns bb-ns b&#45;&#45;light-gray tl flex items-center">-->
                  <!--Notes-->
                <!--</label>-->
                <!--<span class="br3 ba flex-auto flex flex-row b&#45;&#45;light-gray br&#45;&#45;right-ns items-center">-->
                  <!--&lt;!&ndash; TRANSPORTATION &ndash;&gt;-->
                  <!--<input-->
                    <!--v-if="textArea === false && newPlan.type === 'transportation'"-->
                    <!--type="text"-->
                    <!--class="input-reset bg-transparent bn w-100 pa3"-->
                    <!--v-model="newPlan.transportationDescription"-->
                    <!--placeholder="📝  Add any other notes here..."-->
                  <!--&gt;-->
                  <!--<textarea-->
                    <!--v-if="textArea === true && newPlan.type === 'transportation'"-->
                    <!--rows="5"-->
                    <!--style="resize: vertical"-->
                    <!--class="input-reset bg-transparent bn w-100 pa3"-->
                    <!--v-model="newPlan.transportationDescription"-->
                    <!--placeholder="📝  Add any other notes here..."-->
                  <!--&gt;</textarea>-->
                  <!--&lt;!&ndash; LODGING &ndash;&gt;-->
                  <!--<input-->
                    <!--v-if="textArea === false && newPlan.type === 'lodging'"-->
                    <!--type="text"-->
                    <!--class="input-reset bg-transparent bn w-100 pa3"-->
                    <!--v-model="newPlan.lodgingDescription"-->
                    <!--placeholder="📝  Add any other notes here..."-->
                  <!--&gt;-->
                  <!--<textarea-->
                    <!--v-if="textArea === true && newPlan.type === 'lodging'"-->
                    <!--rows="5"-->
                    <!--style="resize: vertical"-->
                    <!--class="input-reset bg-transparent bn w-100 pa3"-->
                    <!--v-model="newPlan.lodgingDescription"-->
                    <!--placeholder="📝  Add any other notes here..."-->
                  <!--&gt;</textarea>-->
                  <!--&lt;!&ndash; EVENT &ndash;&gt;-->
                  <!--<input-->
                    <!--v-if="textArea === false && newPlan.type === 'event'"-->
                    <!--type="text"-->
                    <!--class="input-reset bg-transparent bn w-100 pa3"-->
                    <!--v-model="newPlan.eventDescription"-->
                    <!--placeholder="📝  Add any other notes here..."-->
                  <!--&gt;-->
                  <!--<textarea-->
                    <!--v-if="textArea === true && newPlan.type === 'event'"-->
                    <!--rows="5"-->
                    <!--style="resize: vertical"-->
                    <!--class="input-reset bg-transparent bn w-100 pa3"-->
                    <!--v-model="newPlan.eventDescription"-->
                    <!--placeholder="📝  Add any other notes here..."-->
                  <!--&gt;</textarea>-->
                  <!--<v-button type="button" btnType="tertiary" customClass="h2 w2 mh2" style="padding:4px" :onClick="expandNotes">-->
                    <!--<maximize-2-icon v-if="textArea === false" class="w1 h1"></maximize-2-icon>-->
                    <!--<minimize-2-icon v-if="textArea === true" class="w1 h1"></minimize-2-icon>-->
                  <!--</v-button>-->
                <!--</span>-->
              <!--</div>-->
              <!--<v-button large block type="submit">Add Plan to Itinerary</v-button>-->
            <!--</section>-->
          <!--</div>-->
        <!--</form>-->
      <!--</section>-->

      <!--&lt;!&ndash; ITINERARY &ndash;&gt;-->
      <!--<trip-itinerary :days="days"/>-->
      <!--<section class="mt4 pv2 ph4-l ph3-m w-100">-->
        <!--<v-button v-if="currentTrip.start && currentTrip.end" large block btnType="secondary" :onClick="handleAddDay">Add Day to Itinerary</v-button>-->
      <!--</section>-->
    <!--</main>-->
    <!--<div v-if="showChat" class="scrim z-999 fixed top-0 right-0 bottom-0 left-0 block overflow-scroll">-->
      <!--<v-chat></v-chat>-->
    <!--</div>-->
    <!--<v-modal-plan></v-modal-plan>-->
  <!--</div>-->
<!--</template>-->


<!--<script type="text/javascript">-->
<!--import { mapGetters } from 'vuex'-->
<!--import moment from 'moment'-->
<!--import { ExternalLinkIcon, ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon, Maximize2Icon, Minimize2Icon, EditIcon, Trash2Icon, HomeIcon, XIcon, PlusIcon, ShuffleIcon, NavigationIcon, SunIcon, MapPinIcon } from 'vue-feather-icons'-->
<!--import { db } from '@/main'-->
<!--import VButton from '@/components/VButton'-->
<!--import Input from '@/components/Input'-->
<!--import Chat from '@/components/Chat'-->
<!--import FourSquare from '@/components/FourSquare'-->
<!--import Event from './Plan/Event'-->
<!--import Lodging from './Plan/Lodging'-->
<!--import Transportation from './Plan/Transportation'-->
<!--import ModalUpdatePlan from './ModalUpdatePlan'-->
<!--import Header from './Header'-->
<!--import TripItinerary from './TripItinerary'-->

<!--export default {-->
  <!--components: {-->
    <!--TripItinerary,-->
    <!--ChevronLeftIcon,-->
    <!--ChevronRightIcon,-->
    <!--ExternalLinkIcon,-->
    <!--Maximize2Icon,-->
    <!--Minimize2Icon,-->
    <!--ShuffleIcon,-->
    <!--HomeIcon,-->
    <!--NavigationIcon,-->
    <!--SunIcon,-->
    <!--XIcon,-->
    <!--PlusIcon,-->
    <!--ChevronDownIcon,-->
    <!--EditIcon,-->
    <!--Trash2Icon,-->
    <!--MapPinIcon,-->
    <!--Event,-->
    <!--Lodging,-->
    <!--FourSquare,-->
    <!--Transportation,-->
    <!--'v-header': Header,-->
    <!--'v-modal-plan': ModalUpdatePlan,-->
    <!--'v-chat': Chat,-->
    <!--VButton,-->
    <!--'v-input': Input-->
  <!--},-->
  <!--data() {-->
    <!--return {-->
      <!--party: [-->
        <!--{-->
          <!--name: 'Rodney Dennis',-->
          <!--imgUrl: 'https://placehold.it/100'-->
        <!--},-->
        <!--{-->
          <!--name: 'Taylor Dennis',-->
          <!--imgUrl: 'https://placehold.it/100'-->
        <!--},-->
      <!--],-->
      <!--showEditHover: {-->
        <!--name: false,-->
        <!--dates: false,-->
        <!--description: false-->
      <!--},-->
      <!--showInput: {-->
        <!--name: false,-->
        <!--dates: false,-->
        <!--description: false,-->
      <!--},-->
      <!--disableInput: {-->
        <!--transportationLocation: false,-->
        <!--transportationStartTime: false,-->
        <!--transportationEndTime: false,-->
        <!--eventLocation: false-->
      <!--},-->
      <!--invitee: '',-->
      <!--venuePhotosIndex: 0,-->
      <!--textArea: false,-->
      <!--planCity: {},-->
      <!--planAirline: {},-->
      <!--planArriveAirport: {},-->
      <!--planDepartAirport: {},-->
      <!--planFlightSearch: {-->
        <!--depart: '',-->
        <!--arrive: '',-->
        <!--airline: '',-->
      <!--},-->
      <!--autoComplete: {-->
        <!--depart: '🛫  Departure Airport...',-->
        <!--arrive: '🛬  Arrival Airport...',-->
        <!--airline: '✈️  Filter results by airline...'-->
      <!--}-->
    <!--}-->
  <!--},-->
  <!--created() {-->
    <!--const tripId = this.$route.params.id-->
    <!--this.$store.dispatch('fetchTrip', tripId)-->
    <!--this.$store.dispatch('fetchDays', tripId)-->
    <!--this.$store.dispatch('fetchPlans', tripId)-->
  <!--},-->
  <!--filters: {-->
    <!--humanTripDate(date) {-->
      <!--return moment(date).format('MMMM Do YYYY')-->
    <!--},-->
    <!--humanTime(time) {-->
      <!--if (moment(time, 'HH:mm').format('h:mm A') !== 'Invalid date') {-->
        <!--return moment(time, 'HH:mm').format('h:mm A')-->
      <!--}-->
      <!--return '-'-->
    <!--},-->
    <!--humanUnixTime(time) {-->
      <!--return moment(moment.unix(time)).utc().format('h:mm A')-->
    <!--}-->
  <!--},-->
  <!--computed: {-->
    <!--minTime() {-->
      <!--if (this.date === this.end_date) {-->
        <!--return this.newPlan.start-->
      <!--}-->
      <!--return null-->
    <!--},-->
    <!--...mapGetters(['showChat', 'currentTrip', 'days', 'plans', 'planCities', 'planAirlines', 'planAirports', 'planFlights', 'newPlan', 'today', 'currentMaxEndDate', 'venues', 'venue', 'venuePhotos'])-->
  <!--},-->
  <!--directives: {-->
    <!--focus: {-->
      <!--inserted(el) {-->
        <!--el.focus()-->
      <!--}-->
    <!--},-->
    <!--'click-outside': {-->
      <!--bind: (el, binding) => {-->
        <!--// Define Handler and cache it on the element-->
        <!--const handler = (e) => {-->
          <!--if (!el.contains(e.target) && el !== e.target) {-->
            <!--binding.value(e)-->
          <!--}-->
        <!--}-->
        <!--const element = el-->
        <!--element.vueClickOutside = handler-->
        <!--// add Event Listeners-->
        <!--document.addEventListener('click', handler)-->
      <!--},-->

      <!--unbind: (el) => {-->
        <!--// Remove Event Listeners-->
        <!--const element = el-->
        <!--document.removeEventListener('click', element.vueClickOutside)-->
        <!--element.vueClickOutside = null-->
      <!--}-->
    <!--}-->
  <!--},-->
  <!--methods: {-->
    <!--handleSendInvitation() {-->
      <!--this.$store.dispatch('sendInvitation', {-->
        <!--trip: this.$route.params.id,-->
        <!--members: this.$store.state.trip.currentTrip.party,-->
        <!--email: this.invitee,-->
      <!--})-->
    <!--},-->
    <!--handlePlanFlight(flight) {-->
      <!--const airportFrom = this.planAirports.filter(airport => airport.iata === flight.flyFrom)[0]-->
      <!--const airportTo = this.planAirports.filter(airport => airport.iata === flight.flyTo)[0]-->
      <!--this.disableInput.transportationLocation = true-->
      <!--this.disableInput.transportationStartTime = true-->
      <!--this.disableInput.transportationEndTime = true-->
      <!--this.newPlan.transportationName = `${flight.cityFrom} (${flight.flyFrom}) 🛩  ${flight.cityTo} (${flight.flyTo})`-->
      <!--this.newPlan.transportationLocation = `${airportFrom.name} → ${airportTo.name}`-->
      <!--this.newPlan.transportationStartTime = moment(moment.unix(flight.dTime)).utc().format('hh:mm A')-->
      <!--this.newPlan.transportationEndTime = moment(moment.unix(flight.aTime)).utc().format('hh:mm A')-->
      <!--const {-->
        <!--countryFrom, countryTo, duration, fly_duration: flyDuration, route, id-->
      <!--} = flight-->
      <!--const routeObj = {}-->
      <!--for (let i = 0; i < route.length; i += 1) {-->
        <!--routeObj[i] = route[i]-->
        <!--const { 0: flyToAirport } = this.planAirports.filter(airport =>-->
          <!--airport.iata === routeObj[i].flyTo)-->
        <!--routeObj[i].flyToAirport = flyToAirport-->
        <!--const { 0: flyFromAirport } = this.planAirports.filter(airport =>-->
          <!--airport.iata === routeObj[i].flyFrom)-->
        <!--routeObj[i].flyFromAirport = flyFromAirport-->
        <!--const { 0: flyFromAirline } = this.planAirlines.filter(airline =>-->
          <!--airline.id === routeObj[i].airline)-->
        <!--routeObj[i].flyFromAirline = flyFromAirline-->
        <!--if (i > 0) {-->
          <!--routeObj[i].aTimePrev = route[i - 1].aTime-->
        <!--}-->
      <!--}-->
      <!--this.newPlan.transportationFlight = {-->
        <!--countryFrom, countryTo, duration, flyDuration, route: routeObj, id-->
      <!--}-->
    <!--},-->
    <!--handleToggleFlight() {-->
      <!--this.newPlan.transportationFlight = {}-->
      <!--this.disableInput.transportationLocation = false-->
      <!--this.disableInput.transportationStartTime = false-->
      <!--this.disableInput.transportationEndTime = false-->
      <!--this.newPlan.transportationName = ''-->
      <!--this.newPlan.transportationLocation = ''-->
      <!--this.newPlan.transportationStartTime = ''-->
      <!--this.newPlan.transportationEndTime = ''-->
      <!--this.newPlan.transportationflight = {}-->
    <!--},-->
    <!--handleAutocomplete(type, input) {-->
      <!--if (type === 'departReset') {-->
        <!--if (this.planFlightSearch.depart === '') {-->
          <!--this.autoComplete.depart = '🛫  Departure Airport...'-->
          <!--this.newPlan.searchDepart = ''-->
        <!--} else {-->
          <!--this.newPlan.searchDepart = this.autoComplete.depart-->
        <!--}-->
      <!--}-->
      <!--if (type === 'arriveReset') {-->
        <!--if (this.planFlightSearch.arrive === '') {-->
          <!--this.autoComplete.arrive = '🛬  Arrival Airport...'-->
          <!--this.newPlan.searchArrive = ''-->
        <!--} else {-->
          <!--this.newPlan.searchArrive = this.autoComplete.arrive-->
        <!--}-->
      <!--}-->
      <!--if (type === 'airlineReset') {-->
        <!--if (this.planFlightSearch.airline === '') {-->
          <!--this.autoComplete.airline = '✈️  Filter results by airline...'-->
          <!--this.newPlan.searchAirline = ''-->
        <!--} else {-->
          <!--this.newPlan.searchAirline = this.autoComplete.airline-->
        <!--}-->
      <!--}-->
      <!--if (type === 'depart') {-->
        <!--this.autoComplete.depart = input-->
        <!--this.newPlan.searchDepart = ''-->
      <!--}-->
      <!--if (type === 'arrive') {-->
        <!--this.autoComplete.arrive = input-->
        <!--this.newPlan.searchArrive = ''-->
      <!--}-->
      <!--if (type === 'airline') {-->
        <!--this.autoComplete.airline = input-->
        <!--this.newPlan.searchAirline = ''-->
      <!--}-->
    <!--},-->
    <!--handleListMatches(type, shownVal) {-->
      <!--if (shownVal) {-->
        <!--const val = document.querySelector(`#${type} option[value='${shownVal}']`).dataset.value-->
        <!--if (type === 'departAirports') {-->
          <!--this.autoComplete.depart = shownVal-->
          <!--this.planFlightSearch.depart = val-->
        <!--}-->
        <!--if (type === 'arriveAirports') {-->
          <!--this.autoComplete.arrive = shownVal-->
          <!--this.planFlightSearch.arrive = val-->
        <!--}-->
        <!--if (type === 'airlines') {-->
          <!--this.autoComplete.airline = shownVal-->
          <!--this.planFlightSearch.airline = val-->
        <!--}-->
      <!--}-->
      <!--const attributes = {-->
        <!--depart: this.planFlightSearch.depart,-->
        <!--arrive: this.planFlightSearch.arrive,-->
        <!--airline: this.planFlightSearch.airline-->
      <!--}-->
      <!--this.$store.dispatch('fetchFlights', attributes)-->
    <!--},-->
    <!--displayAirportMatches(type, query) {-->
      <!--function findMatches(wordToMatch, airports) {-->
        <!--return airports.filter((airport) => {-->
          <!--const regex = new RegExp(wordToMatch, 'gi')-->
          <!--if (airport.name !== null) {-->
            <!--return airport.name.match(regex) || airport.iata.match(regex)-->
          <!--}-->
          <!--return airport.iata.match(regex)-->
        <!--})-->
      <!--}-->
      <!--const matchArray = findMatches(query, this.planAirports)-->
      <!--const airportNameId = matchArray.map((airport) => {-->
        <!--const airportName = airport.name-->
        <!--const airportId = airport.iata-->
        <!--const airportCombo = `${airportName} (${airportId})`-->
        <!--return { airportCombo, airportId }-->
      <!--})-->
      <!--if (type === 'depart') {-->
        <!--this.planDepartAirport = airportNameId.slice(0, 10)-->
      <!--}-->
      <!--if (type === 'arrive') {-->
        <!--this.planArriveAirport = airportNameId.slice(0, 10)-->
      <!--}-->
    <!--},-->
    <!--checkFlight(planFlight) {-->
      <!--const transportationPlans = this.plans.filter(plan => plan.type === 'transportation')-->
      <!--const flightPlans = transportationPlans.filter(plan =>-->
        <!--plan.flight.id === planFlight.id)-->
      <!--if (planFlight.id === this.newPlan.transportationFlight.id ||-->
        <!--flightPlans.length > 0) {-->
        <!--return false-->
      <!--}-->
      <!--return true-->
    <!--},-->
    <!--handleClearInput(input) {-->
      <!--if (input === 'city') {-->
        <!--this.newPlan.searchCity = ''-->
        <!--this.newPlan.searchVenue = ''-->
      <!--}-->
      <!--if (input === 'venue') {-->
        <!--this.newPlan.searchVenue = ''-->
      <!--}-->
      <!--if (input === 'depart') {-->
        <!--this.autoComplete.depart = '🛫  Departure Airport...'-->
        <!--this.newPlan.searchDepart = ''-->
        <!--this.planFlightSearch.depart = ''-->
      <!--}-->
      <!--if (input === 'arrive') {-->
        <!--this.autoComplete.arrive = '🛬  Arrival Airport...'-->
        <!--this.newPlan.searchArrive = ''-->
        <!--this.planFlightSearch.arrive = ''-->
      <!--}-->
      <!--if (input === 'airline') {-->
        <!--this.autoComplete.airline = '✈️  Filter results by airline...'-->
        <!--this.newPlan.searchAirline = ''-->
        <!--this.planFlightSearch.airline = ''-->
      <!--}-->
    <!--},-->
    <!--handleToggleVenueImg(direction) {-->
      <!--let i = this.venuePhotosIndex-->
      <!--if (direction === 'left') {-->
        <!--if (i === 0) {-->
          <!--i = this.venuePhotos.length - 1-->
        <!--} else {-->
          <!--i -= 1-->
        <!--}-->
      <!--}-->
      <!--if (direction === 'right') {-->
        <!--if (i === this.venuePhotos.length - 1) {-->
          <!--i = 0-->
        <!--} else {-->
          <!--i += 1-->
        <!--}-->
      <!--}-->
      <!--this.venuePhotosIndex = i-->
      <!--this.newPlan.img = `${this.venuePhotos[i].prefix}${this.venuePhotos[i].height}x${this.venuePhotos[i].width}${this.venuePhotos[i].suffix}`-->
    <!--},-->
    <!--handleToggleVenue() {-->
      <!--this.venuePhotosIndex = 0-->
      <!--this.$store.commit('clearVenue')-->
      <!--this.disableInput.eventLocation = false-->
      <!--this.newPlan.eventName = ''-->
      <!--this.newPlan.eventLocation = ''-->
      <!--this.newPlan.img = ''-->
      <!--this.newPlan.eventVenue = {}-->
    <!--},-->
    <!--displayAirlineMatches(query) {-->
      <!--function findMatches(wordToMatch, airlines) {-->
        <!--return airlines.filter((airline) => {-->
          <!--const regex = new RegExp(wordToMatch, 'gi')-->
          <!--return airline.name.match(regex) || airline.id.match(regex)-->
        <!--})-->
      <!--}-->
      <!--const matchArray = findMatches(query, this.planAirlines)-->
      <!--const airlineNameId = matchArray.map((airline) => {-->
        <!--const airlineName = airline.name-->
        <!--const airlineId = airline.id-->
        <!--const airlineCombo = `${airlineName} (${airlineId})`-->
        <!--return { airlineCombo, airlineId }-->
      <!--})-->
      <!--this.planAirline = airlineNameId.slice(0, 10)-->
    <!--},-->
    <!--closeInlineEdit() {-->
      <!--// update days & plans-->
      <!--if (this.showInput.dates === true) {-->
        <!--const start = moment(this.currentTrip.start);-->
        <!--const end = moment(this.currentTrip.end);-->
        <!--const numDays = end.diff(start, 'days')-->
        <!--const newDays = []-->
        <!--for (let i = 1, lenConf = numDays + 2; i < lenConf; i += 1) {-->
          <!--newDays.push(moment(this.currentTrip.start).add(i - 1, 'days').format('YYYY-MM-DD'))-->
        <!--}-->
        <!--const currentDays = this.days.map(days => days.date)-->
        <!--// if days is more than newDays then remove items in newDays from currentDays-->
        <!--const deletedDays = currentDays.filter(days => newDays.indexOf(days) === -1)-->
        <!--delete deletedDays[0]-->
        <!--// fill add plan &#45;&#45; start date + end date inputs if date in input deleted-->
        <!--const conflictPlans = []-->
        <!--for (let d = 0, lenConf = deletedDays.length - 1; d <= lenConf; d += 1) {-->
          <!--// calculate if all plans in plans array that might be deleted-->
          <!--for (let i = 0, len = this.plans.length; i < len; i += 1) {-->
            <!--// if plan.date in plan in plans array = date being deleted-->
            <!--if (-->
              <!--this.plans[i].date === deletedDays[d] ||-->
              <!--this.plans[i].end_date === deletedDays[d]) {-->
              <!--// push to conflictPlans array-->
              <!--conflictPlans.push(this.plans[i]);-->
            <!--}-->
          <!--}-->
        <!--}-->
        <!--// if no conflicts delete days-->
        <!--if (conflictPlans.length > 0) {-->
          <!--// eslint-disable-next-line-->
          <!--const result = window.confirm('🛑 You have plans that would be deleted. Would you like to delete them?')-->
          <!--// if user is okay with deleting conflictPlans-->
          <!--if (result === true) {-->
            <!--for (let i = 0, len = conflictPlans.length; i < len; i += 1) {-->
              <!--// delete plans-->
              <!--const attributes = {-->
                <!--tripId: this.$route.params.id,-->
                <!--planId: conflictPlans[i].id-->
              <!--}-->
              <!--this.$store.dispatch('deletePlan', attributes)-->
            <!--}-->
          <!--} else {-->
            <!--this.currentTrip.start = this.days[1].date-->
            <!--this.currentTrip.end = this.days[this.days.length - 1].date-->
            <!--this.showInput.start = false-->
            <!--this.showInput.end = false-->
            <!--return-->
          <!--}-->
        <!--}-->
        <!--this.$store.dispatch('updateDays', this.$route.params.id)-->
        <!--// update addPlanDays-->
        <!--for (let i = 0, lenConf = deletedDays.length - 1; i <= lenConf; i += 1) {-->
          <!--if (-->
            <!--this.newPlan.date === deletedDays[i] ||-->
            <!--this.newPlan.end_date === deletedDays[i]) {-->
            <!--this.newPlan.date = this.currentTrip.start-->
            <!--this.newPlan.end_date = this.currentTrip.start-->
          <!--}-->
        <!--}-->
      <!--}-->
      <!--// tripInputs-->
      <!--this.showInput.name = false-->
      <!--this.showInput.dates = false-->
      <!--this.showInput.description = false-->
      <!--// updateTrip-->
      <!--const attributes = {-->
        <!--id: this.$route.params.id,-->
        <!--trip: this.currentTrip-->
      <!--}-->
      <!--this.$store.dispatch('updateTrip', attributes)-->
    <!--},-->

    <!--expandNotes() {-->
      <!--this.textArea = !this.textArea-->
    <!--},-->

    <!--startDateChange() {-->
      <!--if (this.newPlan.end_date <= this.newPlan.date) {-->
        <!--this.newPlan.end_date = this.newPlan.date-->
      <!--}-->
    <!--},-->

    <!--handleAddDay() {-->
      <!--const attributes = {-->
        <!--tripId: this.$route.params.id,-->
        <!--days: this.days,-->
        <!--currentTrip: this.currentTrip-->
      <!--}-->
      <!--this.$store.dispatch('addDay', attributes)-->
      <!--db.collection('trips')-->
        <!--.doc(this.$route.params.id)-->
        <!--.update({-->
          <!--end: moment(this.currentTrip.end).add(1, 'days').format('YYYY-MM-DD')-->
        <!--})-->
    <!--},-->

    <!--handleAddPlan() {-->
      <!--if (!this.newPlan.img) {-->
        <!--this.newPlan.img = this.currentTrip.img-->
      <!--}-->
      <!--if (this.newPlan.type === 'event') {-->
        <!--this.disableInput.eventLocation = false-->
      <!--}-->
      <!--if (this.newPlan.type === 'transportation') {-->
        <!--this.disableInput.transportationLocation = false-->
        <!--this.disableInput.transportationStartTime = false-->
        <!--this.disableInput.transportationEndTime = false-->
      <!--}-->
      <!--// if plan title different than venue name => add venue name to plan location-->
      <!--// if (this.newPlan.title !== this.venue.name) {-->
      <!--//   this.newPlan.location = `${this.venue.name}, ${this.newPlan.location}`-->
      <!--// }-->
      <!--const plan = {-->
        <!--date: this.newPlan.date,-->
        <!--end_date: this.newPlan.end_date,-->
        <!--type: this.newPlan.type,-->
      <!--}-->
      <!--if (this.newPlan.type === 'transportation') {-->
        <!--plan.img = this.currentTrip.img-->
        <!--plan.name = this.newPlan.transportationName-->
        <!--plan.start = this.newPlan.transportationStartTime-->
        <!--plan.end = this.newPlan.transportationEndTime-->
        <!--plan.location = this.newPlan.transportationLocation-->
        <!--if (this.newPlan.transportationFlight) {-->
          <!--plan.flight = this.newPlan.transportationFlight-->
        <!--}-->
        <!--plan.url = ''-->
        <!--plan.price = this.newPlan.transportationPrice-->
        <!--plan.description = this.newPlan.transportationDescription-->
      <!--}-->
      <!--if (this.newPlan.type === 'lodging') {-->
        <!--plan.img = this.currentTrip.img-->
        <!--plan.name = this.newPlan.lodgingName-->
        <!--plan.start = this.newPlan.lodgingStartTime-->
        <!--plan.end = this.newPlan.lodgingEndTime-->
        <!--plan.location = this.newPlan.lodgingLocation-->
        <!--plan.url = ''-->
        <!--plan.price = this.newPlan.lodgingPrice-->
        <!--plan.description = this.newPlan.lodgingDescription-->
      <!--}-->
      <!--if (this.newPlan.type === 'event') {-->
        <!--plan.img = this.newPlan.img-->
        <!--plan.name = this.newPlan.eventName-->
        <!--plan.start = this.newPlan.eventTime-->
        <!--plan.end = ''-->
        <!--plan.location = this.newPlan.eventLocation-->
        <!--if (this.newPlan.eventVenue) {-->
          <!--plan.venue = this.newPlan.eventVenue-->
        <!--}-->
        <!--plan.venuePhotos = this.venuePhotos-->
        <!--plan.venuePhotosIndex = this.venuePhotosIndex-->
        <!--plan.url = this.newPlan.url-->
        <!--plan.price = this.newPlan.eventPrice-->
        <!--plan.description = this.newPlan.eventDescription-->
      <!--}-->
      <!--const attributes = {-->
        <!--tripId: this.$route.params.id, plan-->
      <!--}-->
      <!--this.$store.dispatch('addPlan', attributes)-->
    <!--},-->
  <!--},-->

  <!--mounted() {-->
    <!--this.$parent.$on('foo', (x) => {-->
      <!--this.showChat = x-->
    <!--})-->
  <!--},-->

  <!--destroyed() {-->
    <!--this.$store.commit('clearVenue')-->
    <!--this.$store.commit('clearAddEvent')-->
    <!--this.$store.commit('clearAddLodging')-->
    <!--this.$store.commit('clearAddTransportation')-->
    <!--this.$store.commit('clearAddPlan')-->
    <!--this.$store.state.trip.venues = {}-->
    <!--this.$store.state.trip.currentTrip = {}-->
  <!--}-->
<!--}-->
<!--</script>-->
