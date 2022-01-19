function agregarMensaje() {

    let mensaje = {
        messagetext: $("#mensajeText").val()
    };
    $.ajax({
        url: "https://g3587aeb78a14ca-partyroom.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message",
        type: "POST",
        data: mensaje,
        datatype: "JSON",
        success: function (respuesta) {
            alert("Su mensaje fue registrado")
            $("#ResultMensajes").empty();
            obtenerMensajes();
        },
        error:function (xhr,status){alert("por favor agregue un mensaje")}
    });
}

function obtenerMensajes() {
    $.ajax({
        url: 'https://g3587aeb78a14ca-partyroom.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message',
        type: 'GET',
        datatype: "JSON",

        success: function (respuesta) {

            $("#ResultMensajes").empty();
            mostrarMensajes(respuesta.items);
        }

    });
}

function mostrarMensajes(items) {
    let mensajes = "<table class='table'>";
    mensajes += "<thead class='p-3 mb-2 bg-dark text-white'>";
    mensajes += "<th>ID</th>"
    mensajes += "<th>MESSAGETEXT</th>";
    mensajes += "<th>UPDATE</th>";
    mensajes += "<th>DELETE</th>";
    mensajes += "</thead>";
    mensajes += "<tbody>";
    for (let i = 0; i < items.length; i++) {
        mensajes += "<tr>";
        mensajes += "<td id='rplId"+items[i].id+"'>" + items[i].id + "</td>";
        mensajes += "<td id='rplMessage"+items[i].id+"'>" + items[i].messagetext + "</td>";
        mensajes += "<td><button onclick='actualizarMensajes(" + items[i].id + ")' id='rplConfirmar"+items[i].id+"' class='btn btn-dark'>Editar</button></td>";
        mensajes += "<td><button onclick='borrarMensajes(" + items[i].id + ")' id='rplCancelar"+items[i].id+"' class='btn btn-dark'>Borrar</button></td>";
        mensajes += "</tr>";
    }
    mensajes += "</tbody>";
    mensajes += "</table>";
    $("#ResultMensajes").append(mensajes);
    $('td:nth-child(1), th:nth-child(1)').hide();
}
function  actualizarMensajes(id){
    $.ajax({
        url: "https://g3587aeb78a14ca-partyroom.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message/"+id,
        data: {},
        type: "GET",
        datatype: "JSON",
        contentType: "application/json",
        success: function (respuesta) {
            $("#rplId"+respuesta.items[0].id).replaceWith("<td><input type='hidden' id='mensajesIdAc' class='form-control' value='" + respuesta.items[0].id + "'></td>");
            $("#rplMessage"+respuesta.items[0].id).replaceWith("<td><input type='text' id='mensajesMenAc' class='form-control' value='" + respuesta.items[0].messagetext + "'></td>");
            $('td:nth-child(1), th:nth-child(1)').hide();
            $("#rplConfirmar"+respuesta.items[0].id).replaceWith("<td><button onclick='updateMensajes()' class='btn btn-dark'>Confirmar</button></td>");
            $("#rplCancelar"+respuesta.items[0].id).replaceWith("<td><button onclick='obtenerMensajes()' class='btn btn-dark'>Cancelar</button></td>");
        }
    });
}

function updateMensajes(){
    let actualizarMensaje = {
        id: $("#mensajesIdAc").val(),
        messagetext: $("#mensajesMenAc").val()
    };
    let jsonActualizarSalon = JSON.stringify(actualizarMensaje);
    $.ajax({
        url: "https://g3587aeb78a14ca-partyroom.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message",
        data: jsonActualizarSalon,
        type: "PUT",
        datatype: "JSON",
        contentType: "application/json",
        success: function (respuesta){
            alert("Se ha actualizado el mensaje")
            $("#ResultMensajes").empty();
            obtenerMensajes();
        },
        error: function (xhr, status) {
            alert("Todos los valores son obligatorios");
        }
    });
}

function borrarMensajes(id) {
    var idEliminarMensajes = {
        id: id
    };
    var datosJson = JSON.stringify(idEliminarMensajes);
    $.ajax({
        url: 'https://g3587aeb78a14ca-partyroom.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message',
        type: "DELETE",
        data: datosJson,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            $("#ResultMensajes").empty();
            obtenerMensajes();
            alert("Fue eliminado con éxito")
        }
    });
}
