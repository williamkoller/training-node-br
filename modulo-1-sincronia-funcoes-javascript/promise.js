/**
 * 0 Obter um usuario
 * 1 Obter o numero de telefone de um usuario a partir de seu Id
 * 2 Obter o endereco do usuario pelo Id
 */
// importamos um módulo interno do node.js
const util = require('util')
const obterEnderecoSync = util.promisify(obterEndereco)

function obterUsuario() {
    // quando der algum problema -> reject(ERRO)
    // quando for success -> resolve
    return new Promise(function resolvePromise(resolve, reject) {

        setTimeout(function () {
            // return reject(new Error('DEU RUIM DE VERDADE!'))
            return resolve({
                id: 1,
                nome: 'William',
                dataNascimento: new Date()
            })
        }, 1000)
    })
}

function obterTelefone(idUsuario) {
    return new Promise(function resolveTelefone(resolve, reject) {

        setTimeout(function () {
            return resolve({
                telefone: '1199002',
                ddd: 11
            })
        })
    }, 2000)

}

function obterEndereco(idUsuario, callback) {

    setTimeout(() => {
        return callback(null, {
            rua: 'dos lobos',
            numero: 10
        })
    }, 2000);

}

const usuarioPromise = obterUsuario()
// para maniluparo sucesso usamos a função .then
// para manipular erros, usamos .catch
// usuario -> telefone -> telefone

usuarioPromise
    .then(function (usuario) {
        return obterTelefone(usuario.id)
            .then(function resolverTelefone(result) {
                return {
                    usuario: {
                        nome: usuario.nome,
                        id: usuario.id
                    },
                    telefone: result
                }
            })
    })
    .then(function (resultado) {
        const endereco = obterEnderecoSync(resultado.usuario.id)
        return endereco.then(function resolverEndereco(result) {
            return {
                usuario: resultado.usuario,
                telefone: resultado.telefone,
                endereco: result
            }
        })
    })
    .then(function (resultado) {
        console.log(`
            Nome: ${resultado.usuario.nome},
            Endreco: ${resultado.endereco.rua}, ${resultado.endereco.numero},
            Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}
        `)
    })
    .catch(function (error) {
        console.error('DEU RUIM', error)
    })