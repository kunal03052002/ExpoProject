
import { Slot, useRouter } from "expo-router";
import { useEffect } from "react";

export default function WebLayout() {
  const router = useRouter();
  useEffect(() => {
    if (window.location.pathname === "/") {
      router.replace("/(web)");
    }  
  }, []);
  return <Slot />;
}
