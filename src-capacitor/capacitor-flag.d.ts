/// <reference types="@capacitor/cli" />

declare module '@capacitor/cli' {
  export interface CapacitorConfig {
    appId: string;
    appName: string;
    bundledWebRuntime: boolean;
    npmClient: string;
    webDir: string;
  }
}
