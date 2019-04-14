import Vue from 'vue'
import { createStateMachine, decorateWithEntryActions, fsmContracts } from "state-transducer";
// import { makeVueStateMachine } from "./vue-state-driven";
import { makeVueStateMachine } from "vue-state-driven";
import { imageGalleryVueMachineDef } from "./imageGalleryVueMachineDef";
import { imageGalleryFsmDef } from "./fsm"
import "./index.css";
import "./gallery.css";

Vue.config.productionTip = false

const fsmSpecsWithEntryActions = decorateWithEntryActions(
  imageGalleryFsmDef,
  imageGalleryFsmDef.entryActions,
  null
);
const fsm = createStateMachine(
  fsmSpecsWithEntryActions,
  { debug: { console, checkContracts: fsmContracts } }
);

makeVueStateMachine(Object.assign({ Vue, name: 'App', fsm }, imageGalleryVueMachineDef));

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>'
})
