function consumirAPI() {
    // Faz uma requisição para a API local em busca dos dados dos produtos
    fetch('http://localhost:3000/produtos')
      // Converte a resposta da API para formato JSON
      .then(response => response.json())
      // Processa os dados dos produtos recebidos
      .then(produtos => {
        // Seleciona o elemento HTML onde os cards dos produtos serão inseridos
        const produtosContainer = document.getElementById('produtosContainer');
        // Limpa o conteúdo anterior do container, caso exista
        produtosContainer.innerHTML = '';
  
        // Itera sobre cada produto da lista recebida
        produtos.forEach(produto => {
          // Cria um novo elemento div para representar o card do produto
          const produtoCard = document.createElement('div');
          // Adiciona a classe 'produto-card' para aplicar os estilos definidos no CSS
          produtoCard.classList.add('produto-card');
  
          // Constrói o conteúdo HTML do card, inserindo os dados do produto
          produtoCard.innerHTML = `
            <h2>${produto.nome}</h2>
            <p><strong>Preço:</strong> R$ ${produto.precoUnitario.toFixed(2)}</p>
            <p><strong>Quantidade:</strong> ${produto.quantidade}</p>
            <p><strong>Categoria:</strong> ${produto.categoria}</p>
            <p class="fabricante"><strong>Fabricante:</strong> ${produto.fabricante}</p>
          `;
  
          // Adiciona o card recém-criado ao container de produtos
          produtosContainer.appendChild(produtoCard);
        });
      })
      // Captura e loga qualquer erro que ocorra durante o processo
      .catch(error => console.log('Erro ao carregar produtos: ', error));
  }

  // Adiciona um event listener ao formulário para capturar o evento de envio
document.getElementById('produtoForm').addEventListener('submit', (event) => {
    // Impede o comportamento padrão do formulário, que é recarregar a página
    event.preventDefault();
  
    // Cria um objeto com os dados do novo produto, coletados dos campos do formulário
    const novoProduto = {
      nome: document.getElementById('nome').value,
      precoUnitario: parseFloat(document.getElementById('precoUnitario').value),
      quantidade: parseInt(document.getElementById('quantidade').value),
      categoria: document.getElementById('categoria').value,
      fabricante: document.getElementById('fabricante').value
    };
  
    // Faz uma requisição POST para a API para adicionar o novo produto
    fetch('http://localhost:3000/produtos', {
      method: 'POST', // Indica que é uma requisição POST
      headers: { 'Content-Type' : 'application/json' }, // Define o tipo de conteúdo como JSON
      body: JSON.stringify(novoProduto) // Envia os dados do novo produto no corpo da requisição em formato JSON
    })
      // Processa a resposta da API
      .then(response => response.json())
      // Executa uma ação após a resposta ser recebida com sucesso
      .then(data => {
        // Exibe um alerta indicando que o produto foi adicionado com sucesso
        alert('Produto adicionado!');
        // Atualiza a lista de produtos na página, chamando a função consumirAPI()
        consumirAPI();
      })
      // Captura e loga qualquer erro que possa ocorrer durante o processo
      .catch(error => console.log('Erro ao adicionar produto', error));
  });
  
  // Executa a função consumirAPI quando a página é carregada
  window.onload = consumirAPI;