'use strict'

function sendingOrder() {
    const msgSection = document.querySelector('.contact');
    const msgForm = document.querySelector('.msgForm');

    msgForm.addEventListener('submit', msgFormSend);

    async function msgFormSend(e) {
        e.preventDefault();

        let error = formValidate(msgForm);
        let formData = new FormData(msgForm);


        if (error === 0) {
            // Отправка 
            msgSection.classList.add('_sending');
            console.log('No error - sending');

            let response = await fetch('sendmail.php', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {

                let result = await response.json();
                alert(result.message);
                msgForm.reset();
                msgSection.classList.remove('_sending');

                // Возвращаем пользователя на главную страницу
                // location = location.href = "index.html#home";
            } else {
                alert('Ошибка');
                msgSection.classList.remove('_sending');
            };

        } else {
            alert('Заполните обязательные поля')
        };
    };

    function formValidate(msgForm) {
        let error = 0;
        let formReq = document.querySelectorAll('._require');

        for (let i = 0; i < formReq.length; i++) {
            const input = formReq[i];
            formRemoveError(input);

            if (input.classList.contains('_email')) {
                if (emailTest(input)) {
                    formAddError(input);
                    error++;
                };
            } else if (input.getAttribute('type') === 'checkbox' && input.checked === false) {
                formAddError(input);
                error++;
            } else {
                if (input.value === '') {
                    formAddError(input);
                    error++;
                };
            };
        };
        return error;
    };

    function formAddError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    };

    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    };

    // Функция проверки правильности вводимого email
    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    };

};

document.addEventListener('DOMContentLoaded', sendingOrder);