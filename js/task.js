function toggleNewList(){ 
  $('body').find("#createNewList").slideToggle("slow");
  $("#errorName").hide()
}

function CleanListName(){ 
  $('#listName').val('');
  $('body').find("#createNewList").slideUp("slow");
  $("#errorName").hide()
}

$(document).ready(function() {

  $(document).on("click", "#lists > .listeN > .panelka > .panel > .panel-heading > .buttonDeleteList", function (){
    x=confirm("Are you sure you want to delete this list?");
    if (x==true){
      $.post("deleteList.php", {listName: $(this).parents('.list').find('.sPanel').text()});
      $(this).parents('.list').remove();
    }
  });

  $(document).on("click", "#lists > .listeN > .panelka > .panel > .panel-heading > .buttonEditList", function (){
    text = prompt("Input new list name, please!",$(this).parents('.list').find('.sPanel').text());
    if (text !== null){
      $.post("editList.php", {oldListName: $(this).parents('.list').find('.sPanel').text(),
                                newListName: text});
      $(this).parents('.list').find('.sPanel').text(text);
    }
  });

  $(document).on("mouseenter", "#lists > .listeN > .panelka", function (){
      $(this).find(".buttonDeleteList").show();
      $(this).find(".buttonEditList").show();
  });

  $(document).on("mouseleave", "#lists > .listeN > .panelka", function (){
      $(this).find(".buttonDeleteList").hide();
      $(this).find(".buttonEditList").hide();
  });
 
  $(document).on("click", "#lists > .listeN > .addTask > .panel > .panel-heading > .formo4ka > .input-group > .input-group-btn > .btnAddTask", function (){
      task=
      "<li class='list-group-item list-group-item-success ulli'>"+
        "<ul class='list-group list-inline ul-list'>"+
          "<li><span class='buttonDoneTask glyphicon glyphicon-unchecked' aria-hidden='true'></span></li>"+
          "<li><span class='taskValue'>"+$(this).parents('.list').find('.newTaskValue').val()+"</span></li>"+
          "<li class='taskOptions'><span class='buttonDeleteTask glyphicon glyphicon-trash ' aria-hidden='true'></span></li>"+
          "<li class='taskOptions'><span class='buttonEditTask glyphicon glyphicon-pencil ' aria-hidden='true'></span></li>"+
          "<li class='taskOptions'><span class='buttonDownTask glyphicon glyphicon-triangle-bottom' aria-hidden='true'></span></li>"+
          "<li class='taskOptions1'><span class='buttonUpTask glyphicon glyphicon-triangle-top' aria-hidden='true'></span></li>"+
        "</ul>"+
      "</li>";
      $(this).parents('.list').find('.ulCont').append(task);
      $.post("createTask.php", {taskName: $(this).parents('.list').find('.newTaskValue').val(),
       listName: $(this).parents('.list').find('.sPanel').text()});
      $(this).parents().find('.newTaskValue').val('');
  });

  $(document).on("click", "#lists > .listeN > .globalList > .ulCont > .ulli > .ul-list > li > .buttonEditTask", function (){
    text = prompt("Input new task, please!",$(this).parents('.ulli').find('.taskValue').text());
    if (text !== null){
      $.post("editTask.php", {listName: $(this).parents('.list').find('.sPanel').text(),
                              oldTaskName: $(this).parents('.ulli').find('.taskValue').text(),
                              newTaskName: text});
      $(this).parents('.ulli').find('.taskValue').text(text);
    }
  });

  $(document).on("click", "#lists > .listeN > .globalList > .ulCont > .ulli > .ul-list > li > .buttonDeleteTask", function (){
    x=confirm("Are you sure you want to delete this task?");
    if (x==true){
      $.post("deleteTask.php", {taskName: $(this).parents('.ulli').find('.taskValue').text(),
                            listName: $(this).parents('.list').find('.sPanel').text()});
      $(this).parents('.ulli').remove();
    }
  });

  $(document).on("click", "#lists > .listeN > .globalList > .ulCont > .ulli > .ul-list > li > .buttonDownTask", function (){
      pList = $(this).parents('.ulli');
      $.post("priorTask.php", {taskName: $(this).parents('.ulli').find('.taskValue').text(),
                            listName: $(this).parents('.list').find('.sPanel').text(), upDown: 1, 
                            nextPrev: pList.next().find('.taskValue').text()});
      pList.insertAfter(pList.next());
  });

  $(document).on("click", "#lists > .listeN > .globalList > .ulCont > .ulli > .ul-list > li> .buttonUpTask", function (){
      pList = $(this).parents('.ulli');
      $.post("priorTask.php", {taskName: $(this).parents('.ulli').find('.taskValue').text(),
                            listName: $(this).parents('.list').find('.sPanel').text(), upDown: 0, 
                            nextPrev: pList.prev().find('.taskValue').text()});
      pList.insertBefore(pList.prev());
  });

  var doneTask = false;
  $(document).on("click", "#lists > .listeN > .globalList > .ulCont > .ulli > .ul-list > li >.buttonDoneTask", function (){
    if (doneTask == false ){
      $(this).parents('.ulli').find('.buttonDoneTask').removeClass('glyphicon glyphicon-unchecked');
      $(this).parents('.ulli').find('.buttonDoneTask').addClass('glyphicon glyphicon-check');
      doneTask = true;
    }
    else{
      $(this).parents('.ulli').find('.buttonDoneTask').removeClass('glyphicon glyphicon-check');
      $(this).parents('.ulli').find('.buttonDoneTask').addClass('glyphicon glyphicon-unchecked');
      doneTask = false;
    }
    $.post("doneTask.php", {taskName: $(this).parents('.ulli').find('.taskValue').text(),
                            listName: $(this).parents('.list').find('.sPanel').text()});
  });

  $(document).on("mouseenter", "#lists > .listeN > .globalList > .ulCont > .ulli", function (){
    $(this).find(".buttonEditTask").show();
    $(this).find(".buttonDeleteTask").show();
    $(this).find(".buttonDownTask").show();
    $(this).find(".buttonUpTask").show();
  });

  $(document).on("mouseleave", "#lists > .listeN > .globalList > .ulCont > .ulli", function (){
    $(this).find(".buttonEditTask").hide();
    $(this).find(".buttonDeleteTask").hide();
    $(this).find(".buttonDownTask").hide();
    $(this).find(".buttonUpTask").hide();
  });
});

