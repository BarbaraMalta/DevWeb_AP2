//console.log(hex_sha256('fogao'))
const login = () => {
    const hash_senha = '59c249f4c235fdbc552c1cf3214018907eacb27d17ea950a29e18d14d2110e4d'
    const senha = document.getElementById('senhaa').value

    if (hash_senha === hex_sha256(senha)) {
        sessionStorage.setItem('logado', 'sim');
        alert("Senha correta!")


        window.location = 'paglog.html'

    } else {
        alert("Senha incorreta!")
    
    }
}
//document.getElementById('logout').onclick = () => {sessionStorage.removeItem('logado'); alert('deslogado')}
