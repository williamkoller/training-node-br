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

// 1º passo adicionar a palavra async -> automaticamente ela retornaŕa uma promise
main()
async function main() {
    try {
        console.time('medida-promise')
        const usuario = await obterUsuario()
        // const telefone = await obterTelefone(usuario.id)
        // const endereco = await obterEnderecoSync(usuario.id)
        const resultado = await Promise.all([
            obterTelefone(usuario.id),
            obterEnderecoSync(usuario.id)
        ])
        const endereco = resultado[1]
        const telefone = resultado[0]
        console.log(`
            Nome: ${usuario.nome},
            Endereco: ${endereco.rua}, ${endereco.numero},
            Telefone: (${telefone.ddd}) ${telefone.telefone}
        `)
        console.timeEnd('medida-promise')
    } catch (error) {
        console.error('DEU RUIM', error)
    }
}
