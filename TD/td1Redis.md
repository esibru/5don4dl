---
title: Introduction à Redis
description:
layout: ../../../layouts/MainLayout.astro
---

## 1) Introduction

Redis (**RE**mote **DI**ctionary **S**erver) est un système de gestion de base de données (SGBD) NoSQL, clé-valeur et in-memory. Nous en avons brièvement parlé dans le cours de 2DON1, et vous proposons ici une introduction plus détaillée.

> *Exercice*: Définissez les notions suivantes:
> 
> - SGBD NoSQL.
> - SGBB clé-valeur.
> - SGBD in-memory.
> 
> Pour rappel, toutes ces notions ont été vues en 2DON1, reprenez les slides associés si vous souhaitez vous rafraichir la mémoire.


La documentation Redis officielle est disponible ici: https://redis.io/

## 2) Installation

Redis n'est pas officiellement supporté sur Windows, nous vous proposons donc ici une installation via Docker qui fonctionne quel que soit votre système d'exploitation (pour autant que vous ayez Docker installé). Ceux d'entre-vous qui travaillent sur Linux/MacOs peuvent aussi suivre la procédure d'installation fournie dans la documentation officielle.

Pour débuter, tapez: 

``` bash
$ docker run --name MyRedis -p 6379:6379 -d redis
```
Ceci crée une nouvelle image avec Redis installé, lance un conteneur associé appelé MyRedis (utilisez un autre nom de votre choix si vous le désirez) et lance le serveur Redis sur ce conteneur. Ceux d'entre-vous qui n'utilisent pas Docker devront lancer le serveur à la main au moyen de la commande `redis-server`.

L'option `-p 6379:6379` permet d'exposer le port 6379 (port standard auquel est connecté le serveur Redis) et le rediriger vers le port 6379 de la machine hôte. Ceci nous permettra (voir plus loin) de pouvoir communiquer avec ce serveur à partir d'une application externe.

Pensez à vérifier que le conteneur est bien actif au moyen de la commande:

``` bash
$ docker ps -a
```

Connectez-vous à présent au terminal du conteneur:

``` bash
$ docker exec -it MyRedis /bin/bash
```

Vous êtes désormais prêt à utiliser Redis. 

**Attention**: La création de l'image Redis ne doit être exécutée qu'une seule fois. A l'avenir, pour stoper/lancer le conteneur `MyRedis`, utilisez:

``` bash
$ docker stop MyRedis
$ ...
$ docker start MyRedis
```

## 3) Commandes de base

Pour nous familiariser avec les commandes de base de Redis, lançons le client Redis standard:

``` bash
$ redis-cli
```
Le serveur attend alors que vous entriez une commande.

Pour stocker un nouveau couple (clé,valeur), utilisez simplement la commande `SET`. Par exemple, pour stocker la note (sur 20) de l'étudiant g12345 pour le cours de 5DON4, tapez:

``` bash
$ SET g12345 18
```
Pour lire la valeur associée à la clé `g12345`:

``` bash
$ GET g12345
```

Redis accepte n'importe quelle suite d'octet en guise de clé (avec une taille de clé limitée à 512 MB), ici nous nous simplifierons la vie et utiliserons simplement des String. Les valeurs associées aux clés peuvent être de différent types, les commandes GET et SET stockent les valeurs comme des String (même si vous leur passez des nombres entiers).

Pour lister toutes les clés stockées:

``` bash
$ KEYS *
```
> **Ne pas utiliser la commande KEYS en production !** Celle-ci impacte forcément les performances pour une base de données d'une certaine taille.

Voyons comment manipuler un autre type des données: les listes. Les listes sont implémentées comme des listes chaînées sous Redis (pour des raisons de performance).

Créons par exemple une nouvelle liste contenant quelques étudiants du groupe D111:

``` bash
$ LPUSH D111 g12345 g23456 g34567
```
`LPUSH` permet d'insérer en tête de liste. Pour supprimer et récupérer la valeur de tête:

``` bash
$ LPOP D111
```
Pour connaître le type de données (String, Liste, ...) associé à une clé sous Redis, utilisez `TYPE`:

``` bash
$ TYPE D111
```

> *Exercice*: Utilisez la documentation officielle de Redis pour:
> 
> - Ajouter l'étudiant g45678 en queue de liste.
> - Récupérer la taille de la liste.
> - Supprimer et récupérer la valeur de queue.
>
> A vous de trouver quelles commandes utiliser.

Pour supprimer une clé:

``` bash
$  DEL g12345
```

Les listes sont automatiquement supprimées dès qu'elles sont vides (mais vous pouvez la supprimer avant avec DEL si vous le souhaitez).

Il est aussi possible de demander à Redis de supprimer automatiquement une clé avec un certain nombre de secondes (utile pour nettoyer la mémoire automatiquement si on sait que la clé ne sera plus utile passé ce délai):

``` bash
$  EXPIRE g23456 5
```
N'hésitez pas à découvrir d'autres commandes Redis par vous même en parcourant la documentation en ligne.

> **Attention:** Redis étant un système In-Memory, les données sont à priori stockées en mémoire centrale (et pas sur le disque) sauf configuration contraire.

La façon dont Redis assure la persistance des données peut (évidemment !) se configurer, nous allons en parler dans la suite. Sachez déjà qu'il est possible de forcer une sauvegarde sur le disque en entrant:

``` bash
$  SAVE
```
Ceci crée un fichier binaire `dump.rdp` que Redis peut utiliser pour reconstituer la DB en mémoire centrale. Redis exécute automatiquement un SAVE lorsque le serveur est stoppé (lorsqu'on stoppe le conteneur Docker, dans notre cas).

## 4) Librairies clientes

Redis fournit différentes librairies permettant de se connecter au serveur à partir d'une application Java, Python, JavaScript, C++, etc (voir la documentation en ligne).

Sous Java, nous utiliserons la librairie `Jedis`. Créez maintenant un nouveau projet Java sous Maven. Ajoutez la dépendance suivante au pom.xml:

```xml
<dependency>
    <groupId>redis.clients</groupId>
    <artifactId>jedis</artifactId>
    <version>6.0.0</version>
</dependency>
```







