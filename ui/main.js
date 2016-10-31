console.log('Loaded!');
var element=document.getElementById('main-text');
element.innerHTML='New value';
//Move the image
var img=document.getElementById('madi');
var marginLeft=0;
function moveRight()
{
    marginLeft=marginLeft + 10;
    img.style.marginLeft=marginLeft + 'px';
}
img.onclick=function() {
    var interval=setIntervel(moveRight,100);
    //img.style.marginLeft= '100px';
};