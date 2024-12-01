// Menü açma ve kapama işlevi
function toggleMenu() {
    const menu = document.getElementById('menuContent');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

// Bölüm açma işlevi
function openSection(section) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(s => s.style.display = 'none');
    document.getElementById(section).style.display = 'block';
}

// Kayıt Ol Form İşlemi
document.getElementById("kayıt-form").addEventListener("submit", function(event) {
  event.preventDefault();
  
  const name = document.getElementById("name").value;
  const surname = document.getElementById("surname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value; // Şifreyi de alıyoruz
  const school = document.getElementById("school").value;
  const city = document.getElementById("city").value;
  const district = document.getElementById("district").value;
  const schoolNumber = document.getElementById("school-number").value;

  // Verileri localStorage'a kaydet
  const userData = {
    name,
    surname,
    email,
    password,  // Şifreyi de ekliyoruz
    school,
    city,
    district,
    schoolNumber
  };

  localStorage.setItem(email, JSON.stringify(userData));

  alert("Kayıt başarılı!");
  closeKayıtOl();
});

// Veri Görme Form İşlemi
document.getElementById("veri-görme-form").addEventListener("submit", function(event) {
  event.preventDefault();

  const emailVeri = document.getElementById("emailVeri").value;
  const passwordVeri = document.getElementById("passwordVeri").value;

  // Veriyi LocalStorage'tan al
  const user = JSON.parse(localStorage.getItem(emailVeri));

  if (user && user.email === emailVeri && user.password === passwordVeri) {
    document.getElementById("past-data").innerHTML = `
      <h3>Geçmiş Veriler</h3>
      <p><strong>Okul:</strong> ${user.school}</p>
      <p><strong>Okul Numarası:</strong> ${user.schoolNumber}</p>
      <p><strong>Puan:</strong> Burada geçmiş puanlar gösterilecek...</p>
    `;
  } else {
    alert("E-posta veya şifre hatalı.");
  }
});

// Veri Giriş Form İşlemi
document.getElementById("veri-giris-form").addEventListener("submit", function(event) {
  event.preventDefault();

  const schoolNumberEntry = document.getElementById("school-number-entry").value;
  const wasteType = document.getElementById("waste-type").value;
  const wasteAmount = document.getElementById("waste-amount").value;

  let points = 0;
  switch (wasteType.toLowerCase()) {
    case "kağıt":
      points = wasteAmount * 10;
      break;
    case "plastik":
      points = wasteAmount * 15;
      break;
    case "cam":
      points = wasteAmount * 20;
      break;
    case "metal":
      points = wasteAmount * 25;
      break;
    default:
      alert("Geçersiz atık türü!");
      return;  // Hatalı türde işlem yapma
  }

  // Puanı ekranda göster
  document.getElementById("points").innerHTML = `
    <h3>Hesaplanan Puan</h3>
    <p>Atık Türü: ${wasteType}</p>
    <p>Atık Miktarı: ${wasteAmount} kg</p>
    <p>Puan: ${points}</p>
  `;
  
  // Verileri localStorage'a kaydet (okul numarasına göre)
  const wasteData = {
    schoolNumber: schoolNumberEntry,
    wasteType,
    wasteAmount,
    points
  };

  localStorage.setItem(schoolNumberEntry, JSON.stringify(wasteData));

  alert("Veri başarıyla kaydedildi!");
});
