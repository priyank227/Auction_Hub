import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    // commission: commissionReducer,
    // auction: auctionReducer,
    // bid: bidReducer,
    // superAdmin: superAdminReducer,
  },
});
