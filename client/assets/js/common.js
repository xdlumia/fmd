// 首页banner背景图片滚动
$(window).scroll(function(){
	var postop = $(window).scrollTop()/21;
	if (postop < 30) {
		$('.header').css('background-position-y',-postop+'px')
	}
})

// 首页顶部搜索标签切换
$('#ser-menu li').on('click',function(){
	$(this).addClass('act').siblings().removeClass('act');
	arrowL = $(this).prop('offsetLeft')+$(this).width()/2;
	$('#ser-menu .arrow').css('left',arrowL);
	placeval = $(this).attr('data-type');
	btnval = $(this).attr('data-btn');
	// index = $(this).index();
	$('.search-val').attr('placeholder',placeval);
	$('.search-btn').val(btnval);
});


$('.old-close-btn').on('click',function(){
   $('.old-browser-popup').hide();
});

// 锚链接平滑滚动
function maolink(){
	var linkTop = $('.fixed-links').offset().top;
	$(window).scroll(function(){
		var screenTop = $(this).scrollTop();
		if(screenTop>=linkTop){
			$('.fixed-links').addClass('fixed-top');
		}else{
			$('.fixed-links').removeClass('fixed-top');
		}
	})
	$('.fixed-links .links a').on('click', function(e) {
		e.preventDefault();
		var target = $(this).attr('href');
		$('html,body').stop().animate({scrollTop:$(target).offset().top-60},500 ,function(){
			return false
		})
	 });
	$(window).scroll(function(){
		var scrollTop = $(this).scrollTop();
	    var aName = $('.anchor');
	    var idName = "";
	    aName.each(function(){
	    	thisTop = $(this).offset().top;
	    	if(scrollTop > thisTop-100){
	    		idName = $(this).attr('id');
	    	};
	    });
	     if (idName != $('.fixed-links .links').find(".act").attr("href")) {
	          $('.fixed-links .links').find(".act").removeClass('act');
	         $('.fixed-links .links').find("a[href*="+idName+"]").addClass('act')
	        } 
	})
}

// 绑定enterkey函数
function bindKey(obj,eObj){
  $(".ipttext").keyup(function(e){
    var eCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
    if(eCode==13){
     $(eObj).trigger('click')
    }
  });
}


// 下拉菜单
// $('.select-box .placeholder').on('click',function(){
// 	$('.select-box').removeClass('act')
// 	$(this).parent('.select-box').addClass('act')
// })
// // 关闭下拉菜单
// $('.select-box .drop-down li').on('click',function(){
// 	$(this).parent().parent('.select-box').removeClass('act');
// 	$(this).parent().prev('.placeholder').text($(this).text())
	
// });

$('body').on('click',function(){
  $('.select-box').removeClass('act');
})
// 阻止事件冒泡
$(".stoption").on('click',function(event){
  event.stopPropagation();
});

// 高度为auto时动画
function autoH(obj){
  	var el = $(obj),
    curHeight = el.height(),
    autoHeight = el.css('height', 'auto').height()+20;
	el.height(curHeight).animate({height: autoHeight},100);
  }

// 幻灯片
function lSlide(foucs,img,time){
   var oWrap = $('.slide-container .slide-wrap');
   var aItem = $('.slide-container .slide-item');
   oWrap.css('width',oWrap.width()+"px"); // 
   aItem.css('width',oWrap.width()+"px"); // 
   var slideLen = aItem.length;
   var slideFoucsW = "";
   var slideHtml = "";
   var num = 0;
   var cNum = 0;
   var imgSrc= $('.slide-item img');
   var slideBulltW = "";
   $('.slide-foucs-wrap').css('width','40px')
   for(var i=0; i<slideLen;i++){
     if (img) {
     	slideHtml += '<span class="slide-bullet"><img src="'+imgSrc.eq(i).attr('src')+'"></span>';	
     }else{
     	slideHtml += '<span class="slide-bullet"></span>';	
     }
   }
   if (foucs) {
   	$('.slide-container').append('<div class="slide-foucs">');
   	$('.slide-container').append('<div class="slide-btn"><span class="pre"></span><span class="next"></span></div>');
   	$('.slide-foucs').append('<div class="slide-foucs-wrap">')
    $('.slide-foucs-wrap').append(slideHtml);
    $('.slide-bullet').eq(0).addClass('slide-active');
   }
   if(img){
   	 // slideFoucsW = $('.slide-foucs').width()+8;
     // $('.slide-foucs-wrap .slide-bullet').css('width',slideFoucsW/5-8)
     slideBulltW = $('.slide-foucs-wrap .slide-bullet').width()+8;
     $('.slide-foucs-wrap').css('width',slideBulltW*slideLen)
   }
  
   

   // 添加点击事件
   $('.slide-foucs .slide-bullet').on('click',function(){
	   	var slideIndex = $(this).index();
	   	var slideLeft = -slideIndex * aItem.width()+'px';
	   	$(this).addClass('slide-active').siblings().removeClass('slide-active');
	   	oWrap.css('transform','translate3d( '+slideLeft+', 0, 0)');
	   	num =slideIndex;
   });

    function timer(){setInterval(function(){
	   	 num++;
	   	 num = num%=slideLen;
		 slideIndex =num;
	     slideLeft = -slideIndex * aItem.width()+'px';
	     // if(num >= 4){
	     // 	 focusL = -(num-4) * slideBulltW+'px' ;
	     // 	 $('.slide-foucs-wrap').css('transform','translate3d( '+focusL+', 0, 0)');
	     // }else{
	     // 	$('.slide-foucs-wrap').css('transform','translate3d( 0, 0, 0)');
	     // }
	   
	   	 $('.slide-bullet').eq(num).addClass('slide-active').siblings().removeClass('slide-active');
	   	 oWrap.css('transform','translate3d( '+slideLeft+', 0, 0)');
	   },3000)
    }
    if (time) {
    	 timer()
    }
   
   $('.slide-btn .next').on('click',function(){
   	    var focusIndex = $('.slide-foucs-wrap .slide-active').index();
   	    cNum = focusIndex;
   	    cNum++
   	    cNum =cNum%=slideLen;
   	    focusIndex++;
   	    // focusIndex = focusIndex%=slideLen;
   	    slideLeft = -focusIndex * aItem.width()+'px';
	   	if(focusIndex<slideLen){
	   		$('.slide-bullet').eq(focusIndex).addClass('slide-active').siblings().removeClass('slide-active');
	    	oWrap.css('transform','translate3d( '+slideLeft+', 0, 0)');
	   	}
	   	
	   	if(cNum >=5){
	     	$('.slide-foucs-wrap').css('transform','translate3d( '+-(cNum-4)*slideBulltW+'px, 0, 0)');
	   	 }  
   });
    $('.slide-btn .pre').on('click',function(){
    	var focusIndex = $('.slide-foucs-wrap .slide-active').index();
    	var preL = (focusIndex-5) * $('.slide-bullet').width();
        if(focusIndex>0){
        	focusIndex--;
        }

   	    focusIndex = focusIndex%=slideLen;
   	    slideLeft = -focusIndex * aItem.width()+'px';
   	    oWrap.css('transform','translate3d( '+slideLeft+', 0, 0)');
   	    $('.slide-bullet').eq(focusIndex).addClass('slide-active').siblings().removeClass('slide-active');
   	    if(focusIndex>=5){
   	    	$('.slide-foucs-wrap').css('transform','translate3d( '+-preL+'px, 0, 0)');
   	    }else{
   	    	$('.slide-foucs-wrap').css('transform','translate3d( 0, 0, 0)');
   	    }	
   })
}