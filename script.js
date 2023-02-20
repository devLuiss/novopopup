function showpop() {
  document.getElementsByClassName("popupContainer")[0].style.display = "block";
  document.getElementsByClassName("blurTest")[0].style.display = "";
}

function hidepopup() {
  document.getElementsByClassName("popupContainer")[0].style.display = "none";
}

function addWPdiv(class_name, post_url, phone_number, wp_message) {
  const btns = document.querySelectorAll(`.${class_name}`).forEach((btn) => {
    btn.setAttribute("onclick", "showpop()");
  });
  const htmlContent = `
    <div class="popupContainer">
    <div class="headerpopup">
      <img
        src="https://img.freepik.com/fotos-gratis/imagem-aproximada-em-tons-de-cinza-de-uma-aguia-careca-americana-em-um-fundo-escuro_181624-31795.jpg?w=1380&t=st=1676721783~exp=1676722383~hmac=a807ffc8d15c714022d602026911bc7845c358f5fbb5beed3f56c114bda75dd4"
        alt="4all"
      />
      <div class="nomeEmpresa">
        <strong>Nome da Empresa</strong>
        <div class="online">Online</div>
      </div>
      <div class="closepopup" onclick="hidepopup()">
        <img src="https://img.icons8.com/ios/50/000000/circled-x.png" />
      </div>
    </div>
    <div class="bodypopup">
      <div class="mensagem">
        <p>
          Olá, preencha os campos abaixo para entrar<br/> em contato com nosso time via Whatsapp!
        </p>
      </div>
      <form id="whatsapp_form" action="${post_url}">
        <div class="inputspopup">
            <input required type="text" name="nome" placeholder="*Nome completo" />
            <input required type="tel" name="telefone" placeholder="DDD + Número de telefone"  />
            <input required type="email" name="email" placeholder="E-mail" />
            <input required type="text" name="mensagem" placeholder="Digite aqui sua mensagem...."  id="inputMensagem"/>
           
        </div>
        <div class="inputCheck">
          <input required type="checkbox" name="check" />
          <label for="check">Concordo em receber novidades por email</label>
      </div>
        <button id="enviar"  type="submit">Enviar</button>

    </form>


  </div>



    `;

  var popup = document.createElement("div");
  popup.innerHTML = htmlContent;
  document.body.appendChild(popup);

  document
    .getElementById("whatsapp_form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      data = {};
      $("form#whatsapp_form input").each((i, input) => {
        data[input.name] = input.value;
      });
      $.post(post_url, data).done(
        () =>
          (window.location.href = `https://api.whatsapp.com/send?phone=${phone_number}&text=${wp_message}`)
      );
    });
}

addWPdiv(
  "btn",
  "https://httpbin.org/post",
  "66999999999",
  "Olá, gostaria de conversar sobre o produto X"
);
