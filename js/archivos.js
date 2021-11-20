var originalData = [];
//apenas termina el renderizado del sitio
window.addEventListener("load", () => {
    var idCheck = Id("idCheck");
    var nombreCheck = Id("nombreCheck");
    var apellidoCheck = Id("apellidoCheck");
    var edadCheck = Id("edadCheck");
    var sexoCheck = Id("sexoCheck");
    var cleanBtn = Id("cleanBtn");
    var addNew = Id("addNew");
    var filterSelect = Id("filterSelect");
    var filterBtn = Id("filterBtn");
    var removeBtn = Id("removeBtn");

    filterBtn.addEventListener("click", CalculateAvg);
    cleanBtn.addEventListener("click", CleanTable);
    addNew.addEventListener("click", Validations);
    filterSelect.addEventListener("click", FilterGender);
    removeBtn.addEventListener("click", DeleteBtn);

    idCheck.addEventListener("click", (event) => {
        Unchecked(event.target);
    });

    nombreCheck.addEventListener("click", (event) => {
        Unchecked(event.target);
    });

    apellidoCheck.addEventListener("click", (event) => {
        Unchecked(event.target);
    });

    edadCheck.addEventListener("click", (event) => {
        Unchecked(event.target);
    });

    sexoCheck.addEventListener("click", (event) => {
        Unchecked(event.target);
    });

    /* DoPromiseWithApi(GetData);
    DoPromiseWithApi(GetCities); */
    GetInitialData();
})

AddWarning = (name) => {

    var value = Id(name);

    value.classList.add("borderRed");
}

BadMessage = (value) => {
    console.log("Esta es la promesa: " + (value));
}

//crea la tabla
CreateTable = () => {
    var container = Id("container");
    var table = document.createElement("table");

    table.setAttribute("id", "table");
    container.appendChild(table);
    //id th
    var thId = document.createElement("th");
    var txtId = document.createTextNode("Id");
    thId.appendChild(txtId);
    table.appendChild(thId);
    //primer th
    var thName = document.createElement("th");
    var txtName = document.createTextNode("Nombre");
    thName.appendChild(txtName);
    table.appendChild(thName);
    //segundo th
    var thLastName = document.createElement("th");
    var txtLastName = document.createTextNode("Apellido");
    thLastName.appendChild(txtLastName);
    table.appendChild(thLastName);
    //tercer th
    var thcity = document.createElement("th");
    var txtcity = document.createTextNode("Sexo");
    thcity.appendChild(txtcity);
    table.appendChild(thcity);
    //cuarto th
    var thGender = document.createElement("th");
    var txtGender = document.createTextNode("Edad");
    thGender.appendChild(txtGender);
    table.appendChild(thGender);
}

DoPromiseWithApi = (request) => {
    var dataPromise = new Promise(request);
    dataPromise.then(OkMessage).catch(BadMessage);
}

//crea filas con datos pasados por parametro
CreateRowWithParameters = (id, name, lastName, gender, age) => {
    if (Id("table") == null) {
        CreateTable();
    };
    var table = Id("table");
    var row = document.createElement("tr");
    row.setAttribute("id", id);
    table.appendChild(row);
    //id
    var tdId = document.createElement("td");
    var txtId = document.createTextNode(id);
    tdId.appendChild(txtId);
    row.appendChild(tdId);
    //primer td
    var tdName = document.createElement("td");
    var txtName = document.createTextNode(name);
    tdName.appendChild(txtName);
    row.appendChild(tdName);
    //segundo td
    var tdLastName = document.createElement("td");
    var txtLastName = document.createTextNode(lastName);
    tdLastName.appendChild(txtLastName);
    row.appendChild(tdLastName);
    //tercer td
    var tdGender = document.createElement("td");
    var txtGender = document.createTextNode(gender);
    tdGender.appendChild(txtGender);
    row.appendChild(tdGender);
    //cuarto td
    var tdAge = document.createElement("td");
    var txtAge = document.createTextNode(age);
    tdAge.appendChild(txtAge);
    row.appendChild(tdAge);
    //quinto td
    row.addEventListener("click", (event) => {
        ShowForm(event);
    });
}

//salgo del formulario
ExitForm = () => {
    var form = Id("formTwo");

    form.classList.toggle("displayBlock");
}

