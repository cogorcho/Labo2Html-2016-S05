//-------------------------------------------------------------------
// Globales
//-------------------------------------------------------------------
var categoriaSeleccionada = 0;
var areaSeleccionada = 0;
//--------------------------------------------------------------------
// Ajax, esta funcion va al server y trae la data en json
//--------------------------------------------------------------------
function ajax(target, f, p_pregunta) {
    console.log(p_pregunta);
    var params = '?{\"categoriaid\":' + categoriaSeleccionada + 
                ',\"areaid\":' + areaSeleccionada;
    if (p_pregunta !== undefined || p_pregunta === 0) {
        params += ',\"preguntaid\":' + p_pregunta.id;
    }
    params += '}'; 

    var ajax_url = "./" + target + params;
    console.log(ajax_url);
    var ajax_request = new XMLHttpRequest();
    //ajax_request.addEventListener("loadend", controlCarga);
    ajax_request.onreadystatechange = function() {
        if (ajax_request.readyState == 4 ) {
            if (ajax_request.status === 200) {
                var jsonObj = JSON.parse( ajax_request.responseText );
                var obj = {
                    id : target,
                    legend : target.charAt(0).toUpperCase() + target.substr(1).toLowerCase(),
                    data : jsonObj,
                    pregunta : p_pregunta
                }
                f(obj);
            } 
        }
    }
    ajax_request.open( "GET", ajax_url, true );
    ajax_request.send();
}

function traerCategorias() {
    ajax('categorias', armarRB);
}

function traerAreas() {
    ajax('areas', armarRB);
}

function traerPreguntas() {
    ajax('preguntas', armarTabla, undefined);
}

function traerRespuestas(pregunta) {
    ajax('respuestas', popup, pregunta)
}

/*-----------------------------------------------
    Arma los radio button para seleccion
    Area y Categoria
-------------------------------------------------*/
function armarRB(objData) {
    var cuantas = objData.data.length;
    var nav = document.getElementById('menu');
    var fset = document.createElement('fieldset');
    //fset.className = 'fset';
    fset.className = "fieldset";

    var legend = document.createElement('legend');
    legend.className = 'legend';
    legend.innerHTML = objData.legend;
    fset.appendChild(legend);

    for (var i = 0; i < cuantas; i++) {
        var rb = document.createElement('input');
        rb.className = "radio-inline";
        var lb = document.createElement('label');
        lb.setAttribute("for", rb);
        lb.innerHTML = objData.data[i].descripcion;
        fset.appendChild(lb);
        rb.type = 'radio';
        rb.name = objData.id;
        rb.id = objData.data[i].descripcion;
        rb.value = objData.data[i].id;
        fset.appendChild(rb);
    }
    nav.appendChild(fset);
    fset.addEventListener('click', clickRB);
}

/*-----------------------------------------------
    Cada click en los RB, se guarda
-------------------------------------------------*/
function clickRB(ev) {
    var src = ev.srcElement;

    var rb = {
        type : src.name,
        id : src.id,
        value : src.value
    };

    if (rb.type === 'categorias')
        categoriaSeleccionada = rb.value;
    if (rb.type === 'areas')
        areaSeleccionada = rb.value;

    if (categoriaSeleccionada > 0 && areaSeleccionada > 0) {
        traerPreguntas();
    }
}

