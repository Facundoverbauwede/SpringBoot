// Con el ID de la tabla llamamos a la tabla del HTML para insertar los usuarios.
$(document).ready(function() {
//on ready
});



async function registrarUsuario(){

    let datos = {}
    datos.nombre = document.getElementById('txtNombre').value
    datos.apellido = document.getElementById('txtApellido').value
    datos.email = document.getElementById('txtEmail').value
    datos.contrasenia = document.getElementById('txtContrasenia').value


    let repetirContrasenia = document.getElementById('txtRepetirContrasenia').value

    if (repetirContrasenia != datos.contrasenia){
    alert ("La contraseña que escribiste es diferente!!!!")
     return;
    }

    const request = await fetch('api/usuarios', {
        method: 'POST',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    });

    alert("la cuenta fue creada con exito");
    window.location.href = 'login.html';


 }