GetData = (OkMessage, BadMessage) => {
    var xHttp = new XMLHttpRequest(); //instancia del objeto

    xHttp.onreadystatechange = function () {
        //valido que el estado sea 4° con el fin de que el request ya este completo
        //ademas que nos haya devuelto 200
        if (this.readyState == 4 && this.status == 200) {
            let xResponse = this.response;
            let arrayData = JSON.parse(xResponse);

            Loading();
            arrayData.forEach(element => {
                CreateRowWithParameters(element.id, element.nombre, element.apellido, element.sexo, element.edad);
            });
            OkMessage("Todo bien");
        }
        //si no lo encontro me voy por el catch
        if (this.readyState == 4 && this.status == 400) {
            BadMessage("Fallo la conexion con la API");
        }
    }
    xHttp.open("GET", "http://localhost:3000/personas", true);
    xHttp.send();
    Loading();
}

//obtener el valor de varios radio button
GetValueChecked = (name, data) => {
    var checkedValue = null;
    var inputElements = document.getElementsByName(name);

    if (data == "Female") {
        inputElements[1].setAttribute("selected", "selected");
        inputElements[0].removeAttribute("selected", "selected");
        checkedValue = inputElements[1].value;
    } else {
        inputElements[0].setAttribute("selected", "selected");
        inputElements[1].removeAttribute("selected", "selected");
        checkedValue = inputElements[0].value;
    }

    return checkedValue;
}

//obtiene las localidades
GetCities = (OkMessage, BadMessage) => {
    var xHttp = new XMLHttpRequest(); //instancia del objeto

    xHttp.onreadystatechange = function () {
        //valido que el estado sea 4° con el fin de que el request ya este completo
        //ademas que nos haya devuelto 200
        if (this.readyState == 4 && this.status == 200) {
            let xResponse = this.response;
            let arrayData = JSON.parse(xResponse);
            SetCities(arrayData);
            OkMessage("todo bien con las localidades");
            Loading();
        }
        //si no lo encontro me voy por el catch
        if (this.readyState == 4 && this.status == 400) {
            BadMessage("Fallo la conexion con la API (localidades)");
        }
    }
    xHttp.open("GET", "http://localhost:3000/localidades", true);
    xHttp.send();
    Loading();
}

//obtiene el id de la ciudad a partir del nombre
GetIdByCity = (name, tr) => {
    var xHttp = new XMLHttpRequest(); //instancia del objeto
    var idCity = null

    xHttp.onreadystatechange = function () {
        //valido que el estado sea 4° con el fin de que el request ya este completo
        //ademas que nos haya devuelto 200
        if (this.readyState == 4 && this.status == 200) {
            let xResponse = this.response;
            let arrayData = JSON.parse(xResponse);

            Loading();
            arrayData.forEach(city => {
                if (city.nombre == name) {
                    idCity = city.id;
                    var objectCity = { id: idCity, nombre: tr.childNodes[2].textContent };
                    if (idCity != null) {
                        var objectToSend = { id: tr.getAttribute("id"), nombre: tr.childNodes[0].textContent, apellido: tr.childNodes[1].textContent, localidad: objectCity, sexo: tr.childNodes[3].textContent };
                        if (ValidateToSend()) {
                            ModifyInFront(tr);
                            UpdateValuesInJson(objectToSend);
                        }
                    } else {
                        alert("No se logro modificar");
                    }
                }
            })
        }
    }
    xHttp.open("GET", "http://localhost:3000/localidades", true);
    xHttp.send();
    Loading();

}

//se encarga de resumir el uso de obtener el id
Id = (id) => {
    return document.getElementById(id);
}

//Loading
Loading = () => {
    var form = Id("load");

    form.classList.toggle("displayBlock");
}


ModifyInFront = (row) => {
    var gender;

    if (Id("mGender").checked) {
        gender = "Male";
    } else {
        gender = "Female";
    }

    row.childNodes[0].textContent = Id("name").value;
    row.childNodes[1].textContent = Id("lastName").value;
    row.childNodes[2].textContent = Id("city").value;
    row.childNodes[3].textContent = gender;

    ExitForm();
}

ModifyClick = () => {
    var form = Id("formOne").value;
    var citySelected = Id("city").value;
    var container = Id("container").childNodes[1].childNodes;

    container.forEach(tr => {
        if (tr.getAttribute("id") == form) {
            GetIdByCity(citySelected, tr);
        }
    });
}

OkMessage = (value) => {
    console.log("Esta es la promesa: " + value);
}

RemoveWarning = (name) => {
    var value = Id(name);

    value.classList.remove("borderRed");
}

