function agregarSalon() {
    let salon = {
        owner: $("#salonesOwner").val(),
        capacity: $("#salonesCapacity").val(),
        category_id: $("#salonesCategoryId").val(),
        name: $("#salonesName").val()
    };
    $.ajax({
        url: "https://g3587aeb78a14ca-partyroom.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/partyroom/partyroom",
        type: "POST",
        data: salon,
        datatype: "JSON",
        success: function (respuesta) {
            alert("Se creo un nuevo salón");
            $("#salonesId").val('');
            $("#salonesOwner").val('');
            $("#salonesCapacity").val('');
            $("#salonesCategoryId").val('');
            $("#salonesName").val('');
            $("#Result").empty();
            obtenerSalones();
        },
        error: function (xhr, status) {
            alert("Los campos son obligatorios");
        }
    });
}


function obtenerSalones() {
    $.ajax({
        url: "https://g3587aeb78a14ca-partyroom.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/partyroom/partyroom",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            $("#Result").empty();
            mostrarSalones(respuesta.items);
        }
    });
}

function mostrarSalones(items) {
    let salones = "<table class='table'>";
    salones += "<thead class='p-3 mb-2 bg-dark text-white'>";
    salones += "<th>ID</th>"
    salones += "<th>OWNER</th>";
    salones += "<th>CAPACITY</th>";
    salones += "<th>CATEGORY ID</th>";
    salones += "<th>NAME</th>";
    salones += "<th>UPDATE</th>";
    salones += "<th>DELETE</th>";
    salones += "</thead>";
    salones += "<tbody>";
    for (let i = 0; i < items.length; i++) {
        salones += "<tr>";
        salones += "<td id='rplId"+items[i].id+"'>" + items[i].id + "</td>";
        salones += "<td id='rplOwener"+items[i].id+"'>" + items[i].owner + "</td>";
        salones += "<td id='rplCapacity"+items[i].id+"'>" + items[i].capacity + "</td>";
        salones += "<td id='rplCategory"+items[i].id+"'>" + items[i].category_id + "</td>";
        salones += "<td id='rplName"+items[i].id+"'>" + items[i].name + "</td>";
        salones += "<td><button onclick='actualizarSalon(" + items[i].id + ")' id='rplConfirmar"+items[i].id+"' class='btn btn-dark'>Editar</button></td>";
        salones += "<td><button onclick='borrarSalones(" + items[i].id + ")' id='rplCancelar"+items[i].id+"' class='btn btn-dark'>Borrar</button></td>";
        salones += "</tr>";
    }
    salones += "</tbody>";
    salones += "</table>";
    $("#Result").append(salones);
    $('td:nth-child(1), th:nth-child(1)').hide();
}

function actualizarSalon(id) {
    $.ajax({
        url: "https://g3587aeb78a14ca-partyroom.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/partyroom/partyroom/"+id,
        data: {},
        type: "GET",
        datatype: "JSON",
        contentType: "application/json",
        success: function (respuesta) {
            $("#rplId"+respuesta.items[0].id).replaceWith("<td><input type='hidden' id='salonesIdAc' class='form-control' value='" + respuesta.items[0].id + "'></td>");
            $("#rplOwener"+respuesta.items[0].id).replaceWith("<td><input type='text' id='salonesOwnerAc' class='form-control' value='" + respuesta.items[0].owner + "'></td>");
            $("#rplCapacity"+respuesta.items[0].id).replaceWith("<td><input type='number' id='salonesCapacityAc' class='form-control' value='" + respuesta.items[0].capacity + "'></td>");
            $("#rplCategory"+respuesta.items[0].id).replaceWith("<td><input type='number' id='salonesCategoryIdAc' class='form-control' value='" + respuesta.items[0].category_id + "'></td>");
            $("#rplName"+respuesta.items[0].id).replaceWith("<td><input type='text' id ='salonesNameAc' class='form-control' value='" + respuesta.items[0].name + "'></td>");
            $('td:nth-child(1), th:nth-child(1)').hide();
            $("#rplConfirmar"+respuesta.items[0].id).replaceWith("<td><button onclick='updateSalon()' class='btn btn-dark'>Confirmar</button></td>");
            $("#rplCancelar"+respuesta.items[0].id).replaceWith("<td><button onclick='obtenerSalones()' class='btn btn-dark'>Cancelar</button></td>");
        }
    });
}

function updateSalon(){
    let actualizarSalon = {
        id: $("#salonesIdAc").val(),
        owner: $("#salonesOwnerAc").val(),
        capacity: $("#salonesCapacityAc").val(),
        category_id: $("#salonesCategoryIdAc").val(),
        name: $("#salonesNameAc").val()
    };
    let jsonActualizarSalon = JSON.stringify(actualizarSalon);
    $.ajax({
        url: "https://g3587aeb78a14ca-partyroom.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/partyroom/partyroom",
        data: jsonActualizarSalon,
        type: "PUT",
        datatype: "JSON",
        contentType: "application/json",
        success: function (respuesta){
            alert("Se ha actualizado el salón")
            $("#Result").empty();
            obtenerSalones();
        },
        error: function (xhr, status) {
            alert("Todos los valores son obligatorios");
        }
    });
}

function borrarSalones(id) {
    var idEliminar = {
        id: id
    };
    var datosJson = JSON.stringify(idEliminar);
    $.ajax({
        url: 'https://g3587aeb78a14ca-partyroom.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/partyroom/partyroom',
        type: "DELETE",
        data: datosJson,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            $("#Result").empty();
            obtenerSalones();
            alert("El item fue eliminado correctamente")
        }
    });
}