function armarTabla(obj) {
    var yaExiste = document.getElementById('tabla');
    if (yaExiste != null) {
        yaExiste.parentNode.removeChild(yaExiste);
    }

    var preguntas = obj.data;
    var cuantas = preguntas.length;

    var tabla = document.createElement('table');
    tabla.id = 'tabla';
    tabla.className = 'table table-striped table-hover';
    var encabezado, cuerpo, fila, pregid, texto, correcta;

    encabezado = tabla.createTHead();
    fila = encabezado.insertRow(0); 
    pregid = fila.insertCell(0);
    texto = fila.insertCell(1);
    fila.id = "encabezado";
    pregid.innerHTML = 'Nro';
    texto.innerHTML = 'Pregunta';
    
    cuerpo = tabla.createTBody();
    for(var i = 0; i < cuantas; i++) {
        fila = cuerpo.insertRow(0); 
        pregid = fila.insertCell(0);
        texto = fila.insertCell(1);
        pregid.innerHTML = preguntas[i].preguntaid;
        texto.innerHTML = preguntas[i].texto;
        // var respcorrecta = document.createAttribute("data-correcta");
        // respcorrecta.value = preguntas[i].correcta;
        // fila.setAttributeNode(respcorrecta);
        fila.id = "id"+pregid;
    }
    document.getElementById("principal").appendChild(tabla);

    tabla.addEventListener('click', rowSelected);
}

/*-------------------------------------------------------------
    Captura el click sobre las filas de la tabla
---------------------------------------------------------------*/
function rowSelected(ev) {
    ev.preventDefault();
    var fila = ev.srcElement.parentElement;
    if (fila.childNodes.length<2) return;
    if (fila.id.indexOf("id")!=0) return;
    
    var obj = {}
    obj.id = fila.childNodes[0].innerHTML;
    obj.texto = fila.childNodes[1].innerHTML;

    traerRespuestas(obj);
}
//--------------------------------------------------
// Popup con las respuestas
//--------------------------------------------------
function popup(obj) {
    console.log(obj);
    var div0 = document.createElement('div');
    div0.id = 'text';
    div0.className = 'lightbox';
    document.body.appendChild(div0);
    
    var div1 = document.createElement('div');
    div1.className = 'box';

        var pregunta = document.createElement('p');
        pregunta.className = 'title';
        pregunta.textContent = obj.pregunta.id + ': ' + obj.pregunta.texto;
        div1.appendChild(pregunta);

        var respuestas = document.createElement('div');
        respuestas.className = 'content';
        var cuantas = obj.data.length;
        for (var i = 0; i < cuantas; i++) {
            var rb = document.createElement('input');
            var lb = document.createElement('label');
            var br = document.createElement('br');
            lb.setAttribute("for", rb);
            lb.innerHTML = obj.data[i].texto;
            rb.type = 'radio';
            rb.name = 'rbRespuestas';
            rb.id =  obj.data[i].texto;
            rb.value = obj.data[i].respuestaid;
            respuestas.appendChild(rb);
            respuestas.appendChild(lb);
            respuestas.appendChild(br);
        }
        div1.appendChild(respuestas);
        respuestas.addEventListener('click', clickRB);

        var responder = document.createElement('input');
        responder.type = 'button';
        responder.value = 'Responder';
        responder.id = 'btnResponder';
        //responder.addEventListener('click', procesarRespuesta);
        div1.appendChild(responder);

        var cbxMarcar = document.createElement('input');
        cbxMarcar.type = 'checkbox';
        cbxMarcar.id = 'cbExamen';
        cbxMarcar.setAttribute('data-preguntaid', obj.pregunta.id);
        cbxMarcar.setAttribute('data-categoriaid', categoriaSeleccionada.value);
        cbxMarcar.setAttribute('data-areaid', areaSeleccionada.value);
        var cbLabel = document.createElement("label");
        cbLabel.id = 'cbLabel';
        cbLabel.setAttribute("for",'cbExamen');
        cbLabel.innerHTML = 'Agregar al examen';

        div1.appendChild(cbxMarcar);
        div1.appendChild(cbLabel);

        var closer = document.createElement('input');
        closer.type = 'button';
        closer.value = 'Cerrar';
        closer.id = 'btnCerrar';
        //closer.addEventListener('click', closePopup);
        div1.appendChild(closer);

        div0.appendChild(div1);
        //Aparezcase la popup!
        div0.style.display = "block";
        div0.style.outline = "none";
}

//--------------------------------------------------
// Action! Aca arranca todo en el cliente
//--------------------------------------------------
traerCategorias();
traerAreas();
