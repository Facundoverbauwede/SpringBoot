package com.cursojava.curso.models;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "usuarios")
public class Usuario {

    @Id
    @Getter@Setter @Column(name = "id")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @Getter@Setter @Column(name = "email")
    private String email;

    @Getter@Setter @Column(name = "usuario")
    private String user;

    @Getter@Setter @Column(name = "contrasenia")
    private String password;




}
