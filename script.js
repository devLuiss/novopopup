function showpop() {
  document.getElementsByClassName("popupContainer")[0].style.display = "block";
  document.getElementsByClassName("blurTest")[0].style.display = "";
}

function hidepopup() {
  document.getElementsByClassName("popupContainer")[0].style.display = "none";
}

function addWPdiv(
  class_name,
  post_url,
  phone_number,
  wp_message,
  url_img,
  nome_empresa
) {
  const btns = document.querySelectorAll(`.${class_name}`).forEach((btn) => {
    btn.setAttribute("onclick", "showpop()");
  });
  const htmlContent = `
    <div class="popupContainer">
    <div class="headerpopup">
      <img
        src="${url_img}"
        alt="4all"
      />
      <div class="nomeEmpresa">
        <strong> ${nome_empresa}</strong>
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
  "Olá, gostaria de conversar sobre o produto X",
  "http://s3.amazonaws.com/storage.wobiz.com/97/97694/images/Medium32/social-default_1661173116.png",
  "Nome da empresa"
);
