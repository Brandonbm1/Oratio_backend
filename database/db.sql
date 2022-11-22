-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema oratio
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema oratio
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `oratio` DEFAULT CHARACTER SET utf8mb3 ;
USE `oratio` ;

-- -----------------------------------------------------
-- Table `oratio`.`categorias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `oratio`.`categorias` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `nombre_UNIQUE` (`nombre` ASC) VISIBLE,
  UNIQUE INDEX `categoria_nombre` (`nombre` ASC) VISIBLE,
  UNIQUE INDEX `uq_categoria_nombre` (`nombre` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `oratio`.`roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `oratio`.`roles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `oratio`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `oratio`.`usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `apellido` VARCHAR(45) NOT NULL,
  `usuario` VARCHAR(45) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `fechaNacimiento` DATE NOT NULL,
  `telefono` BIGINT NULL DEFAULT NULL,
  `contraseña` VARCHAR(100) NOT NULL,
  `roles_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_usuarios_roles1_idx` (`roles_id` ASC) VISIBLE,
  CONSTRAINT `fk_usuarios_roles1`
    FOREIGN KEY (`roles_id`)
    REFERENCES `oratio`.`roles` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `oratio`.`cursos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `oratio`.`cursos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `descripcion` VARCHAR(45) NULL DEFAULT NULL,
  `idDocente` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_cursos_usuarios1_idx` (`idDocente` ASC) VISIBLE,
  CONSTRAINT `fk_cursos_usuarios1`
    FOREIGN KEY (`idDocente`)
    REFERENCES `oratio`.`usuarios` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `oratio`.`palabras`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `oratio`.`palabras` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `idCategoria` INT NOT NULL,
  `idUsuarioSolicitado` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `nombre_UNIQUE` (`nombre` ASC) VISIBLE,
  INDEX `fk_palabras_categorias1_idx` (`idCategoria` ASC) VISIBLE,
  INDEX `fk_palabras_usuarios1_idx` (`idUsuarioSolicitado` ASC) VISIBLE,
  CONSTRAINT `fk_palabras_categorias1`
    FOREIGN KEY (`idCategoria`)
    REFERENCES `oratio`.`categorias` (`id`),
  CONSTRAINT `fk_palabras_usuarios1`
    FOREIGN KEY (`idUsuarioSolicitado`)
    REFERENCES `oratio`.`usuarios` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `oratio`.`gif`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `oratio`.`gif` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `descripcion` VARCHAR(45) NULL DEFAULT NULL,
  `direccionGif` VARCHAR(45) NOT NULL,
  `idPalabra` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_gif_palabras1_idx` (`idPalabra` ASC) VISIBLE,
  CONSTRAINT `fk_gif_palabras1`
    FOREIGN KEY (`idPalabra`)
    REFERENCES `oratio`.`palabras` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
