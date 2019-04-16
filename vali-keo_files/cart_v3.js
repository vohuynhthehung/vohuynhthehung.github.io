var divCartID= "pagecart";
function addtocartandredirect(fullUrl,productCode,qtyID)
{
    if (typeof gaEcommerAddToCart === 'function') {
        gaEcommerAddToCart(productCode);
    }
    $.post(fullUrl + "/ajax.php?do=cart&act=update",{
            id: productCode,
            qty: $('#' + qtyID).val()
        },
        function(data)
        {
            location.href= fullUrl +  "/xem-gio-hang.html";

        });
}

function addtocartNotredirect(fullUrl,productCode,qtyID)
{
    if (typeof gaEcommerAddToCart === 'function') {
        gaEcommerAddToCart(productCode);
    }
    $.post(fullUrl + "/ajax.php?do=cart&act=update",{
            id: productCode,
            qty: $('#' + qtyID).val()
        },
        function(data)
        {
            //location.href= fullUrl +  "/xem-gio-hang.html";
        });
}

function addToCartNoredirect(fullUrl,productCode,qtyID)
{
    $.post(fullUrl + "/ajax.php?do=cart&act=update",{
            id: productCode,
            qty: $('#' + qtyID).val()
        },
        function(data)
        {
            //location.href= fullUrl +  "/xem-gio-hang.html";

        });
}
function view_cart(fullUrl,divCartID)
{
    $.post(fullUrl + "/ajax.php?do=cart&act=view_cart_v4",{
        },
        function(data)
        {
            $('#' + divCartID).html(data);
        });
}
function view_cart_headerOnly(fullUrl,divCartID)
{
    $.post(fullUrl + "/ajax.php?do=cart&act=view_cart_header",{
        },
        function(data)
        {
            $('#' + divCartID).html(data);
        });
}

function view_cart_showcoupon(fullUrl,divCartID)
{
    $.post(fullUrl + "/ajax.php?do=cart&act=view_cart_v4&showcoupon=1",{
        },
        function(data)
        {
            $('#' + divCartID).html(data);
            showGioHang();
        });
}
function trusoluong(fullUrl,idButton,idproduct)
{

    var thisrowfield;


        thisrowfield = $('#' + idButton);
        var currentVal = parseInt(thisrowfield.val());

        if (!isNaN(currentVal) && currentVal > 0) {
            thisrowfield.val(currentVal - 1);
        } else {
            thisrowfield.val(0);
        }

    $.post(fullUrl + "/ajax.php?do=cart&act=view_cart_v4",{
        qty:thisrowfield.val(),
        id: idproduct
        },
        function(data)
        {
            $('#' + divCartID).html(data);
            showGioHang();
        });
}
function congsoluong(fullUrl,idButton,idproduct)
{
    // Product Quantity
    //----------------------------------------//
    var thisrowfield;

        thisrowfield = $('#' + idButton);

        var currentVal = parseInt(thisrowfield.val());
        if (!isNaN(currentVal)) {
            thisrowfield.val(currentVal + 1);
        } else {
            thisrowfield.val(0);
        }
    $.post(fullUrl + "/ajax.php?do=cart&act=view_cart_v4",{
            qty:thisrowfield.val(),
            id: idproduct
        },
        function(data)
        {
            $('#' + divCartID).html(data);
            showGioHang();
        });
}
function delProduct(fullUrl,idproduct)
{
    var r = confirm("Bạn muốn xóa khỏi giỏ hàng?");
    if (r == true) {
        $.post(fullUrl + "/ajax.php?do=cart&act=view_cart_v4",{

                iddel: idproduct
            },
            function(data)
            {
                $('#' + divCartID).html(data);
                showGioHang();
            });
    } else {

    }
}
function checkcoupon(fullUrl,idInputCoupon)
{
    if ($('#' + idInputCoupon).val() == "")
    {
        alert('Nhập mã khuyến mãi');
        $('#' + idInputCoupon).focus();
        return;
    }
    $.post(fullUrl + "/ajax.php?do=coupon&act=check",{
            code: $('#' + idInputCoupon).val()
        },
        function(data)
        {
            var obj = eval('(' + data + ')');
            if (obj['error'] == 1)
                alert(obj['mess']);
            else
            {
                view_cart_showcoupon(fullUrl,divCartID);
            }
        });
}


