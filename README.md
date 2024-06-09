
# Sallary Calculator


The “Salary Calculator: Your Ultimate Wage Companion!” is designed to streamline  your paycheck calculations. This app takes the guesswork out of determining your  salary. 
Simply input your basic salary and other income, then the application will do the rest,  factoring in EPF (Employees' Provident Fund), ETF (Employees' Trust Fund), and APIT 
(Annual Personal Income Tax). With instant results, you'll have a clear picture of your  take-home pay in seconds



Link to the application: https://salary-calculator-2024-q2-yehan20.vercel.app/

## Lessons learned

- Connect Fire Base With Next JS App
- Create Apis from Next JS
- How to use Typescript to add Types and interfaces for react components
- How to deploy a Next Js App

## Features

- Adding Earnings , Deduction Update and Delete
- Get Full Details About your Salary

## Tools and technologies used

- Next JS
- React
- Type Script
- Fire Base 
- Tailwind CSS
- Styled Components

## Get started

To Setup we would need to set up some things locally you would need node js , npm if not avaialbe you can install it , also you wold need git inorder to make it easy to clone and manage version of your application, you can get git bu visting  the official Git website at [https://git-scm.com/download/win](https://git-scm.com/download/win) to download the Windows installer. 

## Installing Node.js on Windows

1. **Download Node.js Installer**: Visit the official Node.js website at [nodejs.org](https://nodejs.org/) and download the Windows installer (`.msi` file) for the LTS (Long-Term Support) version. The LTS version is recommended for most users as it provides a stable environment.

2. **Run the Installer**: Once the download is complete, double-click the downloaded `.msi` file to run the installer. Follow the on-screen instructions to complete the installation process. You can choose the default options for most settings.

3. **Verify Installation**: After the installation is complete, open a command prompt (or PowerShell) and type the following command to check if Node.js and npm (Node Package Manager) were installed successfully:

    ```
    node -v
    npm -v
    ```

    You should see the version numbers of Node.js and npm printed to the console if the installation was successful. i had shown only here how to install in windows in the site its explained of how to install for linux and mach users

Now that we have node and npm done we can set up our project 

We have used firebase as storage medium to store data inorder to setup a firestore you can 

 Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project. Follow the on-screen instructions to set up your project.
 **Add Firebase to Your Web App**: After creating the project, click on the "Web" icon to add Firebase to your web app. Follow the instructions to register your app and obtain your Firebase configuration settings. **Enable Firestore**: In the Firebase console, navigate to the "Firestore Database" section and click on "Create Database". Choose the location for your database and set the security rules to suit your needs.  **Install Firebase SDK**: In your project directory, install the Firebase JavaScript SDK using npm or yarn and replace it with the Firebase config object:

Setting up locally

```bash
# Clone this repository
$ git clone https://github.com/Yehan20/-salary-calculator-2024-Q2-yehan20.git

# Go into the repository
$ cd salary-calculator-2024-Q2-yehan20

# Remove current origin repository
$ git remote remove origin

# If you want, you can add a new remote repository
$ git remote add origin https://github.com/<your-github-username>/<your-repo-name>.git


```
Goto the .env file in the project then add the following you got from fire base
```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_COLLECTION=your_db_collection_id
```

Next
```bash
# Terminal for the server
# cd into the server folder
$ cd salary-calculator-2024-Q2-yehan20

# Install dependencies
$ npm install

# run the server
$ npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev

```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

```bash

[![Image description](/public/ui/mb.png)]

[![Image description](/public/ui/lg.JPG)]


## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details. -->



