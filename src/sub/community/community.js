var items = ["data/community.json", "data/community_2.json"];
var item_data = callData(items[0]);
var target = $(".tab>div").eq(0);
createTable(target, item_data);

$(".community_tab li").on("click", function(e){
    e.preventDefault();
    var i = $(this).index();

    $(".community_tab li a").removeClass("on");
    $(".community_tab li").eq(i).children("a").addClass("on");

    //박스 비활성화
    $(".tab>div").removeClass("on");
    $(".tab>div").html("");

    //박스 활성화
    $(".tab>div").eq(i).addClass("on");

    //클릭한 순번의 데이터 주소로 callData함수 호출하여 변수에 배열저장
    var item_data = callData(items[i]);

    //해당 순번의 패널에만 해당 데이터의 테이블 동적생성
    var target = $(".tab>div").eq(i);
    createTable(target, item_data);
})

//데이터호출 함수 정의
function callData(url){
    var result;

    $.ajax({
        url: url,
        dataType: "json",
        async: false
    })
    .success(function(data){
        result = data.data;    
    })
    .error(function(err){
        console.error(err);
    });

    return result;
}

//테이블 생성 함수 정의
function createTable(target, items){

    //상단 thead와 tbody생성
    target.append(
        $("<table summary='게시물번호, 제목, 작성자, 작성일, 조회수 정보'>")
            .append("<caption class='h'>공지사항</caption>")
            .append(
                $("<thead>")
                    .append(
                        $("<tr>")
                            .append(
                                "<th scope='col'>No.</th>",
                                "<th scope='col'>제목</th>",
                                "<th scope='col'>작성자</th>",
                                "<th scope='col'>작성일</th>",
                                "<th scope='col'>조회수</th>"
                            )
                    ),
                $("<tbody>"),
                $("<tfoot>")
            ),
    );

    $(items).each(function(index, data){
        target.find("tbody")
            .prepend(
                $("<tr>")
                    .append(
                        $("<td>").text(index+1),
                        $("<td>")
                            .append(
                                $("<a>").attr("href", data.link).text(data.title)
                            ),
                        $("<td>").text(data.writer),
                        $("<td>").text(data.date),
                        $("<td>").text(data.views)
                    )
            )
    })
}

