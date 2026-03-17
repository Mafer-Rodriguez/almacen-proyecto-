-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema almacen_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema almacen_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `almacen_db` DEFAULT CHARACTER SET utf8 ;
USE `almacen_db` ;

-- -----------------------------------------------------
-- Table `almacen_db`.`roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `almacen_db`.`roles` (
  `id_rol` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(50) NOT NULL,
  `descripcion` VARCHAR(50) NULL,
  PRIMARY KEY (`id_rol`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `almacen_db`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `almacen_db`.`usuarios` (
  `id_usuarios` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `apellidos` VARCHAR(45) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `uid_firebase` VARCHAR(128) NOT NULL,
  `id_rol` INT NOT NULL,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_usuarios`),
  INDEX `id_rol_idx` (`id_rol` ASC) VISIBLE,
  CONSTRAINT `fk_roles_id_rol`
    FOREIGN KEY (`id_rol`)
    REFERENCES `almacen_db`.`roles` (`id_rol`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `almacen_db`.`areas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `almacen_db`.`areas` (
  `id_area` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `descripcion` VARCHAR(200) NULL,
  `create_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_area`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `almacen_db`.`productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `almacen_db`.`productos` (
  `id_productos` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `descripcion` VARCHAR(200) NULL,
  `cantidad` INT NOT NULL,
  `id_area` INT NOT NULL,
  `create_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_productos`),
  INDEX `id_area_idx` (`id_area` ASC) VISIBLE,
  CONSTRAINT `fk_areas_id_area`
    FOREIGN KEY (`id_area`)
    REFERENCES `almacen_db`.`areas` (`id_area`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `almacen_db`.`movimientos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `almacen_db`.`movimientos` (
  `id_movimientos` INT NOT NULL AUTO_INCREMENT,
  `id_usuario` INT NOT NULL,
  `tipo` VARCHAR(10) NOT NULL,
  `fecha` DATETIME NOT NULL,
  `observacion` VARCHAR(200) NULL,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_movimientos`),
  INDEX `usuarios.id_usuario_idx` (`id_usuario` ASC) VISIBLE,
  CONSTRAINT `fk_usuarios_id_usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `almacen_db`.`usuarios` (`id_usuarios`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `almacen_db`.`detalle_movimientos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `almacen_db`.`detalle_movimientos` (
  `id_detalle` INT NOT NULL AUTO_INCREMENT,
  `id_movimiento` INT NOT NULL,
  `id_producto` INT NOT NULL,
  `cantidad` INT NOT NULL,
  PRIMARY KEY (`id_detalle`),
  INDEX `movimientos.id_movimiento_idx` (`id_movimiento` ASC) VISIBLE,
  INDEX `productos.id_producto_idx` (`id_producto` ASC) VISIBLE,
  CONSTRAINT `fk_movimientos_id_movimiento`
    FOREIGN KEY (`id_movimiento`)
    REFERENCES `almacen_db`.`movimientos` (`id_movimientos`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_productos_id_producto`
    FOREIGN KEY (`id_producto`)
    REFERENCES `almacen_db`.`productos` (`id_productos`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `almacen_db`.`solicitudes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `almacen_db`.`solicitudes` (
  `id_solicitudes` INT NOT NULL AUTO_INCREMENT,
  `id_usuario` INT NOT NULL,
  `id_producto` INT NOT NULL,
  `cantidad` INT NOT NULL,
  `estado` VARCHAR(20) NOT NULL,
  `fecha` DATETIME NOT NULL,
  `observacion` VARCHAR(200) NULL,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_solicitudes`),
  INDEX `usuarios.id_usuario_idx` (`id_usuario` ASC) VISIBLE,
  INDEX `productos.id_producto_idx` (`id_producto` ASC) VISIBLE,
  CONSTRAINT `fk_solicitudes_usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `almacen_db`.`usuarios` (`id_usuarios`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_solicitudes_producto`
    FOREIGN KEY (`id_producto`)
    REFERENCES `almacen_db`.`productos` (`id_productos`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
