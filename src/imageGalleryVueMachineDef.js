import { COMMAND_SEARCH, NO_INTENT } from "./properties"
import {COMMAND_RENDER} from "vue-state-driven"
import { INIT_EVENT } from "state-transducer"
import  GalleryApp from "./GalleryApp"
import Flipping from "flipping"
import { destructureEvent, runSearchQuery } from "./helpers"
import { filter, map } from "rxjs/operators"
import { Subject } from "rxjs"

const flipping = new Flipping();
const stateTransducerRxAdapter = {
  subjectFactory: () => new Subject()
};

export const imageGalleryVueMachineDef = {
  props: ["query", "photo", "items", "gallery"],
  options: { initialEvent: ["START"] },
  renderWith: GalleryApp,
  eventHandler: stateTransducerRxAdapter,
  preprocessor: rawEventSource =>
    rawEventSource.pipe(
      map(ev => {
        const { rawEventName, rawEventData: e, ref } = destructureEvent(ev);

        if (rawEventName === INIT_EVENT) {
          return { [INIT_EVENT]: void 0 };
        }
        // Form raw events
        else if (rawEventName === "START") {
          return { START: void 0 };
        } else if (rawEventName === "onSubmit") {
          e.preventDefault();
          return { SEARCH: ref.current.value };
        } else if (rawEventName === "onCancelClick") {
          return { CANCEL_SEARCH: void 0 };
        }
        // Gallery
        else if (rawEventName === "onGalleryClick") {
          const item = e;
          return { SELECT_PHOTO: item };
        }
        // Photo detail
        else if (rawEventName === "onPhotoClick") {
          return { EXIT_PHOTO: void 0 };
        }
        // System events
        else if (rawEventName === "SEARCH_SUCCESS") {
          const items = e;
          return { SEARCH_SUCCESS: items };
        } else if (rawEventName === "SEARCH_FAILURE") {
          return { SEARCH_FAILURE: void 0 };
        }

        return NO_INTENT;
      }),
      filter(x => x !== NO_INTENT),
    ),
  commandHandlers: {
    [COMMAND_SEARCH]: (next, query, effectHandlers) => {
      effectHandlers
        .runSearchQuery(query)
        .then(data => {
          next(["SEARCH_SUCCESS", data.items]);
        })
        .catch(error => {
          next(["SEARCH_FAILURE", void 0]);
        });
    }
  },
  effectHandlers: {
    runSearchQuery: runSearchQuery,
    // NOTE: we don't use flipping for that Vue example. It is possible to do so with entry actions:
    // [flip.read, render, flip.flip, other actions]. Totally possible but a distraction given the time allotted
    // NOTE: A postprocessor would also handle this smoothly - to think about
    [COMMAND_RENDER]: (machineComponent, params, next) => {
      const props = Object.assign({}, params, { next, hasStarted: true });
      machineComponent.set(props);
    }
  }
};
