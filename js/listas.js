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
        salones += "<td>" + items[i].id + "</td>";
        salones += "<td>" + items[i].owner + "</td>";
        salones += "<td>" + items[i].capacity + "</td>";
        salones += "<td>" + items[i].category_id + "</td>";
        salones += "<td>" + items[i].name + "</td>";
        salones += "<td><button onclick='emergente(" + items[i].id + ")' class='btn btn-dark'>Editar</button></td>";
        salones += "<td><button onclick='borrarSalones(" + items[i].id + ")' class='btn btn-dark'>Borrar</button></td>";
        salones += "</tr>";
    }
    salones += "</tbody>";
    salones += "</table>";
    $("#Result").append(salones);
    $('td:nth-child(1), th:nth-child(1)').hide();
}

function emergente(id) {
    $.ajax({
        url: "https://g8fa4d195f24899-usa.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/partyroom/partyroom/"+id,
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            llenarInputs(respuesta.items);
        }
    });
}

function llenarInputs(items){
    $("#salonesNameAc").val("Ok OK algo esta mal");
    var myWindow = window.open("mensajeactualizar.html"
        , "myWindow", "width=800,height=300");
    myWindow.console.log(items)

}

function actualizarSalon() {

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

function actualizarClientes(idAc) {
    var myWindow = window.open("mensajesactualizar.html"
        , "myWindow", "width=600,height=500");

}

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


function actualizarMensajes(idAc) {
    var myWindow = window.open("mensajesactualizar.html"
        , "myWindow", "width=600,height=500");

}

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

