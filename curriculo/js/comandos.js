$(document).ready(function(){
  //etapa 1

    $("#botao").click(function(){
      var retorno = true;
     if($("#nome").val() == ""){
       $("#pnome").css( "visibility", "visible" );
       $("#nome").css("border-bottom","2px solid red");
       retorno = false;
     }
     if($("#sobrenome").val() == ""){
       $("#psobrenome").css( "visibility", "visible" );
       $("#sobrenome").css("border-bottom","2px solid red");
       retorno = false;
     }
     if($("#email").val() == ""){
       $("#pemail").css( "visibility", "visible" );
       $("#email").css("border-bottom","2px solid red");
       retorno = false;
     }
     if($("#senha").val() == ""){
       $("#senha").css("border-bottom","2px solid red");
       $("#psenha").html("Preencha esse dado.");
       $("#psenha").css( "color", "red" );
       $("#psenha").css( "visibility", "visible" );
       retorno = false;
     }

    var email = $("#email").val();
    var filtro =/^.+@.+\..{2,}$/;
    var caracteresIrrugulares= /[\(\)\<\>\,\;\:\\\/\"\[\]]/;
    if(!(filtro.test(email))||email.match(caracteresIrrugulares)){
      $("#pemail").css( "visibility", "visible" );
      $("#email").css("border-bottom","2px solid red");
      retorno = false;
    }

     return retorno;
    });
    $(".input").keypress(function () {
      $("#"+this.id).css("border-bottom","1px solid rgba(0,0,0,.45)");
      $("#p"+this.id).css("visibility","hidden");


    });
     $("#senha").focus(function () {
       if($("#senha").val().length > 6){
           $("#psenha").css( "visibility", "hidden" );
       }
       else {
         $("#psenha").css( "visibility", "visible" );
         $("#psenha").css("color","rgba(0,0,0,.45)");
         $("#psenha").html("Use de 6 a 20 caracteres");
       }

    });
    $("#senha").keypress(function () {
        var falta =  6 - $("#senha").val().length-1;
        if(falta < 1){
          $("#psenha").html("");
        }
        else{
          $("#psenha").css( "visibility", "visible" );
          $("#psenha").html("Restam "+falta+ " caracteres");
        }
    });
    $("#senha").focusout(function (){
      $("#psenha").css( "visibility", "hidden" );
    });
//final etapa 1

//etapa 3
$("#semnumero").click(function() {

  if($("#semnumero").prop("checked") == true){
    $("#numero").prop( "disabled", true );
    $("#numero").val("SN");
    $("#pnumero").css( "visibility", "hidden" );
    $("#numero").css("border-bottom","1px solid rgba(0,0,0,.45)");
  }
  else{
    $("#numero").prop( "disabled", false );
    $("#numero").val("");
  }

});

function limpa_formulario_cep() {
   $("#rua_avenida").val("");
   $("#bairro").val("");
   $("#cidade").val("");
   $("#estado").val("");
}

$("#cep").blur(function() {

           var cep = $(this).val().replace(/\D/g, '');

           if (cep != "") {

               var validacep = /^[0-9]{8}$/;

               if(validacep.test(cep)) {

                   $("#rua_avenida").val("...");
                   $("#bairro").val("...");
                   $("#cidade").val("...");
                   $("#estado").val("...");

                   $.getJSON("https://viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {

                       if (!("erro" in dados)) {
                           $("#rua_avenida").val(dados.logradouro);
                           $("#bairro").val(dados.bairro);
                           $("#cidade").val(dados.localidade);
                           $("#estado").val(dados.uf);
                           $("#prua_avenida").css( "visibility", "hidden" );
                           $("#rua_avenida").css("border-bottom","1px solid rgba(0,0,0,.45)");
                           $("#pbairro").css( "visibility", "hidden" );
                           $("#bairro").css("border-bottom","1px solid rgba(0,0,0,.45)");
                       }
                       else {
                           limpa_formulario_cep();
                           alert("CEP não encontrado.");
                       }
                   });
               }
               else {

                   limpa_formulario_cep();
                   alert("Formato de CEP inválido.");
               }
           }
           else {

               limpa_formulario_cep();
           }
       });
       $("#botaoSalvar").click(function(){
         var retorno = true;
         if($("#nomeSobrenome").val() == ""){
           $("#pnomeSobrenome").css( "visibility", "visible" );
           $("#nomeSobrenome").css("border-bottom","2px solid red");
           retorno = false;
         }
         if($("#cep").val() == ""){
           $("#pcep").css( "visibility", "visible" );
           $("#cep").css("border-bottom","2px solid red");
           retorno = false;
         }
         if($("#bairro").val() == ""){
           $("#pbairro").css( "visibility", "visible" );
           $("#bairro").css("border-bottom","2px solid red");
           retorno = false;
         }
         if($("#rua_avenida").val() == ""){
           $("#prua_avenida").css( "visibility", "visible" );
           $("#rua_avenida").css("border-bottom","2px solid red");
           retorno = false;
         }
         if($("#numero").val() == ""){
           $("#pnumero").css( "visibility", "visible" );
           $("#numero").css("border-bottom","2px solid red");
           retorno = false;
         }
         if($("#telefoneContato").val() == ""){
           $("#ptelefoneContato").css( "visibility", "visible" );
           $("#telefoneContato").css("border-bottom","2px solid red");
           retorno = false;
         }
         return retorno;
       });

       $("#telefoneContato")
        .mask("(99) 99999-9999?")
        .blur(function (event) {
            var target, phone, element;
            target = (event.currentTarget) ? event.currentTarget : event.srcElement;
            phone = target.value.replace(/\D/g, '');
            element = $(target);
            element.unmask();
            if(phone.length > 10) {
                element.mask("(99) 99999-999?9");
            } else {
                element.mask("(99) 99999-9999?");
            }
        });



   //para nao perder dados no refresh

   $("#seguranca").html($("#codSeguranca").val());
   $(".validade").html($("#datavencimento").val());
   $(".numerocartao").html($("#numerocartao").val());
   $(".nomecartao").html($("#nomeSobrenomeCartao").val());
   $(".cpfcard").html($("#cpfCartao").val());

   $("#numerocartao").mask("9999 9999 9999 9999").focus( function(){
     $(".cartao").css("transform","rotateY(360deg)");
   });;

   $("#datavencimento").mask("99 / 99");

   $("#codSeguranca").mask("999").keyup( function(){
     $("#seguranca").html($("#codSeguranca").val());
   }).focus( function(){
     $(".cartao").css("transform","rotateY(180deg)");
   });

   $("#datavencimento").keyup( function (){
     $(".validade").html($("#datavencimento").val());
   }).focus( function(){
     $(".cartao").css("transform","rotateY(360deg)");
   });
    $("#datavencimento").blur( function (){
     var today = new Date();

     var mes = parseInt($("#datavencimento").val().replace(/[^0-9]/g, '').toString().substr(0, 2)) - parseInt(today.getMonth());
     var ano = parseInt($("#datavencimento").val().replace(/[^0-9]/g, '').toString().substr(2, 3)) - parseInt(today.getYear() - 100);
     if(ano < 0){
       $("#pdatavencimento").html("Validade vencida");
       $("#pdatavencimento").css( "visibility", "visible" );
       $("#datavencimento").css("border-bottom","2px solid red");
     }
     if(ano == 0 && mes <= 0){
       $("#pdatavencimento").html("Validade vencida");
       $("#pdatavencimento").css( "visibility", "visible" );
       $("#datavencimento").css("border-bottom","2px solid red");
     }

   });

   $("#nomeSobrenomeCartao").keyup( function (){
     $(".nomecartao").html($("#nomeSobrenomeCartao").val());
   }).focus( function(){
     $(".cartao").css("transform","rotateY(360deg)");
   });

   $("#cpfCartao").mask("999.999.999-99").keyup( function (){
     $(".cpfcard").html($("#cpfCartao").val());
   });

   $('#cpfCartao').blur(function()
   {
     //valida cpf
       var cpf = $('#cpfCartao').val().replace(/[^0-9]/g, '').toString();
       if( cpf.length == 11 )
       {
           var v = [];
           //Calcula o primeiro dígito de verificação.
           v[0] = 1 * cpf[0] + 2 * cpf[1] + 3 * cpf[2];
           v[0] += 4 * cpf[3] + 5 * cpf[4] + 6 * cpf[5];
           v[0] += 7 * cpf[6] + 8 * cpf[7] + 9 * cpf[8];
           v[0] = v[0] % 11;
           v[0] = v[0] % 10;
           //Calcula o segundo dígito de verificação.
           v[1] = 1 * cpf[1] + 2 * cpf[2] + 3 * cpf[3];
           v[1] += 4 * cpf[4] + 5 * cpf[5] + 6 * cpf[6];
           v[1] += 7 * cpf[7] + 8 * cpf[8] + 9 * v[0];
           v[1] = v[1] % 11;
           v[1] = v[1] % 10;
           //Retorna Verdadeiro se os dígitos de verificação são os esperados.
           if ( (v[0] != cpf[9]) || (v[1] != cpf[10]) )
           {
               $("#pcpfCartao").html("CPF inválido");
               $("#pcpfCartao").css( "visibility", "visible" );
               $("#cpfCartao").css("border-bottom","2px solid red");
           }
       }
       else
       {
           $(".pcpfCartao").html("CPF inválido");
           $('#cpfCartao').val('');
       }
   });
   $(".cpfCartao").focus( function(){
     $(".cpf").slideDown();
     $(".cpf").css("visibility","visible");
     $(".card").css("visibility","hidden");
   });
   $(".flip").focus( function(){
     $(".cpf").slideUp();
     $(".cpf").css("visibility","hidden");
     $(".card").css("visibility","visible");
   });

   $("#numerocartao").focusout( function(){
     var bandeira = checkCard($("#numerocartao").val());

   });
   $("#numerocartao").keyup( function(){
     $(".numerocartao").html($("#numerocartao").val());
     if($("#numerocartao").val().length >= 3){
       var bandeira = verificarCartao($("#numerocartao").val()+" 0000 0000 0000");
       if(bandeira == "visa"){
         $(".bandeira").attr("src","img/visa.png");
       }
       else if(bandeira == "mastercard"){
         $(".bandeira").attr("src","img/mastercard.png");
       }
       else if(bandeira == "diners"){
         $(".bandeira").attr("src","img/diners.png");
       }
       else if(bandeira == "amex"){
         $(".bandeira").attr("src","img/amex.png");
       }
       else if(bandeira == "discover"){
         $(".bandeira").attr("src","img/discover.png");
       }
       else if(bandeira == "hipercard"){
         $(".bandeira").attr("src","img/hipercard.png");
       }
       else if(bandeira == "elo"){
         $(".bandeira").attr("src","img/elo.png");
       }
       else if(bandeira == "jcb"){
         $(".bandeira").attr("src","img/jcb.png");
       }
       else if(bandeira == "aura"){
         $(".bandeira").attr("src","img/aura.png");
       }
     }
   });
   $("#botaoContinuar").click( function(){
     var retorno = true;
     if($("#nomeSobrenomeCartao").val() == ""){
       $("#pnomeSobrenomeCartao").html("Preencha esse dado");
       $("#pnomeSobrenomeCartao").css( "visibility", "visible" );
       $("#nomeSobrenomeCartao").css("border-bottom","2px solid red");
       retorno = false;
     }
     if($("#numerocartao").val() == ""){
       $("#pnumerocartao").html("Preencha esse dado");
       $("#pnumerocartao").css( "visibility", "visible" );
       $("#numerocartao").css("border-bottom","2px solid red");
       retorno = false;
     }
     if($("#datavencimento").val() == ""){
       $("#pdatavencimento").html("Preencha esse dado");
       $("#pdatavencimento").css( "visibility", "visible" );
       $("#datavencimento").css("border-bottom","2px solid red");
       retorno = false;
     }
     if($("#codSeguranca").val() == ""){
       $("#pcodSeguranca").html("Preencha esse dado");
       $("#pcodSeguranca").css( "visibility", "visible" );
       $("#codSeguranca").css("border-bottom","2px solid red");
       retorno = false;
     }
     if($("#cpfCartao").val() == ""){
       $("#pcpfCartao").html("Preencha esse dado");
       $("#pcpfCartao").css( "visibility", "visible" );
       $("#cpfCartao").css("border-bottom","2px solid red");
       retorno = false;
     }
     return retorno;
   });


//ver bandeira cartao
   function verificarCartao (numero) {
     var numero = numero.replace(/[^0-9]+/g, '');

      var cartao = {
          visa      : /^4[0-9]{12}(?:[0-9]{3})/,
          mastercard : /^5[1-5][0-9]{14}/,
          diners    : /^3(?:0[0-5]|[68][0-9])[0-9]{11}/,
          amex      : /^3[47][0-9]{13}/,
          discover  : /^6(?:011|5[0-9]{2})[0-9]{12}/,
          hipercard  : /^(606282\d{10}(\d{3})?)|(3841\d{15})/,
          elo        : /^((((636368)|(438935)|(504175)|(451416)|(636297))\d{0,10})|((5067)|(4576)|(4011))\d{0,12})/,
          jcb        : /^(?:2131|1800|35\d{3})\d{11}/,
          aura      : /^(5078\d{2})(\d{2})(\d{11})$/
      };

      for (var bandeira in cartao) {
          if(cartao[bandeira].test(numero)) {
              return bandeira;
          }
      }

      return false;
 }

//validar cartao
function checkCard(num){
     var msg = Array();
     var tipo = null;
    var num = num.replace(/[^0-9]/g, '').toString();
     if(num.length > 16 || num[0]==0){
       $("#pnumerocartao").html("Número de cartão incorreto");
       $("#pnumerocartao").css( "visibility", "visible" );
       $("#numerocartao").css("border-bottom","2px solid red");
     } else {
       var total = 0;
       var arr = Array();
       for(i=0;i<num.length;i++){
         if(i%2==0){
           dig = num[i] * 2;
           if(dig > 9){
             dig1 = dig.toString().substr(0,1);
             dig2 = dig.toString().substr(1,1);
             arr[i] = parseInt(dig1)+parseInt(dig2);
           } else {
             arr[i] = parseInt(dig);
           }
           total += parseInt(arr[i]);
         } else {
           arr[i] =parseInt(num[i]);
           total += parseInt(arr[i]);
         }
       }

       switch(parseInt(num[0])){
         case 0:
           msg.push("Número incorreto");
           break;
         case 1:
           tipo = "Empresas Aéreas";
           break;
         case 2:
           tipo = "Empresas Aéreas";
           break
         case 3:
           tipo = "Viagens e Entretenimento";
           if(parseInt(num[0]+num[1]) == 34 || parseInt(num[0]+num[1])==37){  operadora = "Amex"; }
           if(parseInt(num[0]+num[1]) == 36){ operadora = "Diners"; }
           break
         case 4:
           tipo = "Bancos e Instituições Financeiras";
           operadora = "visa";
           break
         case 5:
           if(parseInt(num[0]+num[1]) >= 51 && parseInt(num[0]+num[1])<=55){  operadora = "Mastercard"; }
           tipo = "Bancos e Instituições Financeiras";
           operadora = "Mastercard"
           break;
         case 6:
           tipo = "Bancos e Comerciais";
           operadora = "";
           break
         case 7:
           tipo = "Companhias de petróleo";
           operadora = "";
           break
         case 8:
           tipo = "Companhia de telecomunicações";
           operadora = "";
           break
         case 9:
           tipo = "Nacionais";
           operadora = "";
           break
         default:
           msg.push("Número incorreto");
           break;
         }
   }

   if(msg.length>0){
     console.log(msg);
   } else {
     console.log(num);
       if(total%10 == 0){
         console.log("Cartão válido: ("+total+")");
         console.log("Tipo: " + tipo);
         console.log("Operadora: " + operadora);
       } else {
         $("#pnumerocartao").html("Número de cartão incorreto");
         $("#pnumerocartao").css( "visibility", "visible" );
         $("#numerocartao").css("border-bottom","2px solid red");
       }
     }

}
//fecha jquery
});