const myModal =new bootstrap.Modal("#register-modal");
let logged =sessionStorage.getItem("logged");
const session = localStorage.getItem("session");
checkLogged();
//Logar no sistema
document.getElementById("login-form").addEventListener("submit",function (e) {

    e.preventDefault();
    const email=document.getElementById("email-input").value;
    const password=document.getElementById("password-input").value;
    const checkSession=document.getElementById("session-check").checked;
   
    const account=getAccount(email);
    if (!account) {
        alert("oops verifique o usuário ou a senha.")
        return;
    }
    if (account.password !== password) {
        alert("oops verifique o usuário ou a senha.")
        return;
    }
    saveSession(email,checkSession);

    window.location.href="home.html"
});

//Criar conta
document.getElementById("create-form").addEventListener("submit",function (e) {
    e.preventDefault();
    const email=document.getElementById("email-create-input").value;
    const password=document.getElementById("password-create-input").value;

    
    if (email.length <5) {
alert("errado porra");
return; 

    }
    if (password.length <4) { alert("senha muita curta! preencha a senha com no minimo 4 digitos")
        return;
    }
    myModal.hide();
    alert("conta criada com sucesso")
    saveAccount({
        login: email,
        password: password,
        transactions:[]
    })

});
function checkLogged() {

    if (session) {
        sessionStorage.setItem("logged",session);
        
logged = session;

    }
    if (logged) { 
        saveSession(logged,session);
        window.location.href ="home.html";
        
    }
}
function saveAccount(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
    
}
function saveSession(data,saveSession) {
    if (saveSession) {
        localStorage.setItem("session",data);
        
    }
    sessionStorage.setItem("logged",data);
    
}
function getAccount(key) {
    const account = localStorage.getItem(key);
    if (account) { 
        return JSON.parse(account);
        
    }
    return "";
}
function hider () {
    myModal.hide();
}
document.getElementById("cancelb").addEventListener("click",hider);
