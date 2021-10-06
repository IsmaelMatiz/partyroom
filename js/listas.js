function obtenerSalones() {
    $.ajax({
        url: "https://g8fa4d195f24899-usa.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/partyroom/partyroom",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            $("#Result").empty();
            mostrarSalones(respuesta.items);
        }
    });
};

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
        salones += "<td><button onclick='actualizarSalon(" + items[i].id + ")' class='btn btn-dark'>Editar</button></td>";
        salones += "<td><button onclick='borrarSalones(" + items[i].id + ")' class='btn btn-dark'>Borrar</button></td>";
        salones += "</tr>";
    }
    salones += "</tbody>";
    salones += "</table>";
    $("#Result").append(salones);
    $('td:nth-child(1), th:nth-child(1)').hide();
}

function editar(id) {
    $.ajax({
        url: "https://g8fa4d195f24899-usa.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/partyroom/partyroom/"+id,
        data: {},
        type: "GET",
        datatype: "JSON",
        contentType: "application/json",
        success: function (respuesta) {
            //console.log(respuesta.items[0].owner)
            $("#salonesId").val(respuesta.items[0].id);
            $("#salonesOwner").val(respuesta.items[0].owner);
            $("#salonesCapacity").val(respuesta.items[0].capacity);
            $("#salonesCategoryId").val(respuesta.items[0].category_id);
            $("#salonesName").val(respuesta.items[0].name);
        }
    });
}

function actualizarSalon(id) {
    $.ajax({
        url: "https://g8fa4d195f24899-usa.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/partyroom/partyroom/"+id,
        data: {},
        type: "GET",
        datatype: "JSON",
        contentType: "application/json",
        success: function (respuesta) {
            console.log(respuesta.items[0].owner)
            $("#rplId"+respuesta.items[0].id).replaceWith("<td><input type='hidden' id='salonesIdAc' class='form-control'></td>");
            $("#rplOwener"+respuesta.items[0].id).replaceWith("<td><input type='text' id='salonesOwnerAc' class='form-control'></td>");
            $("#rplCapacity"+respuesta.items[0].id).replaceWith("<td><input type='number' id='salonesCapacityAc' class='form-control'></td>");
            $("#rplCategory"+respuesta.items[0].id).replaceWith("<td><input type='number' id='salonesCategoryIdAc' class='form-control'></td>");
            $("#rplName"+respuesta.items[0].id).replaceWith("<td><input type='text' id ='salonesNameAc' class='form-control' value=''></td>");
        }
    });
}

function borrarSalones(id) {
    var idEliminar = {
        id: id
    };
    var datosJson = JSON.stringify(idEliminar);
    $.ajax({
        url: 'https://g8fa4d195f24899-usa.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/partyroom/partyroom',
        type: "DELETE",
        data: datosJson,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            $("#Result").empty();
            obtenerSalones();
            alert("El item fue eliminado")
        }
    });
}

function obtenerClientes() {
    $.ajax({
        url: 'https://g8fa4d195f24899-usa.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/partyroom/partyroom',
        type: 'GET',
        datatype: "JSON",

        success: function (respuesta) {
            $("#Result").empty();
            obtenerClientes(respuesta);

        }

    });
};

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
        clientes += "<td>" + items[i].id + "</td>";
        clientes += "<td>" + items[i].name + "</td>";
        clientes += "<td>" + items[i].email + "</td>";
        clientes += "<td>" + items[i].age + "</td>";

        clientes += "<td><button onclick='actualizarClientes(" + items[i].id + ")' class='btn btn-dark'>Editar</button></td>";
        clientes += "<td><button onclick='borrarClientes(" + items[i].id + ")' class='btn btn-dark'>Borrar</button></td>";
        clientes += "</tr>";
    }
    ;
    clientes += "</tbody>";
    clientes += "</table>";
    $("#Result").append(clientes);
    $('td:nth-child(1), th:nth-child(1)').hide();
};

function borrarClientes(id) {
    var idEliminarCliente = {
        id: id
    };
    var datosJson = JSON.stringify(idEliminarCliente);
    $.ajax({
        url: 'https://g8fa4d195f24899-usa.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/partyroom/partyroom',
        type: "DELETE",
        data: datosJson,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            $("#Result").empty();
            obtenerSalones();
            alert("Fue eliminado con éxito")
        }
    });
}

function obtenerMensajes() {
    $.ajax({
        url: 'https://g8fa4d195f24899-usa.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/partyroom/partyroom',
        type: 'GET',
        datatype: "JSON",

        success: function (respuesta) {
            $("#Result").empty();
            obtenerClientes(respuesta);

        }

    });
};

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
        mensajes += "<td>" + items[i].id + "</td>";
        mensajes += "<td>" + items[i].messagetext + "</td>";


        mensajes += "<td><button onclick='actualizarMensajes(" + items[i].id + ")' class='btn btn-dark'>Editar</button></td>";
        mensajes += "<td><button onclick='borrarMensajes(" + items[i].id + ")' class='btn btn-dark'>Borrar</button></td>";
        mensajes += "</tr>";
    }
    ;
    mensajes += "</tbody>";
    mensajes += "</table>";
    $("#Result").append(mensajes);
    $('td:nth-child(1), th:nth-child(1)').hide();
};

function borrarMensajes(id) {
    var idEliminarMensajes = {
        id: id
    };
    var datosJson = JSON.stringify(idEliminarMensajes);
    $.ajax({
        url: 'https://g8fa4d195f24899-usa.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/partyroom/partyroom',
        type: "DELETE",
        data: datosJson,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            $("#Result").empty();
            obtenerSalones();
            alert("Fue eliminado con éxito")
        }
    });
}

