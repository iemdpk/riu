
// Compare version number
function isNewerVersion (oldVer, newVer) {
	const oldParts = oldVer.split('.')
	const newParts = newVer.split('.')
	for (var i = 0; i < newParts.length; i++) {
		const a = ~~newParts[i] // parse int
		const b = ~~oldParts[i] // parse int
		if (a > b) return true
		if (a < b) return false
	}
	return false
}

// Main reCaptcha event
jQuery(document).ready(function($) {
	
	var captchaLoaded = false;
	$( document ).ready(function() {

		//Load reCAPTCHA script when CF7 form field is focussed
		$('.wpcf7-form input').on('focus', function() {
			// If we have loaded script once already, exit.
			if (captchaLoaded)
			{
				return;
			}

			// Variable Intialization
			console.log('========= reCAPTCHA script loading ========');

			var head = document.getElementsByTagName('head')[0];
			var recaptchaScript = document.createElement('script');
			var cf7script = document.createElement('script');

			// Add the recaptcha site key here.
			// console.log('KEY: ' + wpcf7_recaptcha.sitekey);

			// Dynamically add Recaptcha Script
			recaptchaScript.type = 'text/javascript';
			recaptchaScript.src = 'https://www.recaptcha.net/recaptcha/api.js?render=' + wpcf7_recaptcha.sitekey + '&#038;ver=3.0';

			// Dynamically add CF7 script
			cf7script.type = 'text/javascript';
			if(isNewerVersion('5.1.9', wpcf7_recaptcha.version)) {
			//	console.log('cf7 newer version');
				cf7script.text = "let addEventsAndStuff = (t) => { var e; wpcf7_recaptcha = { ...null !== (e = wpcf7_recaptcha) && void 0 !== e ? e : {} }; const c = wpcf7_recaptcha.sitekey, { homepage: n, contactform: a } = wpcf7_recaptcha.actions, o = t => { const { action: e, func: n, params: a } = t; grecaptcha.execute(c, { action: e }).then((t => { const c = new CustomEvent(\"wpcf7grecaptchaexecuted\", { detail: { action: e, token: t } }); document.dispatchEvent(c) })).then((() => { \"function\" == typeof n && n(...a) })).catch((t => console.error(t))) }; if (grecaptcha.ready((() => { o({ action: n }) })), document.addEventListener(\"change\", (t => { o({ action: a }) })), \"undefined\" != typeof wpcf7 && \"function\" == typeof wpcf7.submit) { const t = wpcf7.submit; wpcf7.submit = function(e) { let c = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}; o({ action: a, func: t, params: [e, c] }) } } document.addEventListener(\"wpcf7grecaptchaexecuted\", (t => { console.log(); const e = document.querySelectorAll(\'form.wpcf7-form input[name=\"_wpcf7_recaptcha_response\"]\'); for (let c = 0; c < e.length; c++) e[c].setAttribute(\"value\", t.detail.token) })) }; addEventsAndStuff();";
			}
			else {
			//	console.log('cf7 older version');
				cf7script.text = "!function(t,e){var n={execute:function(e){t.execute(\""+wpcf7_recaptcha.sitekey+"\",{action:e}).then(function(e){for(var t=document.getElementsByTagName(\"form\"),n=0;n<t.length;n++)for(var c=t[n].getElementsByTagName(\"input\"),a=0;a<c.length;a++){var o=c[a];if(\"g-recaptcha-response\"===o.getAttribute(\"name\")){o.setAttribute(\"value\",e);break}}})},executeOnHomepage:function(){n.execute(e.homepage)},executeOnContactform:function(){n.execute(e.contactform)}};t.ready(n.executeOnHomepage),document.addEventListener(\"change\",n.executeOnContactform,!1),document.addEventListener(\"wpcf7submit\",n.executeOnHomepage,!1)}(grecaptcha,{homepage:\"homepage\",contactform:\"contactform\"});";
			}

			// Add Recaptcha Script
			head.appendChild(recaptchaScript);

			// Add CF7 Script AFTER Recaptcha. Timeout ensures the loading sequence.
			setTimeout(function() {
				head.appendChild(cf7script);
			}, 200);

			//Set flag to only load once
			captchaLoaded = true;
		});
	});

})