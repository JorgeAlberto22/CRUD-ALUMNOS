//Importacion a la base de datos
var datos = firebase.database();
//Metodo general para hacer un update
var update = document.getElementById('update');
update.disabled = true;

//Obtenien el valor
function value(request) {
    return document.getElementById(request).value;
}
//funcion para asignar a un campo de texto un valor en especifico.
function asignation(request, response) {
    return document.getElementById(request).value = response;
}
//Asignar de forma secuencial
function printHTML(request, response) {
    return document.getElementById(request).innerHTML += response;
}
//Asignar solo un dato
function inHTML(request, response) {
    return document.getElementById(request).innerHTML = response;
}

//Metodo para definir variables para agregar nuevo alumno
function insertTask(matricula, nombre, edad, sexo, promedio) {
    datos.ref('Hombre/').push({
        matricula: matricula,
        nombre: nombre,
        edad: edad,
        sexo: sexo,
        promedio: promedio
    });
}

function insertTask2(matricula, nombre, edad, sexo, promedio) {
    datos.ref('Mujer/').push({
        matricula: matricula,
        nombre: nombre,
        edad: edad,
        sexo: sexo,
        promedio: promedio
    });
}


//Metodo para validar y agregar nuevo alumno
function onClickInsert() {
    var nombre = value("nombre");
    var matricula = value("matricula");
    var edad = value("edad");
    var sexo = value("sex");
    var promedio = value("promed");
    if (nombre.length == 0 || matricula.length == 0 || edad.length == 0 || sexo.length == 0 || promedio.length == 0) {
        alert("Llenar campos");
    } else {
        if (sexo == "Hombre") {
            inHTML("loadTable", "");
            insertTask(matricula, nombre, edad, sexo, promedio);
            asignation("matricula", "");
            asignation("nombre", "");
            asignation("edad", "");
            asignation("sexo", "");
            asignation("promedio", "");
            alert("Guardado correctamente");
        } if (sexo == "Mujer") {
            inHTML("loadTable2", "");
            insertTask2(matricula, nombre, edad, sexo, promedio);
            asignation("matricula", "");
            asignation("nombre", "");
            asignation("edad", "");
            asignation("sexo", "");
            asignation("promedio", "");
            alert("Guardado correctamente");
        }

    }
}

//Metodo para definir variables en el campo de modificar alumno
function updateTask(matricula, nombre, edad, sexo, promedio, key) {
    datos.ref('Hombre/' + key).update({
        matricula: matricula,
        nombre: nombre,
        edad: edad,
        sexo: sexo,
        promedio: promedio
    });
}

function updateTask2(matricula, nombre, edad, sexo, promedio, key2) {
    datos.ref('Mujer/' + key2).update({
        matricula: matricula,
        nombre: nombre,
        edad: edad,
        sexo: sexo,
        promedio: promedio
    });
}

//Funcion para hacer las modificaciones
function onClickUpdate() {
    var nombre = value("nombreEdit");
    var matricula = value("matriculaEdit");
    var edad = value("edadEdit");
    var sexo = value("sexoEdit");
    var promedio = value("promedioEdit");
    var key = value("key");
    var key2 = value("key2");
    if (matricula.length == 0 || nombre.length == 0 || edad.length == 0 || sexo.length == 0 || promedio.length == 0) {
        alert("verificar campos");
    } else {
        if (sexo == "Hombre") {
            inHTML("loadTable", "");
            updateTask(matricula, nombre, edad, sexo, promedio, key);
            inHTML("editData", "");
            alert("modify successfully");
            update.disabled = true;
        } else {
            inHTML("loadTable", "");
            updateTask2(matricula, nombre, edad, sexo, promedio, key2);
            inHTML("editData", "");
            alert("modify successfully");
            update.disabled = true;
        }

    }
}
//Metodos para borrar alumno
function removeTask(key) {
    if (confirm("¿Deseas borras este alumno?")) {
        inHTML("loadTable", "");
        datos.ref('Mujer/' + key).remove();
    }
}

function removeTask2(key2) {
    if (confirm("¿Deseas borras este alumno?")) {
        inHTML("loadTable2", "");
        datos.ref('Hombre/' + key2).remove();
    }
}

