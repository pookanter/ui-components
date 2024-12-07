import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
//@ts-expect-error TS2307
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      //@ts-expect-error TS2307
      "@components": path.resolve(__dirname, "./src/components"),
      //@ts-expect-error TS2307
      "@util": path.resolve(__dirname, "./src/util"),
    },
  },
});
