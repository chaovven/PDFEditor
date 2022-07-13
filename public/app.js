btnPlusList = document.querySelectorAll(".fa-plus-square");
btnMinusList = document.querySelectorAll(".fa-minus-square");

formList = document.querySelectorAll(".form-action");

for (let i = 0; i < btnPlusList.length; i++) {
    btnPlusList[i].addEventListener("click", function () {
        formList[i].classList.add("show-form")
        btnMinusList[i].classList.add("show-minus");
        btnPlusList[i].classList.add("hide-plus");
    })

    btnMinusList[i].addEventListener("click", function () {
        formList[i].classList.remove("show-form")
        btnMinusList[i].classList.remove("show-minus");
        btnPlusList[i].classList.remove("hide-plus");
    })
}