function finishcheckoutChuongTrinh(fullUrl)
{
    //  alert('helo get_giaohang');
    if (!trueform()) return false;
	var cachThanhToan = $('input[name=payment_method]:checked').val();
	if (parseInt(cachThanhToan) == 1) {
		var cuaHang = $('#chonCuaHang').val();
		
		
		if (parseInt(cuaHang) == 0) {
			alert("Bạn hãy chọn cửa hàng đển thanh toán");
			return false;			
		}
	}
	/*
	if (parseInt(cachThanhToan) == 3) {
		//alert("Ba")
		//if ($('#dongy').is(':checked')) {
			if(document.getElementById('dongy').checked) {
			$("#txtAge").show();
		//} 
		}else {
			alert("Bạn phải đồng ý với điều khoản thanh toán online");
			return false;
		}
		
	}
	*/
	
    $('#loading').toggle();
    $('.continue').hide();
	
    $.post(fullUrl + "/ajax.php?do=cart&act=sendChuongTrinh",{
            firstname:$('#firstname').val(),
            lastname:$('#lastname').val(),
            address: $('#address').val(),
            city: $('#city').val(),
            phone: $('#phone').val(),
            email: $('#email').val(),
            note: $('#note').val(),
       //     cachthanhtoan: $('#cachthanhtoan').val()
            cachthanhtoan: cachThanhToan,
			cuaHang : $('#chonCuaHang').val()

        },
        function(data)
        {

           // $('#divxemlai').html(data);
           // $('#divxemlai').fadeIn();
           // $('#editb2').show();
            // $("#pagecart").html(data);

          //  $(".container").html(data);

             var obj = eval('(' + data + ')');
			 
			 if (parseInt(cachThanhToan) == 3) {
				 $( "#formOnePay" ).hide();
				$.get( "/index.php?do=onePayNoiDia&act=index", function( data ) {
					$( "#formOnePay" ).html( data );
					$('#PayNowNoiDia').trigger('click');					
				});
				 
			 } else
			
				location.href=obj['url'];


        });
}

function finishcheckout(fullUrl)
{
	var cachThanhToan = $('input[name=payment_method]:checked').val();
	
	
	if ((parseInt(cachThanhToan) == 3) || (parseInt(cachThanhToan) == 4)) {
		//alert("Ba")
		//if ($('#dongy').is(':checked')) {
			if(document.getElementById('dongy').checked) {
				$("#txtAge").show();
			
		//} 
		}else {
			alert("Bạn phải đồng ý với điều khoản thanh toán online");
			return false;
		}
		
	}
	
    //  alert('helo get_giaohang');
    if (!trueform()) return false;
	
	
	$('#btnThanhToan').hide();
    $('#loading').toggle();
    $('.loading').removeClass("loading--hidden");
    $('.continue').hide();
	
    $.post(fullUrl + "/ajax.php?do=cart&act=send",{
            firstname:$('#firstname').val(),
            lastname:$('#lastname').val(),
            address: $('#address').val(),
            city: $('#city').val(),
            phone: $('#phone').val(),
            email: $('#email').val(),
            note: $('#note').val(),
       //     cachthanhtoan: $('#cachthanhtoan').val()
            cachthanhtoan: cachThanhToan

        },
        function(data)
        {

           // $('#divxemlai').html(data);
           // $('#divxemlai').fadeIn();
           // $('#editb2').show();
            // $("#pagecart").html(data);

          //  $(".container").html(data);

             var obj = eval('(' + data + ')');
			 
			 if (parseInt(cachThanhToan) == 3) {
				 $( "#formOnePay" ).hide();
				$.get( "/index.php?do=onePayNoiDia&act=index", function( data ) {
					$( "#formOnePay" ).html( data );
					$('#PayNowNoiDia').trigger('click');					
				});
				 
			 } else
			
				location.href=obj['url'];


        });
}
function trueform()
{
   // alert($('input[name=payment_method]:checked').val());
   // return;
    if ($('#firstname').val() == "")
    {
        alert("Nhập tên!");
        $('#firstname').focus()
        return false;
    }
    $('#email').val( jQuery.trim( $('#email').val() ) );
    if (!IsEmail($('#email').val()))
    {
        alert("Nhập email đúng!");
        $('#email').focus()
        return false;
    }
    if ($('#phone').val() == "")
    {
        $('#phone').focus()
        return false;
    }
    if ($('#address').val() == "")
    {
        alert("Nhập Địa chỉ giao hàng!");
        $('#address').focus()
        return false;
    }







    return true;

} 
function changeCachThanhToan()
{
	var cachThanhToan = parseInt($('input[name=payment_method]:checked').val());
	
	//console.log(cachThanhToan);
	if ((cachThanhToan == 3) || (cachThanhToan == 4)) {
		$('#dkOne').show();
	}else {
		$('#dkOne').hide();
	}
}

function showGioHang()
{
    $('#btnXemGioHang').trigger('click');
}

function addToViewedProducts(id)
{
    var key = "viewedProducts";
    var value = getCookie(key);
    if (value == '') {
        value =  id;
    }else 
        value = id + ',' + value;

    setCookie(key, value);
}