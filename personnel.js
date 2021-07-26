function save() {
    let fullname = document.getElementById('fullName').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let address = document.getElementById('address').value;
    let hesoluong = document.getElementById('hesoluong').value;
    let luong = document.getElementById('luong').value;

    let gender = '';
    if (document.getElementById('male').checked) {
        gender = document.getElementById('male').value;
    }
    if (document.getElementById('female').checked) {
        gender = document.getElementById('female').value;
    }

    if (_.isEmpty(fullname)) {
        document.getElementById('fullname-error').innerHTML = '*vui long nhap thong tin';
    } else if (fullname.trim().length <= 6) {
        document.getElementById('fullname-error').innerHTML = '*không dc nho hon 6 ky tu';
    }else {
        document.getElementById('fullname-error').innerHTML = '';
    }

    if (_.isEmpty(email)) {
        document.getElementById('email-error').innerHTML = '*vui long nhap thong tin';
        email = '';
    } else if (email.trim().length <= 6) {
        document.getElementById('email-error').innerHTML = '*không dc nho hon 6 ky tu';
        email = '';
    } else if (!emailIsValid(email)) {
        document.getElementById('email-error').innerHTML = '*Email không đúng định dạng!';
        email = '';
    } else {
        document.getElementById('email-error').innerHTML = '';
    }

    if (_.isEmpty(phone)) {
        document.getElementById('phone-error').innerHTML = '*vui long nhap thong tin';
    } else if (phone.trim().length > 10) {
        document.getElementById('phone-error').innerHTML = '*không dc lon hon 10 ky tu';
    }else {
        document.getElementById('phone-error').innerHTML = '';
    }
    if (_.isEmpty(address)) { 
        document.getElementById('address-error').innerHTML = '*vui long địa chỉ';
    } else {
        document.getElementById('address-error').innerHTML = '';
    }

    if (_.isEmpty(luong)) { 
        document.getElementById('luong-error').innerHTML = '*vui long nhap lương';
    } else {
        document.getElementById('luong-error').innerHTML = '';
    }

    if (_.isEmpty(hesoluong)) {
        document.getElementById('hesoluong-error').innerHTML = '*vui long nhap hệ số lương';
    } else {
        document.getElementById('hesoluong-error').innerHTML = '';
    }

    if (_.isEmpty(gender)) {
        document.getElementById('gender-error').innerHTML = '*vui nhap chon gioi tinh'
    } else {
        document.getElementById('gender-error').innerHTML = ''
    }

    if (fullname && email && phone && address && hesoluong && luong && gender) {
        let personnels = localStorage.getItem('personnels') ? JSON.parse(localStorage.getItem('personnels')) : [];

        personnels.push({
            fullname: fullname, 
            email: email, 
            phone: phone, 
            address: address, 
            hesoluong: hesoluong, 
            luong: luong, 
            gender: gender, 
        }); 

        localStorage.setItem('personnels', JSON.stringify(personnels));

        this.renderListPersonnel();
    }
}

function emailIsValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function renderListPersonnel() {
    let personnels = localStorage.getItem('personnels') ? JSON.parse(localStorage.getItem('personnels')) : [];

    if (personnels.length === 0) {
        document.getElementById('list-personnel').style.display = 'none';
        return false;
    } 

    document.getElementById('list-personnel').style.display = 'block';

    let tableContent = `<tr>
        <td>#</td>
        <td>Full name</td>
        <td>Email</td>
        <td>Phone</td>
        <td>Gender</td>
        <td>Address</td>
        <td>hesoluong</td>
        <td>Luong</td>
        <td>Option</td>
    </tr>`;

    personnels.forEach((personnel, index) => {
        let personnelID = index;
        let genderLabel = parseInt(personnel.gender) === 1 ? 'Nam' : 'Nữ';
        index++;

        tableContent += `<tr>
            <td>${index}</td>
            <td>${personnel.fullname}</td>
            <td>${personnel.email}</td>
            <td>${personnel.phone}</td>
            <td>${genderLabel}</td>
            <td>${personnel.address}</td>
            <td>${personnel.hesoluong}</td>
            <td>${personnel.luong}</td>
            <td>
                <a href="#" onclick='deletePersonnel(${personnelID})'>Delete</a>
            </td>
        </tr>`;
    });

    document.getElementById('grid-personnels').innerHTML = tableContent;
}

function deletePersonnel (id) {
    let personnels = localStorage.getItem('personnels') ? JSON.parse(localStorage.getItem('personnels')) : [];
    personnels.splice(id, 1);
    localStorage.setItem('personnels', JSON.stringify(personnels));
    renderListPersonnel();
}

function reset() {
    let check;
    document.getElementById('fullName-error').innerHTML = '';
    document.getElementById('email-error').innerHTML = '';
    document.getElementById('phone-error').innerHTML = '';
    document.getElementById('address-error').innerHTML = '';
    document.getElementById('hesoluong-error').innerHTML = '';
    document.getElementById('luong-error').innerHTML = '';
    check = true;
    return check;
}
