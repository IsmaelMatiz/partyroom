function obtenerSalones() {
    $.ajax({
        url: "https://g8fa4d195f24899-usa.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/partyroom/partyroom",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            $("#Result").empty();
            mostrarSalones(respuesta.items);
        }
    });
};

function mostrarSalones(items) {
    let salones = "<table class='table'>";
    salones += "<thead class='p-3 mb-2 bg-dark text-white'>";
    salones += "<th>OWNER</th>";
    salones += "<th>CAPACITY</th>";
    salones += "<th>CATEGORY ID</th>";
    salones += "<th>NAME</th>";
    salones += "<th>UPDATE</th>";
    salones += "<th>DELETE</th>";
    salones += "</thead>";
    salones += "<tbody>";
    for (let i = 0; i < items.length; i++) {
        salones += "<td>" + items[i].id + "</td>";
        salones += "<td>" + items[i].owner + "</td>";
        salones += "<td>" + items[i].capacity + "</td>";
        salones += "<td>" + items[i].category_id + "</td>";
        salones += "<td>" + items[i].name + "</td>";
        += "<td><button onclick=''>Editar</button></td>";
        salones += "<td><button onclick=''>Borrar</button></td>";
    };
    salones += "</tbody>";
    salones += "</table>";
    $("#Result").append(salones);
    $('td:nth-child(1), th:nth-child(1)').hide();
};

/*function actualizarSalones() {
    let datos = {
        "id":$(""),
    };
};

function borrarSalones(id) {
    var idEliminar = {
        id: id
    };
};*/
