// ==UserScript==
// @name         APU Moodle Login Skipper
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Automatically logs into APU/APIIT CAS, detects failed logins, and adds a settings menu.
// @author       GarnettJZ
// @match        https://cas.apiit.edu.my/cas/login*
// @match        https://lms2.apiit.edu.my/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// ==/UserScript==

(function() {
    'use strict';

    // --- CONSTANTS ---
    const MOODLE_SERVICE_URL = "https://lms2.apiit.edu.my/login/index.php";

    /**
     * Creates and injects a settings panel onto the current page.
     * @param {boolean} isLoginPage - True if the panel is for the CAS login page.
     */
    async function createSettingsPanel(isLoginPage = false) {
        // On Moodle, check if we are on a main page before adding the button
        if (!isLoginPage && !document.querySelector('#page-header, .dashboard-card')) {
             return;
        }

        const wasDisabled = await GM_getValue('auto_login_disabled', false);

        const settingsContainer = document.createElement('div');
        settingsContainer.style.position = 'fixed';
        settingsContainer.style.zIndex = '9999';
        settingsContainer.style.fontFamily = 'Arial, sans-serif';

        const settingsButton = document.createElement('button');
        settingsButton.style.color = 'white';
        settingsButton.style.border = 'none';
        settingsButton.style.padding = '10px 15px';
        settingsButton.style.cursor = 'pointer';
        settingsButton.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';

        // Style the button and container based on the page
        if (isLoginPage) {
            settingsContainer.style.top = '15px';
            settingsContainer.style.right = '15px';
            settingsButton.innerHTML = '⚙️';
            settingsButton.style.borderRadius = '50%';
            settingsButton.style.backgroundColor = '#6c757d';
            settingsButton.title = 'Auto-Login Settings';
        } else {
            settingsContainer.style.bottom = '20px';
            settingsContainer.style.left = '20px';
            settingsButton.innerHTML = '⚙️ Auto-Login Settings';
            settingsButton.style.borderRadius = '20px';
            settingsButton.style.backgroundColor = '#007bff';
        }
        settingsContainer.appendChild(settingsButton);

        const menuPopup = document.createElement('div');
        menuPopup.style.display = 'none';
        menuPopup.style.position = 'absolute';
        menuPopup.style.backgroundColor = 'white';
        menuPopup.style.border = '1px solid #ccc';
        menuPopup.style.borderRadius = '8px';
        menuPopup.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
        menuPopup.style.padding = '10px';
        menuPopup.style.minWidth = '180px';

        if (isLoginPage) {
            menuPopup.style.top = '45px';
            menuPopup.style.right = '0';
        } else {
            menuPopup.style.bottom = '50px';
            menuPopup.style.left = '0';
        }

        menuPopup.innerHTML = `
            <div id="toggleAutoLogin" style="display: flex; align-items: center; width: 100%; text-align: left; padding: 8px; border-radius: 4px; background: none; cursor: pointer;">
                <span style="font-size: 1.2em; margin-right: 8px;">${wasDisabled ? '✅' : '❌'}</span>
                <span>${wasDisabled ? 'Enable Auto-Login' : 'Disable Auto-Login'}</span>
            </div>
            <div id="resetCredentials" style="display: flex; align-items: center; width: 100%; text-align: left; padding: 8px; border-radius: 4px; background: none; cursor: pointer;">
                <span style="font-size: 1.2em; margin-right: 8px;">🔑</span>
                <span>Reset Credentials</span>
            </div>
        `;
        // Add hover effect for better UX
        Array.from(menuPopup.children).forEach(child => {
            child.addEventListener('mouseenter', () => child.style.backgroundColor = '#f0f0f0');
            child.addEventListener('mouseleave', () => child.style.backgroundColor = 'white');
        });

        settingsContainer.appendChild(menuPopup);

        // --- Event Listeners ---
        settingsButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent click from closing the menu immediately
            menuPopup.style.display = menuPopup.style.display === 'none' ? 'block' : 'none';
        });
        document.addEventListener('click', () => { // Hide menu if clicking outside
             menuPopup.style.display = 'none';
        });

        menuPopup.querySelector('#toggleAutoLogin').addEventListener('click', async () => {
            const wasDisabled = await GM_getValue('auto_login_disabled', false);
            const toggleDiv = menuPopup.querySelector('#toggleAutoLogin');

            if (wasDisabled) {
                await GM_setValue('auto_login_disabled', false);
                alert('Auto-login has been ENABLED.');
                toggleDiv.innerHTML = `<span style="font-size: 1.2em; margin-right: 8px;">❌</span><span>Disable Auto-Login</span>`;
            } else {
                await GM_setValue('auto_login_disabled', true);
                alert('Auto-login has been DISABLED.');
                toggleDiv.innerHTML = `<span style="font-size: 1.2em; margin-right: 8px;">✅</span><span>Enable Auto-Login</span>`;
            }

            if (isLoginPage) {
                location.reload(); // Reload to apply change immediately on login page
            }
        });

        menuPopup.querySelector('#resetCredentials').addEventListener('click', () => {
            if (confirm('Are you sure you want to delete your stored username and password?')) {
                GM_deleteValue('apu_username');
                GM_deleteValue('apu_password');
                alert('Credentials have been reset. You will be prompted for them on your next login.');
                menuPopup.style.display = 'none';
            }
        });

        document.body.appendChild(settingsContainer);
    }

    /**
     * Checks the page for the "Invalid credentials" error message.
     * If found, it deletes the stored credentials.
     */
    async function checkForFailedLogin() {
        // Find any element that contains the "Invalid credentials" text.
        const errorBox = Array.from(document.querySelectorAll('div, span, p, .alert')).find(
            el => el.textContent.trim().includes('Invalid credentials')
        );

        if (errorBox) {
            console.log("Invalid credentials detected.");
            // Delete the bad credentials
            await GM_deleteValue('apu_username');
            await GM_deleteValue('apu_password');

            // Inform the user
            alert('Login Failed: The saved credentials were incorrect. Please re-enter them.');
            return true; // Indicate failure was handled
        }
        return false; // No failure detected
    }


    /**
     * Performs the automatic login on the CAS page.
     */
    async function autoLogin() {
        if (await GM_getValue('auto_login_disabled', false)) {
            console.log("Auto-login is disabled by user.");
            return;
        }

        const usernameField = document.getElementById('username');
        const passwordField = document.getElementById('password');
        const loginButton = document.querySelector('input[name="submit"]');

        if (!usernameField || !passwordField || !loginButton) {
            return; // Silently fail if form isn't there
        }

        let username = await GM_getValue('apu_username');
        let password = await GM_getValue('apu_password');

        // If credentials aren't stored (or were just deleted), prompt the user.
        if (!username || !password) {
            username = prompt("Auto-Login Setup: Please enter your TP Number:");
            if (!username) return; // User cancelled
            password = prompt("Auto-Login Setup: Please enter your Password:");
            if (!password) return; // User cancelled
            await GM_setValue('apu_username', username);
            await GM_setValue('apu_password', password);
            alert("Credentials saved! The script will now attempt to log you in.");
        }

        usernameField.value = username;
        passwordField.value = password;
        setTimeout(() => loginButton.click(), 300);
    }

    // --- Main Router ---
    async function main() {
        if (window.location.hostname.includes('cas.apiit.edu.my')) {
            createSettingsPanel(true);
            await checkForFailedLogin(); // Check for a failed login from the previous attempt.

            const form = document.querySelector('form');
            if (form && !window.location.search.includes('service=')) {
                const currentAction = form.getAttribute('action');
                form.setAttribute('action', `${currentAction}?service=${encodeURIComponent(MOODLE_SERVICE_URL)}`);
            }
            autoLogin(); // This will proceed with login or re-prompt if credentials were just deleted.
        } else if (window.location.hostname.includes('lms2.apiit.edu.my')) {
            createSettingsPanel(false);
        }
    }

    // Run the script once the page has loaded
    window.addEventListener('load', main);

})();
