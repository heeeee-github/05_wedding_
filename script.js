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
document.addEventListener('DOMContentLoaded', function () {
    const showcaseImage = document.getElementById('showcaseImage');
    const previousBtn = document.getElementById('previousBtn');
    const nextBtn = document.getElementById('nextBtn');
    const imageTracker = document.getElementById('imageTracker');
    const dotContainer = document.getElementById('dotContainer');

    let currentImageIndex = 1;
    const totalImages = 21;
    const imageBasePath = './img';
    const imagesToPreload = 5;
    const loadedImages = new Set();

    let touchStartX = 0;
    let touchEndX = 0;
    const minSwipeDistance = 50;

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

    function animateImageTransition(nextIndex, direction = 'left') {
        const img = showcaseImage;

        // 초기 상태 설정 (슬라이드 진입 방향)
        img.style.transition = 'none';
        img.style.transform = (direction === 'left') ? 'translateX(100%)' : 'translateX(-100%)';

        // 이미지 소스 변경
        img.src = `${imageBasePath}/img_${nextIndex}.jpg`;

        // 다음 프레임에서 슬라이드 애니메이션 적용
        requestAnimationFrame(() => {
            img.style.transition = 'transform 0.3s ease-in-out';
            img.style.transform = 'translateX(0)';
        });

        currentImageIndex = nextIndex;
        preloadSurroundingImages(currentImageIndex);
        updateDotIndicators();
    }

    function showNextImage() {
        const nextIndex = currentImageIndex % totalImages + 1;
        animateImageTransition(nextIndex, 'left');
    }

    function showPreviousImage() {
        const prevIndex = (currentImageIndex - 2 + totalImages) % totalImages + 1;
        animateImageTransition(prevIndex, 'right');
    }

    function createDotIndicators() {
        for (let i = 1; i <= totalImages; i++) {
            const dot = document.createElement('span');
            dot.className = 'dot';
            dot.addEventListener('click', () => {
                const direction = (i > currentImageIndex) ? 'left' : 'right';
                animateImageTransition(i, direction);
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

    // 터치 이벤트 설정
    showcaseImage.addEventListener('touchstart', function (event) {
        touchStartX = event.changedTouches[0].screenX;
    });

    showcaseImage.addEventListener('touchend', function (event) {
        touchEndX = event.changedTouches[0].screenX;
        handleSwipeGesture();
    });

    function handleSwipeGesture() {
        const distance = touchEndX - touchStartX;
        if (Math.abs(distance) < minSwipeDistance) return;

        if (distance > 0) {
            showPreviousImage();
        } else {
            showNextImage();
        }
    }

    // 초기화
    for (let i = 1; i <= imagesToPreload; i++) {
        preloadImage(i);
    }

    createDotIndicators();
    animateImageTransition(currentImageIndex);
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
