# APU Moodle Login Skipper 🚀
A cheeky little Tampermonkey script that logs you straight into Moodle, because who has time to click through APSpace? Now with extra smarts to handle bad passwords!

## 🤔 The Annoying Part
You know the drill. To get to Moodle, you have to:

Go to APSpace.

Log in.

Find the Moodle button.

Click it.

This multi-step dance is required for every temporary session. This script says "nah" to all that and takes you straight to the good stuff.

## ✨ What It Does
Magic Auto-Login: Fills in your details and logs you in automatically.

Smart Error Detection: If you save the wrong password, it detects the "Invalid credentials" error, deletes the bad info, and asks you to try again. No more endless login loops!

Keeps Your Stuff Safe: Securely saves your login info on your own computer. It never goes anywhere else.

Set It and Forget It: Asks for your TP Number and password just once.

Controls Everywhere: Adds a settings menu (⚙️) on both the Moodle page and the login page, so you can disable the script or reset your details anytime.

Straight to Moodle: Skips the nonsense and takes you right to your Moodle dashboard after login.

🔧 How to Get It Working
You'll need a browser extension to run this. Tampermonkey is the way to go.

Get Tampermonkey:

Head over to tampermonkey.net.

Grab the version for your browser (Chrome, Firefox, etc.).

Install This Script:

Click the Tampermonkey icon in your browser and choose "Create a new script...".

Delete all the default text.

Copy all the code from the apu-auto-login.user.js file.

Paste it into the empty Tampermonkey editor.

Hit File -> Save.

## 👇 How to Use It
First-Time Setup:

Go to the APU login page: https://cas.apiit.edu.my/cas/login

The script will pop up and ask for your TP Number and Password.

Once you enter them, you're all set. The script will log you in.

Enjoy the Freedom:

That's it! Just bookmark the login page. From now on, it'll log you in automatically.

If you ever mistype your password, the script will catch it and let you enter it again.

## 🔒 A Quick Word on Security
This script is pretty safe since it only saves your info on your own computer. But just be smart about it:

This is for your personal computer. Don't install it on a shared or public machine (like in the library).

Anyone who uses your browser profile could technically access your saved info.

## 🤙 The Fine Print
This was made for fun to solve a personal annoyance. Use it at your own risk, and don't blame me if something goes weird!
