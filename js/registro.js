function agregarSalon() {
    let salon = {
        owner: $("#salonesOwner").val(),
        capacity: $("#salonesCapacity").val(),
        category_id: $("#salonesCategoryId").val(),
        name: $("#salonesName").val()
    };
    let jsonSalon = JSON.stringify(salon);
    $.ajax({
        url: "https://g8fa4d195f24899-usa.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/partyroom/partyroom",
        type: "POST",
        data: salon,
        datatype: "JSON",
        success: function (respuesta) {
            alert("Se creo un nuevo salón");
            mostrarSalones();
        }
    });
}

function agregarCliente() {
    let cliente = {
        name: $("#clientName").val(),
        email: $("#clientEmail").val(),
        age: $("#clientAge").val()
    };
    let jsonCliente = JSON.stringify(cliente);
    $.ajax({
        url: "https://g8fa4d195f24899-usa.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client",
        type: "POST",
        data: cliente,
        datatype: "JSON",
        succes: function (respuesta) {
            alert("Gracias por su registro");

            $("#Result").empty();
            mostrarSalones()
        }
    });
}
