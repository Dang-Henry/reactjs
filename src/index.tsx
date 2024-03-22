import React from "react";
import ReactDOM from "react-dom";
import { AppProvider, Page, FormLayout } from "@shopify/polaris";
import "@shopify/polaris/styles.css";
import _ from "lodash";
import './style.css'
import translations from "@shopify/polaris/locales/en.json";

import ConnectTextField from "./components/Form/TextField";

function App() {
  console.log("lodash snake case", {
    [_.snakeCase("post@admin/cancel-labels")]: true
  });
  return (
    <AppProvider i18n={translations}>
      <Page>
        <FormLayout>
          <ConnectTextField name={"TextField"} label="Polaris input" />
        </FormLayout>
        {/* <DataTable /> */}
      </Page>
    </AppProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