function addNameL(){
  if ($("#listName").val() == '') {
    $("#errorName").show('2000')
  }
  else{
    $("#listName").val();
      $("#errorName").hide('2000');
      createVList =
      "<div class='listeN panTask list'>"+
        "<div class='panelka' >"+
          "<div class='panel panel-primary'>"+
            "<div class='panel-heading'>"+
              "<span class='glyphicon glyphicon-list-alt' aria-hidden='true'></span>"+
              "<span class='sPanel'>"+$("#listName").val()+"</span>"+
              "<span class='glyphicon glyphicon-trash buttonDeleteList' aria-hidden='true'></span>"+
              "<span class='glyphicon glyphicon-pencil buttonEditList'  aria-hidden='true'></span>"+
            "</div>"+
          "</div>"+
        "</div>"+  
        "<div class='addTask'>"+
          "<div class='panel panel-danger'>"+
            "<div class='panel-heading'>"+
              "<span class='glyphicon glyphicon-plus plusTask' aria-hidden='true'></span>"+  
              "<div class='formo4ka'>"+
                "<div class='input-group'>"+
                  "<input type='text' class='form-control newTaskValue' placeholder='Start typing here to create a task...' />"+
                  "<span class='input-group-btn'>"+
                    "<button class='btn btn-success btnAddTask'  type='button'>Add Task</button>"+
                  "</span>"+
                "</div>"+
              "</div>"+
            "</div>"+  
          "</div>"+
      "</div>"+
      "<div class='globalList'>"+
        "<ul class='list-group ulCont'></ul>"+  
      "</div>";
    "</div>";
    $("#lists").append(createVList).last().hide();
    $("#lists" ).last().show(900);
    $.post("createList.php", {listName: $("#listName").val()});
    $('#listName').val('');
  }
}