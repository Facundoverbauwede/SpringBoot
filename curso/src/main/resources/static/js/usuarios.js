// Con el ID de la tabla llamamos a la tabla del HTML para insertar los usuarios.
$(document).ready(function() {
    cargarUsuarios();
  $('#usuarios').DataTable();
  actualizarEmailUsuario();
});

function actualizarEmailUsuario(){
    document.getElementById('txtEmailUsuario').outerHTML = localStorage.email;
}

// Con una funcion asincronica llamamos a los usuarios utilizando fetch y la ruta establecida en el controlador.

async function cargarUsuarios(){

    const request = await fetch('api/usuarios',{
        method: 'GET',
        headers: getHeaders()
    });
    const usuarios = await request.json();

    //variable para poder cargar las cosas en el HTML
    let listadoHtml = ''



    // hacemos un for para poder recorrer todos los usuarios e insertarlos en la variable de listado HTML
    for (let usuario of usuarios ){
     // botones
        let botonEliminar = '<a href="#" onclick = "eliminarUsuario('+usuario.id+')" class="btn btn-danger btn-circle btn-sm"> <i class="fas fa-trash"></i> </a>'

        let telefono = usuario.telefono == null ? '-' : usuario.telefono;

        let usuarioHtml = '<tr> <td>'+usuario.id+'</td> <td>'+usuario.nombre+' '+usuario.apellido+'</td> <td>'
        +usuario.email+'</td> <td>'
        +telefono+'</td> <td> '+botonEliminar+' </td> </tr>'
        listadoHtml += usuarioHtml
    }

    //insertamos los usuarios en el HTML
    document.querySelector('#usuarios tbody').outerHTML = listadoHtml;
}

function getHeaders(){
    return {
            'Accept': '*/*',
            'Content-Type': 'aplication/json',
            'Authorization' : localStorage.token
    };
}

//eliminar usuario por id

async function eliminarUsuario (id){

if (!confirm ('¿Desea eliminar este usuario?')){
return;
}
const request = await fetch('api/usuarios/' + id,{
        method: 'DELETE',
        headers: getHeaders()
    });

location.reload();

}