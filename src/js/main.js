//Добавление задач
const button = document.querySelector('.button');


function boardIdent () {
    const boards = document.querySelectorAll('.boards__item');
    
    addTask(boards[boards.length - 1]);
    // dragNdrop(boards[boards.length - 1]);

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
        // newItem.textContent = value;
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

function dragNdrop () {
    const tasksListElement = document.querySelector(`.list`);
    const taskElements = tasksListElement.querySelectorAll(`.list__item`);

    for (const task of taskElements) {
        task.draggable = true;
    }

    tasksListElement.addEventListener(`dragstart`, (evt) => {
     evt.target.classList.add(`selected`);
    });

    tasksListElement.addEventListener(`dragend`, (evt) => {
     evt.target.classList.remove(`selected`);
    });

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

    console.log(isMoveable);

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
dragNdrop ();

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
