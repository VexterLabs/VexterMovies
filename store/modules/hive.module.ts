import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IHiveStore } from "@/store/store.interfaces";
import ClientConfig, { LanguageDefaultBookId } from "@/client.config";
import { isIos } from "@/utils/ownOs";
import { getUserLandId } from "@/utils/logParams";
import { InitFingerprint } from "@/utils/fingerprint";
import { ELanguage } from "@/typings/home.interface";
import { SliceCaseReducers } from "@reduxjs/toolkit/src/createSlice";
import { IClipboard } from "@/typings/hive.interfaces";
import { netIpUa } from "@/server/clientLog";
import { ipReg } from "@/utils/other";
import { encrypt } from "@/utils/crypto";

export const clipboardAsync = createAsyncThunk<IClipboard, any>(
  'hive/getClipboard',
  async ({ bid, cid, ip }: { bid: string; cid: string | number; ip: string; }) => {
    const ua = navigator.userAgent;
    const h5fingerPrint = await InitFingerprint();
    const channelCode = isIos(ua) ? ClientConfig.ios.channelCode : ClientConfig.android.channelCode;
    const clipboard = {
      ip: ip || "0.0.0.0",
      h5uid: getUserLandId(),
      channelCode,
      h5fingerPrint,
      ua,
      url: window.location.href,
    };

    const _ip = await netIpUa(Object.assign(clipboard, {
      bid: bid || LanguageDefaultBookId[ELanguage.English],
      cid,
      shareCode: 0
    }))
    if (ipReg.test(_ip)) {
      clipboard.ip = _ip
    }
    return clipboard as IClipboard;
  }
)

const getCopyText = (clipboard: IClipboard) => {
  const { bid = "", channelCode = "", cid = 0, h5uid = "", ua = '' } = clipboard;
  const queryStr = !cid ? `${h5uid}_${bid}_${channelCode}_other` : `${h5uid}_${bid}_${channelCode}_other_${cid}`;
  if (ua && !isIos(ua)) {
    const androidClip = encrypt(JSON.stringify({
      k: h5uid,
      bid,
      channel: channelCode,
      media: "other",
      cid: cid || "",
      ext: "", // 拓展字符
    }))
    return `[dramaBox]https://app.dramaboxdb.com/android/open?c=${queryStr}&lpat=${androidClip} UA8322`
  }
  return `[dramaBox]https://app.dramaboxdb.com/ios/open?c=${queryStr} UA8322`
}

export const hiveSlice = createSlice<IHiveStore, SliceCaseReducers<IHiveStore>>({
  name: 'hive',
  initialState: () => {
    return {
      clipboard: {
        ip: "0.0.0.0",
        h5uid: "",
        bid: LanguageDefaultBookId[ELanguage.English],
        channelCode: '',
        cid: 0,
        shareCode: 0,
        url: process.env.WebDomain ?? '',
        ua: '',
        h5fingerPrint: "",
      },
      copyText: '',
      language: ELanguage.English
    }
  },
  reducers: {
    setClipboard: (state, action: PayloadAction<{ bid?: string; cid?: string | number; }>) => {
      const data = Object.assign({}, state.clipboard)
      if (!!action.payload.bid) {
        state.clipboard.bid = action.payload.bid;
        data.bid = action.payload.bid;
      }
      if (!!action.payload.cid) {
        state.clipboard.cid = action.payload.cid;
        data.cid = action.payload.cid;
      }
      state.copyText = getCopyText(data)
    },
    setLanguage: (state, action: PayloadAction<ELanguage>) => {
      state.language = action.payload;
    },
  },
  // 在extraReducers中可以对请求结果的成功失败，做不同的处理
  extraReducers: (builder) => {
    builder
      .addCase(clipboardAsync.fulfilled, (state, action) => {
        // const clipboardObj = Object.assign(state.clipboard, action.payload);
        state.clipboard = { ...state.clipboard, ...action.payload };
        state.copyText = getCopyText({ ...state.clipboard, ...action.payload })
      })
    ;
  }
});

export const { setClipboard, setLanguage } = hiveSlice.actions;


// // We can also write thunks by hand, which may contain both sync and async logic.
// // Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd =
//   (amount: number): AppThunk =>
//     (dispatch, getState) => {
//       const currentValue = selectCount(getState())
//       if (currentValue % 2 === 1) {
//         dispatch(incrementByAmount(amount))
//       }
//     }
//
export const hiveReducer = hiveSlice.reducer;
