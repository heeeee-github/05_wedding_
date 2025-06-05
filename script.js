// 페이지가 로드될 때 음악의 볼륨 설정 + 자동재생 활성화
window.addEventListener('load', function() {
    var audio = document.getElementById('background-music');
    audio.volume = 0.3; // 볼륨 설정( 0 ~ 1 )
    audio.play(); // 음악을 재생
});

// Calendar
function generateCalendar() {
    const weddingDate = new Date(2025, 8, 27); //9월은 8
    const startDate = new Date(2025, 8, 1);
    const endDate = new Date(2025, 8, 30);
    
    const calendar = document.getElementById('calendar');
    
    // Add day labels
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    days.forEach(day => {
        const dayLabel = document.createElement('div');
        dayLabel.classList.add('calendar-day');
        dayLabel.style.fontWeight = 'bold';
        dayLabel.textContent = day;
        calendar.appendChild(dayLabel);
    });
    
    // Add empty cells for days before the 1st
    for (let i = 0; i < startDate.getDay(); i++) {
        const emptyDay = document.createElement('div');
        calendar.appendChild(emptyDay);
    }
    
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        const day = document.createElement('div');
        day.classList.add('calendar-day');
        day.textContent = d.getDate();
        
        if (d.getTime() === weddingDate.getTime()) {
            day.classList.add('wedding-day');
        }
        
        calendar.appendChild(day);
    }
}

// D-day countdown
function updateDday() {
    const weddingDate = new Date(2025, 8, 27, 13, 20, 0);
    const now = new Date();
    const diff = weddingDate - now;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    document.getElementById('dday').textContent = `D - ${days}일`;
}

/*
// Gallery
function loadGalleryImages() {
    const gallery = document.getElementById('galleryImages');
    for (let i = 1; i <= 15; i++) {
        const img = document.createElement('img');
        img.src = `./img/img_${i}.jpg`; // 갤러리 이미지 경로를 맞추세요
        img.alt = `Gallery Image ${i}`;
        img.classList.add('gallery-image');
        gallery.appendChild(img);
    }
}
*/

//Gallery 2
document.addEventListener('DOMContentLoaded', function() {
    const showcaseImage = document.getElementById('showcaseImage');
    const previousBtn = document.getElementById('previousBtn');
    const nextBtn = document.getElementById('nextBtn');
    const imageTracker = document.getElementById('imageTracker');
    const dotContainer = document.getElementById('dotContainer');

    let currentImageIndex = 1;
    const totalImages = 21;
    const imageBasePath = './img';
    const imagesToPreload = 5; // 미리 로드할 이미지 수
    const loadedImages = new Set();

    function preloadImage(index) {
        if (loadedImages.has(index)) return;
        const img = new Image();
        img.src = `${imageBasePath}/img_${index}.jpg`;
        loadedImages.add(index);
    }

    function preloadSurroundingImages(currentIndex) {
        for (let i = -2; i <= 2; i++) {
            const indexToLoad = ((currentIndex - 1 + i + totalImages) % totalImages) + 1;
            preloadImage(indexToLoad);
        }
    }

    function displayImage(imageIndex) {
        showcaseImage.style.backgroundImage = `url(${imageBasePath}/img_${imageIndex}.jpg)`;
        // imageTracker.textContent = `${imageIndex} / ${totalImages}`;
        preloadSurroundingImages(imageIndex);
        updateDotIndicators();
    }

    function showNextImage() {
        currentImageIndex = currentImageIndex % totalImages + 1;
        displayImage(currentImageIndex);
    }

    function showPreviousImage() {
        currentImageIndex = (currentImageIndex - 2 + totalImages) % totalImages + 1;
        displayImage(currentImageIndex);
    }

    function createDotIndicators() {
        for (let i = 1; i <= totalImages; i++) {
            const dot = document.createElement('span');
            dot.className = 'dot';
            dot.addEventListener('click', () => {
                currentImageIndex = i;
                displayImage(currentImageIndex);
            });
            dotContainer.appendChild(dot);
        }
    }

    function updateDotIndicators() {
        const dots = dotContainer.getElementsByClassName('dot');
        for (let i = 0; i < dots.length; i++) {
            dots[i].classList.toggle('active', i === currentImageIndex - 1);
        }
    }

    // 초기 이미지들 프리로드
    for (let i = 1; i <= imagesToPreload; i++) {
        preloadImage(i);
    }

    // 도트 인디케이터 생성
    createDotIndicators();

    // 초기 이미지 표시
    displayImage(currentImageIndex);

    // 이벤트 리스너 추가
    nextBtn.addEventListener('click', showNextImage);
    previousBtn.addEventListener('click', showPreviousImage);
});




// Copy account number
function setupCopyAccountButtons() {
    const copyAccountButtons = document.querySelectorAll('.copy-account-btn');
    copyAccountButtons.forEach(button => {
        button.addEventListener('click', function() {
            const accountNumber = this.getAttribute('data-account');
            navigator.clipboard.writeText(accountNumber).then(() => {
                alert('계좌번호가 복사되었습니다.');
            });
        });
    });
}

// Copy address number
function setupCopyAddressButtons() {
    const copyAddressButtons = document.querySelectorAll('.copy-address-btn');
    copyAddressButtons.forEach(button => {
        button.addEventListener('click', function() {
            const address = this.getAttribute('address');
            navigator.clipboard.writeText(address).then(() => {
                alert('주소가 복사되었습니다.');
            });
        });
    });
}

// Modal
function setupModal() {
    const modal = document.getElementById("contactModal");
    const btn = document.getElementById("contactBtn");
    const span = document.getElementsByClassName("close")[0];

    btn.onclick = function() {
        modal.style.display = "block";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

// Flower petal animation
function createFlowerPetals() {
    const container = document.getElementById('flower-container');
    const petalCount = 30;

    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.classList.add('flower-petal');
        
        // Randomize petal properties
        petal.style.left = `${Math.random() * 100}vw`;
        petal.style.animationDuration = `${Math.random() * 10 + 5}s`;
        petal.style.opacity = Math.random() * 0.5 + 0.3;
        petal.style.transform = `scale(${Math.random() * 0.5 + 0.5})`;
        
        container.appendChild(petal);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    generateCalendar();
    updateDday();
    setInterval(updateDday, 60000); // Update every minute
//    loadGalleryImages();
    setupCopyAccountButtons();
    setupCopyAddressButtons();
    setupModal();
    createFlowerPetals();
});


// 마우스 오른쪽 버튼 클릭 방지
document.addEventListener('contextmenu', function(e) {
    if (e.target.tagName === 'IMG') {
      e.preventDefault(); // 우클릭 또는 꾹 누르기 방지
    }
  });

// 키보드의 특정 키 조합 방지 (PrintScreen, Ctrl+P, Ctrl+S 등)
document.addEventListener('keydown', function(e) {
    // PrintScreen 키 방지
    if (e.key === 'PrintScreen') {
        alert('캡처는 금지되어 있습니다.');
        return false;
    }

    // Ctrl+P (인쇄), Ctrl+S (저장) 등 방지
    if ((e.ctrlKey && e.key === 'p') || (e.ctrlKey && e.key === 's')) {
        alert('이 기능은 금지되어 있습니다.');
        e.preventDefault();
    }
});

// // 드래그 방지
// document.addEventListener('dragstart', function(e) {
//     e.preventDefault();
// });
