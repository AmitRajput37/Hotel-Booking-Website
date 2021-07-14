headerTemplate();
footerTemplate();


function headerTemplate() {
    let headerTemplate = `<img id="logo" src="assests/images/logo.png" alt="logo">
    <div id="login-button">
    <button type="button" class="btn btn-light btn-sm" data-toggle="modal"
        data-target="#login-modal" id="login" onclick="mainLogin(event)">
        LOGIN
    </button></div>`
    
    
    document.getElementById('header').innerHTML += headerTemplate;
}

function footerTemplate() {
    let footerTemplate = `<div id="footer-div">
    <div id="contact-us">
        <button type="button" class="btn btn-info btn-sm" data-toggle="modal"
                data-target="#contact-us-modal">
                Contact Us
            </button>
    </div>

    <div id="copyright">
        &copy; 2020 ROOM SEARCH PVT LTD.
    </div>

    <div id="social-media">
        <a href="https://www.facebook.com" target="_blank"><img class="social-media-img"
                src="assests/images/facebook.png"></a>

        <a href="https://www.instagram.com" target="_blank"><img class="social-media-img"
                src="assests/images/instagram.png"></a>

        <a href="https://twitter.com" target="_blank"><img class="social-media-img"
                src="assests/images/twitter.png"></a>
    </div>
</div>`;
document.getElementById('footer').innerHTML += footerTemplate;

}

function mainLogin (e){
    if (localStorage.getItem('isLogin') === 'true'){
        localStorage.setItem('isLogin', 'false');
        location.reload();
    }
};

function login(e){
    localStorage.setItem('username', 'admin');
    localStorage.setItem('password', 'admin');
    localStorage.setItem('isLogin', 'false');
    e.preventDefault();
    let userElement = document.getElementById('uname').value;
    let passwordElement = document.getElementById('pass').value;

    if (userElement === localStorage.getItem('username') && passwordElement === localStorage.getItem('password')){
        localStorage.setItem('isLogin', 'true');
        alert('Successfully logged in!');
        let loginElement = document.getElementById('login');
        loginElement.dataset.target = '';
        loginElement.innerText = 'LOGOUT';
        window.location.reload();
    }else{
        alert('Please enter correct username/password');
        userElement.value = '';
        passwordElement.value = '';
    }
};

let isLogin = localStorage.getItem('isLogin');
let loginElement = document.getElementById('login');

let checkLogin = () => {
    if(!isLogin || isLogin === 'false'){
        localStorage.clear();
        loginElement.dataset.target = '#login-modal';
        loginElement.innerText = 'LOGIN';
    }else if(isLogin === 'true'){
        loginElement.dataset.target = '';
        loginElement.innerText = 'LOGOUT';
    }
};

checkLogin();


