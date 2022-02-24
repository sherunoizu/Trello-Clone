//Добавление задач
const button = document.querySelector('.button');


function boardIdent () {
    const boards = document.querySelectorAll('.boards__item');
    
    addTask(boards[boards.length - 1]);
    dragNdrop(boards[boards.length - 1]);

    const lists = boards[boards.length - 1].querySelector('.list');
}




function addTask(board) {
    const lists = board.querySelector('.list');
    const btn = board.querySelector('.add__btn');
    const addBtn = board.querySelector('.add__item-btn');
    const cancelBtn = board.querySelector('.cancel__item-btn');
    const textarea = board.querySelector('.textarea');
    const form = board.querySelector('.form');
    
    let value;

    btn.addEventListener('click', () => {
        form.style.display = 'block';
        btn.style.display = 'none';
        addBtn.style.display = 'none';

        textarea.addEventListener('input', e => { // обработчик событий на инпут
            value = e.target.value;

            if(value) { // Если в текстареа что то есть то показываем кнопку
                addBtn.style.display = 'block';
            } else {
                addBtn.style.display = 'none';
            }
        });
    });

    cancelBtn.addEventListener('click', () => {
        clear();
    });

    function clear () {
        textarea.value = '';
        value = '';
        form.style.display = 'none';
        btn.style.display = 'flex';
    }

    addBtn.addEventListener('click', () => {
        const newItem = document.createElement('li');
        
        newItem.classList.add('list__item');
       
        newItem.textContent = value;
        newItem.draggable = true;

        const hoverEdit = document.createElement(`div`);
        hoverEdit.classList.add(`hover_edit`);
        const hover_img = document.createElement(`img`);
        hover_img.src = `icons/editHumburger.svg`;
        hover_img.alt = `Humburger`;

        hoverEdit.append(hover_img);
        newItem.append(hoverEdit);
        lists.append(newItem);

        clear();

        dragNdrop ();
        
    });
    
}

boardIdent();


function addBoard () {
    const boards = document.querySelector('.boards');
    const board = document.createElement('ul');
    board.classList.add('boards__item');
    board.innerHTML = `
                <span contenteditable="true" class="title">Введите название</span>
                <ul class="list">
                </ul>

                <div class="form">
                    <textarea class="textarea" placeholder="Введите название для этой карточки"></textarea>
                    
                    
                    <div class="buttons">
                        <button class="add__item-btn">Добавить карточку</button>
                        <button class="cancel__item-btn">Отмена</button>
                    </div>
                </div>

                <div class="add__btn"> <span>+</span> Добавить карточку</div>

    `;
    boards.append(board);

    boardIdent();
    changeTitle();
    dragNdrop ();
    delBoard();
}
button.addEventListener('click', addBoard);

function changeTitle() {
    const titles = document.querySelectorAll('.title');
    titles.forEach(title => {
        title.addEventListener('click', e => e.target.textContent = '');
    });
}
changeTitle();

let draggedItem = null;

function dragNdrop (board) {
    const tasksListElement = board.querySelector(`.list`);
    const taskElements = tasksListElement.querySelectorAll(`.list__item`);

    for (const task of taskElements) {
        task.draggable = true;
    }

    tasksListElement.addEventListener(`dragstart`, (evt) => {
        evt.target.classList.add(`selected`);

    });

    tasksListElement.addEventListener(`dragend`, (evt) => { evt.target.classList.remove(`selected`);});

    

    const getNextElement = (cursorPosition, currentElement) => {
        const currentElementCoord = currentElement.getBoundingClientRect();
        const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;

        const nextElement = (cursorPosition < currentElementCenter) ?
            currentElement :
            currentElement.nextElementSibling;

        return nextElement;
    };

    tasksListElement.addEventListener(`dragover`, (evt) => {
        evt.preventDefault();

        const activeElement = tasksListElement.querySelector(`.selected`);
        const currentElement = evt.target;

        const isMoveable = activeElement !== currentElement &&
        currentElement.classList.contains(`.list__item`);


        if (isMoveable) {
            return;
        }

        const nextElement = getNextElement(evt.clientY, currentElement);

        if (
            nextElement && 
            activeElement === nextElement.previousElementSibling ||
            activeElement === nextElement
        ) {
            return;
        }
        
        tasksListElement.insertBefore(activeElement, nextElement);
    });
}





function delBoard () {
    boards = document.querySelectorAll('.boards__item');
    
    for(let i = 0; i < boards.length; i++){
        const board = boards[i];
        board.addEventListener('dblclick', () => {
            board.remove();
        }); 
    }
}
// delBoard();

function newBarConstr () {
    const newBar = document.createElement(`div`);
    newBar.classList.add(`bar_edit`);
    const wrapper = document.createElement(`div`);
    wrapper.classList.add(`bar_edit__wrapper`);
    newBar.append(wrapper);
    const item = document.createElement(`div`);
    item.classList.add(`bar_edit__items`);
    const img_1 = document.createElement(`img`);
    img_1.src = ``;
    img_1.alt = ``;
    item.append(img_1);
    const img_2 = document.createElement(`img`);
    img_2.src = `icons/edit.svg`;
    img_2.alt = ``;
    item.append(img_2);
    const img_3 = document.createElement(`img`);
    img_3.src = ``;
    img_3.alt = ``;
    item.append(img_3);
    
    wrapper.append(item);
    
    return newBar;
}

function openEdit () {
    const lists = document.querySelectorAll(`.list__item`);
    const editBtn = document.querySelectorAll(`.hover_edit`);
    const editBar = document.querySelectorAll(`.bar_edit`);
    for (let i = 0; i < editBtn.length; i++) {
        editBtn[i].addEventListener('click', () => {
            
            lists[i].append(newBarConstr());
            editBar[i].classList.add(`active`);
            
    });
    }
}

openEdit();