//Tabla de hombre y mujeres
function table(matricula, nombre, edad, sexo, promedio, key) {
    return '<tr><td>' + matricula + '</td><td>' + nombre + '</td><td>' + edad + '</td> <td>' + sexo + '</td> <td>' + promedio + '</td>' +
        '<td><a href="#" onclick="viewDataUpdate(\'' + matricula + '\',\'' + nombre + '\', \'' + edad + '\', \'' + sexo + '\', \'' + promedio + '\', \'' + key + '\')">' +
        '<i class="fas fa-edit blue icon-lg"></i></a></td>' +
        '<td><a href="#" onclick="removeTask(\'' + key + '\')">' +
        '<i class="fas fa-trash-alt red icon-lg"></i></a></td></tr>';
}
function table2(matricula, nombre, edad, sexo, promedio, key2) {
    return '<tr><td>' + matricula + '</td><td>' + nombre + '</td><td>' + edad + '</td> <td>' + sexo + '</td> <td>' + promedio + '</td>' +
        '<td><a href="#" onclick="viewDataUpdate(\'' + matricula + '\',\'' + nombre + '\', \'' + edad + '\', \'' + sexo + '\', \'' + promedio + '\', \'' + key + '\')">' +
        '<i class="fas fa-edit blue icon-lg"></i></a></td>' +
        '<td><a href="#" onclick="removeTask2(\'' + key2 + '\')">' +
        '<i class="fas fa-trash-alt red icon-lg"></i></a></td></tr>';
}


//Metodo para ver la informacion en los campos de editar
function viewDataUpdate(matricula, nombre, edad, sexo, promedio, key) {
    var response = '<div class="form-group"><input type="hidden" value=' + key + ' id="key">' +
        '<input type="text" id="matriculaEdit" class="form-control" placeholder="Matricula" value=' + matricula + '>' +
        '</div>' +
        '<input type="text" id="nombreEdit" class="form-control" placeholder="Nombre" value=' + nombre + '>' +
        '</div>' +
        '<input type="text" id="edadEdit" class="form-control" placeholder="Edad" value=' + edad + '>' +
        '</div>' +
        '<input type="text" id="sexoEdit" class="form-control" placeholder="Sexo" value=' + sexo + '>' +
        '</div>' +
        '<div class="form-group">' +
        '<textarea placeholder="Promedio" class="form-control" id="promedioEdit">' + promedio + '</textarea>' +
        '</div>';
    inHTML('editData', response);
    update.disabled = false;
}


//Metodo para mostrar la informacion en la tabla
var totalSuma1 = 0;
var promedioTotal1 = 0;
var reference = datos.ref('Hombre/');
reference.on('value', function (datas) {
    var data = datas.val();
    $.each(data, function (nodo, value) {
        var sendData = table(value.matricula, value.nombre, value.edad, value.sexo, value.promedio, nodo);
        totalSuma1 = totalSuma1 + parseInt(value.promedio);
        printHTML('loadTable', sendData);
    });
    //Metodo para conteo de alumno
    var ref = firebase.database().ref("Hombre");
    ref.once("value").then(function (snapshot) {
        inHTML('contador', snapshot.numChildren());
        promedioTotal1 =  parseInt(totalSuma1) / parseInt(snapshot.numChildren());
        inHTML('contador4', promedioTotal1); 
        console.log(snapshot.numChildren());
    });
});

//Metodo para mostrar la informacion en la tabla
var totalSuma = 0;
var promedioTotal = 0;
var reference = datos.ref('Mujer/');
reference.on('value', function (datas) {
    var data = datas.val();
    $.each(data, function (nodo, value) {
        var sendData = table(value.matricula, value.nombre, value.edad, value.sexo, value.promedio, nodo);
        totalSuma = totalSuma + parseInt(value.promedio);
        printHTML('loadTable2', sendData);
        
    });
    //Metodo para hacer conteo de alumno
    var ref = firebase.database().ref("Mujer");
    ref.once("value").then(function (snapshot) {
        inHTML('contador2', snapshot.numChildren());
        promedioTotal = parseInt(totalSuma) / parseInt(snapshot.numChildren());
        inHTML('contador3', promedioTotal.toFixed(2));
        console.log(snapshot.numChildren());
    });
});
