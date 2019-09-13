$(document).ready(function()
{
    $("#btnNumCases").click(function()
    {
        var numCases=$("#NumCases").val();

        if(!numCases)
         {
            alert("El número de pruebas es obligatorio");
            return;
         } 

        if(numCases<1 || numCases>50)
        {
            alert("El número de pruebas no puede ser menor a 1 ni mayor a 50");
            return;
         } 

         var txtNumcases="";
         for(i=0;i<numCases;i++)
         {
            
             blockCases='<div class="styleTests"><h3>Prueba'+ (i+1)+'</h3>'+
                    '<p><strong>Número de coordenadas:   </strong><input type="number" id="NumCoo'+i+'" class="inputCor Test'+i+'"></p>'+
                    '<p><strong>Número de operaciones:   </strong><input type="number" id="NumOpe'+i+'" class="inputCor Test'+i+'"></p>'+
                    '<p><button id="btnOperations'+i+'" class="Operations">Calcular</button></p>'+
                      '<span id="grpOperations'+i+'" span>'+
                       
                    '</div>';


             txtNumcases=txtNumcases + blockCases;
         }

         $("#grpNumCases").html(txtNumcases);

    });


});

$(document).on("click",".Operations", function () {


    var idText=$(this).attr('id');
    var idTemp= idText.replace('btnOperations','');


    var NumCoo=$("#NumCoo"+idTemp).val();
    var NumOpe=$("#NumOpe"+idTemp).val();

    if(!NumCoo)
     {
        alert("El número de coordenadas es obligatorio");
        return;
     } 

     if(!NumOpe)
     {
        alert("El número de operaciones es obligatorio");
        return;
     } 

    if(NumCoo<1 || NumCoo>100)
    {
        alert("El número de coordenadas no puede ser menor a 1 ni mayor a 100");
        return;
    } 

    if(NumOpe<1 || NumOpe>1000)
    {
        alert("El número de operaciones no puede ser menor a 1 ni mayor a 1000");
        return;
    } 

    var url = $('#loaderCube').data('request-url');
    $.post(url, { length: NumCoo, position: idTemp }, function (data) {
        if (!data.EsCreate) {
            alert('Error en la creación del cubo');
            return;
        }
    });

    var txtNumOpe="";
    for(i=0;i<NumOpe;i++)
    {
       
        var txtOperations='<select id="miselect'+idTemp+"_"+i+'" class="NumQueries">'+
        '<option style="display:none" disabled selected value>'+
         '<option value="1">UPDATE</option>'+
         '<option value="2">QUERY</option>'+
        '</select>'+
            '<span id=regOperation' + idTemp + "_" +i+'></span>'+
        '<br><br>';

        txtNumOpe=txtNumOpe + txtOperations;
    }

    $("#grpOperations"+idTemp).html(txtNumOpe);

});


$(document).on("change",".NumQueries", function () 
{
  var idText=$(this).attr('id');
  var idTemp= idText.replace('miselect','');

  var valSel=$(this).val();

  if(valSel==1)     
  {
      txtUpdate=  '<strong>x:</strong><input type="number" id="x'+idTemp+'" class="inputCor">'+
                  '<strong>y:</strong><input type="number" id="y'+idTemp+'" class="inputCor">'+
                  '<strong>z:</strong><input type="number" id="z'+idTemp+'" class="inputCor">'+
                  '<strong>W:</strong><input type="number" id="w'+idTemp+'" class="inputCor">'+
                  '<button style="margin-left: 20px" id="btnUpdate' + idTemp + '" class="updates">Actualizar</button>' +
          '<strong id="resultUpdate' + idTemp + '"></strong>';
      
      $("#regOperation"+idTemp).html(txtUpdate);
  }

  if(valSel==2)
  {
      txtQuery = '<strong>x1:</strong><input type="number" id="x1' + idTemp + '" class="inputCor">' +
                 '<strong>y1:</strong><input type="number" id="y1' + idTemp + '" class="inputCor">' +
                 '<strong>z1:</strong><input type="number" id="z1' + idTemp + '" class="inputCor">' +
                 '<strong>x2:</strong><input type="number" id="x2'+idTemp+'" class="inputCor">'+
                 '<strong>y2:</strong><input type="number" id="y2'+idTemp+'" class="inputCor">'+
                 '<strong>z2:</strong><input type="number" id="z2'+idTemp+'" class="inputCor">'+
                 '<button style="margin-left: 20px" id="btnquery' + idTemp + '" class="queries">Resultado</button>'+
          '<strong id="resultQuery' + idTemp + '"></strong>';

                 
      
      $("#regOperation"+idTemp).html(txtQuery);
  }

});

