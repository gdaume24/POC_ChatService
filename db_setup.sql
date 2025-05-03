-- Création de la base de données
CREATE DATABASE IF NOT EXISTS your_car_your_way;
USE your_car_your_way;

-- Table AGENCE
CREATE TABLE AGENCE (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ville VARCHAR(100) NOT NULL,
    adresse TEXT NOT NULL,
    INDEX idx_ville (ville)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table UTILISATEUR
CREATE TABLE UTILISATEUR (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    mot_de_passe VARCHAR(255) NOT NULL,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    date_naissance DATE NOT NULL,
    adresse TEXT NOT NULL,
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table VEHICULE
CREATE TABLE VEHICULE (
    id INT AUTO_INCREMENT PRIMARY KEY,
    modele VARCHAR(100) NOT NULL,
    categorie_acriss VARCHAR(10) NOT NULL,
    tarif_journalier DECIMAL(10,2) NOT NULL,
    agence_id INT NOT NULL,
    FOREIGN KEY (agence_id) REFERENCES AGENCE(id) ON DELETE CASCADE,
    INDEX idx_categorie (categorie_acriss),
    INDEX idx_agence (agence_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table RESERVATION
CREATE TABLE RESERVATION (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date_debut DATETIME NOT NULL,
    date_fin DATETIME NOT NULL,
    statut ENUM('confirmée', 'annulée', 'en cours') NOT NULL DEFAULT 'en cours',
    montant_total DECIMAL(10,2) NOT NULL,
    utilisateur_id INT NOT NULL,
    vehicule_id INT NOT NULL,
    FOREIGN KEY (utilisateur_id) REFERENCES UTILISATEUR(id) ON DELETE CASCADE,
    FOREIGN KEY (vehicule_id) REFERENCES VEHICULE(id) ON DELETE CASCADE,
    INDEX idx_dates (date_debut, date_fin),
    INDEX idx_utilisateur (utilisateur_id),
    INDEX idx_vehicule (vehicule_id),
    CONSTRAINT chk_dates CHECK (date_fin > date_debut)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table PAIEMENT
CREATE TABLE PAIEMENT (
    id INT AUTO_INCREMENT PRIMARY KEY,
    transaction_id VARCHAR(255) NOT NULL UNIQUE,
    montant DECIMAL(10,2) NOT NULL,
    date_paiement DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    reservation_id INT NOT NULL UNIQUE,
    FOREIGN KEY (reservation_id) REFERENCES RESERVATION(id) ON DELETE CASCADE,
    INDEX idx_transaction (transaction_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table MESSAGE
CREATE TABLE MESSAGE (
    id INT AUTO_INCREMENT PRIMARY KEY,
    contenu TEXT NOT NULL,
    date_envoi DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    utilisateur_id INT NOT NULL,
    FOREIGN KEY (utilisateur_id) REFERENCES UTILISATEUR(id) ON DELETE CASCADE,
    INDEX idx_utilisateur (utilisateur_id),
    INDEX idx_date (date_envoi)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Index supplémentaires pour optimisation
CREATE INDEX idx_reservation_dates ON RESERVATION (date_debut, date_fin, statut);
CREATE INDEX idx_vehicule_agence ON VEHICULE (agence_id, categorie_acriss);