var httpUrl="http://59.110.42.225:7001";
// var httpUrl="http://192.168.1.13:7001";
var imgUrl="http://59.110.42.225:7002";
var access_secret="ZmFuZ21haWRvbmc=";

// 首页banner背景图片滚动
$(window).scroll(function(){
	var postop = $(window).scrollTop()/21;
	if (postop < 30) {
		$('.header').css('background-position-y',-postop+'px')
	}
})

// 首页顶部搜索标签切换
var typeVal = "ChuShou"
$('#ser-menu li').on('click',function(){
	var typeVal=$(this).attr('data-s')
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
  $(obj).keyup(function(e){
    var eCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
    if(eCode==13){
     $(eObj).trigger('click')
    }
    return false;
  });

}
$('.sort-item').on('click',function(){
     $(this).addClass('act').siblings().removeClass('act');
     $('.sort-arrow').removeClass('sortarrowtop')
     $('.sort-arrow').removeClass('sortarrowbot')

  })
//获取url里的参数
function GetQueryString(name) {
  
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
//  if(r != null) return unescape(r[2]);
  if(r != null) return r[2];
  return null;
}

function  popupcenter(){
	oLeft = ($(window).width() - $('.popupbox').width())/2;
	oTop = ($(window).height() - $('.popupbox').height())/2-50;
	$('.popupbox').css('left',oLeft);
	$('.popupbox').css('top',oTop);
	$(document).on('click','#popClose',function(){
	   $('.popupbox').fadeOut('fast');	
	   $('.popupbg').fadeOut('fast');	
	});
	$('.popupbg').on('click',function(){
	   $('.popupbox').fadeOut('fast');	
	   $('.popupbg').fadeOut('fast');	
	})
};
popupcenter()


// 列表页地区地铁切换
$('#loca-tab span').on("click",function(){
  $('.loca-con a').removeClass('act');
  $('.sub-list').hide()

  $(this).addClass('act').siblings().removeClass('act');
  $('.loca-filter .loca-con').hide();
  $('.loca-filter .loca-con').eq($(this).index()).show()
})


//下拉菜单
$('.select-box .placeholder').on('click',function(){
	$('.select-box').removeClass('act')
	$(this).parent('.select-box').addClass('act')
})

// 关闭下拉菜单
$(document).on('click','.drop-down .option',function(){
	$(this).parent().parent('.select-box').removeClass('act');
	$(this).parent().prev('.placeholder').text($(this).text())
	
});

// $('body').on('click',function(){
//   $('.select-box').removeClass('act');
// })
// 阻止事件冒泡
// $(".select-box,.stoption").on('click',function(event){
//   event.stopPropagation();
// });


// 列表页同商区地区检索
var iText = '';
function sqqysearch(iT){
	$('.loadgif').show();
	var iText = iT.text(); 
	$('#serBtn').val(iText);
	submitForm("#searchForm",1);//提交form表单搜索  
}

$('.textipt-box input').on('click',function(){
  $(this).parent().find('button').show();
  $(this).parent().prev('.cb-box').find('.inputbtn').prop('checked',false);
})
$(document).on('click','.textipt-box button',function(){
	var inputObj = $(this).parent().find('input');

	inputObj.each(function(){
		if(detectNum($(this).val())==false){
			$('.erotips').fadeIn()
        	$('.popupbg').fadeIn()
            $('.erotips .tipscon').html('只能输入纯数字');
		}
	})
})
$('.more-btn').on('click',function(){
  $(this).addClass('act');
  $(this).prev().height("auto");
  $(this).prev().find('.textipt-box').show()
})


// 检测是否为
function detectNum (str){
	var n = 0;
	for(var i = 0; i<str.length; i++){
      n=str.charCodeAt(i);
      if(n<48 || n>57) return false   
	}
	return true;
	
	}


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
     	slideHtml += '<span class="slide-bullet"><img alt="" src="'+imgSrc.eq(i).attr('src')+'"></span>';	
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

$(document).on('click',' .inputbtn,.textipt-box button, .drop-down .option,.loca-con a, .sort-item',function(){
   $('#errotips').hide();
   $('.loadgif').show(); 
})

//时间通用
function formatDate(obj) { 
    var date = new Date();  
    date.setTime(obj.time);  
    date.setHours(obj.hours);  
    date.setMinutes(obj.minutes);  
    date.setSeconds(obj.seconds);  
    return date.format("yyyy-MM-dd hh:mm:ss"); 
} 
//通用日期获取
function formatDateRq(obj) { 
	var date = new Date();  
	date.setTime(obj.time);  
	date.setHours(obj.hours);  
	date.setMinutes(obj.minutes);  
	date.setSeconds(obj.seconds);  
	return date.format("yyyy年MM月dd日"); 
} 
Date.prototype.format = function(format) {  
   /*  
  [javascript] view plain copy
  　*　时间格式  
    * format="yyyy-MM-dd hh:mm:ss";　  
    */  
   var o = {  
    "M+" : this.getMonth() + 1,  
    "d+" : this.getDate(),  
    "h+" : this.getHours(),  
    "m+" : this.getMinutes(),  
    "s+" : this.getSeconds(),  
    "q+" : Math.floor((this.getMonth() + 3) / 3),  
    "S" : this.getMilliseconds()  
   }  
   if (/(y+)/.test(format)) {  
    format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4  
        - RegExp.$1.length));  
   }  
   for (var k in o) {  
    if (new RegExp("(" + k + ")").test(format)) {  
     format = format.replace(RegExp.$1, RegExp.$1.length == 1  
         ? o[k]  
         : ("00" + o[k]).substr(("" + o[k]).length));  
    }  
   }  
   return format;  
  } 
