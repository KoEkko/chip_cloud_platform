import mitt from "mitt";
import { Emitter } from "mitt";
const bus: Emitter<Record<any, any>> = mitt();
export default bus;
