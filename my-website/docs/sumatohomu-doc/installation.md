---
sidebar_label: 'Installation'
sidebar_position: 1
---
# API MAISON DOMOTIQUE - JEREMY LACAZE-RUSQUES / JEREMY GARCIA


# Environment variables to be installed


To use the application you need to install `NodeJS` and add the `nodejs`'s path in the `system variables` named `Path`

---

# Setup the backend

In first you need to `Open a new Terminal`

Inside it, `copy/paste the following command` : 

```ts

npm install

```
---

# Launch the backend

Inside the Terminal, `copy/paste the following command` : 

```ts

npm start

```

---

# Open Route ( If you use Windows )

Go on https://ngrok.com/download and download `ngrok`'s zip.

`Unzip the zip`.

After that `open a new Terminal`.

Inside it, `make the following commands` :

```ts

cd <PATH-OF-THE-NGROK-UNZIP>

ngrok http 3000

```

Your route is open !

----

# Other Tools

Two applications can be used to use the back without going through the front.

`Insomnia` which allows to execute HTTP methods ( `GET/POST/PATCH/DELETE/UPDATE/PUT/OPTIONS/HEAD` ) in order to add, update or delete elements in the database.

`MongoDB Compass` which displays the database and the items in it.