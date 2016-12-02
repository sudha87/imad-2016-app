
function loadLoginForm () {
    var loginHtml = `
    <h3>Login/Register to unlock awesome features</h3>
    <form>
        <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" class="form-control" id="username" placeholder="username" />
        </div>
        <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" class="form-control" id="password" placeholder="password"/>
        </div>
        <input type="submit" id="login_btn"  value="Login" />
        <input type="submit" id="register_btn"  value="Register" />
        </form>
        `;
    document.getElementById('login_area').innerHTML = loginHtml;
    
    // Submit username/password to login
    var submit = document.getElementById('login_btn');
    submit.onclick = function () {
        // Create a request object
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                  submit.value = alert('Sucess!');
              } else if (request.status === 403) {
                  submit.value = alert('Invalid credentials. Try again?');
              } else if (request.status === 500) {
                  alert('Something went wrong on the server');
                  //submit.value = 'Login';
              } else {
                  alert('logged successfully');
                  //submit.value = 'Login';
              }
              loadLogin();
          }  
          // Not done yet
        };
        
        // Make the request
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        console.log(username);
        console.log(password);
        request.open('POST', '/login', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username: username, password: password}));  
        submit.value = 'Logging in...';
        
    };
    
    var register = document.getElementById('register_btn');
    register.onclick = function () {
        // Create a request object
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                  alert('User created successfully');
                  register.value = alert('Registered Successfully ! login with same crediations');
              } else {
                  alert('Could not register the user');
                  register.value = 'Register';
              }
          }
        };
        
        // Make the request
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        console.log(username);
        console.log(password);
        request.open('POST', '/create-user', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username: username, password: password}));  
        register.value = 'Registering...';
    
    };
}

function loadLoggedInUser (username) {
    var loginArea = document.getElementById('login_area');
    loginArea.innerHTML = `
        <div class="out">
        <h3> Hi <i>${username}</i></h3>
        <a href="/logout">Logout</a>
        </div>
    `;
}

function loadLogin () {
    // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                loadLoggedInUser(this.responseText);
            } else {
                loadLoginForm();
            }
        }
    };
    
    request.open('GET', '/check-login', true);
    request.send(null);
}

function loadArticles () {
        // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            var articles = document.getElementById('articles');
            if (request.status === 200) {
                var content = '<ul>';
                var articleData = JSON.parse(this.responseText);
                for (var i=0; i< articleData.length; i++) {
                   content += `<li>
                    <a href="/articles/${articleData[i].title}">${articleData[i].heading}</a>
                    (${articleData[i].date.split('T')[0]})</li>`;
                }
                content += "</ul>";
                articles.innerHTML = content;
            } else {
                articles.innerHTML('Oops! Could not load all articles!');
            }
        }
    };
    
    request.open('GET', '/get-articles', true);
    request.send(null);
}


// The first thing to do is to check if the user is logged in!
loadLogin();

// Now this is something that we could have directly done on the server-side using templating too!
loadArticles();


//Move the image
    var img=document.getElementById('madi');
    var marginLeft=0;
    function moveRight()
    {
        marginLeft=marginLeft + 1;
        img.style.marginLeft=marginLeft + 'px';
    }
    img.onclick=function() {
        var interval=setInterval(moveRight,50);
    };
    
 
    var button=document.getElementById('counter');
      
        button.onclick=function ()
        {
            if(counter) 
           {
            var request=new XMLHttpRequest();
            request.onreadystatechange=function ()
            {
                if (request.readyState===XMLHttpRequest.DONE)
                {
                    if (request.status===200)
                    {
                        var counter=request.responseText;
                        var span=document.getElementById('count');
                        //span.innerHTML=counter.toString();
                        count.innerHTML=counter.toString();
                        //counter.innerHTML = count.toString();
                    }
                }
            }
           };
            
           //request.open('GET',window.location.protocol+''+window.location.host+'/counter',true );
           request.open('GET','http://sudha87.imad.hasura-app.io/counter',true );
           request.send(null);
            
        }
    









/*var button=document.getElementById('counter');
    
    button.onclick=function ()
    {
        var request=new XMLHttpRequest();
        request.onreadystatechange=function (){
            if (request.readyState===XMLHttpRequest.DONE)
            {
                if (request.status===200)
                {
                    var counter=request.responseText;
                    var span=document.getElementById('count');
                    span.innerHTML=counter.toString();
                }
            }
        };
        
       request.open('GET','http://sudha87.imad.hasura-app.io/counter',true );
       request.send(null);
        
    };
    
    var submit=document.getElementById('submit_btn');
    submit.onclick=function()
    {
        var request=new XMLHttpRequest();
        request.onreadystatechange=function ()
        {
            if (request.readyState===XMLHttpRequest.DONE)
            {
                if (request.status===200)
                {
                    var names=request.responseText;
                    names=JSON.parse(names);
                    var list='';
                     for (var i=0;i<names.length;i++)
                      {
                         list +='<li>' +names[i]+ '</li>';
                      }
                      var ul = document.getElementById('namelist');
                      ul.innerHTML=list;
                }
            }
        };
        var nameInput=document.getElementById('name');
        var name=nameInput.value;
        request.open('GET','http://sudha87.imad.hasura-app.io/submit-name?name=' +name ,true );
        request.send(null);
        
    };
    console.log('Loaded!');
    var element=document.getElementById('main-text');
    element.innerHTML='New value';
    //Move the image
    var img=document.getElementById('madi');
    var marginLeft=0;
    function moveRight()
    {
        marginLeft=marginLeft + 1;
        img.style.marginLeft=marginLeft + 'px';
    }
    img.onclick=function() {
        var interval=setInterval(moveRight,50);
        //img.style.marginLeft= '100px';
    };*/
