# Sunstain

This solution starter was created as part of the IBM call for code.

## Authors

- Johnny Chalikiopoulos
- Ioannis Katsoridas
- Eirini Lygerou

## Contents

1. [Overview](#overview)
2. [The idea](#the-idea)
3. [How it works](#how-it-works)
4. [Diagrams](#diagrams)
5. [Technology](#technology)
6. [Getting started](#getting-started)
7. [Resources](#resources)
8. [License](#license)

## Overview

### What's the problem?

Placeholder

### How can technology help?

Placeholder

## The idea

Placeholder

## How it works

Placeholder

## Diagrams

![Cooperation architecture diagram](/images/ArchitectureDiagram.JPG)

## Technology

### IBM Cloud Services

- [Build a cross-platform mobile app using React Native](https://developer.ibm.com/technologies/mobile/patterns/build-a-cross-platform-mobile-app-to-search-company-news-and-gain-insights)
- [Building successful mobile apps article series](https://developer.ibm.com/series/building-successful-mobile-apps/)


## Getting started

### Prerequisites

- Register for an [IBM Cloud](https://www.ibm.com/account/reg/us-en/signup?formid=urx-42793&eventid=cfc-2020?cm_mmc=OSocial_Blog-_-Audience+Developer_Developer+Conversation-_-WW_WW-_-cfc-2020-ghub-starterkit-cooperation_ov75914&cm_mmca1=000039JL&cm_mmca2=10008917) account.
- Install and configure [IBM Cloud CLI](https://cloud.ibm.com/docs/cli?topic=cloud-cli-getting-started#overview).
- Install [React Native CLI dependencies](https://reactnative.dev/docs/getting-started.html). See the [React Native documentation](https://reactnative.dev/docs/environment-setup) for the exact steps and requirements based on your Operating System and Target OS. For example:
    - **iOS on macOS**
        - [Node.js](https://nodejs.org/en/)
        - [Watchman](https://facebook.github.io/watchman/docs/install)
        - [Xcode](https://itunes.apple.com/us/app/xcode/id497799835?mt=12)
        - [CocoaPods](https://guides.cocoapods.org/using/getting-started.html)
    - **Android on Windows**
        - [Node.js](https://nodejs.org/en/)
        - [Java Development Kit](https://www.oracle.com/java/technologies/javase-jdk8-downloads.html)
        - [Android Studio](https://developer.android.com/studio/index.html) - add Android 9 (Pie) SDK & configure `ANDROID_HOME`
        - [Create an Android Virtual Device (AVD)](https://developer.android.com/studio/run/managing-avds.html) - with Pie image (API Level 28)
- Clone the [repository](https://github.com/irinil/Sunstain.git).

### Steps

1. [Provision a CouchDB instance using Cloudant](#1-Provision-a-CouchDB-instance-using-Cloudant).
1. [Run the server](#2-run-the-server).
1. [Run the react native engine](#3-run-the-react-native-egine).
1. [Run the mobile application](#4-run-the-mobile-application).

### 1: Provision a CouchDB instance using Cloudant

Log into the IBM Cloud and provision a [CouchDB instance using Cloudant](https://www.ibm.com/cloud/cloudant).

1. From the catalog, select Databases and then the Cloudant panel.
1. Once selected, you can choose your Cloudant plan -- there is a free tier for simple testing that is sufficient to run this CIR example. You should choose an appropriate region, give the service a name, and it is recommended you choose **Use only IAM** under **Available authentication methods**. You can leave the other settings with their defaults. Click the blue **Create** button when ready.
1. Once your Cloudant instance has been created, you need to create a service credential that the CIR API Server can use to communicate with it. By selecting your running Cloudant instance, you can choose **Service credentials** from the left-hand menu. Create a new service credential and give it a name (it doesn't matter what you call it).
1. Once created, you can display the credentials by selecting **view service credentials**, and then copy the credential, so you are ready to paste it into the code of the API server in Step 4.


### 2. Run the server

To set up and launch the server application:

1. Go to the `Sunstain/server` directory of the cloned repo.
1. Copy the `.env.example` file in the `starter-kit/server-app` directory, and create a new file named `.env`.
1. Edit the **name** value in the `manifest.yml` file to your application name (for example, _my-app-name_).
1. From a terminal:
    1. Go to the `Sunstain/server` directory of the cloned repo.
    1. Install the dependencies: `npm install`.
    1. Launch the server application locally or deploy to IBM Cloud:
        - To run locally:
            1. Start the application: `npm start`.
            1. The server can be accessed at <http://localhost:3000>.
        - To deploy to IBM Cloud (Optional):
            1. Log in to your IBM Cloud account using the IBM Cloud CLI: `ibmcloud login`.
            1. Target a Cloud Foundry org and space: `ibmcloud target --cf`.
            1. Push the app to IBM Cloud: `ibmcloud app push`.
            1. The server can be accessed at a URL using the **name** given in the `manifest.yml` file (for example,  <https://my-app-name.bluemix.net>).
			
### 3. Run the react native engine
To run the react-native engine 

1. Go to the `Sunstain` directory of the cloned repo.
1. Open a cmd and run `npx react-native start` 

### 4. Run the mobile application

To run the mobile application (using the Xcode iOS Simulator or Android Studio Emulator):

1. Go to the `Sunstain` directory of the cloned repo.
1. Copy the `.env.example` file in the `Sunstain` directory, and create a file named `.env`.
1. Edit the newly created `.env` file:
    - Update the `SUNSTAIN_SERVER_URL` with the URL to the server app launched in the previous step.
        > **Note**: If you are running the server locally and testing with the Android Emulator set the `SUNSTAIN_SERVER_URL` using the local machine's URL (e.g., `http://10.0.2.2:3000`) instead of `localhost`
   
1. From a terminal:
    1. Go to the `Sunstain` directory.
    1. Install the dependencies: `yarn install`.
    1. **iOS only**: Go to the `ios` directory: `cd ios`.
    1. **iOS only**: Install pod dependencies: `pod install`.
    1. **iOS only**: Return to the `mobile-app` directory: `cd ../`.
    1. Launch the app in the simulator/emulator:
        - **iOS only**: `npm run ios`
            > **Note**: You should be running at least iOS 13.0. The first time you launch the simulator, you should ensure that you set a Location in the Features menu.
        - **Android only**: `npx react-native run-android `
            > **Note**: Your Android Studio needs to have the `Android 9 (Pie)` SDK and a `Pie API Level 28` virtual device 
        - **Alternative way to run on Android**: `react-native run-android` 
            1. **Android only**: Open Android Studio and setup the project with the android folder. 
            1. **Android only**: Open Android Virtual Device Manager and launch the virtual device installed.
            1. **Android only**: Click on Debug in Android Studio.

With the application running in the simulator/emulator, you should be able to navigate through the various screens:
### Login Screen
<img src="https://github.com/irinil/Sunstain/blob/main/images/Login_Screen.png" height="550">

### Sign in Screen
<img src="https://github.com/irinil/Sunstain/blob/main/images/Sign_in_Screen.png" height="550">

### Welcome Screen
<img src="https://github.com/irinil/Sunstain/blob/main/images/Welcome_Screen2.png" height="550">

### Buy/Search Screen
<img src="https://github.com/irinil/Sunstain/blob/main/images/Search_Screen.png" height="550">
<img src="https://github.com/irinil/Sunstain/blob/main/images/Buy_Screen.png" height="550">

### Buy Notification Screen
<img src="https://github.com/irinil/Sunstain/blob/main/images/Second_Notification.png" height="550">

## Resources

- [IBM Cloud](https://www.ibm.com/cloud)
- [IBM Cloudant](https://cloud.ibm.com/docs/Cloudant?topic=cloudant-overview)
- [Node.js](https://nodejs.org)
- [React Native](https://reactnative.dev/)

## License

This solution is made available under the [GNU General Public License v3.0](LICENSE).
