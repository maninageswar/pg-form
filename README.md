# how to setup this project in your local

## prerequisites

- node

- pocketbase

## how to setup the project

clone this project

```sh
# get inside project folder
cd pg-form

# install dependencies
npm i
```

## how to setup the pocketbase

Install pocketbase form [here](https://pocketbase.io/docs/). Once installed extract the zip folder. You could start the application by running ./pocketbase serve in the extracted directory.

And that's it! The first time it will generate an installer link that should be automatically opened in the browser to set up your first superuser account (you can also create the first superuser manually via ./pocketbase superuser create EMAIL PASS).

The started web server has the following default routes:

- http://127.0.0.1:8090 - if pb_public directory exists, serves the static content from it (html, css, images, etc.)
- http://127.0.0.1:8090/_/ - superusers dashboard
- http://127.0.0.1:8090/api/ - REST-ish API

Once you create your superuser account(email, password) then replace POCKETBASE_USER_NAME and POCKETBASE_PASSWORD in .env file of the project with yours and also
once the superuser account is created you will land in superusers dashboard page. There, go to import collections (http://127.0.0.1:8090/_/#/settings/import-collections) under settings and paste the content the is avaliable [in this file.](https://github.com/maninageswar/pocketbase-collection-for-pg-form-project/blob/main/pgPropertiesCollection_schema.json) Hit review and import. Now if you go to collection tab in the dashboard you can see pgProperties collection.



## run the application

- run ui

```sh
# get inside project folder
cd pg-form

# run the application
npm run dev
```

- run pocketbase

```sh
# get inside pocket base extracted folder
cd your-pocketbase-extracted-folder

# run pocketbase
pocketbase serve
```
