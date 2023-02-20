function showpop() {
  document.getElementsByClassName("popupContainer")[0].style.display = "block";
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

  const urlParams = new URLSearchParams(window.location.search);
  const utm_source = urlParams.get("utm_source");
  const utm_medium = urlParams.get("utm_medium");
  const utm_campaign = urlParams.get("utm_campaign");
  const utm_term = urlParams.get("utm_term");
  const utm_content = urlParams.get("utm_content");

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
        <img id="closeupopup"src="https://img.icons8.com/ios/50/000000/circled-x.png" />
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
            <input required type="tel" name="telefone" placeholder="DDD + Número de telefone"   />
            <input required type="email" name="email" placeholder="E-mail" />
            <input required type="text" name="mensagem" placeholder="Digite aqui sua mensagem...."  id="inputMensagem"/>
            <input type="hidden" name="utm_source" value="${utm_source}" />
            <input type="hidden" name="utm_medium" value="${utm_medium}" />
            <input type="hidden" name="utm_campaign" value="${utm_campaign}" />
            <input type="hidden" name="utm_term" value="${utm_term}" />
            <input type="hidden" name="utm_content" value="${utm_content}" />
            

           
        </div>
        <div class="inputCheck">
          <input  type="checkbox" name="check" />
          <label for="check">Concordo em receber novidades por email</label>
      </div>
        <button id="enviar"  type="submit">Enviar</button>

    </form>


  </div>
 `;

  var popup = document.createElement("div");
  popup.innerHTML = htmlContent;
  document.body.appendChild(popup);

  // TESTE /?utm_content=utm_content&utm_term=utm_term&utm_medium=utm_medium&utm_campaign=utm_campaign&utm_source=utm_source

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
  "btn", // Classe do botão//
  "https://httpbin.org/post", // URL do post//
  "5566992355663", // Número do whatsapp//
  "Olá, gostaria de saber mais sobre", // Mensagem padrão que sera mandada no whatsapp//
  "https://i.ytimg.com/vi/D2ZYUPvogLQ/maxresdefault.jpg", // URL da imagem que sera a foto do perfil do whatsapp//
  "Nome da empresa" // Nome da empresa//
);
