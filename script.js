let input=document.getElementById("input");
let add=document.getElementById("add");
let err=document.getElementById("error");
let clear_all=document.getElementById("clear");
let tasks=document.getElementsByClassName("task");


function store(text){
    let stored=JSON.parse(localStorage.getItem("tasks"));
    if(stored==null) stored=[];
    stored.push(text);
    localStorage.setItem("tasks",JSON.stringify(stored));
}

function rem(text){
    let stored=JSON.parse(localStorage.getItem("tasks"));
    stored.splice(stored.indexOf(text),1);
    localStorage.setItem("tasks",JSON.stringify(stored));
}

add.addEventListener("click",task);


clear_all.addEventListener("click",function(){
    if (tasks.length!=0){
        let div_conf=document.getElementById("confirmation");
        let yes=document.getElementById("yes");
        let no=document.getElementById("no");
        div_conf.children[0].textContent="Are you sure you want to delete all tasks?";
        div_conf.style.display="flex";
        principal.style.opacity="0.3";
        principal.style.pointerEvents="none";
        yes.addEventListener("click",function (){
            while(tasks.length!=0) tasks[0].remove();
            localStorage.clear();
            div_conf.style.display="none";
            principal.style.opacity="1";
            principal.style.pointerEvents="auto";
            no_tasks.textContent="No Tasks Added";
        })
        no.addEventListener("click",function (){
            div_conf.style.display="none";
            principal.style.opacity="1";
            principal.style.pointerEvents="auto";
        })
    }
    else{
        err.textContent="No tasks to delete.";
        setTimeout(function (){
            err.textContent="";
        },2000);
    }
})


function task (){
    if(input.value==""){
        err.textContent="Please write something.";
        setTimeout(function (){
            err.textContent="";
        },2000);
    }
    else{
        let task=document.createElement("p");
        let img=document.createElement("img");
        let principal=document.getElementById("principal");
        let no_tasks=document.getElementById("no_tasks");
        task.textContent="Task: "+input.value;
        store(task.textContent);
        input.value="";
        img.src="image.png";
        img.title="Delete Task";
        img.classList.add("img");
        task.classList.add("task");
        if(tasks.length==0){
            no_tasks.textContent="";}
        principal.appendChild(task);
        task.appendChild(img);
        img.addEventListener("click", function (){
                let div_conf=document.getElementById("confirmation");
                let yes=document.getElementById("yes");
                let no=document.getElementById("no");
                div_conf.children[0].textContent="Are you sure you want to delete this task?";
                div_conf.style.display="flex";
                principal.style.opacity="0.3";
                principal.style.pointerEvents="none";
                yes.addEventListener("click",function (){
                    task.remove();
                    rem(task.textContent);
                    div_conf.style.display="none";
                    principal.style.opacity="1";
                    principal.style.pointerEvents="auto";
                    if(tasks.length==0) no_tasks.textContent="No Tasks Added";
                })
                no.addEventListener("click",function (){
                    div_conf.style.display="none";
                    principal.style.opacity="1";
                    principal.style.pointerEvents="auto";
                })
                    
            })
    }
}

window.onload=function () {
    let savedTasks=JSON.parse(localStorage.getItem("tasks"));
    if(savedTasks!=null){
        for(let t of savedTasks){
            let task=document.createElement("p");
            let img=document.createElement("img");
            let principal=document.getElementById("principal");
            let no_tasks=document.getElementById("no_tasks");
            task.textContent=t;
            img.src="image.png";
            img.title="Delete Task";
            img.classList.add("img");
            task.classList.add("task");
            no_tasks.textContent="";
            principal.appendChild(task);
            task.appendChild(img);
            img.addEventListener("click", function (){
                    let div_conf=document.getElementById("confirmation");
                    let yes=document.getElementById("yes");
                    let no=document.getElementById("no");
                    div_conf.children[0].textContent="Are you sure you want to delete this task?";
                    div_conf.style.display="flex";
                    principal.style.opacity="0.3";
                    principal.style.pointerEvents="none";
                    yes.addEventListener("click",function (){
                        task.remove();
                        rem(task.textContent);
                        div_conf.style.display="none";
                        principal.style.opacity="1";
                        principal.style.pointerEvents="auto";
                        if(tasks.length==0) no_tasks.textContent="No Tasks Added";
                    })
                    no.addEventListener("click",function (){
                        div_conf.style.display="none";
                        principal.style.opacity="1";
                        principal.style.pointerEvents="auto";
                    })
                        
                })
        }
    }
};



document.addEventListener("keydown", function (event){
    if(event.key=="F12" || (event.ctrlKey && event.shiftKey && event.key.toLowerCase()=="i")){
        event.preventDefault();
    }
})

document.addEventListener("contextmenu",function (event){
    event.preventDefault();
})