$(document).on("click",".updates", function () {

    var idText=$(this).attr('id');
    var idTemp = idText.replace('btnUpdate', '');

    var res = idTemp.split("_", 1);
    var NumCoo = $("#NumCoo" + res).val();

    var valx = $("#x" + idTemp).val();
    var valy = $("#y" + idTemp).val();
    var valz = $("#z" + idTemp).val();
    var valw = $("#w" + idTemp).val();


    if (!valx) {
        alert("la coordenada x es obligatoria");
        return;
    } 

    if (!valy) {
        alert("la coordenada y es obligatoria");
        return;
    } 

    if (!valz) {
        alert("la coordenada z es obligatoria");
        return;
    } 

   
    if (!valw) {
        alert("El valor w es obligatorio");
        return;
    } 

    if (valx < 1 || valx > NumCoo) {
        alert("x no puede ser menor a 1 ni mayor al número de coordenadas");
        return;
    } 

    if (valy < 1 || valy > NumCoo) {
        alert("y no puede ser menor a 1 ni mayor al número de coordenadas");
        return;
    } 

    if (valz < 1 || valz > NumCoo) {
        alert("z no puede ser menor a 1 ni mayor al número de coordenadas");
        return;
    } 

    if (valw < Math.pow(-10, 9) || valz > Math.pow(10, 9)) {
        alert("El valor de w es incorrecto");
        return;
    }

    var url = $('#loaderUpdate').data('request-url');
    var inputData = { X: valx, Y: valy, Z: valz, W: valw};

    $.post(url, { inputData: inputData, position: res }, function (data) {
        if (data.esUpdate) {
            $("#resultUpdate" + idTemp).text(" Actualización Corrrecta")
            $("#x" + idTemp).attr('readonly', true); 
            $("#y" + idTemp).attr('readonly', true); 
            $("#z" + idTemp).attr('readonly', true); 
            $("#w" + idTemp).attr('readonly', true); 
            $("#miselect" + idTemp).attr('disabled', true);
        }
         
        else
            $("#resultUpdate" + idTemp).text(" Error en la actualización")
    });
});

$(document).on("click",".queries", function () {
    var idText=$(this).attr('id');
    var idTemp = idText.replace('btnquery', '');
    var res = idTemp.split("_", 1);
    var NumCoo = $("#NumCoo" + res).val();

    var valx1 = $("#x1" + idTemp).val();
    var valy1 = $("#y1" + idTemp).val();
    var valz1 = $("#z1" + idTemp).val();

    var valx2 = $("#x2" + idTemp).val();
    var valy2 = $("#y2" + idTemp).val();
    var valz2 = $("#z2" + idTemp).val();


    if (!valx1) {
        alert("la coordenada x1 es obligatoria");
        return;
    }

    if (!valx2) {
        alert("la coordenada x2 es obligatoria");
        return;
    }

    if (!valy1) {
        alert("la coordenada y1 es obligatoria");
        return;
    }

    if (!valy2) {
        alert("la coordenada y2 es obligatoria");
        return;
    }

    if (!valz1) {
        alert("la coordenada z1 es obligatoria");
        return;
    }

    if (!valz2) {
        alert("la coordenada z2 es obligatoria");
        return;
    }

    if (valx1 < 1 || valx1 > NumCoo || valx1>valx2) {
        alert("x1 no puede ser menor a 1 ni mayor a x2 o al número de coordenadas");
        return;
    }

    if (valx2 < 1 || valx2 > NumCoo || valx1 > valx2) {
        alert("x2 no puede ser menor a x1 o a 1 ni mayor al número de coordenadas");
        return;
    }

    if (valy1 < 1 || valy1 > NumCoo || valy1 > valy2) {
        alert("y1 no puede ser menor a 1 ni mayor a y2 o al número de coordenadas");
        return;
    }

    if (valy2 < 1 || valy2 > NumCoo || valy1 > valy2) {
        alert("y2 no puede ser menor a y1 o a 1 ni mayor al número de coordenadas");
        return;
    }

    if (valz1 < 1 || valz1 > NumCoo || valz1 > valz2) {
        alert("z1 no puede ser menor a 1 ni mayor a z2 o al número de coordenadas");
        return;
    }

    if (valz2 < 1 || valz2 > NumCoo || valz1 > valz2) {
        alert("z2 no puede ser menor a z1 o a 1 ni mayor al número de coordenadas");
        return;
    }


    var url = $(  '#loaderQuery').data('request-url');
    var query = { x1: valx1, y1: valy1, z1: valz1, x2: valx2, y2: valy2, z2: valz2,   };

    $.post(url, { query: query, position: res }, function (data) {
        if (data.esQuery) {

            $("#resultQuery" + idTemp).text(" Resultado: "+data.result)
            $("#x1" + idTemp).attr('readonly', true);
            $("#y1" + idTemp).attr('readonly', true);
            $("#z1" + idTemp).attr('readonly', true);
            $("#x2" + idTemp).attr('readonly', true);
            $("#y2" + idTemp).attr('readonly', true);
            $("#z2" + idTemp).attr('readonly', true);
            $("#miselect" + idTemp).attr('disabled', true);
        }
           
        else
            $("#resultQuery" + idTemp).val(' Error en la consulta')
    });
});

