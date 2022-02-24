function dragNdropBetweendBoards () {
    const listItems = document.querySelectorAll('.list__item');
    const lists = document.querySelectorAll('.list');

    for (let i = 0; i < listItems.length; i++) {
        const item = listItems[i];

        item.addEventListener('dragstart', () => {
            draggedItem = item;
            setTimeout(() => {
                item.style.display = 'none';
            }, 0);
        });

        item.addEventListener('dragend', () => {
            setTimeout(() => {
                item.style.display = 'block';
                draggedItem = null;
            }, 0);
        });

        item.addEventListener('dblclick', () => {
            item.remove();
        });

        for (let j = 0; j < lists.length; j++) {
            const list = lists[j];

            list.addEventListener('dragover', e => e.preventDefault());

            list.addEventListener('dragenter', function (e) {
                e.preventDefault();
                this.style.backgroundColor = 'rgba(0,0,0,.3)';
            });

            list.addEventListener('dragleave', function(e) {
                this.style.backgroundColor = 'rgba(0,0,0,0)';
            });

            list.addEventListener('drop', function(e) {
                this.style.backgroundColor = 'rgba(0,0,0,0)';
                this.append(draggedItem);
            });
        }
    }
}