//通用分页
function pageHtml(countSum,pageSize,currentPage,method){
	   $(window).scrollTop(0) 
	   var html='';
	           var idTagPrev="";
	           var idTagNext="";
	           if(currentPage==1){
	        	   idTagPrev="no-prev"
	           }
	           var num=Math.ceil(countSum/pageSize)
	           if(num==currentPage){
	        	   idTagNext="no-next";  
	           }
	           var onclick=idTagPrev==""?"javascript:"+method+"("+(currentPage-1)+");":"#";
		       html+='<a href="'+onclick+'" class="'+idTagPrev+'">上一页</a>';
		       var startPageNo = (currentPage-1);
		       var act="";
		       if(startPageNo==0){
		    	   for(var i=currentPage;i<=num;i++){
		    		  if(i==5&&(i+2)<=num){
		    		html+='<span>...</span>'
		    		act=(num-2)==currentPage?"class='act'":"";
		            html+='<a href="javascript:'+method+'('+(num-1)+');" '+act+'>'+(num-1)+'</a>';
		    		act=(num-1)==currentPage?"class='act'":"";
		            html+='<a href="javascript:'+method+'('+(num)+');" '+act+'>'+(num)+'</a>';
		            break;
		    		   }else{
		    		act=i==currentPage?"class='act'":"";
		            html+='<a href="javascript:'+method+'('+i+');" '+act+'>'+i+'</a>';
		    		   }
		    	   }  
		       }else{
		    	   if((num-currentPage)<4&&(num-currentPage)>=0){
		    		   for(var i=(num-5);i<=num;i++){
		    			   if(i>0){
		    				   act=i==currentPage?"class='act'":"";
		    				   html+='<a href="javascript:'+method+'('+i+');" '+act+'>'+i+'</a>'  ; 
		    			   }
		    		   }
		    	   }else{
		    		   act=i==(currentPage-1)?"class='act'":"";
		           html+='<a href="javascript:'+method+'('+(currentPage-1)+');" '+act+'>'+(currentPage-1)+'</a>'
		    	   for(var i=currentPage;i<=num;i++){
			    		  if(i==(currentPage+3)&&(i+2)<=num){
			    		html+='<span>...</span>';
		    		    act=(num-2)==currentPage?"class='act'":"";
			            html+='<a href="javascript:'+method+'('+(num-1)+');" '+act+'>'+(num-1)+'</a>';
		    		    act=(num-1)==currentPage?"class='act'":"";
			            html+='<a href="javascript:'+method+'('+(num)+');" '+act+'>'+(num)+'</a>';
			            break;
			    		   }else{
		    		    act=i==currentPage?"class='act'":"";
			            html+='<a href="javascript:'+method+'('+i+');" '+act+'>'+i+'</a>';
			    		   }
			    	   }  
		    	   }
		       }
		       onclick=idTagNext==""?"javascript:"+method+"("+(currentPage+1)+")":"#";
		       html+='<a href="'+onclick+'" class="'+idTagNext+'">下一页</a>';
		       return html;
	  }
function moreInfo(lx){
	window.location="new-list.html?lx="+lx+"&cs="+cityId;
}