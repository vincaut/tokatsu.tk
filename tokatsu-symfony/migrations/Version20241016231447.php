<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241016231447 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE film (id INT AUTO_INCREMENT NOT NULL, titre VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, name_dir VARCHAR(255) NOT NULL, image LONGBLOB DEFAULT NULL, available TINYINT(1) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE historique (id INT AUTO_INCREMENT NOT NULL, id_compte_id INT DEFAULT NULL, id_video_id INT DEFAULT NULL, progression DOUBLE PRECISION NOT NULL, date DATE NOT NULL, INDEX IDX_EDBFD5EC72F0DA07 (id_compte_id), INDEX IDX_EDBFD5EC791AECDB (id_video_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE serie (id INT AUTO_INCREMENT NOT NULL, titre VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, name_dir VARCHAR(255) NOT NULL, image LONGBLOB DEFAULT NULL, available TINYINT(1) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE video (id INT AUTO_INCREMENT NOT NULL, id_serie_id INT DEFAULT NULL, id_film_id INT DEFAULT NULL, titre VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, saison INT NOT NULL, episode INT NOT NULL, image LONGBLOB DEFAULT NULL, INDEX IDX_7CC7DA2C89986428 (id_serie_id), INDEX IDX_7CC7DA2C88E2F8F3 (id_film_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE historique ADD CONSTRAINT FK_EDBFD5EC72F0DA07 FOREIGN KEY (id_compte_id) REFERENCES compte (id)');
        $this->addSql('ALTER TABLE historique ADD CONSTRAINT FK_EDBFD5EC791AECDB FOREIGN KEY (id_video_id) REFERENCES video (id)');
        $this->addSql('ALTER TABLE video ADD CONSTRAINT FK_7CC7DA2C89986428 FOREIGN KEY (id_serie_id) REFERENCES serie (id)');
        $this->addSql('ALTER TABLE video ADD CONSTRAINT FK_7CC7DA2C88E2F8F3 FOREIGN KEY (id_film_id) REFERENCES film (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE historique DROP FOREIGN KEY FK_EDBFD5EC72F0DA07');
        $this->addSql('ALTER TABLE historique DROP FOREIGN KEY FK_EDBFD5EC791AECDB');
        $this->addSql('ALTER TABLE video DROP FOREIGN KEY FK_7CC7DA2C89986428');
        $this->addSql('ALTER TABLE video DROP FOREIGN KEY FK_7CC7DA2C88E2F8F3');
        $this->addSql('DROP TABLE film');
        $this->addSql('DROP TABLE historique');
        $this->addSql('DROP TABLE serie');
        $this->addSql('DROP TABLE video');
    }
}
