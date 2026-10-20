/* BÀI B — VIẾT CODE: Lọc tin và đăng tin nhanh (news.html)
   Viết code theo đặc tả.
   Không sửa news.html, không sửa css; chỉ viết JavaScript trong file này. */

// ---------- ĐÃ CHO SẴN (không sửa) ----------
// Chặn việc gửi form tìm kiếm khi nhấn Enter, để trang không bị tải lại.
document.querySelector("#searchbar form").addEventListener("submit", (e) => e.preventDefault());

// ---------- PHẦN BẠN VIẾT ----------

const oTimKiem = document.getElementById("o-tim-kiem");
const listTin = document.getElementById("list");
const boDem = document.getElementById("bo-dem");
const khongThay = document.getElementById("khong-thay");
const oTieuDe = document.getElementById("tin-tieu-de");
const oNoiDung = document.getElementById("tin-noi-dung");
const nutDang = document.getElementById("nut-dang");
const baoLoi = document.getElementById("bao-loi");

// F1. Bộ đếm "Đang hiển thị x/y tin" trong #bo-dem.
function capNhatBoDem() {
	const cacMuc = Array.from(listTin.querySelectorAll("li"));
	const tongSo = cacMuc.length;
	const dangHien = cacMuc.filter(muc => !muc.classList.contains("an")).length;
	boDem.textContent = `Đang hiển thị ${dangHien}/${tongSo} tin`;
}

// F2 + F3. Lọc tin khi gõ vào #o-tim-kiem (sự kiện keyup) và thông báo #khong-thay.
function locTin() {
	const tuKhoa = oTimKiem.value;
	const cacMuc = Array.from(listTin.querySelectorAll("li"));
	let soKhop = 0;

	for (const muc of cacMuc) {
		const h3 = muc.querySelector("h3");
		const p = muc.querySelector("p");
		const vanBan = (h3 ? h3.textContent : "") + " " + (p ? p.textContent : "");
		if (tuKhoa === "" || vanBan.toLowerCase().includes(tuKhoa.toLowerCase())) {
			muc.classList.remove("an");
			soKhop++;
		} else {
			muc.classList.add("an");
		}
	}

	if (soKhop === 0) {
		khongThay.classList.remove("an");
		khongThay.textContent = `Không tìm thấy tin nào cho "${tuKhoa}"`;
	} else {
		khongThay.classList.add("an");
	}

	capNhatBoDem();
}

oTimKiem.addEventListener("keyup", locTin);

// F4. Nút "Read more >>" / "Thu gọn <<" — MỘT trình lắng nghe đặt trên #list.
listTin.addEventListener("click", (e) => {
	const nut = e.target;
	if (nut.tagName === "BUTTON" && nut.classList.contains("more")) {
		const muc = nut.closest("li");
		if (!muc) return;
		const p = muc.querySelector("p");
		if (!p) return;

		if (p.classList.contains("day-du")) {
			p.classList.remove("day-du");
			nut.textContent = "Read more >>";
		} else {
			p.classList.add("day-du");
			nut.textContent = "Thu gọn <<";
		}
	}
});

// F5. Nút #nut-dang: kiểm tra dữ liệu, tạo <li> mới, chèn vào đầu #list.
nutDang.addEventListener("click", () => {
	const tieuDe = oTieuDe.value;
	const noiDung = oNoiDung.value;

	if (tieuDe === "" || noiDung === "") {
		baoLoi.textContent = "Vui lòng nhập đủ tiêu đề và nội dung.";
		return;
	}

	const liMoi = document.createElement("li");

	const spanTime = document.createElement("span");
	spanTime.className = "time";
	spanTime.textContent = homNay();

	const h3 = document.createElement("h3");
	h3.textContent = tieuDe;

	const p = document.createElement("p");
	p.textContent = noiDung;

	const nutMore = document.createElement("button");
	nutMore.type = "button";
	nutMore.className = "more";
	nutMore.textContent = "Read more >>";

	liMoi.append(spanTime, h3, p, nutMore);
	listTin.prepend(liMoi);

	oTieuDe.value = "";
	oNoiDung.value = "";
	baoLoi.textContent = "";

	locTin();
});

// Khởi tạo bộ đếm khi trang tải xong
capNhatBoDem();
