-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema oratio
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema oratio
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `oratio` DEFAULT CHARACTER SET utf8 ;
-- -----------------------------------------------------
-- Schema oratio
-- -----------------------------------------------------
USE `oratio` ;

-- -----------------------------------------------------
-- Table `oratio`.`categorias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `oratio`.`categorias` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `nombre_UNIQUE` (`nombre` ASC) VISIBLE)
ENGINE = InnoDB;


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
  `telefono` BIGINT NULL,
  `contraseña` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `oratio`.`palabras`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `oratio`.`palabras` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `idCategoria` INT NOT NULL,
  `idUsuarioSolicitado` INT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `nombre_UNIQUE` (`nombre` ASC) VISIBLE,
  INDEX `fk_palabras_categorias1_idx` (`idCategoria` ASC) VISIBLE,
  INDEX `fk_palabras_usuarios1_idx` (`idUsuarioSolicitado` ASC) VISIBLE,
  CONSTRAINT `fk_palabras_categorias1`
    FOREIGN KEY (`idCategoria`)
    REFERENCES `oratio`.`categorias` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_palabras_usuarios1`
    FOREIGN KEY (`idUsuarioSolicitado`)
    REFERENCES `oratio`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `oratio`.`gif`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `oratio`.`gif` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `descripcion` VARCHAR(45) NULL,
  `direccionGif` VARCHAR(45) NOT NULL,
  `idPalabra` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_gif_palabras1_idx` (`idPalabra` ASC) VISIBLE,
  CONSTRAINT `fk_gif_palabras1`
    FOREIGN KEY (`idPalabra`)
    REFERENCES `oratio`.`palabras` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `oratio`.`cursos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `oratio`.`cursos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `descripcion` VARCHAR(45) NULL,
  `idDocente` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_cursos_usuarios1_idx` (`idDocente` ASC) VISIBLE,
  CONSTRAINT `fk_cursos_usuarios1`
    FOREIGN KEY (`idDocente`)
    REFERENCES `oratio`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `oratio`.`roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `oratio`.`roles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `oratio`.`usuarios_has_roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `oratio`.`usuarios_has_roles` (
  `usuarios_idusuarios` INT NOT NULL,
  `role_idrole` INT NOT NULL,
  PRIMARY KEY (`usuarios_idusuarios`, `role_idrole`),
  INDEX `fk_usuarios_has_role_role1_idx` (`role_idrole` ASC) VISIBLE,
  INDEX `fk_usuarios_has_role_usuarios_idx` (`usuarios_idusuarios` ASC) VISIBLE,
  CONSTRAINT `fk_usuarios_has_role_usuarios`
    FOREIGN KEY (`usuarios_idusuarios`)
    REFERENCES `oratio`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuarios_has_role_role1`
    FOREIGN KEY (`role_idrole`)
    REFERENCES `oratio`.`roles` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