//Aparece o desaparece el formulario
ShowForm = (event) => {
    var tr = event.target.parentNode;
    var id = tr.getAttribute("id");
    var persona;

    originalData.forEach(element => {
        if (element.id == id) {
            persona = element;
        }
    });

    Id("idForm").value = persona.id;
    Id("nameForm").value = persona.nombre;
    Id("lastNameForm").value = persona.apellido;
    Id("ageForm").value = persona.edad;

    if (persona.sexo == "Male") {
        Id("genderForm").selectedIndex = 0;
    } else {
        Id("genderForm").selectedIndex = 1;
    }
}

//actualiza el json y el valor en la tabla
UpdateValuesInJson = (dataObject) => {
    var xHttp = new XMLHttpRequest(); //instancia del objeto
    var result = false;

    xHttp.onreadystatechange = function () {
        //valido que el estado sea 4° con el fin de que el request ya este completo
        //ademas que nos haya devuelto 200
        if (this.readyState == 4 && this.status == 200) {
            Loading();
            result = true;
        }
    }
    xHttp.open("POST", "http://localhost:3000/editar", true);
    xHttp.setRequestHeader("content-type", "application/json");
    xHttp.send(JSON.stringify(dataObject));
    Loading();

    return result;
}

//valida parametros para el envio
ValidateToSend = () => {
    var name = Id("name").value;
    var lastName = Id("lastName").value;
    var inputElements = document.getElementsByName("gender");
    var result = false;
    var countOfSuccess = 0;

    //valido primero que sean mayores a tres caracteres los nombres y apellidos
    if (name.length > 3) {
        RemoveWarning("name");
        countOfSuccess++;
    } else {
        AddWarning("name");
    }

    if (lastName.length > 3) {
        RemoveWarning("lastName");
        countOfSuccess++;
    } else {
        AddWarning("lastName");
    }

    //Valido que este algun sexo escogido
    if (inputElements[0].checked || inputElements[1].checked) {
        RemoveWarning("mGender");
        RemoveWarning("mGender");
        countOfSuccess++;
    } else {
        AddWarning("mGender");
        AddWarning("fGender");
    }

    if (countOfSuccess == 3) {
        result = true;
    }

    return result;
}


//setea las localidades
SetCities = (values) => {
    var select = Id("city");

    values.forEach(city => {
        option = document.createElement("option");
        option.value = city.nombre;
        option.text = city.nombre;
        select.add(option);
    });
}

/* SEGUNDO PARCIAL */

async function GetInitialData() {
    var data = null;

    try {
        let request = await fetch("http://localhost:3001/clientes", { method: 'GET', headers: { 'Content-type': 'application/json' } });

        request.json().then((response) => {
            /* console.log(response); */
            response.forEach(element => {
                CreateRowWithParameters(element.id, element.nombre, element.apellido, element.sexo, element.edad);
                originalData.push(element);
            });

        })
    } catch (error) {
        alert("No se logró traer la información: " + error);
    }
}

async function GetDataWithFilter(valueSelect, number) {
    try {
        let request = await fetch("https://swapi.dev/api/people/", { method: 'GET', headers: { 'Content-type': 'application/json' } });

        request.json().then((response) => {
            let newResult = FilterByParameters(response.results, valueSelect, number);

            if (newResult.length == 0) {
                alert("No hay ninguna fila que cumpla los filtros");
            } else {
                newResult.forEach(element => {
                    CreateRowWithParameters(element.id, element.name, element.hair_color, element.mass, element.gender);
                });
            }
        })
    } catch (error) {
        alert("No se logró traer la información: " + error);
    }
}

async function addFilters(){
    try {
        var select = Id("filterSelect");
        var valueSelect = select.options[select.selectedIndex].value;
    
        var number = Id("avgFilter").value;
    
        CleanTable();
    
        await GetDataWithFilter(valueSelect, number);
    } catch (error) {
        alert("No se logro filtar");
    }
}

CleanTable = () => {
    var table = Id("table")
    var tableRows = table.getElementsByTagName('tr');
    var rowCount = tableRows.length;

    for (var i = rowCount - 1; i >= 0; i--) {
        table.removeChild(tableRows[i]);
    }
}

Unchecked = (target) => {
    var id = target.getAttribute("id");
    var checked = target.checked;
    var position = 0;

    switch (id) {
        case "idCheck":
            position = 0;
            break;

        case "nombreCheck":
            position = 1;
            break;

        case "apellidoCheck":
            position = 2;
            break;

        case "sexoCheck":
            position = 3;
            break;

        case "edadCheck":
            position = 4;
            break;

        default:
            break;
    }

    if (checked) {
        ShowHideColumn(position, true);
    } else {
        ShowHideColumn(position, false);
    }
}

