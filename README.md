# quiz-dev

ceci est l'API de l'application QUIZ DEV ;

## installation

Clone le projet depuis ce repo avec la commande `git clone https://github.com/dani03/quizDEV.git ` dans un dossier.

Placez-vous ensuite dans le projet (quizDEV) `cd quizDEV`

Une fois dans le dossier dans le terminal taper la commande `docker-compose run --rm composer install` afin d'installer les dependence du projet.
Ensuite placer vous dans le dossier `src` copier le fichier `.env.exemple`et renommer le en `.env`.
Dans le fichier.env.exemple copier et coller le block suivant dans le fichier .env :

```
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=quizdevbdd
DB_USERNAME=homestead
DB_PASSWORD=secret

```

DB_CONNECTION=mysql, 'mysql' ici correspond au service (conteneur) mysql qu'on peut voir dans le fichier docker-compose.yml à la racine du projet ainsi que le mot de passe (DB_PASSWORD) et le username (DB_USERNAME) tous definit dans le docker-compose.yml dans le service (conteneur) mysql.

Ensuite taper la commande `docker-compose run --rm artisan key:generate` afin de générer une clé unique pour notre application.

Et pour mettre à jour les utilisateurs password, on tape la commande `docker compose run --rm artisan passport:install` afin de
générer les utilisateurs.

Si le dossier "mysql" est présent à la racine de votre projet supprimer le.

Une fois la clé générée, taper la commande `docker-compose up --build -d nginx` pour lancer vos conteneurs pour l'api et si vous voulez lancez aussi l'application front lancez la commande `docker-compose up --build -d nginx nextjs`, ensuite taper la commande `docker-compose ps` pour voir si vos conteneurs tournent bien. Vous pouvez tester l'api sur l'endpoint `http://localhost/api/v1/test. Vous devriez avoir un retour si vous êtes connecté à l'api.

# RUN les migrations

Une fois vos conteneurs en marche, taper la commande `docker compose run --rm artisan migrate` afin de lancer les migrations vers votre base de données.
Après les migrations lancer les seeders afin de peupler notre base de données avec la commande `docker compose run --rm artisan db:seed`.

# PHP MY ADMIN

L'accès à PHpMyadmin est sur le port 2023 et donc sur le lien : http://localhost:2023 et le port 2025 pour le SGBD adminer similaire à phpMyadmin

username : homestead
password : secret

# Rafraichir la base de données 

Pour simplifier le développement après une modification de la base de données, vous pouvez exécuter la commande suivante :

`docker compose run --rm artisan migrate:refresh`
Cette commande rafraîchit la base de données en supprimant et recréant toutes les tables et colonnes vides. Ensuite, exécutez les commandes suivantes pour configurer votre environnement :


`docker compose run --rm artisan passport:install`
et 
`docker compose run --rm artisan db:seed`
La première commande installe Laravel Passport pour la gestion des API, tandis que la seconde commande ajoute des données factices, y compris des quiz, des questions et des utilisateurs simulés.

# La documentation des endpoints de l'API

Pour voir les routes (endpoints) que vous pouvez utiliser, vous pouvez avoir accès si vos conteneurs sont en marche sur le lien : <a href="http://localhost:3002/docs/index.html">
voir la doc.
</a>
ou enencore <a href="http://localhost:3002/docs/api#/"> Documentation  API SCRAMBLE  </a>



# FRONT

`cd /front`
`npm install`
`npm run dev`

# Gitignore

```
/mysql/*
/front/.next
/front/node_modules
/front/README.md
```

# Générer des questions avec open ai 
Afin de générer des questions avec open ai, dans votre fichier `.env` ajouter une clé `OPENAI_API_KEY` et renseigner votre clé d'api (api key) 
open ai. Vous pouvez créer une clé open ai sur la plateforme <a href="https://platform.openai.com/"> plateforme open ai</a>.

# En cas de probleme de cache BDD

- `docker compose run --rm artisan cache:clear`
- `docker compose run --rm artisan config:clear`
