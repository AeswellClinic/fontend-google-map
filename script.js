document.addEventListener('DOMContentLoaded', function () {
   
    fetch('reviews_cache.json')
      .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();  
      })
      .then(reviews => {
        const carousel = document.querySelector('.carousel');
        carousel.innerHTML = ''; 

        const itemsPerSlide = 3; 
        const slidesCount = Math.ceil(reviews.length / itemsPerSlide); 

        let currentIndex = 0; 

      
        function renderSlide(index) {
            const slide = document.createElement('div');
            slide.classList.add('slide');
            if (index === 0) slide.classList.add('active'); 

            const leftCard = document.createElement('div');
            leftCard.classList.add('left-card');
            const rightCards = document.createElement('div');
            rightCards.classList.add('right-cards');

           
            const startIdx = index * itemsPerSlide;
            const endIdx = Math.min(startIdx + itemsPerSlide, reviews.length);
            const reviewsForSlide = reviews.slice(startIdx, endIdx);

            reviewsForSlide.forEach((review, idx) => {
                const card = document.createElement('div');
                card.classList.add('card');
                card.innerHTML = `
                    <img src="${review.thumbnail}" alt="img" draggable="false">
                    <div class="card-content">
                        <p>${review.review}</p>
                        <div class="card-footer">
                            <span style="font-weight: 500; color: #000;">${review.name}</span><br>
                            <span>${review.time}</span>
                        </div>
                    </div>
                `;
                
              
                if (idx === 0) {
                    leftCard.appendChild(card); 
                } else {
                    rightCards.appendChild(card); 
                }

               
                setTimeout(() => {
                    card.classList.add('fade-in');
                }, idx * 1000); 
            });

            slide.appendChild(leftCard);
            slide.appendChild(rightCards);
            carousel.appendChild(slide);
        }

       
        renderSlide(currentIndex);

      
        const prevBtn = document.getElementById('left');
        const nextBtn = document.getElementById('right');

       
        function changeSlide() {
            currentIndex = (currentIndex === slidesCount - 1) ? 0 : currentIndex + 1;
            carousel.innerHTML = '';  
            renderSlide(currentIndex); 
        }

    
        setInterval(() => {
            changeSlide();  
        }, 9000); 

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex === 0) ? slidesCount - 1 : currentIndex - 1;
            carousel.innerHTML = '';  
            renderSlide(currentIndex); 
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex === slidesCount - 1) ? 0 : currentIndex + 1;
            carousel.innerHTML = ''; 
            renderSlide(currentIndex);  
        });
      })
      .catch(error => console.error('Error loading reviews:', error));
});
