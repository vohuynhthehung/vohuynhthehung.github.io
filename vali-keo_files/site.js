function SearchGoogle(){
    var key = document.getElementById("search-key").value;
    var site = document.domain;
    var qs = encodeURI(key + "+site:" + site);
    var url = "http://www.google.com.vn/search?q=" + qs;
    window.open(url, '_blank');
    return false;
}
function searchKos()
{
	var key = document.getElementById("search-key").value;
	var qs = encodeURI(key);
	location.href =  "/index.php?do=products&act=search&key=" + qs;
}
function sortproduct(fullUrl,uni)
{

    var type = $('#sortproduct').val();

    var url =fullUrl +  "/" + uni + "-moinhat/";

    if (type == 2)
    {
        url =fullUrl +  "/" + uni + "-xemnhieu/";
    }
    if (type == 3)
    {
        url =fullUrl +  "/" + uni + "-pricedown/";
    }
    if (type == 4)
    {
        url =fullUrl +  "/" + uni + "-priceup/";
    }
    location.href = url;

}

function IsEmail(email){
    emailRegExp = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.([a-z]){2,4})$/;

    if(!emailRegExp.test(email))
        return false;
    return true;
}

function redirect(url)
{
    location.href= url;
}
function ajax_get(fullUrl,name,divid)
{

   // console.log(name + Math.random());
  //  console.log("html=" + $('#' + divid).html()+"--");

        $.post(fullUrl + "/ajax.php?do=widget_html&act=get",{
                filename:name
            },
            function(data)
            {
                //   document.write(data);
                //      $('#' + divid).append(data);
                $('#' + divid).html(data);
            });



}
function test()
{
    console.log( Math.random());
}


function showHotline()
{
	$('#hotline').html('1800 8050');
	//$('#hotline').html('+848 66 548 563');
	$('#hienso').hide();
}
var prefixCookie = 'kos_';
function setCookie(key, value)
{
    Cookies.set(prefixCookie + key, value, { expires: 365  }); 
}
function setCookieWithExpire(key, value, expireDay)
{
    Cookies.set(prefixCookie + key, value, { expires: expireDay  }); 
}
function getCookie(key)
{
    var result = Cookies.get(prefixCookie + key);
    if (typeof result === 'undefined') {
        return "";
    }
    return result;
}
function removeCookie(key)
{
    Cookies.remove(prefixCookie + key);
}
$(document).ready(function(){
    var dagoi = getCookie('daGoiFuturePost');
    if (dagoi === "") {
        $.ajax({
        type: 'POST',
        url:  '/ajax.php?do=select&act=check',
        data: {
        },
        success: function() {
        }
        });
        setCookieWithExpire('daGoiFuturePost', '1', 1);
    }
    

    ajax_get("","numGioHang","giohangtop");

    
    
    
});

