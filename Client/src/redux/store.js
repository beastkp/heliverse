import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import cardReducer from "./card/cardSlice";
import teamReducer from "./team/teamSlice";
import memberReducer from "./members/memberSlice";

export const store = configureStore({
  reducer: {
    user:userReducer,
    card:cardReducer,
    team:teamReducer,
    member: memberReducer
  },
});
