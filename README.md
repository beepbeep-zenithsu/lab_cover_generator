# IUT Lab Cover Generator

Open this folder in VS Code. No build step: it is plain HTML/CSS/JS.
To test locally use the "Live Server" extension (right-click `index.html` -> Open with Live Server).
Opening `index.html` by double-click will NOT work (browsers block loading the cover images that way).

## Folder map
```
index.html            IUT page (IUT students only)
cuet.html             CUET page (CUET students only)
css/style.css         look & feel
js/config.js          admin email, Firebase / EmailJS keys, department codes
js/students.js        STUDENT LIST  (add lines here)
js/courses.js         COURSES, experiments, teachers, text positions (add blocks here)
js/cuet.js            CUET data (copy for another university)
cuet.html             CUET page;  NEWUNI-template.html = starting point for a new university
js/app.js             logic (rarely needs editing; ID rules are in parseId())
assets/templates/     cover images (mom, material, thermo, fluid1..6)
assets/fluid-rest/    report pages for each Fluid experiment (cover excluded)
firestore.rules       security rules to paste into Firebase
```

## One project, one page per university (nobody sees another university's interface)
| Who | Link | Loads |
|---|---|---|
| IUT | `https://<user>.github.io/<repo>/` (index.html) | IUT students, courses, admin, Firebase. No CUET code. |
| CUET | `https://<user>.github.io/<repo>/cuet.html` | CUET data only. No IUT students/courses/admin/Firebase/config. |

* Share only the matching link with each group. There is no switch, list or button that leads to another university's page, and its data is never downloaded by your page.
* Each university keeps its own settings in its own file (IUT: `js/config.js`, `js/students.js`, `js/courses.js`; CUET: `js/cuet.js`, including its correction email).

### Adding a new university (e.g. BUET -> `buet`)
1. Copy `js/cuet.js` to `js/buet.js`; rename `window.MANUAL_UNIS.cuet` to `window.MANUAL_UNIS.buet`; change name, ID length, students, section/group rules, cover image, positions, experiments.
2. Put its cover image in `assets/templates/`.
3. Copy `NEWUNI-template.html` to `buet.html` and replace `NEWUNI` with `buet` (3 places: title, script line, `PAGE_UNI`).
4. Push. Share `https://<user>.github.io/<repo>/buet.html` with them.

* CUET section / lab group come from the roll number (see `sectionFor` / `groupFor` in `js/cuet.js`): 1-30 A1, 31-60 A2, 61-90 B1, 91-120 B2, 121-150 C1, 151+ C2. Level, Term, Section, Group and dates are still editable on the page.
* **IPE-only courses** (IPE 4304, IPE 4404, ME 4354) use the Mechanics of Materials cover: the course code and name are repainted from the course's `code` / `name` (see `ipeCourse()` and `MOM_OVERLAY` in `js/courses.js`). They appear only for IPE students (`depts: ["12"]`). To add another one, copy an `ipeCourse(...)` line.
* If a department/course has no routine in `js/courses.js`, Date of Performance starts at today (editable) and Submitted To is left blank.

## Step 1: Put it online (GitHub Pages) so it works on your phone
1. Create a GitHub repo and upload **everything inside this folder** (the files must sit at the repo root,
   with `index.html` at the top and the `assets`, `js`, `css` folders next to it).
2. Repo -> Settings -> Pages -> "Deploy from a branch" -> Branch `main`, folder `/ (root)` -> Save.
3. Wait 1-2 minutes, open `https://<your-username>.github.io/<repo-name>/`.
A blank page or missing covers almost always means Pages is off, the folders were not uploaded, or
`index.html` is not at the root. Capitalisation matters (`assets` is not `Assets`).

## Adding data later
* **Students**: add `ID Name` lines in `js/students.js`. Or use the Admin panel (Step 2).
* **New course**: put the cover JPG in `assets/templates/`, copy a block in `js/courses.js`, edit id/code/name/exps.
  Use `fields: "full"` for the MoM-style cover, `fields: "basic"` for Fluid-style covers.
* **Text in the wrong place?** Change the `[x, y]` numbers in `pos` (PDF points, A4 = 595 x 842).
* **New department**: add its 2-digit code in `DEPTS` in `js/config.js`.
* **Teachers / weekday for Date of Performance**: the `routine` part of a course.

## Step 2: Firebase (real admin security + edits visible to everyone)  ~10 minutes, free plan
1. https://console.firebase.google.com -> Add project (no Analytics needed).
2. Build -> **Authentication** -> Get started -> Sign-in method -> enable **Email/Password**, and inside it turn on
   **Email link (passwordless sign-in)**. Then Settings -> Authorized domains -> add `<your-username>.github.io`.
3. Build -> **Firestore Database** -> Create database (production mode, any region).
   Then the **Rules** tab -> paste the contents of `firestore.rules` -> Publish.
   (If your admin email ever changes, change it in the rules too.)
4. Project settings (gear) -> Your apps -> Web app `</>` -> register -> copy the `firebaseConfig`
   values into `FIREBASE: { ... }` in `js/config.js`.
5. Re-upload `js/config.js` to GitHub.

How admin works then: Admin -> "Email me a sign-in link" -> Google emails a link to the admin address ->
open it within 2 minutes (the page rejects older links) -> the panel opens. Saving writes to Firestore, so
students see the new list immediately, no re-publishing. Only the verified admin email can write
(enforced by the Firestore rules on Google's servers, not in the browser).

Note: Firebase gives a sign-in *link*, not a typed 6-digit code, and the 2-minute limit is checked by the page.
The real protection is the server rule above. A typed code with a server-enforced timer would need a Cloud
Function, which requires Firebase's pay-as-you-go plan.
Firebase web config keys are not secrets; the rules are what protect the data.

## Optional fallback: EmailJS 6-digit code (no Firebase)
Used only when `FIREBASE` is `null`. Create a free account at emailjs.com, add an email service, create a template
containing `{{code}}` (set "To email" to `{{to_email}}`), then paste Service ID, Template ID, Public Key into
`EMAILJS` in `js/config.js`. Edits then stay in that browser only, so this mode is for convenience, not security.
Until neither option is configured, the Admin button just says it is not set up (the code is never shown on screen).

## Notes
* Print button removed.
* Fluid Mechanics I: "Download Cover" = cover only; "Download Lab Report" = cover + report pages (no lab manual).
  Experiment 6's source file is titled "Lab Report and Manual", so its report pages include the manual part.
* The Thermodynamics cover template says "Basic Thermodynamics LAb" (capital A) in the original file.
* Admin can edit students/courses online but cannot upload new cover images; add those to `assets/templates/` and push to GitHub.
