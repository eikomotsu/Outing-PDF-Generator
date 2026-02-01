# Android APK Deployment Guide

Your Outing Permission System is now fully configured as a PWA and ready to be wrapped as a native Android APK.

## Prerequisites
- The project must be deployed to a live URL (e.g., GitHub Pages).
- The URL must be `https://`.

## Step-by-Step Instructions

1.  **Deploy**: ensure your latest code (including `manifest.json` and `sw.js`) is pushed to GitHub and live on GitHub Pages.
2.  **Visit PWABuilder**: Go to [https://www.pwabuilder.com](https://www.pwabuilder.com).
3.  **Enter URL**: Paste your live GitHub Pages URL and click **Start**.
4.  **Confirm Score**: You should see a high score. If prompted about icons or security, your current configuration covers the basics (Manifest, SW, HTTPS).
5.  **Build**:
    - Click **Build My PWA**.
    - Select **Android**.
    - Choose **Trusted Web Activity (TWA)**.
    - Click **Generate Package**.
6.  **Download**:
    - You will receive a ZIP file containing an `.apk` (for direct install) and `.aab` (for Play Store).
    - Transfer the `.apk` to your Android phone.
7.  **Install**:
    - Open the APK on your phone.
    - Allow "Install from unknown sources" if prompted.
    - Launch the "Outing App".

## Features
- **Native Look**: Runs full screen without the browser URL bar.
- **Offline Support**: `sw.js` caches the app so it opens without internet.
- **Auto-Updates**: When you push new code to GitHub, the app will update itself the next time it's opened online.
