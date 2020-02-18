const successStatus = 200;
const xhr = new XMLHttpRequest;
xhr.open('GET','https://swapi.co/api/films/');
xhr.send();
xhr.responseType = 'json';

xhr.onload = function(){
//console.log(xhr.status)
    if(xhr.status === successStatus){
        const films = xhr.response.results;
        const list = document.querySelector('ul');
        //console.log(films);

        // перебираем массив !!!
        //Eslint next line disable
        films.forEach(film => {
        //console.log(film);
        //создаем список li и добавляем в наш ul
            const li = document.createElement('li');
            //console.log(film);
            li.classList.add('f_title');
            // film.title это метод который возращает бэкэнд
            const filmTitle = film.title;
            li.textContent = filmTitle;
            list.append(li);
            //навешиваем событие
            list.addEventListener('click',(event) => {
                //eslint-disable-next-line
                const target = event.target; 
                // если нажатие не на li
                if(!target.classList.contains('f_title')) return;

                if(target.firstElementChild){
                    target.firstElementChild.classList.toggle('hidden');
                    return;
                }

                if(filmTitle === target.textContent){
                    //создали элемента списка кораблей
                    const starShipsUl = document.createElement('ul');
                    const starShips = film.starships;
                    //console.log(starShips);
                    starShips.forEach(ship => {
                        const shipXHR = new XMLHttpRequest;
                        shipXHR.open('GET',ship);
                        shipXHR.responseType = 'json';
                        shipXHR.send();
                        //создали элемент списка в который будем добавлять модели кораблей
                        const starShipsLi = document.createElement('li');

                        shipXHR.onload = function(){
                            const typeStarship = shipXHR.response.model;
                            //console.log(type_starship);
                            //получили конкретно список
                            starShipsLi.textContent = typeStarship;
                            starShipsLi.classList.add('star-ship');
                            starShipsUl.append(starShipsLi);
                        };
                    });
                    target.append(starShipsUl);
                }
            });
        });
    } else {
    //console.log('Opsss......')
    }
};