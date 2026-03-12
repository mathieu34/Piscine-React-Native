# Journal de Voyage Interactif

Application mobile React Native / Expo permettant de photographier des lieux, les géolocaliser et les visualiser sur une carte interactive avec un calendrier de navigation.

---

## 1. Pitch & User Stories

**Objectif** : Garder une trace visuelle et géographique de ses voyages directement depuis son smartphone.

| # | En tant que… | Je veux… | Afin de… |
|---|---|---|---|
| 1 | Voyageur | Prendre une photo depuis l'app | Capturer un moment avec sa position GPS |
| 2 | Voyageur | Voir mes photos sur une carte | Visualiser où j'ai été |
| 3 | Voyageur | Filtrer mes photos par date | Retrouver facilement un souvenir |
| 4 | Voyageur | Consulter mon profil et mes stats | Suivre mon activité de voyage |
| 5 | Voyageur | Supprimer une photo | Gérer ma galerie |

---

## 2. Installation & Run

```bash
# Cloner le dépôt
git clone <url-du-repo>
cd Ipssi_ExpoApp

# Installer les dépendances
npm install

# Lancer en développement
npx expo start --clear

# Scanner le QR code avec Expo Go (iOS/Android)
```

---

## 3. Architecture

### Schéma Navigation

```
Drawer (app/_layout)
├── (tabs)
│   ├── index          → Accueil (caché de la tab bar)
│   ├── camera         → Caméra
│   ├── map            → Carte
│   ├── calendar       → Calendrier
│   ├── photos/
│   │   ├── _layout    → Stack
│   │   ├── index      → Galerie photos
│   │   └── detail     → Détail photo (à venir)
│   └── profile        → Profil & Stats
├── profile            → Profil (drawer)
└── logout             → Déconnexion (drawer)
```

### Schéma Services & Dataflow

```
UI (Screens)
 │
 ├── photoservices.js
 │    ├── getAllPhotos()     ──► AsyncStorage ──► Photo[]
 │    ├── savePhoto(photo)   ──► AsyncStorage
 │    ├── deletePhoto(uri)   ──► AsyncStorage
 │    └── filterPhotos()     ──► AsyncStorage ──► Photo[]
 │
 ├── locationservices.js
 │    ├── requestLocationPermission()
 │    └── getCurrentLocation() ──► { lat, lon }
 │
 └── statsServices.js
      ├── getTotalPhotos(photos)   ──► number
      ├── getMostActiveDay(photos) ──► { day, count }
      └── getStats(photos)         ──► { totalPhotos, mostActiveDay }

Offline : toutes les données sont stockées localement (AsyncStorage).
Aucune connexion réseau requise après installation.
```
---

## 4. Fonctionnalités livrées

- [x] Caméra — capture photo avec prévisualisation et confirmation
- [x] Géolocalisation — position GPS récupérée à la sauvegarde
- [x] Stockage local — AsyncStorage via `photoservices`
- [x] Suppression de photo — depuis la galerie
- [x] Carte — marqueurs pour chaque photo sauvegardée
- [x] Carte — centrage automatique sur position GPS actuelle
- [x] Carte — modal au tap sur un marqueur (aperçu + date + coordonnées)
- [x] Carte — rechargement automatique à chaque visite (`useFocusEffect`)
- [x] Galerie — FlatList triée par date décroissante
- [x] Galerie — filtre par date
- [x] Profil — statistiques (nb photos, jour le plus actif)
- [x] Navigation — Tabs + Drawer + Stack
- [x] Calendrier — jours marqués + filtrage 

---

## 5. Répartition des tâches

Caméra (capture, preview, save) :  Mathieu 
Géolocalisation & locationService : Mathieu 
Services (locations, photo, stats)  : Amos 
Carte (MapView, marqueurs, modal) : Mathieu 
Galerie photos (FlatList, filtres) : Mathieu 
Profil & Stats : Amos
Calendrier : Amos 
Navigation (Drawer + Tabs + Stack) : Bathy(react native) / Mathieu(expo) 


