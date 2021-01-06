// Selecting the target elements 

const list = document.querySelector('ul.gallery-carousel-list');
const lis = Array.from(list.children);
const prevButton = document.querySelector('.carousel-button-left');
const nextButton = document.querySelector('.carousel-button-right');
const carouselNav = document.querySelector('.carousel-nav');
const dots = Array.from(carouselNav.children);

const imageWidth = lis[0].getBoundingClientRect().width;

// detecting the width of image 
const setImagePosition = (image, index) => {
      image.style.left = imageWidth * index + "px";
};

lis.forEach(setImagePosition);

const moveToImage = (list, currentImage, targetImage) => {
    list.style.transform = `translateX(-${targetImage.style.left})`;
    currentImage.classList.remove('active-image');
    targetImage.classList.add('active-image');
}

// hide button logic 
const hideButton = (lis, prevButton, nextButton, targetIndex) => {
    if(targetIndex === 0) {
        prevButton.classList.add('hidden');
        nextButton.classList.remove('hidden');
    } else if(targetIndex === lis.length - 1) {
        prevButton.classList.remove('hidden');
        nextButton.classList.add('hidden');
    } else  {
        prevButton.classList.remove('hidden');
        nextButton.classList.remove('hidden');
    }
}

// next button logic
nextButton.addEventListener('click', (e) => {
    const currentImage = list.querySelector('.active-image');
    const nextImage = currentImage.nextElementSibling;
    const currentDot = carouselNav.querySelector('.active-button');
    const nextDot = currentDot.nextElementSibling;
    
    const nextIndex = lis.findIndex((image) => image === nextImage);

    currentDot.classList.remove('active-button');
    nextDot.classList.add('active-button');
    
    hideButton(lis, prevButton, nextButton, nextIndex);
    moveToImage(list, currentImage, nextImage);
    
});

// prev button logic
prevButton.addEventListener('click', (e) => {
    const currentImage = list.querySelector('.active-image');
    const prevImage = currentImage.previousElementSibling;
    
    const currentDot = carouselNav.querySelector('.active-button');
    const prevDot = currentDot.previousElementSibling;
    
    const prevIndex = lis.findIndex((image) => image === prevImage);

    currentDot.classList.remove('active-button');
    prevDot.classList.add('active-button');
    
    hideButton(lis, prevButton, nextButton, prevIndex);
    moveToImage(list, currentImage, prevImage);
   
    
});

// nav carousel logic
carouselNav.addEventListener('click', (e) => {
       const target = e.target.closest('button');
       if(!target) return;

       const currentImage = list.querySelector('.active-image');
       const currentDot = carouselNav.querySelector('.active-button');
       const targetIndex = dots.findIndex((dot) => dot === target);
       const targetImage = lis[targetIndex];
       
       moveToImage(list, currentImage, targetImage);

       currentDot.classList.remove('active-button');
       target.classList.add('active-button');

       hideButton(lis, prevButton, nextButton, targetIndex);

       console.log(targetImage);
});