ShowHideColumn = (columnNumber, show) => {
    var rows = Id("table").rows;
    var heads = Id("table").getElementsByTagName("th");

    for (var row = 0; row < rows.length; row++) {
        var cols = rows[row].cells;
        if (columnNumber >= 0 && columnNumber < cols.length) {
            cols[columnNumber].style.display = show ? '' : 'none';
            heads[columnNumber].style.display = show ? '' : 'none';
        }
    }
}

ValidateFields = () => {
    var result = false;

    if (Id("nameForm").value != "") {
        if (Id("lastNameForm").value != "") {
            if (Id("ageForm").value != "" && !isNaN(Id("ageForm").value)) {
                result = true;
            }
        }
    }

    return result;
}

Validations = () => {
    if (Id("idForm").value == "") {
        if (ValidateFields()) {
            AddNew();
        } else {
            alert("Error: Falta cargar campos");
        }
    } else {
        alert("Error: Campo Id debe estar vacio para cargar");
        Id("idForm").value = "";
    }
}

AddNew = () => {
    var cliente = new Cliente();
    cliente.SetearValores(Cliente.LastId(), Id("nameForm").value, Id("lastNameForm").value, Id("genderForm").value, Id("ageForm").value);
    /* persona.id = LastId();
    persona.nombre = Id("nameForm").value;
    persona.apellido = Id("lastNameForm").value;
    persona.edad = parseInt(Id("ageForm").value);
    persona.sexo = Id("genderForm").value; */

    CreateRowWithParameters(cliente.id, cliente.nombre, cliente.apellido, cliente.sexo, cliente.edad);

    originalData.push(cliente);
}

FilterGender = () => {
    var selected = Id("filterSelect").value;

    var newArray = originalData.filter((data) => {
        return data.sexo == selected;
    });

    CleanTable();

    if (selected == "Todos") {
        originalData.forEach(element => {
            CreateRowWithParameters(element.id, element.nombre, element.apellido, element.sexo, element.edad);
        })
    } else {
        newArray.forEach(element => {
            CreateRowWithParameters(element.id, element.nombre, element.apellido, element.sexo, element.edad);
        })
    }

}

//PROMESA
async function CalculateAvg() {
    var index = ExistAge();

    try {
        if (index != -1) {
            await LoopRows(index);
        } else {
            alert("Error! no está activo el campo edad")
        }
    } catch (error) {
        //alert("No se logro calcular el promedio")
        alert(error)
    }
}

LoopRows = (index) => {
    var table = Id("table");
    var arrayAge = [];

    for (var i = 0; i < table.rows.length; i++) {
        arrayAge.push(parseInt(table.rows[i].cells[index].innerHTML));
    }

    var avg = Avg(arrayAge);

    Id("avgFilter").value = avg;
}

IdExistInTable = (id) =>{
    var table = Id("table");
    var headers = document.getElementsByTagName('th');
    var foundColumn = false;
    var result = false;

    for (var i = 0; i < headers.length; i++) {
        if (headers[i].innerHTML == "Id") {
            foundColumn = true;
            break;
        }
    }

    if (foundColumn) {    
        for (var j = 0; j < table.rows.length; j++) {
            if (parseInt(table.rows[j].cells[i].innerHTML) == id) {
                result = true;
            }
        }
    }

    return result;
}

Avg = (array) => {
    var sumatoria = array.reduce((a, b) => {
        return a + b;
    }, 0);

    return Math.round(sumatoria / array.length);
}

ExistAge = () => {
    var result = -1;
    var headers = document.getElementsByTagName('th');

    for (var i = 0; i < headers.length; i++) {
        if (headers[i].innerHTML == "Edad") {
            result = i;
            break;
        }
    }

    return result;
}

DeleteBtn = () => {
    var table = Id("table");
    var idRow = Id("idForm").value;

    if (idRow == "") {
        alert("Haga click en alguna de las personas para poder traerla primero");
    } else {   
        if (IdExistInTable(idRow)) {
            var row = Id(idRow);
            table.removeChild(row);
            //si no hay mas filas elimina la tabla
            if (table.rows.length <= 0) {
                let container = Id("container");
                container.removeChild(table);
            }            
        } else {
            alert("Error! No existe ese Id");
        }     
    }

}



