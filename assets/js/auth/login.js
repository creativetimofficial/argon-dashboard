const envHost = "http://localhost:8080"
const token_auth_url = envHost+"/keyauth/v1/oauth2/tokens/"
const token_validate_url = envHost+"/keyauth/v1/oauth2/tokens/"
const web_client_id =  "ECo4LyNiJVOGxOQwUVaiv8B1"
const web_client_secret = "dxWIpr8qgLq2Udu3dTKRnTYUV4hqwjtX"

const login_page_url= "pages/sign-in.html"
const main_page_url = "index.html"

// Function to encode a string to Base64
function base64Encode(str) {
    return btoa(unescape(encodeURIComponent(str)));
}

// Function to authenticate and store token in local storage
async function login_authenticate(username, password) {
    // keep user credential
    localStorage.setItem('authCredential', base64Encode(username+":"+password));

    const credentials = {
        client_id: web_client_id,
        client_secret : web_client_secret,
        username: username,
        password: password,
        grant_type: "password"
    };

    await fetch(token_auth_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(response => {
            if (!response.ok) {
                return new Error('Authentication failed');
            }
            return response.json();
        })
        .then(data => {
            // Assuming the server responds with a token data
            const token = data.data.access_token;

            // Store the token in local storage
            localStorage.setItem('authToken', token);
            redirectPage(main_page_url)
        })
        .catch(error => {
            return new Error('Authentication error');
        });
}

// Function to make revoke token requests
function logout() {
    const token = localStorage.getItem('authToken');
    const userCredential = localStorage.getItem('authCredential');

    if (!token) {
        alert("token not valid")
        return new Error('Token not found in local storage');
    }

    // get access_token from token data
    accessToken = token
    fetch(token_validate_url+accessToken, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${userCredential}`
        },
    })
        .then(response => {
            // Handle response
            localStorage.removeItem("authToken");
            localStorage.removeItem("authCredential");
            redirectPage(login_page_url)
        })
        .catch(error => {
            // Handle response
            localStorage.removeItem("authToken");
            localStorage.removeItem("authCredential");
            redirectPage(login_page_url)
            return new Error('Request error:', error);
        });
}

// Function to make authenticated requests
function validateToken() {
    const token = localStorage.getItem('authToken');
    const userCredential = localStorage.getItem('authCredential')

    if (!token) {
        return new Error('Token not found in local storage');
    }

    // get access_token from token data
    accessToken = token
    fetch(token_validate_url+accessToken, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${userCredential}`
        },
    })
        .then(response => {
            if (!response.ok) {
                alert("Token Expired! Please re-login");
                // Handle response
                localStorage.removeItem("authToken");
                localStorage.removeItem("authCredential");
                redirectPage(login_page_url)
                return new Error('Authentication failed');
            }
            return "success"
        })
        .catch(error => {
            alert("Token Expired! Please re-login");
            // Handle response
            localStorage.removeItem("authToken");
            localStorage.removeItem("authCredential");
            redirectPage(login_page_url)
            return new Error('Request error:', error);
        });
}

// var origin = window.location.href;
// if (!origin.includes("sign-in") && !origin.includes("sign-up")) {
//     // validate
//     isValid = validateToken()
//     if (isValid instanceof Error) {
//         console.log(isValid.message)
//         alert("Token Expired! Please re-login");
//         redirectPage(login_page_url)
//     }
// }

loginBtn = document.getElementById("login_btn");
if (loginBtn){
    loginBtn.addEventListener('click', function (){
        email = document.getElementById("login_email").value
        password = document.getElementById("login_password").value
        login_authenticate(email, password)
    });
}

logoutBtn = document.getElementById("logout_btn");
if (logoutBtn) {
    logoutBtn.addEventListener('click', function () {
        logout()
    });
}

function redirectPage(url) {
    if (origin.includes("page")) {
        window.location.replace("../" + url);
    } else {
        window.location.replace(url);
    }
}