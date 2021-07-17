import "./styles/tailwind.css";

import { Router } from "solid-app-router";
import { render } from "solid-js/web";
import { I18nProvider } from "@amoutonbrady/solid-i18n";
import { App } from "./app";
import RoutingPath from "./router/RoutingPath";
import { dict } from "./config/i18n";

const dispose = render(
  () => (
    <I18nProvider dict={dict} locale="th">
      <Router routes={RoutingPath}>
        <App />
      </Router>
    </I18nProvider>
  ),
  document.getElementById("app")
);

/**
 * Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
 * Learn more: https://www.snowpack.dev/#hot-module-replacement
 *
 * Note: Solid doesn't support state preservation on hot reload as of yet
 */
if (import.meta.env.MODE === "development") {
  import.meta.hot.accept();
  import.meta.hot.dispose(dispose);
}
