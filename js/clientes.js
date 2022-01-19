function agregarCliente() {
    let cliente = {
        name: $("#clientName").val(),
        email: $("#clientEmail").val(),
        age: $("#clientAge").val()
    };
    console.log(cliente);

    $.ajax({
        url: "https://g3587aeb78a14ca-partyroom.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client",
        type: "POST",
        data: JSON.stringify(cliente),
        datatype: "JSON",
        contentType: "application/json",
        success: function (respuesta) {
            alert("Gracias por su registro");
            $("#ResultClient").empty();
            obtenerClientes();
        },
        error:function (xhr,status){alert("Los campos son obligatorios")}
    });
}

function obtenerClientes() {
    $.ajax({
        url: 'https://g3587aeb78a14ca-partyroom.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client',
        type: 'GET',
        datatype: "JSON",
        success: function (respuesta) {
             console.log(respuesta);
            $("#ResultClient").empty();
            mostrarClientes(respuesta.items);
        }
    });
}

function mostrarClientes(items) {
    let clientes = "<table class='table'>";
    clientes += "<thead class='p-3 mb-2 bg-dark text-white'>";
    clientes += "<th>ID</th>"
    clientes += "<th>NAME</th>";
    clientes += "<th>EMAIL</th>";
    clientes += "<th>AGE</th>";
    clientes += "<th>UPDATE</th>";
    clientes += "<th>DELETE</th>";
    clientes += "</thead>";
    clientes += "<tbody>";
    for (let i = 0; i < items.length; i++) {
        clientes += "<tr>";
        clientes += "<td id='rplId"+items[i].id+"'>" + items[i].id + "</td>";
        clientes += "<td id='rplName"+items[i].id+"'>" + items[i].name + "</td>";
        clientes += "<td id='rplEmail"+items[i].id+"'>" + items[i].email + "</td>";
        clientes += "<td id='rplAge"+items[i].id+"'>" + items[i].age + "</td>";

        clientes += "<td><button onclick='actualizarClientes(" + items[i].id + ")' id='rplConfirmar"+items[i].id+"' class='btn btn-dark'>Editar</button></td>";
        clientes += "<td><button onclick='borrarClientes(" + items[i].id + ")' id='rplCancelar"+items[i].id+"' class='btn btn-dark'>Borrar</button></td>";
        clientes += "</tr>";
    }
    clientes += "</tbody>";
    clientes += "</table>";
    $("#ResultClient").append(clientes);
    $('td:nth-child(1), th:nth-child(1)').hide();
}

function actualizarClientes(id) {
    $.ajax({
        url: "https://g3587aeb78a14ca-partyroom.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client/"+id,
        data: {},
        type: "GET",
        datatype: "JSON",
        contentType: "application/json",
        success: function (respuesta) {
            $("#rplId"+respuesta.items[0].id).replaceWith("<td><input type='hidden' id='clientesIdAc' class='form-control' value='" + respuesta.items[0].id + "'></td>");
            $("#rplName"+respuesta.items[0].id).replaceWith("<td><input type='text' id='clientesNamAc' class='form-control' value='" + respuesta.items[0].name + "'></td>");
            $("#rplEmail"+respuesta.items[0].id).replaceWith("<td><input type='text' id='clientesEmAc' class='form-control' value='" + respuesta.items[0].email + "'></td>");
            $("#rplAge"+respuesta.items[0].id).replaceWith("<td><input type='text' id='clientesAgAc' class='form-control' value='" + respuesta.items[0].age + "'></td>");
            $('td:nth-child(1), th:nth-child(1)').hide();
            $("#rplConfirmar"+respuesta.items[0].id).replaceWith("<td><button onclick='updateClientes()' class='btn btn-dark'>Confirmar</button></td>");
            $("#rplCancelar"+respuesta.items[0].id).replaceWith("<td><button onclick='obtenerClientes()' class='btn btn-dark'>Cancelar</button></td>");
        }
    });
}

function updateClientes(){
    let actualizarClientes = {
        id: $("#clientesIdAc").val(),
        name: $("#clientesNamAc").val(),
        email: $("#clientesEmAc").val(),
        age: $("#clientesAgAc").val()
    };
    let jsonActualizarClientes = JSON.stringify(actualizarClientes);
    $.ajax({
        url: "https://g3587aeb78a14ca-partyroom.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client",
        data: jsonActualizarClientes,
        type: "PUT",
        datatype: "JSON",
        contentType: "application/json",
        success: function (respuesta){
            alert("Se ha actualizado el Cliente")
            $("#ResultClient").empty();
            obtenerClientes();
        },
        error: function (xhr, status) {
            alert("Todos los valores son obligatorios");
        }
    });
}

function borrarClientes(id) {
    var idEliminarCliente = {
        id: id
    };
    var datosJson = JSON.stringify(idEliminarCliente);
    $.ajax({
        url: 'https://g3587aeb78a14ca-partyroom.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client',
        type: "DELETE",
        data: datosJson,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            $("#ResultClient").empty();
            obtenerClientes();
            alert("Fue eliminado con éxito")
        }
    });
}


