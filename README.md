# APU Moodle Login Skipper 🚀

[![Install from GitHub](https://img.shields.io/badge/Install%20from-GitHub-blue.svg)](https://raw.githubusercontent.com/GarnettJZ/APU-Moodle-Login-Skipper/main/apu-auto-login.user.js)

A cheeky little Tampermonkey script that logs you straight into Moodle, because who has time to click through APSpace? Now with extra smarts to handle bad passwords!

## 🤔 The Annoying Part

You know the drill. To get to Moodle, you have to:

1. Go to APSpace.
2. Log in (If you haven't).
3. Find the Moodle button.
4. Click it.

This multi-step dance is required for every temporary session. But, why use 5 seconds when you can use only 1?

## ✨ What It Does

* **Magic Auto-Login:** Fills in your details and logs you in automatically.
* **Smart Error Detection:** If you save the wrong password, it detects the "Invalid credentials" error, deletes the bad info, and asks you to try again. No more endless login loops!
* **Keeps Your Stuff Safe:** Securely saves your login info on your own computer. It never goes anywhere else.
* **Set It and Forget It:** Asks for your **TP Number** and **Password** just once.
* **Controls Everywhere:** Adds a settings menu (⚙️) on both the Moodle page *and* the login page, so you can disable the script or reset your details anytime.
* **Straight to Moodle:** Skips the nonsense and takes you right to your Moodle dashboard after login.

## 🔧 How to Get It Working

### Step 1: Install a Userscript Manager
You'll need a browser extension to run this script. The best one is [**Tampermonkey**](https://www.tampermonkey.net/). Head over to their site and grab the version for your browser (Chrome, Firefox, Edge, etc.).

### Step 2: Install This Script
1. Click the **Tampermonkey** icon in your browser and choose **"Create a new script..."**.
2. Delete all the default text in the editor.
3. Copy all the code from the `` `apu-auto-login.user.js` `` file in this repository.
4. Paste the code into the empty Tampermonkey editor.
5. Go to **File** -> **Save**.

## 👇 How to Use It

### First-Time Setup
1. Go to the APU login page: <https://cas.apiit.edu.my/cas/login>
2. The script will pop up and ask for your **TP Number** and **Password**.
3. Once you enter them, you're all set. The script will log you in.

### Enjoy the Freedom
That's it! Just bookmark the login page to your browser. From now on, it'll log you in automatically. If you ever mistype your password, the script will catch the error and let you enter it again.

## 🔒 A Quick Word on Security

This script is pretty safe since it only saves your info on your own computer. But just be smart about it:

* This is for your **personal computer**. Don't install it on a shared or public machine (like in the library).
* Anyone who uses your browser profile could *technically* access your saved info.

## 🤙 The Fine Print

This was made for fun to solve a personal annoyance. Use it at your own risk!
