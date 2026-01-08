"use client";

import { Toaster } from "sonner";

export default function SonnerToaster() {
  return (
    <Toaster
      richColors
      position='top-center'
      toastOptions={{
        duration: 3500
      }}
    />
  );
}
