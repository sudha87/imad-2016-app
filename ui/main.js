console.log('Loaded!');
var element=document.getElementById('main-text');
element.innerHTML='New value';
//Move the image
var img=document.getElementById('madi');
img.onclick=function() {
    img.style.marginleft= '100px';
};