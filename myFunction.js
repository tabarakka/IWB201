

fetch('./fils.json')
    .then(res => res.json())
    .then(data => {
        handeldata(data);

    });

let arrdetalis = [];



function handeldata(flats) {
    const Choice = document.getElementById("radio");
    const Checkbox = document.getElementById("checkbox");
    const pri = document.getElementById("pri");
    const det = document.getElementById("det");
    const city = document.getElementById("city");
    const mytable = document.getElementById("flats");

    flats.forEach(flat => {
        const flatElement = newcreate(flat);
        const detalisElement = detalis(flat);
        mytable.appendChild(flatElement);
        mytable.appendChild(detalisElement);

    });
}

function newcreate(flat) {
    const myflat = document.createElement("tr");

    for (let index = 0; index < 5; index++) {
        let cell = document.createElement("td");
        myflat.appendChild(cell);
    }

    let radio = document.createElement('input');
    radio.setAttribute("type", "radio");
    radio.setAttribute("name", "radio");

    myflat.children[0].appendChild(radio);
    radio.onchange = function (e) {
        nextbtn.disabled = false;
        for (let index = 2, index1 = 0; index < 5; index++, index1++) {
            arrdetalis[index1] = (this.parentElement.parentElement.children[index].innerText);

        }
    }
    let checkbox = document.createElement('input');
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("name", "checkbox");
    myflat.children[1].appendChild(checkbox);

    myflat.children[2].innerHTML = `${flat.sall}`;
    myflat.children[2].setAttribute("name", "sall");

    myflat.children[3].innerHTML = `${flat.det}`;
    myflat.children[3].setAttribute("name", "det");

    myflat.children[4].innerHTML = `${flat.city}`;
    myflat.children[4].setAttribute("name", "city");

    checkbox.onclick = function () {
        let info = this.parentElement.parentElement.nextElementSibling;
        info.style.display = info.style.display === 'table-row' ? 'none' : 'table-row';

    };

    return myflat;
}
// ----------------------
function detalis(flat) {

    const row = document.createElement("tr");
    row.className = "hid";
    const detcont = document.createElement("td");
    detcont.setAttribute("colspan", "5");
    detcont.innerHTML = `    <div class="more-info">
                        <ul class="txt">
                            <li name="aria"> المنطقة: ${flat.aria} </li>
                            <li  name="gar" > متوفر كراج: ${flat.gar} </li>
                            <li  name="flppr" > الطابق: ${flat.floor} </li>
                            <li  name="blkon" > مساحة بلكون : ${flat.Blkon} </li>
                            <li  name="stuf" > مفروشة: ${flat.stuf} </li>
                            <li  name="haveingType" > الملكية: ${flat.haveingType} </li>
                        </ul>
                        <div>
                            <img src="${flat.img1}" alt="">
                            <img src="${flat.img2}" alt="">
                           
                        </div>
                      </div>
    `;
    row.appendChild(detcont);

    return row;


}
//-----------

// --
let nextbtn = document.getElementById("btnsub");
nextbtn.disabled = true;

let myform = document.querySelector(".form");

nextbtn.onclick = function () {
    myform.style.display = 'flex'
    Captcha();
};
let cancel = document.getElementById("cancelbtn");
cancel.onclick = function () {
    myform.style.display = "none"
}
// Define the characters that can be used in the captcha code

function Captcha() {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    // Generate a random string of 6 characters
    let captchaCode = "";
    for (let i = 0; i < 6; i++) {
        captchaCode += chars[Math.floor(Math.random() * chars.length)];
    }
    let refr = document.getElementById("refrlpl");
    refr.innerText = captchaCode;
}
//----------

let supbtn = document.getElementById("done");
supbtn.onclick = function () {
    var username = document.getElementById("name");
    var ID = document.getElementById("IDC");
    var phone = document.getElementById("phone");
    var email = document.getElementById("email");
    var captcha = document.getElementById("txtCaptcha");
    var refrlpl = document.getElementById("refrlpl").innerText;

    username.classList.remove("worong")
    ID.classList.remove("worong")
    phone.classList.remove("worong")
    email.classList.remove("worong")
    captcha.classList.remove("worong")


    if (username.value == "") {
        username.classList.add("worong")

        alert("يرجى ملء جميع الحقول الإلزامية");
        return false;
    }

    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value) && email.value != "") {
        email.classList.add("worong")

        alert("يرجى إدخال عنوان بريد إلكتروني صالح");
        return false;
    }

    var numberPattern = /^(0[1-9]|1[0-5])[0-9]{9}$/;
    if (!numberPattern.test(ID.value)) {
        ID.classList.add("worong")
        alert("يرجى إدخال رقم وطني صالح بين 01 و 15");
        return false;
    }


    var phonePattern = /((0)(93|94|95|96|98|99)([0-9]{7}))|((0)(92|95|96|97)([0-9]{7}))/;
    if (!phonePattern.test(phone.value) && phone.value != "") {
        phone.classList.add("worong")
        alert("يرجى إدخال رقم هاتف صالح مع رمز البلد (مثال: 0931234567)");
        return false;
    }

    if (captcha.value == "") {
        captcha.classList.add("worong")
        alert("يرجى إدخال رمز التحقق من الكابتشا");
        return false;
    }

    if (captcha.value != refrlpl) {
        alert("رمز التحقق من الكابتشا غير صحيح");
        captcha.classList.add("worong")
        return false;
    }
    alert(" لقد تم حجز شقة بنجاح \n"
        + "مدينة " + arrdetalis[2] + "\n"
        + " " + arrdetalis[1] + "\n"
        + "بسعر " + arrdetalis[0] + "\n"


    )
}

