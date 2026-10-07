# Terrance Lamonte, Jr. portfolio site

A one-page portfolio: plain HTML, CSS and a small script. No build step and no dependencies, so it runs on GitHub Pages as-is.

## Files

| File | What it is |
| --- | --- |
| `index.html` | All of the page content. Edit text here. |
| `css/styles.css` | All styling. Colours and spacing are set at the top of the file. |
| `js/main.js` | The slime button and the contact form. |
| `assets/` | The five photos, the headshot PDF and your own logo. |
| `assets/logos/` | The company logos in the "worked with" scroller. |
| `404.html` | The page shown for a wrong address. |
| `favicon.png` | The browser-tab icon. |

## Editing the site

Open the file on github.com, click the pencil icon, make the change and click **Commit changes**. The live site updates about a minute later.

To swap a photo, upload a new file to `assets/` with the same file name as the one it replaces.

## Turning on the contact form

GitHub Pages cannot receive form submissions by itself, so the form is hidden until it has somewhere to send messages. Until then the contact section shows the booking email and social links.

1. Create a form at a form service that accepts a standard POST (Formspree is one) and copy the endpoint address it gives you.
2. Open `js/main.js` and paste that address between the quotes on the `FORM_ENDPOINT` line.
3. Commit the change. The form now appears next to the social links.

## Custom domain

The site is written to live at `www.terrancelamontejr.me`. GitHub adds a `CNAME` file to this repository when the custom domain is saved in **Settings > Pages**; leave that file in place.
