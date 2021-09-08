$(function(){
    // 접속한 기기의 가로길이가 480 초과라면 menu 영역이 보이고, 480 이하면 menu 영역숨김
    var winWidth = $(window).width();
    if (winWidth > 480) {
        $('header nav').show();
        $('.mo_menu').hide();
    } else {  // 모바일버전
        $('header nav').hide();
        $('.mo_menu').hide();
    }


    $('.sitemap').hide();
    // 메뉴 클릭시 사이트맵 on
    $('.menu_btn').click(function() {
        if (winWidth >= 1600) {
            $('.sitemap').show();
        } else {
            $('.mo_menu').show();
        }
    });
    
    // site_close 클릭시 사이트맵 사라짐
    $('.site_close').click(function() {
        $('.sitemap').hide();
    });
    // mo_close 클릭시 사이트맵 사라짐
    $('.mo_close').click(function() {
        $('.mo_menu').hide();
    });

    // 모바일 버전 mo_nav 아코디언 메뉴
    $('.mo_nav .sub').hide();
    $('.mo_nav > ul > li').click(function() {
        // 클릭한 메뉴에 active가 설정되어 있지 않다면
        if($(this).attr('class') != 'active') {
            // .mo_nav의 모든 주메뉴에서 active 클래스 제거
            $('.mo_nav > ul > li').removeClass('active');
            // 클릭한 메뉴만 active 클래스 추가
            $(this).addClass('active');
            // 모든 서브메뉴 숨김
            $('.mo_nav .sub').slideUp();
            // 클릭한 메뉴의 서브 메뉴만 나타남
            $(this).find('.sub').slideToggle();
            // 클릭한 메뉴에 active가 설정되어 있다면
        } else {
            // 클릭한 메뉴에서 active 클래스 제거
            $(this).removeClass('active');
            // 클릭한 메뉴의 서브메뉴 숨김
            $(this).find('.sub').slideUp();

        }
    });




    // 메인 슬라이드
    // 인덱스 번호 변수 선언
    var num = 0;
    // 왼쪽 이미지의 총 개수를 읽어서 total 변수 저장
    var total = $('.photo').length;
    // 왼쪽 이미지 높이를 imgHeight 변수에 저장 
    var imgHeight = $('.photo').height();
    console.log(imgHeight);

    // 만약 접속한 기기의 가로길이가 1600 이상이면 양쪽 슬라이드 실행되고 1600 미만이면 모바일 슬라이드(한쪽 슬라이드) 실행
    if(winWidth >= 1600) {
        // pc버전 슬라이드
        // 왼쪽 이미지 영역 - 첫번째 이미지만 보임
        $('.photo').css('z-index',1);
        $('.photo:first').css('z-index',5);
        //오른쪽 배경 영역 - 첫번째 배경만 보임
        $('.right_bg > div').css('z-index',1);
        $('.right_bg > div:first').css('z-index',5);
        // 가운데 이미지 영역 - 첫번째 이미지만 보임
        $('.small').hide();
        $('.small:first').show();

        // 오른쪽 글자 영역 - 첫번째 글자들만 보임
        $('.txt').removeClass('active');
        $('.txt:first').addClass('active');

        // number(숫자) 영역 - 첫번째 숫자만 보임
        $('.number a').hide();
        $('.number a:first').show();

         // NEXT 버튼 클릭시 2번째 왼쪽 이미지가 위로 올라옴
    $('.next_btn').click(function(){
        //clearInterval(auto);
        //auto = setInterval(movefn, 5500);
        barfn();

        // 이미지의 인덱스 번호를 1씩 증가시킴
        num++;
        // 이미지의 인덱스 번호가 이미지의 총개수보다 크면 0으로 초기화
        if( num >= total ) { num = 0; }
        console.log(num);

        // 왼쪽 이미지의 개수만큼 반복
        $('.photo').each(function(){
            // 왼쪽 이미지 인덱스 번호를 imgNum 변수에 저장
            var imgNum = $(this).index();
            if(num == imgNum) {
                // 모든 이미지 순서를 뒤로 함
                $('.photo').css('z-index',1);
                //imgNum 인덱스 번호에 해당하는 이미지 이동
                $(this).css({'top': imgHeight, 'z-index': 5});
                $(this).animate({'top':0}, 700, "easeOutCubic");
                $(this).prev().css('z-index',3);
            }
        });
        // 오른쪽 배경의 개수만큼 반복
        $('.right_bg div').each(function(){
            // 왼쪽 이미지 인덱스 번호를 imgNum 변수에 저장
            var bgNum = $(this).index();
            if(num == bgNum) {
                // 모든 이미지 순서를 뒤로 함
                $('.right_bg div').css('z-index',1);
                //imgNum 인덱스 번호에 해당하는 이미지 이동
                $(this).css({'top': -imgHeight, 'z-index': 5});
                $(this).animate({'top':0}, 700, "easeOutCubic");
                $(this).prev().css('z-index',3);
            }
        });

        // 가운데 이미지 개수만큼 반복
        $('.small').each(function(){
            // 가운데 이미지의 인덱스 번호를 변수에 저장
            var centerNum = $(this).index();
            // 만약 num값과 centerNum 값이 같다면
            if (num == centerNum) {
                // 모든 가운데 이미지 안보임
                $('.small').fadeOut(300);
                $(this).fadeIn(300);
            }
        });

        // number의 개수만큼 반복
        $('.number a').each(function(){
            // 숫자(a태그)의 인덱스 번호를 aNum 변수에 저장
            var aNum = $(this).index();
            if (num == aNum) {
                // 모든 숫자 안보임
                $('.number a').hide();
                // 현재 숫자만 보임
                $(this).show();
            }
        });
        // txt 영역 글자 애니메이션
        $('.txt').each(function(){
            // txt 영역의 인덱스 번호 저장
            var txtNum = $(this).index();
            if (num == txtNum) {
                $('.txt').removeClass('active',500).hide;
                $(this).show().addClass('active',500);
            }
        });


    });


    // PREV 버튼 클릭시 2번째 왼쪽 이미지가 아래로 내려옴
    $('.prev_btn').click(function(){
        // 이미지의 인덱스 번호를 1씩 감소시킴
        num--;
        // 이미지의 인덱스 번호가 0보다 작으면 total -1로 초기화
        if( num < 0 ) { num = total - 1; }
        console.log(num);
        // 왼쪽 이미지의 개수만큼 반복
        $('.photo').each(function(){
            // 왼쪽 이미지 인덱스 번호를 imgNum 변수에 저장
            var imgNum = $(this).index();
            if(num == imgNum) {
                // 모든 이미지 순서를 뒤로 함
                //imgNum 인덱스 번호에 해당하는 이미지 이동
                $('.photo').css('z-index',2);
                $(this).next().css('z-index',3)
                $(this).prev().css('z-index',1)
                $(this).css({'top': -imgHeight, 'z-index': 5});
                $(this).animate({'top':0}, 700, "easeOutCubic");
                
            }
        });
        // 오른쪽 배경의 개수만큼 반복
        $('.right_bg div').each(function(){
            // 왼쪽 이미지 인덱스 번호를 imgNum 변수에 저장
            var bgNum = $(this).index();
            if(num == bgNum) {
                // 모든 이미지 순서를 뒤로 함
                $('.right_bg div').css('z-index',1);
                //imgNum 인덱스 번호에 해당하는 이미지 이동
                $(this).next().css('z-index',3)
                $(this).prev().css('z-index',1)
                $(this).css({'top': imgHeight, 'z-index': 5});
                $(this).animate({'top':0}, 700, "easeOutCubic");
            }
        });
        // 가운데 이미지 개수만큼 반복
        $('.small').each(function(){
            // 가운데 이미지의 인덱스 번호를 변수에 저장
            var centerNum = $(this).index();
            // 만약 num값과 centerNum 값이 같다면
            if (num == centerNum) {
                // 모든 가운데 이미지 안보임
                $('.small').fadeOut(300);
                $(this).fadeIn(300);
            }
        });

        // number의 개수만큼 반복
        $('.number a').each(function(){
            // 숫자(a태그)의 인덱스 번호를 aNum 변수에 저장
            var aNum = $(this).index();
            if (num == aNum) {
                // 모든 숫자 안보임
                $('.number a').hide();
                // 현재 숫자만 보임
                $(this).show();
            }
        });
        // txt 영역 글자 애니메이션
        $('.txt').each(function(){
            // txt 영역의 인덱스 번호 저장
            var txtNum = $(this).index();
            if (num == txtNum) {
                $('.txt').removeClass('active', 500);
                $(this).addClass('active', 500);
            }
        });
    });

        // 5초마다 슬라이드 자동 실행 (5초마다 movefn 함수 호출)
        var auto = setInterval(movefn, 5500);
        function movefn() {
            $('.next_btn').trigger('click');
            barfn();
        }
    
        function barfn(){
            // slide_bar 안의 자식 객체 bar의 가로 길이 길어짐
            $('.bar').stop();
            $('.bar').css('width', 0);
            $('.bar').animate({'width': '100%'}, 5000);
        }
        // 함수 호출
        barfn();
    
    
        // .box_btn을 클릭하면 오른쪽으로 이동
        var sw = 0;
        // .box ul의 길이의/2 값을 ulMove 변수에 저장
        var ulMove = Math.ceil($('.box ul').width() / 2); 
        $('.box_btn').click(function(e){
            e.preventDefault();
            if (sw == 0) {
                sw = 1;
                $('.box_btn').css('background-position', 'left center');
                $('.box ul').stop().animate({left: -ulMove}, 700, 'easeInOutExpo')
            } else {
                sw = 0;
                $('.box_btn').css('background-position', 'right center');
                $('.box ul').stop().animate({left:0}, 700, 'easeInOutExpo')
            }
        });
    
        // fullpage
        $('#fullpage').fullpage({
            // fullpage의 동그란 메뉴 사용
            navigation : true,
            // fullpage의 동그란 메뉴 위치를 화면 왼쪽으로 설정
            navigationPosition:'left',
            // fullpage의 동그란 메뉴의 페이지별 이름 설정
            navigationTooltips:['Main','BestGame','Banner','Career'],
            // fullpage의 동그란 메뉴의 이름을 사용
            showActiveTooltip:true,
            // fullpage의 내용을 불러온 다음 function안의 명령어 실행
            // 매개변수 (anchorLink: 메뉴와 SECTION 연동, index: section의 인덱스 번호, direction: 화면이 이동하는 방향)
            afterLoad:function(anchorLink, index, direction) {
            // section의 인덱스 번호가 2 or 4인 경우 (2번째 세션 or 4번째 세션일때)
            if (index == 2 || index == 4) {
                // 네비게이션 주메뉴에 active 설정
                $('header nav > ul > li').addClass('active');
            } 
            if (index == 1 || index == 3) {
                $('header nav > ul > li').removeClass('active');
            }
        },
        // section이 이동할때 function 다음의 명령어 실행
        // 매개변수 (nextIndex: 다음)
        onLeave: function(index, nextIndex, direction) {
            // 세션의 인덱스 번호가 4이고, 다음 세션의 인덱스 번호가 5이면 (세션4에서 아래로 이동할때)
            if (index == 4 && nextIndex == 5) {
                // header 안의 menu 영역이 사라짐 (페이드아웃)
                $('header .menu').fadeOut();
            } else {
                // header안의 menu 영역이 나타남 (페이드인)
                $('header .menu').fadeIn();
            }
        }   
        });
    
        // 만약 접속한 기기의 가로크기가 480 초과라면 menu 영역이 보이고, 480 이하면 menu 영역 숨김.
        var winWidth = $(window).width();
        if (winWidth > 480) {
            $('header nav').show();
            $('.mo_menu').hide();
        } else {
            $('header nav').hide();
            $('.mo_menu').hide();
        }


        } else {
            // 태블릿, 모바일버전
            // photo의 인덱스 번호를 나타낼 변수 선언
            var mo_num = 0;
            // photo의 총 개수를 mo_total 변수에 저장
            var mo_total = $('.photo').length;
            // photo의 가로길이를 imgWidth 변수에 저장 
            var imgWidth = $('.photo').width();
            // 모든 photo 보임
            $('.photo').show();

            // 모든 center_img안의 small도 보임
            $('.small').show();

            // 마지막 photo 이미지를 첫번째 photo 이미지의 왼쪽에 배치
            $('.photo:last-child').prependTo('.left_img');
            
            // 마지막 bg를 첫번째 배경의 왼쪽에 배치
            $('.right_bg div:last-child').prependTo('.right_bg');

            // 마지막 small 이미지를 첫번째 small 이미지의 왼쪽에 배치
            $('.small:last-child').prependTo('.center_img');

            // .left_img의 left값을 photo의 가로 길이만큼 왼쪽으로 이동
            $('.left_img').css('left', -imgWidth);

            // .right_bg의 left값을 photo의 가로 길이만큼 왼쪽으로 이동
            $('.right_bg').css('left', -imgWidth);

            // .center_img의 left 값을 photo의 가로 길이만큼 왼쪽으로 이동시킴
            $('.center_img').css('left', -imgWidth);

            $('number a:first-child').addClass('active');

            // .right_txt의 txt 객체 중 첫번째 txt에 active 클래스 설정
            $('.right_txt .txt:first-child').addClass('active'); 



            // next_btn에 클릭이벤트 설정
            $('.next_btn').click(function() {
                // 이미지의 인덱스 번호를 1씩 증가시킴
                mo_num++;
                // 만약 인덱스 번호가 mo_tatal 값 이상이면 0으로 초기화
                if (mo_num >= mo_total) { mo_num = 0; }
                // mo_num에 해당하지 않는 number a 는 active 클래스 제거
                $('.number a').eq(mo_num - 1).removeClass('active');
                // mo_num에 해당하는 number a 는 active 클래스 설정
                $('.number a').eq(mo_num).addClass('active');
                // mo_num에 해당하지 않는 .txt는 액티브 클래스 제거
                $('.txt').eq(mo_num - 1).removeClass('active');
                // mo_num에 해당하는 .txt에 active 클래스 설정 
                $('.txt').eq(mo_num).addClass('active');


                // '-=' + imgWidth ==> 왼쪽
                $('.left_img').animate({left: '-=' + imgWidth}, 700, 'easeOutExpo',
                function() {
                    // .left_img 영역이 이동하고 난 후 첫번째 photo가 .left_img 영역의 맨 뒤로 이동함
                    $('.photo:first-child').appendTo('.left_img');
                    $('.left_img').css('left', -imgWidth);
                });

                // '-=' + imgWidth ==> 왼쪽
                $('.right_bg').animate({left: '+=' + imgWidth}, 700, 'easeOutExpo',
                function() {
                    // .right_bg 영역이 이동하고 난 후 마지막 .right_bg div가 .right_bg 영역의 맨 앞으로 이동함
                    $('.right_bg div:last-child').prependTo('.right_bg');
                    $('.right_bg').css('left', -imgWidth);
                });

                // '-=' + imgWidth ==> 왼쪽
                $('.center_img').animate({left: '-=' + imgWidth}, 700, 'easeOutExpo',
                function() {
                    // .left_img 영역이 이동하고 난 후 첫번째 photo가 .left_img 영역의 맨 뒤로 이동함
                    $('.small:first-child').appendTo('.center_img');
                    $('.center_img').css('left', -imgWidth);
                });
            }); // next_btn

            // prev_btn에 클릭이벤트 설정
            $('.prev_btn').click(function() {
                // 이미지의 인덱스 번호를 1씩 감소시킴
                mo_num--;
                // 만약 인덱스 번호가 0 미만이면 mo_total - 1 으로 초기화
                if (mo_num < 0) { mo_num = mo_total - 1; }

                // mo_num에 해당하지 않는 number a 는 active 클래스 제거
                // :not() 메소드는 ()안의 조건의 반대가 되는 객체 선택자
                $('.number a:not(:eq(mo_num))').removeClass('active');

                // mo_num에 해당하는 number a 의 active 클래스 설정
                $('.number a').eq(mo_num).addClass('active');

                // mo_num에 해당하지 않는 .txt는 액티브 클래스 제거
                $('.txt:not(:eq(mo_num))').removeClass('active');

                // mo_num에 해당하는 .txt에 active 클래스 설정 
                $('.txt').eq(mo_num).addClass('active');


                // '+=' + imgWidth ==> 오른쪽으로 photo 가로길이만큼 이동  
                $('.left_img').animate({left: '+=' + imgWidth}, 700, 'easeOutExpo',
                function() {
                    // .left_img 영역이 이동하고 난 후 마지막 photo가 .left_img 영역의 맨 앞으로 이동함
                    $('.photo:last-child').prependTo('.left_img');
                    $('.left_img').css('left', -imgWidth);
                });

                // '-=' + imgWidth ==> 왼쪽
                $('.right_bg').animate({left: '-=' + imgWidth}, 700, 'easeOutExpo',
                function() {
                    // .right_bg 영역이 이동하고 난 후 첫번째 .right_bg div가 .right_bg 영역의 맨 뒤로 이동함
                    $('.right_bg div:first-child').appendTo('.right_bg');
                    $('.right_bg').css('left', -imgWidth);
                });

                
                $('.center_img').animate({left: '+=' + imgWidth}, 700, 'easeOutExpo',
                function() {
                    // .center_img 영역이 이동하고 난 후 마지막 small이 .center_img 영역의 맨 앞으로 삽입됨
                    $('.small:last-child').prependTo('.center_img');
                    $('.center_img').css('left', -imgWidth);
                });
            }); // prev_btn
        } // if

        // top
        $(window).scroll(function() { if ($(this).scrollTop() > 800) {
        // 스크롤 600 넘으면 버튼이 보여지게
        $('.top').fadeIn(); } else { $('.top').fadeOut(); } });
        // 버튼 클릭시
        $(".top").click(function() {
            $('html, body').animate({
                scrollTop : 0 // 0 까지 animation 이동
            }, 400);        // 속도 400
            return false; 
        });
});

