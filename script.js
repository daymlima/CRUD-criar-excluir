const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sFuncao = document.querySelector('#m-funcao')
const sSalario = document.querySelector('#m-salario')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

//ao abrir o modal vai ser adicionado a classe 'active']
//e cada clique fora do modal é removido a classe 'active' tornando-se display none 
function openModal( index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }
  
}
//remove elementos do array
//passa os dados pro banco e atualiza os dados em tela
function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

//Função que manipula o html apartir dos parâmetros no BD
function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.funcao}</td>
    <td>R$ ${item.salario}</td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

//a primeira condição é se os inputs tiverem vazios retornar
btnSalvar.onclick = e => {
  
  if (sNome.value == '' || sFuncao.value == '' || sSalario.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = sNome.value
    itens[id].funcao = sFuncao.value
    itens[id].salario = sSalario.value
  } else {
    itens.push({'nome': sNome.value, 'funcao': sFuncao.value, 'salario': sSalario.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

//essa função irá ser executada assim que a tela for carregada
function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

// getItensBD pega os itens do banco de dados se mão tiver nada ele cria um array vazio.
// JSON.parse troca dados de um servidor web nomeado/key por dbfunc(localStorage.getItem('dbfunc'))
//setItensBD seta os itens pra dentro do banco de dados.
//JSON.stringfy transforma o que ele recebe(itens) em string
//O localStorageobjeto permite que você salve pares de chave/valor no navegador.
const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()
