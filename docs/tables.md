


# Tables pour l'application Kanban

## Table `ROLE`
- `code_role` : INTEGER (clé primaire)
- `role` : VARCHAR

## Table `UTILISATEUR`
- `code_utilisateur` : INTEGER (clé primaire)
- `Nom` : VARCHAR
- `Email` : VARCHAR (unique)
- `Mot_De_Passe` : VARCHAR

## Table `LISTE`
- `code_liste` : INTEGER (clé primaire)
- `nom` : VARCHAR
- `ordre` : INTEGER

## Table `CARTE`
- `code_carte` : INTEGER (clé primaire)
- `titre` : VARCHAR
- `ordre` : INTEGER
- `couleur` : VARCHAR (optionnel)

## Table `LABEL`
- `code_label` : INTEGER (clé primaire)
- `nom` : VARCHAR
- `couleur` : VARCHAR

## Relations

### Relation `POSSEDE`
- `code_utilisateur` : INTEGER (clé étrangère)
- `code_liste` : INTEGER (clé étrangère)

### Relation `APPARTIENT`
- `code_carte` : INTEGER (clé étrangère)
- `code_liste` : INTEGER (clé étrangère)

### Relation `AFFECTE`
- `code_carte` : INTEGER (clé étrangère)
- `code_label` : INTEGER (clé étrangère)

### Relation `AFFECTE_ROLE`
- `code_utilisateur` : INTEGER (clé étrangère)
- `code_role` : INTEGER (clé étrangère)

---
