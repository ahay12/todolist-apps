# todolist-app

HOW TO INSTALL

Require :
- node js
- tailwind
- electron js
# download node js
install node js v16.16.0 [disini](https://nodejs.org/en/)
# install tailwind
install tailwind terlebih dahulu [disini](https://tailwindcss.com/docs/installation)
# configure path
tailwind.config.js
```
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./layout/index.html"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

# run tailwind
```
npx tailwindcss -i ./css/input.css -o ./dist/output.css --watch
```

# install electron js
```
npm install --save-dev electron
```
# run electron
```
npm run start
```
