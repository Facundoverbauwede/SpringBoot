package com.cursojava.curso.controllers;

import com.cursojava.curso.dao.UsuarioDao;
import com.cursojava.curso.models.Usuario;
import com.cursojava.curso.utils.JWTUtil;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class UsuarioController {

    @Autowired
    private UsuarioDao usuarioDao;

    @Autowired
    JWTUtil jwt;


    private boolean validarToken (String token){
        String idUsuario = jwt.getKey(token);
        return idUsuario != null;
    }

    @RequestMapping(value = "usuario/{id}")
    public Usuario getUsuario(@PathVariable Long id) {
        return null;
    }

    @RequestMapping(value = "api/usuarios", method = RequestMethod.GET)
    public List<Usuario> getUsuarios(@RequestHeader(value = "Authorization") String token) {

        if (!validarToken(token)){
            return null;
        }
        return usuarioDao.getUsuarios();
    }

    @RequestMapping(value = "api/usuarios/{id}", method = RequestMethod.DELETE)
    public void eliminar(@RequestHeader(value = "Authorization") String token, @PathVariable Long id) {

        if (validarToken(token)){
            usuarioDao.eliminar(id);
        }
    }
    @RequestMapping(value = "api/usuarios", method = RequestMethod.POST)
    public void registrarUsuario(@RequestBody Usuario usuario) {
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);

        String hash = argon2.hash(1, 1024, 1, usuario.getPassword());

        usuario.setPassword(hash);

        usuarioDao.registrar(usuario);
    }

/*
    @RequestMapping(value = "api/usuario/")
    public Usuario editar() {

        Usuario usuario = new Usuario();
        usuario.setNombre("Facundo");
        usuario.setApellido("Verbauwede");
        usuario.setEmail("facundoverbauwede13@gmail.com");
        usuario.setTelefono("1157699015");
        usuario.setContrasenia("lala123");
        return usuario;
    }

    @RequestMapping(value = "usuario345")
    public Usuario buscar() {

        Usuario usuario = new Usuario();
        usuario.setNombre("Facundo");
        usuario.setApellido("Verbauwede");
        usuario.setEmail("facundoverbauwede13@gmail.com");
        usuario.setTelefono("1157699015");
        usuario.setContrasenia("lala123");
        return usuario;
    }

    */
}
