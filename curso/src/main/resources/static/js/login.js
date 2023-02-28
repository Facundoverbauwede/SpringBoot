// 
$(document).ready(function() {
    //on ready
    });
    
    
    
    async function iniciarSesion(){
    
        let datos = {}
        datos.email = document.getElementById('txtEmail').value
        datos.contrasenia = document.getElementById('txtContrasenia').value
    
       
    
        const request = await fetch('api/login', {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });
        
        const response = await request.text();

        if (response != 'FAIL'){
            localStorage.token = response;
            localStorage.email = datos.email;
            window.location.href='usuarios.html';
        }else{
            alert("Las credenciales son incorrectas");
        }
     }