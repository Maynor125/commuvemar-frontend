"use client";

import { store } from "./store/store";
import { Provider} from "react-redux";
import ThemeProviderGlobal from "@/theme/ThemeProvider";

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {

  return (
    <Provider store={store}>
      <ThemeProviderGlobal>{children}</ThemeProviderGlobal>
    </Provider>
  );
};

export default ReduxProvider;
