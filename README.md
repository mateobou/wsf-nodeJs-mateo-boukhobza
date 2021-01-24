# Sujet TP

## Les consignes

- Terminer les routes (POST/PUT) de vehicules afin de renvoyer une 400 en cas de problèmes avec la requête.
  Bonus: déterminer les champs en erreur et renvoyer un message de retour clair, ex:
```json
{
    "marque": "must not be empty",
    "model": "must not be empty"
}
```
- Créer le CRUD (routes REST) complet de Concessionaire
- Créer le model Owner et son CRUD (routes REST)

## Les différents modèles

Owner
```
  firstname: string (max 50char) non null
  lastname: string (max 100char) non null
  birthday: date (> 18years old) non null
  LicenseType: string (doit être voiture ou moto ou bateau ou avion)
```

Concessionaire
```
  address: string non null
  proprietaire: string non null
  open: boolean non null default true
```

Vehicule
```
  marque: string non null
  model: string non null
  dateFabrication: date (> 1850-01-01)
```