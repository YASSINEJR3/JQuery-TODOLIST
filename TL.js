$('document').ready(()=>{
    /// ***
    let obj = {
        "check":0
    }
    /// Get old elements
    getTodos();
    if(localStorage.getItem("nbr"))
        $(".Nbr-Tasks").children().text("Nombre Tasks :"+localStorage.getItem("nbr"));

    $('.add-btn').click(()=>{

        let str=$('#TL').val();
        if(str.trim() === "")
            alert("Enter Something");
        else{
            $('.ULL').append('<li>'+str+'<i class="fa-solid fa-check"></i><i class="fa-solid fa-trash"></i></li>');
            obj["value"]=str;
            SaveTodos(obj);
            $('#TL').val("");
        }

        /// ***Nombre tasks
        localStorage.setItem('nbr',$('li').length);
        $(".Nbr-Tasks").children().text("Nombre Tasks :"+$('li').length);

        /// ***
        
        

        
    });
    $('.ULL').on('click','.fa-trash',function(){
        $(this).parent('li').fadeOut(200);
        removeTodos($(this).parent('li').text());
        $(this).parent('li').remove();
        $(".Nbr-Tasks").children().text("Nombre Tasks :"+$('li').length);
        localStorage.setItem('nbr',$('li').length);
    
    });
    
    $('.ULL').on('click','.fa-check',function(){
        $(this).parent('li').css("textDecoration","line-through");
        $(this).parent('li').css("background-color","lightgreen");
        SaveChecks($(this).parent('li').text());

    });


});
/// 
function SaveTodos(todo){

    let todos;
    if(!localStorage.getItem('todos'))
        todos = [];
    else
        todos=JSON.parse(localStorage.getItem('todos'));
    
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));

    
}


function getTodos(){
    let todos;
    if(!localStorage.getItem('todos'))
        todos = [];
    else
        todos=JSON.parse(localStorage.getItem('todos'));

    todos.forEach(todo => {
            
        
        if(todo["check"] === 1)
        {
             $('.ULL').append('<li style="text-decoration: line-through; background-color: lightgreen;">'+todo["value"]+'<i class="fa-solid fa-check"></i><i class="fa-solid fa-trash"></i></li>');
        }  
        else          
            $('.ULL').append('<li>'+todo["value"]+'<i class="fa-solid fa-check"></i><i class="fa-solid fa-trash"></i></li>');
        });

}


function removeTodos(todo){
    let todos;
    if(!localStorage.getItem('todos'))
        todos = [];
    else
        todos=JSON.parse(localStorage.getItem('todos'));
    
    let i = 0;
    todos.forEach(obj=>{
        
        if(obj["value"] === todo)
        {
            todos.splice(i,1);
            localStorage.clear();
            localStorage.setItem('todos',JSON.stringify(todos));
            return;
        }
        i++;
    })



}

function SaveChecks(todo){

    let todos;
    if(!localStorage.getItem('todos'))
        todos = [];
    else
        todos=JSON.parse(localStorage.getItem('todos'));

    //todos.push(todo);
    todos.forEach(check=>{

        if(check["value"] === todo)
            check["check"]=1;
    })
    localStorage.setItem('todos',JSON.stringify(todos));

    
}



