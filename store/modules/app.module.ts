import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EDevice, IAppStore } from "@/store/store.interfaces";
import { SliceCaseReducers } from "@reduxjs/toolkit/src/createSlice";

export const appSlice = createSlice<IAppStore, SliceCaseReducers<IAppStore>>({
  name: 'app',
  initialState: (): IAppStore => ({
    device: EDevice.mobile,
    isPopChange: false, // m端语言弹框展开默认关闭分类弹框
  }),
  reducers: {
    setDevice: (state, action: PayloadAction<EDevice>) => {
      state.device = action.payload;
    },

    setIsPopChange: (state, action) => {
      state.isPopChange = !state.isPopChange;
    },
  }
});

export const { setDevice, setIsPopChange } = appSlice.actions;

export const appReducer = appSlice.reducer;
