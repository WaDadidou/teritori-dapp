import { useState } from "react";

import { FormObject } from "@/screens/Home/TestForms/utils/testFormTypes";

export const useSendDataToAPI = () => {
  const [isLoading, setLoading] = useState(false);

  const sendData = (values: FormObject) => {
    setLoading(true);

    console.log("---- values sent", values);

    setTimeout(() => {
      // ...API call, async, etc

      setLoading(false);
    }, 5000);
  };

  return { sendData, isLoading };
};
