// **************************************
//  Acessando contextos diferentes
// **************************************
(function () {
  // Contexto pai (function())
  this.valor = 10;
  // modulo é um novo contexto
  const modulo = {
    valor: 20,
    getValor: function () {
      return this.valor;
    },
  };
  console.log(modulo.getValor());

  // traz o getValor para o contexto pai (function())
  const getValor = modulo.getValor;
  console.log(getValor());

  const getValorContextoModulo = modulo.getValor.bind(modulo);
  console.log(getValorContextoModulo());

  //const valorNesteContexto = modulo.getValor()
})();

// **************************************
//  Outro uso
// **************************************
// Definindo uma função com um parâmetro fixo.
// Temos a função func1:
const func1 = (p1, p2) => {
  console.log(p1, p2);
};

// Podemos criar func2 como uma cópia de func1
// e fixar o valor do primeiro parâmetro com bind
// null é o contexto, poderia ser this, tanto faz. Não usamos o contexto aqui
const func2 = func1.bind(null, "valor1-fixo");
// então na nova função só passo o segundo parametro
func2("valor2");
