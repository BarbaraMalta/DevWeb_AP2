function login() {
    
    const senha = document.getElementById('senha').value
    const hash_senha = '59c249f4c235fdbc552c1cf3214018907eacb27d17ea950a29e18d14d2110e4d'

    if (hash_senha === hex_sha256(senha)) {
        window.location = "paglog.html"
        sessionStorage.setItem('logado', 'sim');
    } else {
        alert("Senha incorreta!")
    
    }
}
document.getElementById('logout').onclick = () => {sessionStorage.removeItem('logado'); alert('deslogado')}