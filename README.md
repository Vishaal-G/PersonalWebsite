# vishaal-gopalan.me

Personal portfolio for Vishaal Gopalan, built with Next.js 14, Tailwind, and Framer Motion.

- `/` is the interactive 3D baseball-stadium portfolio (React Three Fiber).
- `/portfolio` is a simple scrolling version (experience, projects, skills, writing, contact), linked from the stadium's "Simple view" button.

## Editing content

All content lives in **`lib/constants.ts`**. Both the 3D stadium and the simple view read from it.

| What | Where |
| --- | --- |
| Experience, projects, skills, education, articles | `lib/constants.ts` |
| Resume PDF | `public/Vishaal_Software_Resume.pdf` (replace the file and keep the name) |
| Project screenshots | `public/images/projects/*.svg` are placeholders. Drop in a PNG/JPG and update `image` |
| Demo videos | `public/videos/placeholder-demo.mp4` is a placeholder. Add your MP4 and update `video` |

Set `featured: true` on a project to show it as a large card with an inline video, stats, and highlights.

## Contact form

The contact form sends mail through EmailJS. Set these in `.env.local`:

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
NEXT_PUBLIC_CONTACT_TO_EMAIL=
```

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```
