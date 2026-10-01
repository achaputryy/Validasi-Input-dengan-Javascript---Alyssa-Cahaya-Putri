const form = document.getElementById('registerForm');

const username = document.getElementById('username');
const password = document.getElementById('password');
const namaLengkap = document.getElementById('nama');
const tanggalLahir = document.getElementById('tanggalLahir');
const alamat = document.getElementById('alamat');
const nomorTelepon = document.getElementById('nomorTelepon');

const usernameError = document.getElementById('username-error');
const passwordError = document.getElementById('password-error');
const namaError = document.getElementById('nama-error');
const tanggalError = document.getElementById('tanggalLahir-error');
const alamatError = document.getElementById('alamat-error');
const teleponError = document.getElementById('nomorTelepon-error');

const today = new Date();
const todayString = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, '0'),
    String(today.getDate()).padStart(2, '0')
].join('-');
tanggalLahir.max = todayString;

function setError(input, errorElement, message) {
    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
    input.classList.remove('border-gray-200', 'border-emerald-300', 'ring-emerald-100');
    input.classList.add('border-softpink-400', 'ring-2', 'ring-softpink-100');
}

function setValid(input, errorElement) {
    errorElement.textContent = '';
    errorElement.classList.add('hidden');
    input.classList.remove('border-gray-200', 'border-softpink-400', 'ring-softpink-100');
    input.classList.add('border-emerald-300', 'ring-2', 'ring-emerald-100');
}

function resetState(input, errorElement) {
    errorElement.textContent = '';
    errorElement.classList.add('hidden');
    input.classList.remove('border-softpink-400', 'ring-softpink-100', 'border-emerald-300', 'ring-emerald-100', 'ring-2');
    input.classList.add('border-gray-200');
}

function validasiUsername() {
    const value = username.value.trim();

    if (value === '') {
        setError(username, usernameError, 'Username wajib diisi.');
        return false;
    }
    if (value.length < 3) {
        setError(username, usernameError, 'Username minimal 3 karakter.');
        return false;
    }

    setValid(username, usernameError);
    return true;
}

function validasiPassword() {
    const value = password.value;

    if (value === '') {
        setError(password, passwordError, 'Password wajib diisi.');
        return false;
    }
    if (value.length < 8) {
        setError(password, passwordError, 'Password minimal 8 karakter.');
        return false;
    }

    setValid(password, passwordError);
    return true;
}

function validasiNama() {
    const value = namaLengkap.value.trim();

    if (value === '') {
        setError(namaLengkap, namaError, 'Nama wajib diisi.');
        return false;
    }

    setValid(namaLengkap, namaError);
    return true;
}

function validasiTanggalLahir() {
    const value = tanggalLahir.value;

    if (value === '') {
        setError(tanggalLahir, tanggalError, 'Tanggal lahir wajib diisi.');
        return false;
    }
    if (value > todayString) {
        setError(tanggalLahir, tanggalError, 'Tanggal lahir tidak boleh melebihi tanggal hari ini.');
        return false;
    }

    setValid(tanggalLahir, tanggalError);
    return true;
}

function validasiAlamat() {
    const value = alamat.value.trim();

    if (value === '') {
        setError(alamat, alamatError, 'Alamat wajib diisi.');
        return false;
    }

    setValid(alamat, alamatError);
    return true;
}

function validasiNomorTelepon() {
    const value = nomorTelepon.value.trim();

    if (value === '') {
        setError(nomorTelepon, teleponError, 'Nomor telepon wajib diisi.');
        return false;
    }
    if (!value.startsWith('62')) {
        setError(nomorTelepon, teleponError, 'Nomor telepon harus diawali dengan 62.');
        return false;
    }

    setValid(nomorTelepon, teleponError);
    return true;
}

const togglePassword = document.getElementById('toggle-password');

togglePassword.addEventListener('click', function () {
    const sedangTersembunyi = password.type === 'password';
    password.type = sedangTersembunyi ? 'text' : 'password';
    togglePassword.textContent = sedangTersembunyi ? 'Sembunyikan' : 'Lihat';
});

username.addEventListener('blur', validasiUsername);
username.addEventListener('input', function () { resetState(username, usernameError); });

password.addEventListener('blur', validasiPassword);
password.addEventListener('input', function () { resetState(password, passwordError); });

namaLengkap.addEventListener('blur', validasiNama);
namaLengkap.addEventListener('input', function () { resetState(namaLengkap, namaError); });

tanggalLahir.addEventListener('change', validasiTanggalLahir);

alamat.addEventListener('blur', validasiAlamat);
alamat.addEventListener('input', function () { resetState(alamat, alamatError); });

nomorTelepon.addEventListener('blur', validasiNomorTelepon);
nomorTelepon.addEventListener('input', function () { resetState(nomorTelepon, teleponError); });

form.addEventListener('submit', function (event) {
    const isUsernameValid = validasiUsername();
    const isPasswordValid = validasiPassword();
    const isNamaValid = validasiNama();
    const isTanggalValid = validasiTanggalLahir();
    const isAlamatValid = validasiAlamat();
    const isTeleponValid = validasiNomorTelepon();

    const semuaValid = isUsernameValid && isPasswordValid && isNamaValid &&
                       isTanggalValid && isAlamatValid && isTeleponValid;

    if (!semuaValid) {
        event.preventDefault();

        const inputErrorPertama = form.querySelector('.ring-softpink-100');
        if (inputErrorPertama) {
            inputErrorPertama.focus();
        }
        return;
    }

    localStorage.setItem('aeSseNama', namaLengkap.value.trim());
    localStorage.setItem('aeSseUsername', username.value.trim());
});