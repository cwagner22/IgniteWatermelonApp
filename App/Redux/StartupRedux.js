import { createActions } from "reduxsauce";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  startup: ["blogs"]
});

export const StartupTypes = Types;
export default Creators;
